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

/** Gravatar hash — SHA-256 per current Gravatar spec (MD5 misses newer accounts). */
function avatar_hash(string $email): string
{
    return hash('sha256', strtolower(trim($email)));
}

/**
 * Consecutive-day streak of resource-reading activity, ending today or yesterday.
 * One missed calendar day resets it to 0.
 * ponytail: PHP walk over distinct dates; a few rows per user, server-TZ day boundary.
 */
function current_streak(int $userId): int
{
    $stmt = pdo()->prepare(
        'SELECT DISTINCT DATE(created_at) d FROM resource_reads WHERE user_id = ? ORDER BY d DESC'
    );
    $stmt->execute([$userId]);
    $days = $stmt->fetchAll(PDO::FETCH_COLUMN);
    if (!$days) {
        return 0;
    }
    $newest = new DateTimeImmutable($days[0]);
    if ((int)(new DateTimeImmutable('today'))->diff($newest)->days > 1) {
        return 0; // last activity older than yesterday → streak broken
    }
    $streak = 0;
    $expected = $newest; // start at today or yesterday, whichever is newest
    foreach ($days as $d) {
        if ($d !== $expected->format('Y-m-d')) {
            break;
        }
        $streak++;
        $expected = $expected->modify('-1 day');
    }
    return $streak;
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
        'email_verified' => $user['email_verified_at'] !== null,
        'avatar_hash' => avatar_hash($user['email']),
        'streak' => current_streak((int)$user['id']),
    ];
}
