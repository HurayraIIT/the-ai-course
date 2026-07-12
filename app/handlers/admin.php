<?php

declare(strict_types=1);

function handle_admin_users(): void
{
    $search = trim((string)($_GET['q'] ?? ''));
    $page = max(1, (int)($_GET['page'] ?? 1));
    $perPage = 25;

    $where = '';
    $args = [];
    if ($search !== '') {
        $where = 'WHERE u.username LIKE ? OR u.email LIKE ?';
        $like = '%' . $search . '%';
        $args = [$like, $like];
    }

    $total = pdo()->prepare("SELECT COUNT(*) FROM users u $where");
    $total->execute($args);

    $stmt = pdo()->prepare(
        "SELECT u.id, u.username, u.email, u.phone, u.is_admin, u.leaderboard_opt_in,
                u.email_verified_at, u.created_at, u.last_login_at,
                COUNT(lc.lesson_id) AS completed
         FROM users u
         LEFT JOIN lesson_completions lc ON lc.user_id = u.id
         $where
         GROUP BY u.id
         ORDER BY u.created_at DESC
         LIMIT $perPage OFFSET " . ($page - 1) * $perPage
    );
    $stmt->execute($args);

    json_response([
        'users' => array_map('admin_user_row', $stmt->fetchAll()),
        'total' => (int)$total->fetchColumn(),
        'page' => $page,
        'per_page' => $perPage,
        'total_lessons' => total_lessons(),
    ]);
}

function admin_user_row(array $u): array
{
    return [
        'id' => (int)$u['id'],
        'username' => $u['username'],
        'email' => $u['email'],
        'phone' => $u['phone'],
        'is_admin' => (bool)$u['is_admin'],
        'leaderboard_opt_in' => (bool)$u['leaderboard_opt_in'],
        'email_verified' => ($u['email_verified_at'] ?? null) !== null,
        'created_at' => $u['created_at'],
        'last_login_at' => $u['last_login_at'],
        'completed' => (int)($u['completed'] ?? 0),
        'avatar_hash' => avatar_hash($u['email']),
    ];
}

function admin_target_user(int $id): array
{
    $stmt = pdo()->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$id]);
    $target = $stmt->fetch();
    if (!$target) {
        json_error('User not found', 404);
    }
    return $target;
}

