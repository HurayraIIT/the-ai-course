<?php

declare(strict_types=1);

function handle_me(?array $user): void
{
    json_response([
        'user' => $user ? user_payload($user) : null,
        'csrf' => $_SESSION['csrf'],
    ]);
}

/**
 * Issues a fresh 6-digit OTP (invalidating any previous one) and emails it.
 * Hash is keyed by user id so identical codes can never verify another account.
 */
function send_verification_otp(int $userId, string $username, string $email): bool
{
    $otp = (string)random_int(100000, 999999);
    $pdo = pdo();
    $pdo->prepare('DELETE FROM email_verifications WHERE user_id = ?')->execute([$userId]);
    $pdo->prepare(
        'INSERT INTO email_verifications (user_id, token_hash, expires_at) VALUES (?, ?, NOW() + INTERVAL 15 MINUTE)'
    )->execute([$userId, hash('sha256', $userId . ':' . $otp)]);

    $safeName = htmlspecialchars($username, ENT_QUOTES);
    return send_mail(
        $email,
        'Your verification code — The AI Course',
        "<p>Hi $safeName,</p>" .
        '<p>Your verification code is:</p>' .
        "<p style=\"font-size:28px;font-weight:bold;letter-spacing:4px\">$otp</p>" .
        '<p>It expires in 15 minutes. If you did not create this account, you can ignore this email.</p>' .
        '<p style="color:#666;font-size:13px">Not seeing this email in your inbox? Please check your spam or junk folder.</p>'
    );
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
    log_activity($id, $username, 'registered');
    send_verification_otp($id, $username, $email);

    // No session yet — the user logs in by submitting the emailed OTP.
    json_response(['verification_required' => true, 'email' => $email], 201);
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
    if ($user['email_verified_at'] === null) {
        json_error('Please verify your email address first', 403, [
            'needs_verification' => true,
            'email' => $user['email'],
        ]);
    }

    login_user((int)$user['id']);
    json_response(['user' => user_payload($user), 'csrf' => $_SESSION['csrf']]);
}

function handle_verify_otp(): void
{
    $body = read_json_body();
    $email = strtolower(trim((string)($body['email'] ?? '')));
    $otp = trim((string)($body['otp'] ?? ''));

    // Attempt limit is what keeps a 6-digit code safe from guessing.
    rate_limit('verify-otp', client_ip(), 10, 900);
    rate_limit('verify-otp', 'email:' . $email, 5, 900);

    $stmt = pdo()->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if (!$user) {
        json_error('Invalid or expired code', 400);
    }
    if ($user['email_verified_at'] !== null) {
        json_error('This email is already verified — just log in', 400);
    }

    $stmt = pdo()->prepare(
        'SELECT * FROM email_verifications
         WHERE user_id = ? AND token_hash = ? AND used_at IS NULL AND expires_at > NOW()'
    );
    $stmt->execute([(int)$user['id'], hash('sha256', $user['id'] . ':' . $otp)]);
    $verification = $stmt->fetch();
    if (!$verification) {
        json_error('Invalid or expired code', 400);
    }

    $pdo = pdo();
    $pdo->beginTransaction();
    $pdo->prepare('UPDATE users SET email_verified_at = NOW() WHERE id = ?')->execute([(int)$user['id']]);
    $pdo->prepare('UPDATE email_verifications SET used_at = NOW() WHERE id = ?')
        ->execute([(int)$verification['id']]);
    $pdo->commit();

    log_activity((int)$user['id'], $user['username'], 'verified_email');
    login_user((int)$user['id']);

    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([(int)$user['id']]);
    json_response(['user' => user_payload($stmt->fetch()), 'csrf' => $_SESSION['csrf']]);
}

function handle_resend_otp(): void
{
    $email = strtolower(trim((string)(read_json_body()['email'] ?? '')));
    rate_limit('resend-otp', client_ip(), 3, 3600);
    rate_limit('resend-otp', 'email:' . $email, 3, 3600);

    $stmt = pdo()->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && $user['email_verified_at'] === null) {
        send_verification_otp((int)$user['id'], $user['username'], $user['email']);
    }

    // Always 200: no account enumeration.
    json_response(['ok' => true]);
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

    $stmt = $pdo->prepare('SELECT username FROM users WHERE id = ?');
    $stmt->execute([(int)$reset['user_id']]);
    log_activity((int)$reset['user_id'], (string)$stmt->fetchColumn(), 'changed_password', 'via reset link');

    json_response(['ok' => true]);
}
