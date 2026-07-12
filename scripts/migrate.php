<?php

declare(strict_types=1);

// CLI only: creates the database if missing, applies schema.sql, seeds the admin user.
if (PHP_SAPI !== 'cli') {
    exit(1);
}

require dirname(__DIR__) . '/app/bootstrap.php';

$host = env('DB_HOST', '127.0.0.1');
$name = env('DB_NAME');
$root = new PDO("mysql:host=$host;charset=utf8mb4", env('DB_USER'), env('DB_PASS'), [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);
$root->exec("CREATE DATABASE IF NOT EXISTS `$name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
echo "Database `$name` ready\n";

pdo()->exec(file_get_contents(dirname(__DIR__) . '/database/schema.sql'));
echo "Schema applied\n";

$adminEmail = 'hurayraiit+admin@gmail.com';
$stmt = pdo()->prepare(
    'INSERT INTO users (username, email, phone, password_hash, is_admin)
     VALUES (?, ?, ?, ?, 1)
     ON DUPLICATE KEY UPDATE is_admin = 1'
);
$stmt->execute(['admin', $adminEmail, '+0000000000', password_hash('Pass1234@@', PASSWORD_DEFAULT)]);
echo "Admin user ready: $adminEmail\n";
