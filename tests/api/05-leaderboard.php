<?php

declare(strict_types=1);

echo "== 05-leaderboard\n";
clear_rate_limits();

$pdo = test_pdo();

// Two fresh users with controlled completion history for deterministic ranking
$c1 = new Client();
$c1->register('carol', 'carol@example.com');
clear_rate_limits();
$c2 = new Client();
$c2->register('dave', 'dave@example.com');

$carolId = (int)$pdo->query('SELECT id FROM users WHERE username = "carol"')->fetchColumn();
$daveId = (int)$pdo->query('SELECT id FROM users WHERE username = "dave"')->fetchColumn();
$lessonIds = $pdo->query('SELECT id FROM lessons ORDER BY position LIMIT 2')->fetchAll(PDO::FETCH_COLUMN);

// Carol: 2 lessons, finished earlier. Dave: 2 lessons, finished later.
$pdo->exec("DELETE FROM lesson_completions WHERE user_id IN ($carolId, $daveId)");
$pdo->exec("INSERT INTO lesson_completions (user_id, lesson_id, completed_at) VALUES
  ($carolId, {$lessonIds[0]}, NOW() - INTERVAL 2 HOUR),
  ($carolId, {$lessonIds[1]}, NOW() - INTERVAL 1 HOUR),
  ($daveId, {$lessonIds[0]}, NOW() - INTERVAL 50 MINUTE),
  ($daveId, {$lessonIds[1]}, NOW() - INTERVAL 10 MINUTE)");

[$s, $d] = $c1->get('/leaderboard');
check($s === 200, 'leaderboard loads');
$rows = $d['leaderboard'];
$usernames = array_column($rows, 'username');
$carolPos = array_search('carol', $usernames, true);
$davePos = array_search('dave', $usernames, true);
check($carolPos !== false && $davePos !== false && $carolPos < $davePos, 'tie broken by earliest to reach count');
check(!isset($rows[0]['email']) && isset($rows[0]['avatar_hash']), 'no emails leaked, avatar hash present');
$meRow = $rows[$carolPos];
check($meRow['is_me'] === true, 'is_me flag set');

// Opt out removes from leaderboard
[$s] = $c1->request('PUT', '/profile', ['username' => 'carol', 'phone' => '+8801700000000', 'leaderboard_opt_in' => false]);
check($s === 200, 'opt-out saved');
[, $d] = $c2->get('/leaderboard');
check(!in_array('carol', array_column($d['leaderboard'], 'username'), true), 'opted-out user hidden');

// Opt back in
$c1->request('PUT', '/profile', ['username' => 'carol', 'phone' => '+8801700000000', 'leaderboard_opt_in' => true]);
[, $d] = $c2->get('/leaderboard');
check(in_array('carol', array_column($d['leaderboard'], 'username'), true), 'opt back in restores visibility');

// Guest cannot see leaderboard
$guest = new Client();
[$s] = $guest->get('/leaderboard');
check($s === 401, 'leaderboard requires auth');
clear_rate_limits();
