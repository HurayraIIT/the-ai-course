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
    ['GET', '/admin/comments'],
    ['PUT', '/admin/comments/1'],
    ['GET', '/admin/activity'],
    ['GET', '/admin/emails'],
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

// Admin lock bypass: view any lesson, but progress mutations stay strict
$deep = test_pdo()->query('SELECT id, slug FROM lessons WHERE position = 100')->fetch();
[$s, $d] = $admin->get("/lessons/{$deep['slug']}");
check($s === 200 && $d['viewing_locked'] === true && $d['body_md'] !== '', 'admin can view a deep locked lesson');
$deepResource = test_pdo()->query("SELECT id FROM resources WHERE lesson_id = {$deep['id']} LIMIT 1")->fetchColumn();
if ($deepResource) {
    [$s] = $admin->request('POST', "/lessons/{$deep['id']}/resources/$deepResource/read");
    check($s === 403, 'admin resource-read beyond frontier still rejected');
}
$aliceClient = new Client();
$aliceClient->login('alice@example.com', 'adminset99');
[$s] = $aliceClient->get("/lessons/{$deep['slug']}");
check($s === 403, 'non-admin still locked out of deep lesson');

// Admin comments moderation
[$s, $d] = $aliceClient->request('POST', '/lessons/' . test_pdo()->query('SELECT id FROM lessons WHERE position = 1')->fetchColumn() . '/comments', ['body' => 'moderate me']);
$modId = $d['id'];
[$s, $d] = $admin->get('/admin/comments');
check($s === 200 && $d['total'] >= 1 && $d['comments'][0]['body'] === 'moderate me', 'admin comments list shows newest first');
check(isset($d['comments'][0]['lesson_slug'], $d['comments'][0]['username']), 'admin comments include lesson + author');
[$s] = $admin->request('PUT', "/admin/comments/$modId", ['body' => 'moderated']);
check($s === 200, 'admin can edit a comment');
[, $d] = $admin->get('/admin/comments');
check($d['comments'][0]['body'] === 'moderated', 'comment edit persisted');
[$s] = $admin->request('PUT', "/admin/comments/$modId", ['body' => '']);
check($s === 422, 'admin comment edit validates body');
[$s] = $admin->request('DELETE', "/comments/$modId");
check($s === 200, 'admin can delete any comment');

// Activity log
[$s, $d] = $admin->get('/admin/activity');
$actions = array_column($d['activity'], 'action');
check($s === 200 && in_array('registered', $actions, true) && in_array('commented', $actions, true), 'activity log records events');
check(in_array('completed_lesson', $actions, true) && in_array('read_resource', $actions, true), 'activity log includes progress events');

// Email log (reset email from test 02 was logged)
[$s, $d] = $admin->get('/admin/emails');
check($s === 200 && $d['total'] >= 1 && $d['emails'][0]['status'] === 'logged', 'email log captures outgoing mail');
check(preg_match('/token=|\d{6}/', $d['emails'][0]['body']) === 1, 'email log stores full body');
clear_rate_limits();
