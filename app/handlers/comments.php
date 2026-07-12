<?php

declare(strict_types=1);

function handle_comments_list(array $user, array $params): void
{
    $lesson = unlocked_lesson_or_fail((int)$user['id'], (int)$params[0]);

    $stmt = pdo()->prepare(
        'SELECT c.id, c.body, c.created_at, c.user_id, u.username, u.email,
                SUM(cr.reaction = "up") AS ups,
                SUM(cr.reaction = "down") AS downs,
                MAX(CASE WHEN cr.user_id = ? THEN cr.reaction END) AS my_reaction
         FROM comments c
         JOIN users u ON u.id = c.user_id
         LEFT JOIN comment_reactions cr ON cr.comment_id = c.id
         WHERE c.lesson_id = ?
         GROUP BY c.id
         ORDER BY c.created_at, c.id'
    );
    $stmt->execute([(int)$user['id'], (int)$lesson['id']]);

    json_response(['comments' => array_map(fn($c) => [
        'id' => (int)$c['id'],
        'body' => $c['body'],
        'created_at' => $c['created_at'],
        'username' => $c['username'],
        'avatar_hash' => md5(strtolower(trim($c['email']))),
        'is_mine' => (int)$c['user_id'] === (int)$user['id'],
        'ups' => (int)$c['ups'],
        'downs' => (int)$c['downs'],
        'my_reaction' => $c['my_reaction'],
    ], $stmt->fetchAll())]);
}

function handle_comment_create(array $user, array $params): void
{
    $lesson = unlocked_lesson_or_fail((int)$user['id'], (int)$params[0]);

    $body = trim((string)(read_json_body()['body'] ?? ''));
    if ($body === '') {
        json_error('Comment cannot be empty', 422);
    }
    if (mb_strlen($body) > 2000) {
        json_error('Comment is too long (max 2000 characters)', 422);
    }

    pdo()->prepare('INSERT INTO comments (lesson_id, user_id, body) VALUES (?, ?, ?)')
        ->execute([(int)$lesson['id'], (int)$user['id'], $body]);
    json_response(['ok' => true, 'id' => (int)pdo()->lastInsertId()], 201);
}

function handle_comment_delete(array $user, array $params): void
{
    $stmt = pdo()->prepare('SELECT user_id FROM comments WHERE id = ?');
    $stmt->execute([(int)$params[0]]);
    $comment = $stmt->fetch();
    if (!$comment) {
        json_error('Comment not found', 404);
    }
    if ((int)$comment['user_id'] !== (int)$user['id'] && !$user['is_admin']) {
        json_error('Forbidden', 403);
    }

    pdo()->prepare('DELETE FROM comments WHERE id = ?')->execute([(int)$params[0]]);
    json_response(['ok' => true]);
}

function handle_comment_reaction(array $user, array $params): void
{
    $stmt = pdo()->prepare('SELECT id FROM comments WHERE id = ?');
    $stmt->execute([(int)$params[0]]);
    if (!$stmt->fetch()) {
        json_error('Comment not found', 404);
    }

    $reaction = read_json_body()['reaction'] ?? null;
    if ($reaction === null) {
        pdo()->prepare('DELETE FROM comment_reactions WHERE comment_id = ? AND user_id = ?')
            ->execute([(int)$params[0], (int)$user['id']]);
    } elseif (in_array($reaction, ['up', 'down'], true)) {
        pdo()->prepare(
            'INSERT INTO comment_reactions (comment_id, user_id, reaction) VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE reaction = VALUES(reaction)'
        )->execute([(int)$params[0], (int)$user['id'], $reaction]);
    } else {
        json_error('Reaction must be "up", "down", or null', 422);
    }

    json_response(['ok' => true]);
}
