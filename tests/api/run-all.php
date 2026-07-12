<?php

declare(strict_types=1);

// Orchestrator: fresh test DB, dedicated server on :8001, then all test files in order.
if (PHP_SAPI !== 'cli') {
    exit(1);
}

$root = dirname(__DIR__, 2);
$testDb = 'the_ai_course_test';
putenv("DB_NAME=$testDb");

// Load .env for DB creds (bootstrap skips keys already in the environment)
foreach (file("$root/.env", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
    if ($line !== '' && $line[0] !== '#' && str_contains($line, '=')) {
        [$k, $v] = explode('=', $line, 2);
        if ($k !== 'DB_NAME' && getenv($k) === false) {
            putenv(trim($k) . '=' . trim($v));
        }
    }
}

$envPrefix = "DB_NAME=$testDb MAIL_DRIVER=log";
echo "Setting up test database `$testDb`...\n";
passthru("$envPrefix php $root/scripts/migrate.php", $code);
if ($code !== 0) {
    exit(1);
}
// Drop and re-apply for a clean slate (schema is idempotent, data is not)
$pdo = new PDO(
    sprintf('mysql:host=%s;charset=utf8mb4', getenv('DB_HOST') ?: '127.0.0.1'),
    getenv('DB_USER') ?: 'root',
    getenv('DB_PASS') ?: '',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
$pdo->exec("DROP DATABASE `$testDb`");
passthru("$envPrefix php $root/scripts/migrate.php", $code);
passthru("$envPrefix php $root/scripts/seed.php", $code);
if ($code !== 0) {
    exit(1);
}

@unlink("$root/storage/mail.log");

echo "Starting test server on :8001...\n";
$server = proc_open(
    "$envPrefix exec php -S localhost:8001 -t $root/public $root/scripts/dev-router.php",
    [1 => ['file', '/dev/null', 'w'], 2 => ['file', '/dev/null', 'w']],
    $pipes
);
usleep(500_000);

require __DIR__ . '/helpers.php';

$exitCode = 0;
try {
    foreach (glob(__DIR__ . '/0*.php') as $file) {
        require $file;
    }
} finally {
    proc_terminate($server);
    proc_close($server);
}

echo "\n{$GLOBALS['test_pass']} passed, {$GLOBALS['test_fail']} failed\n";
exit($GLOBALS['test_fail'] > 0 ? 1 : 0);
