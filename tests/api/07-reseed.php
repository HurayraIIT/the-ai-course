<?php

declare(strict_types=1);

// Reseeding over live data must preserve user progress: lessons upsert by slug,
// so completions, resource reads, comments, and reactions keep their rows.
echo "== 07-reseed\n";
clear_rate_limits();

$u = new Client();
$u->register('reseeduser', 'reseeduser@example.com');

[, $outline] = $u->get('/outline');
$first = $outline['modules'][0]['lessons'][0];
[, $lesson] = $u->get("/lessons/{$first['slug']}");
foreach ($lesson['resources'] as $r) {
    $u->request('POST', "/lessons/{$lesson['id']}/resources/{$r['id']}/read");
}
[$s, $d] = $u->request('POST', "/lessons/{$lesson['id']}/comments", ['body' => 'still here after reseed']);
check($s === 201, 'setup: comment created');
$commentId = $d['id'];
$u->request('PUT', "/comments/$commentId/reaction", ['reaction' => 'up']);

[, $before] = $u->get('/outline');
check($before['completed_count'] === 1, 'setup: lesson 1 completed');

exec('php ' . escapeshellarg(dirname(__DIR__, 2) . '/scripts/seed.php') . ' 2>&1', $out, $code);
check($code === 0, 'reseed over live progress exits 0: ' . implode(' ', $out));

[, $after] = $u->get('/outline');
check($after['completed_count'] === 1, 'completion survives reseed');
check($after['total_lessons'] === $before['total_lessons'], 'lesson count unchanged');

[$s, $lesson] = $u->get("/lessons/{$first['slug']}");
check($s === 200 && $lesson['completed'] === true, 'lesson still completed');
check(!in_array(false, array_column($lesson['resources'], 'read'), true), 'resource reads survive reseed');

[, $d] = $u->get("/lessons/{$lesson['id']}/comments");
$mine = array_values(array_filter($d['comments'], fn($c) => $c['id'] === $commentId));
check($mine !== [] && $mine[0]['body'] === 'still here after reseed', 'comment survives reseed');
check(($mine[0]['ups'] ?? 0) === 1 && ($mine[0]['my_reaction'] ?? null) === 'up', 'reaction survives reseed');
