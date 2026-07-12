<?php

declare(strict_types=1);

// CLI only: creates the database if missing, applies schema.sql, seeds the admin user.
if (PHP_SAPI !== 'cli') {
    exit(1);
}

require dirname(__DIR__) . '/app/bootstrap.php';

$host = env('DB_HOST', '127.0.0.1');
$port = env('DB_PORT', '3306');
$name = env('DB_DATABASE');
$root = new PDO("mysql:host=$host;port=$port;charset=utf8mb4", env('DB_USERNAME'), env('DB_PASSWORD'), [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);
$root->exec("CREATE DATABASE IF NOT EXISTS `$name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
echo "Database `$name` ready\n";

pdo()->exec(file_get_contents(dirname(__DIR__) . '/database/schema.sql'));

// Columns added after the initial release (CREATE TABLE IF NOT EXISTS won't add them).
$hasSources = pdo()->prepare(
    'SELECT COUNT(*) FROM information_schema.columns
     WHERE table_schema = ? AND table_name = "lessons" AND column_name = "sources"'
);
$hasSources->execute([$name]);
if ((int)$hasSources->fetchColumn() === 0) {
    pdo()->exec('ALTER TABLE lessons ADD COLUMN sources VARCHAR(120) NOT NULL DEFAULT "" AFTER title');
    echo "Added lessons.sources column\n";
}
echo "Schema applied\n";

$adminEmail = 'hurayraiit+admin@gmail.com';
$stmt = pdo()->prepare(
    'INSERT INTO users (username, email, phone, password_hash, is_admin)
     VALUES (?, ?, ?, ?, 1)
     ON DUPLICATE KEY UPDATE is_admin = 1'
);
$stmt->execute(['admin', $adminEmail, '+0000000000', password_hash('Pass1234@@', PASSWORD_DEFAULT)]);
echo "Admin user ready: $adminEmail\n";
