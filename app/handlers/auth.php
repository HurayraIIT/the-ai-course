<?php

declare(strict_types=1);

function handle_me(?array $user): void
{
    json_response([
        'user' => $user ? user_payload($user) : null,
        'csrf' => $_SESSION['csrf'],
    ]);
}

function handle_register(): void
{
    rate_limit('register', client_ip(), 3, 3600);
    $body = read_json_body();

    $username = require_field($body, 'username', 50);
    $email = strtolower(require_field($body, 'email'));
    $phone = require_field($body, 'phone', 32);
    $password = (string)($body['password'] ?? '');

    if (!preg_match('/^[a-zA-Z0-9_-]{3,50}$/', $username)) {
        json_error('Username must be 3-50 characters: letters, numbers, hyphens, underscores', 422);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_error('Invalid email address', 422);
    }
    if (!preg_match('/^\+?[0-9 ()-]{7,31}$/', $phone)) {
        json_error('Invalid phone number', 422);
    }
    if (strlen($password) < 8) {
        json_error('Password must be at least 8 characters', 422);
    }

    $stmt = pdo()->prepare('SELECT username, email FROM users WHERE username = ? OR email = ?');
    $stmt->execute([$username, $email]);
    foreach ($stmt->fetchAll() as $existing) {
        if (strcasecmp($existing['username'], $username) === 0) {
            json_error('Username is already taken', 409);
        }
        if (strcasecmp($existing['email'], $email) === 0) {
            json_error('Email is already registered', 409);
        }
    }

    pdo()->prepare('INSERT INTO users (username, email, phone, password_hash) VALUES (?, ?, ?, ?)')
        ->execute([$username, $email, $phone, password_hash($password, PASSWORD_DEFAULT)]);
    $id = (int)pdo()->lastInsertId();
    login_user($id);

    $stmt = pdo()->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['user' => user_payload($stmt->fetch()), 'csrf' => $_SESSION['csrf']], 201);
}

function handle_login(): void
{
    $body = read_json_body();
    $email = strtolower(trim((string)($body['email'] ?? '')));
    $password = (string)($body['password'] ?? '');

    rate_limit('login', client_ip(), 5, 900);
    rate_limit('login', 'email:' . $email, 5, 900);

    $stmt = pdo()->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        json_error('Invalid email or password', 401);
    }

    login_user((int)$user['id']);
    json_response(['user' => user_payload($user), 'csrf' => $_SESSION['csrf']]);
}

function handle_logout(): void
{
    logout_user();
    json_response(['ok' => true]);
}

function handle_forgot_password(): void
{
    rate_limit('forgot', client_ip(), 3, 3600);
    $body = read_json_body();
    $email = strtolower(trim((string)($body['email'] ?? '')));

    $stmt = pdo()->prepare('SELECT id, username FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        $token = bin2hex(random_bytes(32));
        pdo()->prepare(
            'INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, NOW() + INTERVAL 60 MINUTE)'
        )->execute([(int)$user['id'], hash('sha256', $token)]);

        $link = rtrim(env('APP_URL'), '/') . '/reset-password?token=' . $token;
        $username = htmlspecialchars($user['username'], ENT_QUOTES);
        send_mail(
            $email,
            'Reset your password — The AI Course',
            "<p>Hi $username,</p><p><a href=\"$link\">Reset your password</a> (valid for 60 minutes).</p>" .
            '<p>If you did not request this, you can ignore this email.</p>'
        );
    }

    // Always 200: no account enumeration.
    json_response(['ok' => true]);
}

function handle_reset_password(): void
{
    $body = read_json_body();
    $token = (string)($body['token'] ?? '');
    $password = (string)($body['password'] ?? '');

    if (strlen($password) < 8) {
        json_error('Password must be at least 8 characters', 422);
    }

    $stmt = pdo()->prepare(
        'SELECT * FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW()'
    );
    $stmt->execute([hash('sha256', $token)]);
    $reset = $stmt->fetch();
    if (!$reset) {
        json_error('Invalid or expired reset link', 400);
    }

    $pdo = pdo();
    $pdo->beginTransaction();
    $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
        ->execute([password_hash($password, PASSWORD_DEFAULT), (int)$reset['user_id']]);
    $pdo->prepare('UPDATE password_resets SET used_at = NOW() WHERE id = ?')->execute([(int)$reset['id']]);
    $pdo->commit();

    json_response(['ok' => true]);
}
