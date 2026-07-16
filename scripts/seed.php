<?php

declare(strict_types=1);

// CLI only: seeds modules/lessons/resources from database/curriculum.json + markdown files.
// Non-destructive: lessons upsert by slug so ids — and therefore completions, resource
// reads, and comments — survive reseeding. Resources match by URL within a lesson; a
// changed URL counts as new content and resets its read marks. Lessons and modules
// removed from the curriculum are deleted, cascading their progress rows.
if (PHP_SAPI !== 'cli') {
    exit(1);
}

require dirname(__DIR__) . '/app/bootstrap.php';

$pdo = pdo();

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

// Parse and validate all content before touching the database.
$lessonRows = []; // slug => [module_slug, title, sources, body, resources]
foreach ($modules as $module) {
    foreach ($module['topics'] as $slug) {
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
        $lessonRows[$slug] = [
            'module_slug' => $module['slug'],
            'title' => $meta['title'],
            'sources' => implode(',', $meta['sources'] ?? []),
            'body' => trim($m[2]),
            'resources' => $meta['resources'] ?? [],
        ];
    }
}

$pdo->beginTransaction();

// Park existing positions far away so reordering can't collide with UNIQUE constraints mid-update.
$pdo->exec('UPDATE modules SET position = position + 100000');
$pdo->exec('UPDATE lessons SET position = position + 100000');

$upModule = $pdo->prepare(
    'INSERT INTO modules (slug, position, title, description) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE position = VALUES(position), title = VALUES(title), description = VALUES(description)'
);
$upLesson = $pdo->prepare(
    'INSERT INTO lessons (position, slug, module_slug, position_in_module, title, sources, body_md)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE position = VALUES(position), module_slug = VALUES(module_slug),
       position_in_module = VALUES(position_in_module), title = VALUES(title),
       sources = VALUES(sources), body_md = VALUES(body_md)'
);
$lessonIdBySlug = $pdo->prepare('SELECT id FROM lessons WHERE slug = ?');
$selResources = $pdo->prepare('SELECT id, url FROM resources WHERE lesson_id = ?');
$updResource = $pdo->prepare('UPDATE resources SET position = ?, type = ?, title = ? WHERE id = ?');
$insResource = $pdo->prepare('INSERT INTO resources (lesson_id, position, type, title, url) VALUES (?, ?, ?, ?, ?)');

foreach ($modules as $mi => $module) {
    $upModule->execute([$module['slug'], $mi + 1, $module['title'], $module['description']]);
}

$position = 0;
$resourceCount = 0;
foreach ($modules as $module) {
    foreach ($module['topics'] as $ti => $slug) {
        $row = $lessonRows[$slug];
        $upLesson->execute([++$position, $slug, $row['module_slug'], $ti + 1, $row['title'], $row['sources'], $row['body']]);
        $lessonIdBySlug->execute([$slug]);
        $lessonId = (int)$lessonIdBySlug->fetchColumn();

        // Sync resources by URL: same URL updates in place (read marks survive),
        // new URL inserts, vanished URL deletes (cascading its reads).
        $selResources->execute([$lessonId]);
        $existingByUrl = [];
        foreach ($selResources->fetchAll() as $r) {
            $existingByUrl[$r['url']][] = (int)$r['id'];
        }
        foreach ($row['resources'] as $ri => $res) {
            $resourceCount++;
            if (!empty($existingByUrl[$res['url']])) {
                $updResource->execute([$ri + 1, $res['type'], $res['title'], array_shift($existingByUrl[$res['url']])]);
            } else {
                $insResource->execute([$lessonId, $ri + 1, $res['type'], $res['title'], $res['url']]);
            }
        }
        foreach ($existingByUrl as $ids) {
            foreach ($ids as $id) {
                $pdo->prepare('DELETE FROM resources WHERE id = ?')->execute([$id]);
            }
        }
    }
}

// Remove lessons (then modules) dropped from the curriculum; their progress rows cascade.
$slugs = array_keys($lessonRows);
$in = implode(',', array_fill(0, count($slugs), '?'));
$stmt = $pdo->prepare("DELETE FROM lessons WHERE slug NOT IN ($in)");
$stmt->execute($slugs);
$removedLessons = $stmt->rowCount();

$moduleSlugs = array_column($modules, 'slug');
$in = implode(',', array_fill(0, count($moduleSlugs), '?'));
$pdo->prepare("DELETE FROM modules WHERE slug NOT IN ($in)")->execute($moduleSlugs);

$orphans = array_diff(array_keys($fileBySlug), $slugs);
if ($orphans !== []) {
    fwrite(STDERR, 'Warning: markdown files not in curriculum: ' . implode(', ', $orphans) . "\n");
}

$pdo->commit();
echo "Seeded " . count($modules) . " modules, $position lessons, $resourceCount resources"
    . ($removedLessons ? " (removed $removedLessons stale lessons)" : '') . "\n";
