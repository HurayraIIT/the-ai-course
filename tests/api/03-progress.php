<?php

declare(strict_types=1);

echo "== 03-progress\n";
clear_rate_limits();

// Guest outline: titles only, no flags, no body
$guest = new Client();
[$s, $d] = $guest->get('/outline');
check($s === 200 && $d['authenticated'] === false, 'guest outline works');
$firstLesson = $d['modules'][0]['lessons'][0];
check(!isset($firstLesson['unlocked']) && !isset($firstLesson['completed']), 'guest outline has no progress flags');
check(!isset($firstLesson['body_md']) && !isset($firstLesson['resources']), 'guest outline has no content');

$c = new Client();
$c->login('alice@example.com', 'secret123');

// Authed outline flags
[, $d] = $c->get('/outline');
check($d['authenticated'] === true && $d['completed_count'] === 0, 'authed outline shows zero progress');
$lessons = $d['modules'][0]['lessons'];
check($lessons[0]['unlocked'] === true && $lessons[1]['unlocked'] === false, 'only lesson 1 unlocked initially');

// Locked lesson content blocked
$lockedSlug = $lessons[1]['slug'];
[$s, $d] = $c->get("/lessons/$lockedSlug");
check($s === 403 && ($d['locked'] ?? false) === true, 'locked lesson returns 403 locked');

// Lesson 1 accessible
[$s, $lesson1] = $c->get('/lessons/' . $lessons[0]['slug']);
check($s === 200 && $lesson1['body_md'] !== '' && count($lesson1['resources']) > 0, 'lesson 1 accessible with content');

// Skip-ahead resource read rejected
$pdo = test_pdo();
$futureResource = $pdo->query(
    'SELECT r.id, r.lesson_id FROM resources r JOIN lessons l ON l.id = r.lesson_id WHERE l.position = 5 LIMIT 1'
)->fetch();
[$s] = $c->request('POST', "/lessons/{$futureResource['lesson_id']}/resources/{$futureResource['id']}/read");
check($s === 403, 'resource read on locked lesson rejected');

// Complete endpoint invalid for lessons with resources
[$s] = $c->request('POST', "/lessons/{$lesson1['id']}/complete");
check($s === 400, 'complete endpoint rejected for lesson with resources');

// Read all resources of lesson 1 -> completion
$completed = false;
foreach ($lesson1['resources'] as $resource) {
    [, $d] = $c->request('POST', "/lessons/{$lesson1['id']}/resources/{$resource['id']}/read");
    $completed = $d['lesson_completed'] ?? false;
}
check($completed, 'reading all resources completes the lesson');

[, $d] = $c->get('/outline');
check($d['completed_count'] === 1, 'outline reflects completion');
[$s] = $c->get("/lessons/$lockedSlug");
check($s === 200, 'lesson 2 unlocked after completing lesson 1');

// Re-reading a resource is idempotent
[$s, $d] = $c->request('POST', "/lessons/{$lesson1['id']}/resources/{$lesson1['resources'][0]['id']}/read");
check($s === 200, 're-reading a resource is fine');
[, $d] = $c->get('/outline');
check($d['completed_count'] === 1, 'no double-count on re-read');

// Zero-resource lesson: strip resources from the last lesson (every seeded lesson has
// resources now), fast-forward a dedicated user right up to it, then use the button
$zero = $pdo->query('SELECT id, position, slug FROM lessons ORDER BY position DESC LIMIT 1')->fetch();
$pdo->exec("DELETE FROM resources WHERE lesson_id = {$zero['id']}");
check($zero !== false, 'a zero-resource lesson exists');

clear_rate_limits();
$z = new Client();
$z->register('zeruser', 'zeruser@example.com');
$zid = (int)$pdo->query('SELECT id FROM users WHERE username = "zeruser"')->fetchColumn();
$pdo->exec(
    "INSERT INTO lesson_completions (user_id, lesson_id)
     SELECT $zid, id FROM lessons WHERE position < {$zero['position']}"
);

[$s, $d] = $z->get("/lessons/{$zero['slug']}");
check($s === 200 && $d['resources'] === [], 'zero-resource lesson reachable at frontier');
[$s, $d] = $z->request('POST', "/lessons/{$zero['id']}/complete");
check($s === 200 && $d['lesson_completed'] === true, 'mark-as-complete works for zero-resource lesson');
clear_rate_limits();
