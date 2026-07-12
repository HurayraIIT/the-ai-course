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

// Grandfather pre-verification users exactly once: when email_verifications
// doesn't exist yet, everyone registered so far predates the feature.
$hadVerifications = pdo()->prepare(
    'SELECT COUNT(*) FROM information_schema.tables
     WHERE table_schema = ? AND table_name = "email_verifications"'
);
$hadVerifications->execute([$name]);
$grandfather = (int)$hadVerifications->fetchColumn() === 0;

pdo()->exec(file_get_contents(dirname(__DIR__) . '/database/schema.sql'));

if ($grandfather) {
    $count = pdo()->exec('UPDATE users SET email_verified_at = NOW() WHERE email_verified_at IS NULL');
    if ($count > 0) {
        echo "Grandfathered $count pre-verification users as verified\n";
    }
}

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
    'INSERT INTO users (username, email, phone, password_hash, is_admin, email_verified_at)
     VALUES (?, ?, ?, ?, 1, NOW())
     ON DUPLICATE KEY UPDATE is_admin = 1, email_verified_at = COALESCE(email_verified_at, NOW())'
);
$stmt->execute(['admin', $adminEmail, '+0000000000', password_hash('Pass1234@@', PASSWORD_DEFAULT)]);
echo "Admin user ready: $adminEmail\n";
