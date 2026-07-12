<?php

declare(strict_types=1);

// CLI only: seeds modules/lessons/resources from database/curriculum.json + markdown files.
// Destructive to content tables; refuses to run over user progress unless --force.
if (PHP_SAPI !== 'cli') {
    exit(1);
}

require dirname(__DIR__) . '/app/bootstrap.php';

$pdo = pdo();

$progressRows = (int)$pdo->query('SELECT COUNT(*) FROM lesson_completions')->fetchColumn();
if ($progressRows > 0 && !in_array('--force', $argv, true)) {
    fwrite(STDERR, "Refusing to reseed: $progressRows lesson completions exist. Use --force to wipe content anyway.\n");
    exit(1);
}

$modules = json_decode(file_get_contents(dirname(__DIR__) . '/database/curriculum.json'), true);
if (!is_array($modules) || $modules === []) {
    fwrite(STDERR, "database/curriculum.json missing or empty. Run: npm run export:curriculum > database/curriculum.json\n");
    exit(1);
}

$contentDir = dirname(__DIR__) . '/src/content/topics';
$fileBySlug = [];
foreach (glob("$contentDir/*/*.md") as $file) {
    $fileBySlug[basename($file, '.md')] = $file;
}

$pdo->beginTransaction();
$pdo->exec('DELETE FROM resources');
$pdo->exec('DELETE FROM lessons');
$pdo->exec('DELETE FROM modules');

$insModule = $pdo->prepare('INSERT INTO modules (slug, position, title, description) VALUES (?, ?, ?, ?)');
$insLesson = $pdo->prepare(
    'INSERT INTO lessons (position, slug, module_slug, position_in_module, title, body_md) VALUES (?, ?, ?, ?, ?, ?)'
);
$insResource = $pdo->prepare(
    'INSERT INTO resources (lesson_id, position, type, title, url) VALUES (?, ?, ?, ?, ?)'
);

$position = 0;
$resourceCount = 0;
foreach ($modules as $mi => $module) {
    $insModule->execute([$module['slug'], $mi + 1, $module['title'], $module['description']]);
    foreach ($module['topics'] as $ti => $slug) {
        if (!isset($fileBySlug[$slug])) {
            fwrite(STDERR, "No markdown file for curriculum slug: $slug\n");
            exit(1);
        }
        $raw = file_get_contents($fileBySlug[$slug]);
        if (!preg_match('/\A---\s*\n(.*?)\n---\s*\n(.*)\z/s', $raw, $m)) {
            fwrite(STDERR, "Malformed frontmatter in {$fileBySlug[$slug]}\n");
            exit(1);
        }
        $meta = json_decode($m[1], true);
        if (!is_array($meta) || empty($meta['title'])) {
            fwrite(STDERR, "Invalid frontmatter JSON in {$fileBySlug[$slug]}\n");
            exit(1);
        }
        $insLesson->execute([++$position, $slug, $module['slug'], $ti + 1, $meta['title'], trim($m[2])]);
        $lessonId = (int)$pdo->lastInsertId();
        foreach ($meta['resources'] ?? [] as $ri => $res) {
            $insResource->execute([$lessonId, $ri + 1, $res['type'], $res['title'], $res['url']]);
            $resourceCount++;
        }
    }
}

$orphans = array_diff(array_keys($fileBySlug), array_merge(...array_map(fn($m) => $m['topics'], $modules)));
if ($orphans !== []) {
    fwrite(STDERR, 'Warning: markdown files not in curriculum: ' . implode(', ', $orphans) . "\n");
}

$pdo->commit();
echo "Seeded " . count($modules) . " modules, $position lessons, $resourceCount resources\n";
