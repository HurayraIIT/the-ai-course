<?php

declare(strict_types=1);

echo "== 04-comments\n";
clear_rate_limits();

$alice = new Client();
$alice->login('alice@example.com', 'secret123');
[, $outline] = $alice->get('/outline');
$slug = $outline['modules'][0]['lessons'][0]['slug'];
[, $lesson] = $alice->get("/lessons/$slug");
$lid = $lesson['id'];

// Validation
[$s] = $alice->request('POST', "/lessons/$lid/comments", ['body' => '   ']);
check($s === 422, 'blank comment rejected');
[$s] = $alice->request('POST', "/lessons/$lid/comments", ['body' => str_repeat('a', 2001)]);
check($s === 422, 'over-long comment rejected');

[$s, $d] = $alice->request('POST', "/lessons/$lid/comments", ['body' => "Hello <script>alert(1)</script>"]);
check($s === 201, 'comment created');
$cid = $d['id'];

[, $d] = $alice->get("/lessons/$lid/comments");
$comment = end($d['comments']);
check($comment['body'] === "Hello <script>alert(1)</script>", 'body stored verbatim (escaping is render-side)');
check($comment['is_mine'] === true && $comment['username'] === 'alice', 'comment attribution correct');

// Reactions
[$s] = $alice->request('PUT', "/comments/$cid/reaction", ['reaction' => 'up']);
check($s === 200, 'thumbs up works');
[, $d] = $alice->get("/lessons/$lid/comments");
$comment = end($d['comments']);
check($comment['ups'] === 1 && $comment['my_reaction'] === 'up', 'reaction counted');

[$s] = $alice->request('PUT', "/comments/$cid/reaction", ['reaction' => 'down']);
[, $d] = $alice->get("/lessons/$lid/comments");
$comment = end($d['comments']);
check($comment['ups'] === 0 && $comment['downs'] === 1, 'switching reaction replaces it');

[$s] = $alice->request('PUT', "/comments/$cid/reaction", ['reaction' => null]);
[, $d] = $alice->get("/lessons/$lid/comments");
$comment = end($d['comments']);
check($comment['downs'] === 0 && $comment['my_reaction'] === null, 'removing reaction works');

[$s] = $alice->request('PUT', "/comments/$cid/reaction", ['reaction' => 'sideways']);
check($s === 422, 'invalid reaction rejected');

// Another user cannot delete alice's comment
clear_rate_limits();
$bob = new Client();
$bob->register('bob', 'bob@example.com');
[$s] = $bob->request('DELETE', "/comments/$cid");
check($s === 403, "cannot delete someone else's comment");

// Bob cannot comment on a lesson he has not unlocked... lesson 1 is his frontier, so allowed.
// But a locked lesson is not:
$locked = test_pdo()->query('SELECT id FROM lessons WHERE position = 10')->fetchColumn();
[$s] = $bob->request('POST', "/lessons/$locked/comments", ['body' => 'sneaky']);
check($s === 403, 'cannot comment on locked lesson');

// Owner delete
[$s] = $alice->request('DELETE', "/comments/$cid");
check($s === 200, 'owner can delete own comment');
[, $d] = $alice->get("/lessons/$lid/comments");
check(array_filter($d['comments'], fn($x) => $x['id'] === $cid) === [], 'comment gone after delete');
clear_rate_limits();
