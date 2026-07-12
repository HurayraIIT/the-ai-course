<?php

declare(strict_types=1);

function json_response(mixed $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function json_error(string $message, int $status = 400, array $extra = []): never
{
    json_response(['error' => $message] + $extra, $status);
}

function read_json_body(): array
{
    $body = json_decode(file_get_contents('php://input'), true);
    return is_array($body) ? $body : [];
}

/** Trimmed string field or fail with a field-specific message. */
function require_field(array $body, string $field, int $maxLen = 255): string
{
    $value = trim((string)($body[$field] ?? ''));
    if ($value === '') {
        json_error(ucfirst(str_replace('_', ' ', $field)) . ' is required', 422);
    }
    if (mb_strlen($value) > $maxLen) {
        json_error(ucfirst(str_replace('_', ' ', $field)) . ' is too long', 422);
    }
    return $value;
}

function verify_csrf(): void
{
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if ($token === '' || !hash_equals($_SESSION['csrf'] ?? '', $token)) {
        json_error('Invalid CSRF token', 403);
    }
}

function require_auth(): array
{
    $user = current_user();
    if ($user === null) {
        json_error('Authentication required', 401);
    }
    return $user;
}

/** Progress and community actions need a verified email; admins are seeded verified. */
function require_verified(array $user): void
{
    if ($user['email_verified_at'] === null && !$user['is_admin']) {
        json_error('Please verify your email address first', 403, ['needs_verification' => true]);
    }
}

function require_admin(): array
{
    $user = require_auth();
    if (!$user['is_admin']) {
        json_error('Forbidden', 403);
    }
    return $user;
}

function dispatch(string $method, string $path): void
{
    foreach (routes() as [$routeMethod, $pattern, $handler, $level]) {
        if ($routeMethod !== $method || !preg_match($pattern, $path, $matches)) {
            continue;
        }
        if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
            verify_csrf();
        }
        $user = match ($level) {
            'admin' => require_admin(),
            'user' => require_auth(),
            default => current_user(),
        };
        $handler($user, array_slice($matches, 1));
        return;
    }
    json_error('Not found', 404);
}
