<?php

declare(strict_types=1);

function handle_leaderboard(array $user): void
{
    // Rank by completed lessons; ties broken by who reached that count first.
    $stmt = pdo()->query(
        'SELECT u.id, u.username, u.email,
                COUNT(lc.lesson_id) AS completed,
                MAX(lc.completed_at) AS reached_at
         FROM users u
         LEFT JOIN lesson_completions lc ON lc.user_id = u.id
         WHERE u.leaderboard_opt_in = 1
         GROUP BY u.id
         ORDER BY completed DESC, reached_at ASC, u.created_at ASC
         LIMIT 100'
    );

    $rank = 0;
    $rows = array_map(function ($row) use (&$rank, $user) {
        return [
            'rank' => ++$rank,
            'username' => $row['username'],
            'avatar_hash' => md5(strtolower(trim($row['email']))),
            'completed' => (int)$row['completed'],
            'is_me' => (int)$row['id'] === (int)$user['id'],
        ];
    }, $stmt->fetchAll());

    json_response(['leaderboard' => $rows, 'total_lessons' => total_lessons()]);
}

function total_lessons(): int
{
    return (int)pdo()->query('SELECT COUNT(*) FROM lessons')->fetchColumn();
}
