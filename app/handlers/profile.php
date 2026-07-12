<?php

declare(strict_types=1);

function handle_profile_update(array $user): void
{
    $body = read_json_body();

    $username = require_field($body, 'username', 50);
    $phone = require_field($body, 'phone', 32);
    $optIn = (bool)($body['leaderboard_opt_in'] ?? true);

    if (!preg_match('/^[a-zA-Z0-9_-]{3,50}$/', $username)) {
        json_error('Username must be 3-50 characters: letters, numbers, hyphens, underscores', 422);
    }
    if (!preg_match('/^\+?[0-9 ()-]{7,31}$/', $phone)) {
        json_error('Invalid phone number', 422);
    }

    $stmt = pdo()->prepare('SELECT id FROM users WHERE username = ? AND id != ?');
    $stmt->execute([$username, (int)$user['id']]);
    if ($stmt->fetch()) {
        json_error('Username is already taken', 409);
    }

    pdo()->prepare('UPDATE users SET username = ?, phone = ?, leaderboard_opt_in = ? WHERE id = ?')
        ->execute([$username, $phone, (int)$optIn, (int)$user['id']]);
    log_activity((int)$user['id'], $username, 'updated_profile');

    json_response(['user' => user_payload(array_merge($user, [
        'username' => $username,
        'phone' => $phone,
        'leaderboard_opt_in' => (int)$optIn,
    ]))]);
}

function handle_password_update(array $user): void
{
    $body = read_json_body();
    $current = (string)($body['current_password'] ?? '');
    $new = (string)($body['new_password'] ?? '');

    if (!password_verify($current, $user['password_hash'])) {
        json_error('Current password is incorrect', 403);
    }
    if (strlen($new) < 8) {
        json_error('New password must be at least 8 characters', 422);
    }

    pdo()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
        ->execute([password_hash($new, PASSWORD_DEFAULT), (int)$user['id']]);
    log_activity((int)$user['id'], $user['username'], 'changed_password');
    json_response(['ok' => true]);
}
