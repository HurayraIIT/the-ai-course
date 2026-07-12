<?php

declare(strict_types=1);

echo "== 01-auth\n";
clear_rate_limits();

$c = new Client();

// Validation
[$s, $d] = $c->bootstrap() + [];
check($s === 200 && $d['user'] === null && $d['csrf'] !== '', 'guest /me returns null user + csrf');

$c->bootstrap();
[$s] = $c->request('POST', '/auth/register', ['username' => 'x', 'email' => 'a@b.com', 'phone' => '+8801700000000', 'password' => 'secret123']);
check($s === 422, 'register rejects short username');
[$s] = $c->request('POST', '/auth/register', ['username' => 'valid_user', 'email' => 'not-an-email', 'phone' => '+8801700000000', 'password' => 'secret123']);
check($s === 422, 'register rejects bad email');
clear_rate_limits();
[$s] = $c->request('POST', '/auth/register', ['username' => 'valid_user', 'email' => 'a@b.com', 'phone' => 'abc', 'password' => 'secret123']);
check($s === 422, 'register rejects bad phone');
[$s] = $c->request('POST', '/auth/register', ['username' => 'valid_user', 'email' => 'a@b.com', 'phone' => '+8801700000000', 'password' => 'short']);
check($s === 422, 'register rejects short password');

// Successful registration logs in
clear_rate_limits();
[$s, $d] = $c->register('alice', 'alice@example.com');
check($s === 201 && $d['user']['username'] === 'alice', 'register creates and logs in');
[$s, $d] = $c->get('/me');
check($d['user']['username'] === 'alice', 'session persists after register');

// Duplicates
$c2 = new Client();
clear_rate_limits();
[$s, $d] = $c2->register('alice', 'other@example.com');
check($s === 409 && str_contains($d['error'], 'Username'), 'duplicate username rejected');
clear_rate_limits();
[$s, $d] = $c2->register('alice2', 'alice@example.com');
check($s === 409 && str_contains($d['error'], 'Email'), 'duplicate email rejected');

// CSRF
$c3 = new Client();
$c3->bootstrap();
$c3->csrf = 'wrong-token';
[$s] = $c3->request('POST', '/auth/login', ['email' => 'alice@example.com', 'password' => 'secret123']);
check($s === 403, 'mutation with bad CSRF token rejected');

// Login
clear_rate_limits();
$c4 = new Client();
[$s] = $c4->login('alice@example.com', 'wrongpass');
check($s === 401, 'wrong password rejected');
[$s] = $c4->login('nobody@example.com', 'whatever1');
check($s === 401, 'unknown email rejected');
[$s, $d] = $c4->login('alice@example.com', 'secret123');
check($s === 200 && $d['user']['username'] === 'alice', 'correct login works');

// Logout
[$s] = $c4->request('POST', '/auth/logout');
check($s === 200, 'logout works');
[, $d] = $c4->bootstrap();
check($d['user'] === null, 'session gone after logout');

// Auth-required endpoint
[$s] = $c4->get('/lessons/introduction');
check($s === 401, 'lesson requires auth');

// Rate limiting: 5 login attempts per window, 6th blocked
clear_rate_limits();
$c5 = new Client();
for ($i = 0; $i < 5; $i++) {
    $c5->login('ratelimit@example.com', 'wrongpass');
}
[$s] = $c5->login('ratelimit@example.com', 'wrongpass');
check($s === 429, 'login rate limit kicks in after 5 attempts');
clear_rate_limits();

// --- Email verification flow ---
$v = new Client();
[$s, $d] = $v->register_unverified('verifyme', 'verifyme@example.com');
check($s === 201 && $d['user']['email_verified'] === false, 'new user starts unverified');

$verifyToken = latest_mail_token('verify-email');
check($verifyToken !== null, 'verification email logged with token');

// Gated until verified
$resource = test_pdo()->query(
    'SELECT r.id, r.lesson_id FROM resources r JOIN lessons l ON l.id = r.lesson_id WHERE l.position = 1 LIMIT 1'
)->fetch();
[$s, $d] = $v->request('POST', "/lessons/{$resource['lesson_id']}/resources/{$resource['id']}/read");
check($s === 403 && ($d['needs_verification'] ?? false) === true, 'progress blocked until verified');
[$s, $d] = $v->request('POST', "/lessons/{$resource['lesson_id']}/comments", ['body' => 'hi']);
check($s === 403 && ($d['needs_verification'] ?? false) === true, 'commenting blocked until verified');

// Resend issues a fresh, working token
[$s] = $v->request('POST', '/auth/resend-verification');
check($s === 200, 'resend verification works');
$resentToken = latest_mail_token('verify-email');
check($resentToken !== null && $resentToken !== $verifyToken, 'resend issues a new token');

[$s] = $v->request('POST', '/auth/verify-email', ['token' => $resentToken]);
check($s === 200, 'verify with token works');
[, $d] = $v->bootstrap();
check($d['user']['email_verified'] === true, 'user shows verified after verifying');

[$s] = $v->request('POST', '/auth/verify-email', ['token' => $resentToken]);
check($s === 400, 'verification token reuse rejected');
[$s] = $v->request('POST', '/auth/resend-verification');
check($s === 400, 'resend rejected once verified');

[$s, $d] = $v->request('POST', "/lessons/{$resource['lesson_id']}/resources/{$resource['id']}/read");
check($s === 200, 'progress works after verification');
clear_rate_limits();
