<?php

declare(strict_types=1);

/** Records a user-driven event for the admin activity page. Never fails the request. */
function log_activity(?int $userId, string $username, string $action, string $detail = ''): void
{
    try {
        pdo()->prepare(
            'INSERT INTO activity_log (user_id, username_snapshot, action, detail) VALUES (?, ?, ?, ?)'
        )->execute([$userId, $username, $action, mb_substr($detail, 0, 255)]);
    } catch (Throwable $e) {
        error_log('log_activity failed: ' . $e->getMessage());
    }
}
