<?php

declare(strict_types=1);

function current_user(): ?array
{
    static $user = false;
    if ($user === false) {
        $id = $_SESSION['user_id'] ?? null;
        if ($id === null) {
            $user = null;
        } else {
            $stmt = pdo()->prepare('SELECT * FROM users WHERE id = ?');
            $stmt->execute([$id]);
            $user = $stmt->fetch() ?: null;
            if ($user === null) {
                unset($_SESSION['user_id']); // user deleted while session alive
            }
        }
    }
    return $user;
}

function login_user(int $userId): void
{
    session_regenerate_id(true);
    $_SESSION['user_id'] = $userId;
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    pdo()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$userId]);
}

function logout_user(): void
{
    $_SESSION = [];
    session_destroy();
}

/** Public-safe shape of a user row for API responses. */
function user_payload(array $user): array
{
    return [
        'id' => (int)$user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'phone' => $user['phone'],
        'is_admin' => (bool)$user['is_admin'],
        'leaderboard_opt_in' => (bool)$user['leaderboard_opt_in'],
        'avatar_hash' => md5(strtolower(trim($user['email']))),
    ];
}
