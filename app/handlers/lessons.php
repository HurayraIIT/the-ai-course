<?php

declare(strict_types=1);

/** Number of completed lessons = size of the user's contiguous completed prefix. */
function completed_count(int $userId): int
{
    $stmt = pdo()->prepare('SELECT COUNT(*) FROM lesson_completions WHERE user_id = ?');
    $stmt->execute([$userId]);
    return (int)$stmt->fetchColumn();
}

function handle_outline(?array $user): void
{
    $pdo = pdo();
    $modules = $pdo->query('SELECT slug, title, description FROM modules ORDER BY position')->fetchAll();
    $lessons = $pdo->query(
        'SELECT l.position, l.slug, l.title, l.module_slug, COUNT(r.id) AS resource_count
         FROM lessons l LEFT JOIN resources r ON r.lesson_id = l.id
         GROUP BY l.id ORDER BY l.position'
    )->fetchAll();

    $completedCount = $user ? completed_count((int)$user['id']) : null;

    $byModule = [];
    foreach ($lessons as $lesson) {
        $entry = [
            'position' => (int)$lesson['position'],
            'slug' => $lesson['slug'],
            'title' => $lesson['title'],
            'resource_count' => (int)$lesson['resource_count'],
        ];
        if ($completedCount !== null) {
            $entry['completed'] = $lesson['position'] <= $completedCount;
            // Admins can open any lesson; their own completion frontier still applies to progress.
            $entry['unlocked'] = $user['is_admin'] || $lesson['position'] <= $completedCount + 1;
        }
        $byModule[$lesson['module_slug']][] = $entry;
    }

    json_response([
        'authenticated' => $user !== null,
        'completed_count' => $completedCount,
        'total_lessons' => count($lessons),
        'modules' => array_map(fn($m) => $m + ['lessons' => $byModule[$m['slug']] ?? []], $modules),
    ]);
}

function handle_lesson(array $user, array $params): void
{
    $stmt = pdo()->prepare('SELECT * FROM lessons WHERE slug = ?');
    $stmt->execute([$params[0]]);
    $lesson = $stmt->fetch();
    if (!$lesson) {
        json_error('Lesson not found', 404);
    }

    $completedCount = completed_count((int)$user['id']);
    $beyondFrontier = (int)$lesson['position'] > $completedCount + 1;
    if ($beyondFrontier && !$user['is_admin']) {
        json_error('Lesson is locked', 403, ['locked' => true]);
    }

    $stmt = pdo()->prepare(
        'SELECT r.id, r.position, r.type, r.title, r.url, rr.resource_id IS NOT NULL AS `read`
         FROM resources r
         LEFT JOIN resource_reads rr ON rr.resource_id = r.id AND rr.user_id = ?
         WHERE r.lesson_id = ? ORDER BY r.position'
    );
    $stmt->execute([(int)$user['id'], (int)$lesson['id']]);
    $resources = array_map(fn($r) => [
        'id' => (int)$r['id'],
        'type' => $r['type'],
        'title' => $r['title'],
        'url' => $r['url'],
        'read' => (bool)$r['read'],
    ], $stmt->fetchAll());

    $prevNext = [];
    foreach (['prev' => -1, 'next' => 1] as $key => $delta) {
        $stmt = pdo()->prepare('SELECT slug, title, position FROM lessons WHERE position = ?');
        $stmt->execute([(int)$lesson['position'] + $delta]);
        $prevNext[$key] = $stmt->fetch() ?: null;
    }

    json_response([
        'id' => (int)$lesson['id'],
        'position' => (int)$lesson['position'],
        'slug' => $lesson['slug'],
        'module_slug' => $lesson['module_slug'],
        'title' => $lesson['title'],
        'body_md' => $lesson['body_md'],
        'resources' => $resources,
        'completed' => (int)$lesson['position'] <= $completedCount,
        'viewing_locked' => $beyondFrontier, // admin preview: progress mutations stay disabled
        'prev' => $prevNext['prev'],
        'next' => $prevNext['next'],
    ]);
}

/**
 * Loads a lesson by id and rejects if it is beyond the user's unlock frontier.
 * $adminBypass permits admins to VIEW ahead; progress mutations must never pass it,
 * or an out-of-order completion would break the contiguous-prefix unlock invariant.
 */
function unlocked_lesson_or_fail(array $user, int $lessonId, bool $adminBypass = false): array
{
    $stmt = pdo()->prepare('SELECT * FROM lessons WHERE id = ?');
    $stmt->execute([$lessonId]);
    $lesson = $stmt->fetch();
    if (!$lesson) {
        json_error('Lesson not found', 404);
    }
    if ($adminBypass && $user['is_admin']) {
        return $lesson;
    }
    if ((int)$lesson['position'] > completed_count((int)$user['id']) + 1) {
        json_error('Lesson is locked', 403, ['locked' => true]);
    }
    return $lesson;
}

function handle_resource_read(array $user, array $params): void
{
    $userId = (int)$user['id'];
    $lesson = unlocked_lesson_or_fail($user, (int)$params[0]);

    $stmt = pdo()->prepare('SELECT id, title FROM resources WHERE id = ? AND lesson_id = ?');
    $stmt->execute([(int)$params[1], (int)$lesson['id']]);
    $resource = $stmt->fetch();
    if (!$resource) {
        json_error('Resource not found', 404);
    }

    $pdo = pdo();
    $pdo->beginTransaction();
    $pdo->prepare('INSERT IGNORE INTO resource_reads (user_id, resource_id) VALUES (?, ?)')
        ->execute([$userId, (int)$params[1]]);

    $stmt = $pdo->prepare(
        'SELECT (SELECT COUNT(*) FROM resources WHERE lesson_id = ?) AS total,
                (SELECT COUNT(*) FROM resource_reads rr JOIN resources r ON r.id = rr.resource_id
                 WHERE r.lesson_id = ? AND rr.user_id = ?) AS done'
    );
    $stmt->execute([(int)$lesson['id'], (int)$lesson['id'], $userId]);
    $counts = $stmt->fetch();

    $completed = false;
    if ((int)$counts['done'] >= (int)$counts['total']) {
        $pdo->prepare('INSERT IGNORE INTO lesson_completions (user_id, lesson_id) VALUES (?, ?)')
            ->execute([$userId, (int)$lesson['id']]);
        $completed = true;
    }
    $pdo->commit();

    log_activity($userId, $user['username'], 'read_resource', "{$resource['title']} ({$lesson['title']})");
    if ($completed) {
        log_activity($userId, $user['username'], 'completed_lesson', $lesson['title']);
    }

    json_response(['ok' => true, 'lesson_completed' => $completed]);
}

function handle_lesson_complete(array $user, array $params): void
{
    $userId = (int)$user['id'];
    $lesson = unlocked_lesson_or_fail($user, (int)$params[0]);

    $stmt = pdo()->prepare('SELECT COUNT(*) FROM resources WHERE lesson_id = ?');
    $stmt->execute([(int)$lesson['id']]);
    if ((int)$stmt->fetchColumn() > 0) {
        json_error('This lesson completes by reading all its resources', 400);
    }

    pdo()->prepare('INSERT IGNORE INTO lesson_completions (user_id, lesson_id) VALUES (?, ?)')
        ->execute([$userId, (int)$lesson['id']]);
    log_activity($userId, $user['username'], 'completed_lesson', $lesson['title']);
    json_response(['ok' => true, 'lesson_completed' => true]);
}
