<?php

// Router for PHP's built-in server, mirroring nginx try_files:
//   php -S localhost:8000 -t public scripts/dev-router.php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path !== '/' && is_file(__DIR__ . '/../public' . $path)) {
    return false; // let the built-in server serve the static file
}
require __DIR__ . '/../public/index.php';
