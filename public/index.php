<?php

declare(strict_types=1);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

if (str_starts_with($path, '/api/')) {
    require __DIR__ . '/../app/bootstrap.php';
    dispatch($_SERVER['REQUEST_METHOD'], substr($path, 4));
    exit;
}

// SPA fallback: every non-API, non-file path serves the built frontend.
$index = __DIR__ . '/index.html';
if (is_file($index)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($index);
} else {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Frontend not built. Run: npm run build\n";
}
