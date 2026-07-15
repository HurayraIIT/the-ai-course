<?php

declare(strict_types=1);

function handle_leaderboard(array $user): void
{
    $perPage = 50;
    $page = max(1, (int)($_GET['page'] ?? 1));
    $offset = ($page - 1) * $perPage;

    $total = (int)pdo()->query('SELECT COUNT(*) FROM users WHERE leaderboard_opt_in = 1')->fetchColumn();

    // Rank by completed lessons; ties broken by who reached that count first.
    $stmt = pdo()->query(
        "SELECT u.id, u.username, u.email,
                COUNT(lc.lesson_id) AS completed,
                MAX(lc.completed_at) AS reached_at,
                (SELECT TIMESTAMPDIFF(SECOND, MAX(al.created_at), NOW())
                   FROM activity_log al WHERE al.user_id = u.id) AS last_active_secs
         FROM users u
         LEFT JOIN lesson_completions lc ON lc.user_id = u.id
         WHERE u.leaderboard_opt_in = 1
         GROUP BY u.id
         ORDER BY completed DESC, reached_at ASC, u.created_at ASC
         LIMIT $perPage OFFSET $offset"
    );

    $fetched = $stmt->fetchAll();
    $maxStreaks = max_streaks_for(array_map(fn($r) => (int)$r['id'], $fetched));

    $rank = $offset;
    $rows = array_map(function ($row) use (&$rank, $user, $maxStreaks) {
        return [
            'rank' => ++$rank,
            'username' => $row['username'],
            'avatar_hash' => avatar_hash($row['email']),
            'completed' => (int)$row['completed'],
            'max_streak' => $maxStreaks[(int)$row['id']] ?? 0,
            'last_active_secs' => $row['last_active_secs'] === null ? null : (int)$row['last_active_secs'],
            'is_me' => (int)$row['id'] === (int)$user['id'],
        ];
    }, $fetched);

    json_response([
        'leaderboard' => $rows,
        'total' => $total,
        'page' => $page,
        'per_page' => $perPage,
        'total_lessons' => total_lessons(),
    ]);
}

function total_lessons(): int
{
    return (int)pdo()->query('SELECT COUNT(*) FROM lessons')->fetchColumn();
}
