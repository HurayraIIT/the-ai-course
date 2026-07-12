<?php

declare(strict_types=1);

echo "== 02-reset\n";
clear_rate_limits();

$c = new Client();
$c->bootstrap();

// Unknown email still 200 (no enumeration)
[$s] = $c->request('POST', '/auth/forgot-password', ['email' => 'ghost@example.com']);
check($s === 200, 'forgot-password returns 200 for unknown email');

[$s] = $c->request('POST', '/auth/forgot-password', ['email' => 'alice@example.com']);
check($s === 200, 'forgot-password returns 200 for known email');

$token = latest_mail_token('reset-password');
check($token !== null, 'reset email logged with token');

// Weak password rejected, token stays valid
[$s] = $c->request('POST', '/auth/reset-password', ['token' => $token, 'password' => 'short']);
check($s === 422, 'reset rejects short password');

[$s] = $c->request('POST', '/auth/reset-password', ['token' => $token, 'password' => 'brandnew123']);
check($s === 200, 'reset with valid token works');

[$s] = $c->request('POST', '/auth/reset-password', ['token' => $token, 'password' => 'again12345']);
check($s === 400, 'token reuse rejected');

[$s] = $c->request('POST', '/auth/reset-password', ['token' => str_repeat('0', 64), 'password' => 'whatever123']);
check($s === 400, 'bogus token rejected');

clear_rate_limits();
$c2 = new Client();
[$s] = $c2->login('alice@example.com', 'secret123');
check($s === 401, 'old password no longer works');
[$s] = $c2->login('alice@example.com', 'brandnew123');
check($s === 200, 'new password works');

// Restore alice's original password for later tests
$c2->request('PUT', '/profile/password', ['current_password' => 'brandnew123', 'new_password' => 'secret123']);
clear_rate_limits();
