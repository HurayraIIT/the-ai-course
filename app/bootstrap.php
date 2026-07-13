<?php

declare(strict_types=1);

define('APP_ROOT', dirname(__DIR__));

require APP_ROOT . '/vendor/autoload.php';

// --- .env loader (KEY=VALUE lines, # comments, optional quotes) ---
(function () {
    $file = APP_ROOT . '/.env';
    if (!is_file($file)) {
        return;
    }
    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if ($value !== '' && ($value[0] === '"' || $value[0] === "'")) {
            $value = trim($value, $value[0]);
        }
        if (getenv($key) === false) {
            putenv("$key=$value");
        }
    }
})();

function env(string $key, string $default = ''): string
{
    $value = getenv($key);
    return $value === false ? $default : $value;
}

// --- errors: never leak internals, always answer JSON ---
ini_set('display_errors', '0');
set_exception_handler(function (Throwable $e) {
    error_log($e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Internal server error']);
});

// --- session ---
if (PHP_SAPI !== 'cli') {
    // ponytail: 60-day sessions. Default gc_maxlifetime (24min) is what logs users out fast.
    $lifetime = 60 * 60 * 24 * 60;
    ini_set('session.gc_maxlifetime', (string) $lifetime);
    // Private save path: on shared hosting a neighbor's short gc_maxlifetime
    // would otherwise GC our session files early.
    $sessionPath = APP_ROOT . '/storage/sessions';
    if (is_dir($sessionPath) || @mkdir($sessionPath, 0770, true)) {
        session_save_path($sessionPath);
    }
    session_name('aic_session');
    session_set_cookie_params([
        'lifetime' => $lifetime,
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => !empty($_SERVER['HTTPS']),
        'path' => '/',
    ]);
    session_start();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
}

require APP_ROOT . '/app/db.php';
require APP_ROOT . '/app/http.php';
require APP_ROOT . '/app/auth.php';
require APP_ROOT . '/app/mailer.php';
require APP_ROOT . '/app/activity.php';
require APP_ROOT . '/app/ratelimit.php';
require APP_ROOT . '/app/routes.php';
