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

// Successful registration requires OTP verification before any session exists
clear_rate_limits();
[$s, $d] = $c->register('alice', 'alice@example.com');
check($s === 201 && ($d['verification_required'] ?? false) === true, 'register accepted, verification required');
[$s, $d] = $c->get('/me');
check($d['user']['username'] === 'alice', 'session established after verify + login');

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

// --- OTP verification flow ---
$v = new Client();
[$s, $d] = $v->register_unverified('verifyme', 'verifyme@example.com');
check($s === 201 && ($d['verification_required'] ?? false) === true, 'register returns verification_required');
[, $d] = $v->bootstrap();
check($d['user'] === null, 'no session after register');

[$s, $d] = $v->login('verifyme@example.com', 'secret123');
check($s === 403 && ($d['needs_verification'] ?? false) === true, 'login blocked until verified');

$otp = latest_mail_otp();
check($otp !== null, 'OTP email logged');

[$s] = $v->request('POST', '/auth/verify-otp', ['email' => 'verifyme@example.com', 'otp' => '000000']);
check($s === 400, 'wrong OTP rejected');

// Resend replaces the active code
clear_rate_limits();
[$s] = $v->request('POST', '/auth/resend-otp', ['email' => 'verifyme@example.com']);
check($s === 200, 'resend OTP works');
[$s] = $v->request('POST', '/auth/resend-otp', ['email' => 'ghost@example.com']);
check($s === 200, 'resend for unknown email still 200 (no enumeration)');
$otp = latest_mail_otp();

[$s, $d] = $v->request('POST', '/auth/verify-otp', ['email' => 'verifyme@example.com', 'otp' => $otp]);
check($s === 200 && $d['user']['email_verified'] === true, 'correct OTP verifies and logs in');
[, $d] = $v->bootstrap();
check($d['user']['username'] === 'verifyme', 'session established by OTP');

[$s] = $v->request('POST', '/auth/verify-otp', ['email' => 'verifyme@example.com', 'otp' => $otp]);
check($s === 400, 'OTP reuse rejected');

[$s] = $v->login('verifyme@example.com', 'secret123');
check($s === 200, 'login works after verification');

// Guessing protection: 5 attempts per email, then 429
clear_rate_limits();
$w = new Client();
$w->register_unverified('otplimit', 'otplimit@example.com');
for ($i = 0; $i < 5; $i++) {
    $w->request('POST', '/auth/verify-otp', ['email' => 'otplimit@example.com', 'otp' => '000000']);
}
[$s] = $w->request('POST', '/auth/verify-otp', ['email' => 'otplimit@example.com', 'otp' => '000000']);
check($s === 429, 'OTP attempts rate limited');
clear_rate_limits();