function handle_admin_user_detail(array $admin, array $params): void
{
    $target = admin_target_user((int)$params[0]);

    $stmt = pdo()->prepare(
        'SELECT l.position, l.slug, l.title, lc.completed_at
         FROM lessons l
         JOIN lesson_completions lc ON lc.lesson_id = l.id AND lc.user_id = ?
         ORDER BY l.position'
    );
    $stmt->execute([(int)$target['id']]);
    $completions = array_map(fn($row) => [
        'position' => (int)$row['position'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'completed_at' => $row['completed_at'],
    ], $stmt->fetchAll());

    json_response([
        'user' => admin_user_row($target),
        'completions' => $completions,
        'total_lessons' => total_lessons(),
    ]);
}

function handle_admin_user_update(array $admin, array $params): void
{
    $target = admin_target_user((int)$params[0]);
    $body = read_json_body();

    $username = require_field($body, 'username', 50);
    $email = strtolower(require_field($body, 'email'));
    $phone = require_field($body, 'phone', 32);
    $optIn = (bool)($body['leaderboard_opt_in'] ?? true);

    if (!preg_match('/^[a-zA-Z0-9_-]{3,50}$/', $username)) {
        json_error('Username must be 3-50 characters: letters, numbers, hyphens, underscores', 422);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_error('Invalid email address', 422);
    }
    if (!preg_match('/^\+?[0-9 ()-]{7,31}$/', $phone)) {
        json_error('Invalid phone number', 422);
    }

    $stmt = pdo()->prepare('SELECT id, username, email FROM users WHERE (username = ? OR email = ?) AND id != ?');
    $stmt->execute([$username, $email, (int)$target['id']]);
    foreach ($stmt->fetchAll() as $existing) {
        if (strcasecmp($existing['username'], $username) === 0) {
            json_error('Username is already taken', 409);
        }
        json_error('Email is already registered', 409);
    }

    pdo()->prepare('UPDATE users SET username = ?, email = ?, phone = ?, leaderboard_opt_in = ? WHERE id = ?')
        ->execute([$username, $email, $phone, (int)$optIn, (int)$target['id']]);
    json_response(['ok' => true]);
}

function handle_admin_reset_progress(array $admin, array $params): void
{
    $target = admin_target_user((int)$params[0]);
    $pdo = pdo();
    $pdo->beginTransaction();
    $pdo->prepare('DELETE FROM resource_reads WHERE user_id = ?')->execute([(int)$target['id']]);
    $pdo->prepare('DELETE FROM lesson_completions WHERE user_id = ?')->execute([(int)$target['id']]);
    $pdo->commit();
    json_response(['ok' => true]);
}

function handle_admin_reset_password(array $admin, array $params): void
{
    $target = admin_target_user((int)$params[0]);
    $password = (string)(read_json_body()['password'] ?? '');
    if (strlen($password) < 8) {
        json_error('Password must be at least 8 characters', 422);
    }
    pdo()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
        ->execute([password_hash($password, PASSWORD_DEFAULT), (int)$target['id']]);
    json_response(['ok' => true]);
}

function handle_admin_user_delete(array $admin, array $params): void
{
    $target = admin_target_user((int)$params[0]);
    if ((int)$target['id'] === (int)$admin['id']) {
        json_error('You cannot delete your own account', 400);
    }
    pdo()->prepare('DELETE FROM users WHERE id = ?')->execute([(int)$target['id']]);
    json_response(['ok' => true]);
}

function handle_admin_comments(): void
{
    $perPage = 20;
    $page = max(1, (int)($_GET['page'] ?? 1));

    $total = (int)pdo()->query('SELECT COUNT(*) FROM comments')->fetchColumn();
    $stmt = pdo()->query(
        'SELECT c.id, c.body, c.created_at, u.id AS user_id, u.username, u.email, l.slug AS lesson_slug, l.title AS lesson_title
         FROM comments c
         JOIN users u ON u.id = c.user_id
         JOIN lessons l ON l.id = c.lesson_id
         ORDER BY c.created_at DESC, c.id DESC
         LIMIT ' . $perPage . ' OFFSET ' . ($page - 1) * $perPage
    );

    json_response([
        'comments' => array_map(fn($c) => [
            'id' => (int)$c['id'],
            'body' => $c['body'],
            'created_at' => $c['created_at'],
            'user_id' => (int)$c['user_id'],
            'username' => $c['username'],
            'avatar_hash' => avatar_hash($c['email']),
            'lesson_slug' => $c['lesson_slug'],
            'lesson_title' => $c['lesson_title'],
        ], $stmt->fetchAll()),
        'total' => $total,
        'page' => $page,
        'per_page' => $perPage,
    ]);
}

function handle_admin_comment_update(array $admin, array $params): void
{
    $stmt = pdo()->prepare('SELECT id FROM comments WHERE id = ?');
    $stmt->execute([(int)$params[0]]);
    if (!$stmt->fetch()) {
        json_error('Comment not found', 404);
    }

    $body = trim((string)(read_json_body()['body'] ?? ''));
    if ($body === '') {
        json_error('Comment cannot be empty', 422);
    }
    if (mb_strlen($body) > 2000) {
        json_error('Comment is too long (max 2000 characters)', 422);
    }

    pdo()->prepare('UPDATE comments SET body = ? WHERE id = ?')->execute([$body, (int)$params[0]]);
    json_response(['ok' => true]);
}

function handle_admin_activity(): void
{
    $perPage = 50;
    $page = max(1, (int)($_GET['page'] ?? 1));

    $total = (int)pdo()->query('SELECT COUNT(*) FROM activity_log')->fetchColumn();
    $stmt = pdo()->query(
        'SELECT id, user_id, username_snapshot, action, detail, created_at
         FROM activity_log ORDER BY id DESC
         LIMIT ' . $perPage . ' OFFSET ' . ($page - 1) * $perPage
    );

    json_response([
        'activity' => array_map(fn($a) => [
            'id' => (int)$a['id'],
            'user_id' => $a['user_id'] !== null ? (int)$a['user_id'] : null,
            'username' => $a['username_snapshot'],
            'action' => $a['action'],
            'detail' => $a['detail'],
            'created_at' => $a['created_at'],
        ], $stmt->fetchAll()),
        'total' => $total,
        'page' => $page,
        'per_page' => $perPage,
    ]);
}

function handle_admin_emails(): void
{
    $perPage = 20;
    $page = max(1, (int)($_GET['page'] ?? 1));

    $total = (int)pdo()->query('SELECT COUNT(*) FROM email_log')->fetchColumn();
    $stmt = pdo()->query(
        'SELECT id, recipient, subject, body, status, created_at
         FROM email_log ORDER BY id DESC
         LIMIT ' . $perPage . ' OFFSET ' . ($page - 1) * $perPage
    );

    json_response([
        'emails' => $stmt->fetchAll(),
        'total' => $total,
        'page' => $page,
        'per_page' => $perPage,
    ]);
}

function handle_admin_analytics(): void
{
    $pdo = pdo();

    $signups = $pdo->query(
        'SELECT DATE(created_at) AS day, COUNT(*) AS count FROM users
         WHERE created_at > NOW() - INTERVAL 30 DAY GROUP BY day ORDER BY day'
    )->fetchAll();

    $topLessons = $pdo->query(
        'SELECT l.title, l.slug, l.position, COUNT(lc.user_id) AS completions
         FROM lessons l JOIN lesson_completions lc ON lc.lesson_id = l.id
         GROUP BY l.id ORDER BY completions DESC, l.position ASC LIMIT 20'
    )->fetchAll();

    // How many users have reached at least each 10-lesson milestone.
    $funnel = $pdo->query(
        'SELECT FLOOR(cnt / 10) * 10 AS bucket, COUNT(*) AS users FROM
           (SELECT user_id, COUNT(*) AS cnt FROM lesson_completions GROUP BY user_id) t
         GROUP BY bucket ORDER BY bucket'
    )->fetchAll();

    json_response([
        'total_users' => (int)$pdo->query('SELECT COUNT(*) FROM users')->fetchColumn(),
        'total_comments' => (int)$pdo->query('SELECT COUNT(*) FROM comments')->fetchColumn(),
        'total_completions' => (int)$pdo->query('SELECT COUNT(*) FROM lesson_completions')->fetchColumn(),
        'active_users_7d' => active_users(7),
        'active_users_30d' => active_users(30),
        'signups_by_day' => $signups,
        'top_lessons' => $topLessons,
        'completion_funnel' => $funnel,
        'total_lessons' => total_lessons(),
    ]);
}

function active_users(int $days): int
{
    $stmt = pdo()->prepare(
        'SELECT COUNT(DISTINCT id) FROM (
            SELECT user_id AS id FROM resource_reads WHERE created_at > NOW() - INTERVAL ? DAY
            UNION
            SELECT id FROM users WHERE last_login_at > NOW() - INTERVAL ? DAY
         ) t'
    );
    $stmt->execute([$days, $days]);
    return (int)$stmt->fetchColumn();
}
