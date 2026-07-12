<?php

declare(strict_types=1);

/** Records a hit and fails the request with 429 when the window is exceeded. */
function rate_limit(string $action, string $identifier, int $max, int $windowSecs): void
{
    $pdo = pdo();
    $pdo->prepare('DELETE FROM rate_limit_hits WHERE created_at < NOW() - INTERVAL 1 DAY')->execute();
    $stmt = $pdo->prepare(
        'SELECT COUNT(*) FROM rate_limit_hits
         WHERE action = ? AND identifier = ? AND created_at > NOW() - INTERVAL ? SECOND'
    );
    $stmt->execute([$action, $identifier, $windowSecs]);
    if ((int)$stmt->fetchColumn() >= $max) {
        json_error('Too many attempts. Try again later.', 429);
    }
    $pdo->prepare('INSERT INTO rate_limit_hits (action, identifier, created_at) VALUES (?, ?, NOW())')
        ->execute([$action, $identifier]);
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}
