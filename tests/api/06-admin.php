<?php

declare(strict_types=1);

echo "== 06-admin\n";
clear_rate_limits();

// Every admin route must 403 for a normal user
$alice = new Client();
$alice->login('alice@example.com', 'secret123');
$aliceId = (int)test_pdo()->query('SELECT id FROM users WHERE username = "alice"')->fetchColumn();

$adminRoutes = [
    ['GET', '/admin/users'],
    ['GET', "/admin/users/$aliceId"],
    ['PUT', "/admin/users/$aliceId"],
    ['POST', "/admin/users/$aliceId/reset-progress"],
    ['POST', "/admin/users/$aliceId/reset-password"],
    ['DELETE', "/admin/users/$aliceId"],
    ['GET', '/admin/analytics'],
];
$allBlocked = true;
foreach ($adminRoutes as [$method, $path]) {
    [$s] = $alice->request($method, $path, []);
    if ($s !== 403) {
        $allBlocked = false;
        echo "      not blocked: $method $path -> $s\n";
    }
}
check($allBlocked, 'all admin routes 403 for non-admin');

// Admin session
clear_rate_limits();
$admin = new Client();
[$s, $d] = $admin->login('hurayraiit+admin@gmail.com', 'Pass1234@@');
check($s === 200 && $d['user']['is_admin'] === true, 'admin login works');

// List + search
[$s, $d] = $admin->get('/admin/users');
check($s === 200 && $d['total'] >= 5, 'user list loads');
[$s, $d] = $admin->get('/admin/users?q=alice');
check(count($d['users']) === 1 && $d['users'][0]['username'] === 'alice', 'search finds alice');

// Detail with completion dates
[$s, $d] = $admin->get("/admin/users/$aliceId");
check($s === 200 && count($d['completions']) === 1 && isset($d['completions'][0]['completed_at']), 'detail shows completion dates');

// Edit profile
[$s] = $admin->request('PUT', "/admin/users/$aliceId", [
    'username' => 'alice',
    'email' => 'alice@example.com',
    'phone' => '+8801799999999',
    'leaderboard_opt_in' => true,
]);
check($s === 200, 'admin can edit profile');
[, $d] = $admin->get("/admin/users/$aliceId");
check($d['user']['phone'] === '+8801799999999', 'edit persisted');

// Duplicate username rejected
[$s] = $admin->request('PUT', "/admin/users/$aliceId", [
    'username' => 'bob',
    'email' => 'alice@example.com',
    'phone' => '+8801799999999',
    'leaderboard_opt_in' => true,
]);
check($s === 409, 'admin edit rejects duplicate username');

// Reset password
[$s] = $admin->request('POST', "/admin/users/$aliceId/reset-password", ['password' => 'adminset99']);
check($s === 200, 'admin password reset works');
clear_rate_limits();
$aliceRelog = new Client();
[$s] = $aliceRelog->login('alice@example.com', 'adminset99');
check($s === 200, 'user can login with admin-set password');

// Reset progress
[$s] = $admin->request('POST', "/admin/users/$aliceId/reset-progress");
check($s === 200, 'admin progress reset works');
[, $d] = $admin->get("/admin/users/$aliceId");
check($d['completions'] === [], 'progress cleared');

// Cannot delete self
$adminId = (int)test_pdo()->query('SELECT id FROM users WHERE is_admin = 1 LIMIT 1')->fetchColumn();
[$s] = $admin->request('DELETE', "/admin/users/$adminId");
check($s === 400, 'admin cannot delete self');

// Delete a user (bob) — cascades
$bobId = (int)test_pdo()->query('SELECT id FROM users WHERE username = "bob"')->fetchColumn();
[$s] = $admin->request('DELETE', "/admin/users/$bobId");
check($s === 200, 'admin can delete user');
check((int)test_pdo()->query("SELECT COUNT(*) FROM users WHERE id = $bobId")->fetchColumn() === 0, 'user row gone');

// Analytics shape
[$s, $d] = $admin->get('/admin/analytics');
check(
    $s === 200
    && isset($d['total_users'], $d['active_users_7d'], $d['signups_by_day'], $d['top_lessons'], $d['completion_funnel']),
    'analytics returns expected shape'
);
clear_rate_limits();
