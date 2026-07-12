<?php

declare(strict_types=1);

foreach (glob(APP_ROOT . '/app/handlers/*.php') as $handlerFile) {
    require $handlerFile;
}

/**
 * Route table: [method, pattern, handler, authLevel].
 * authLevel: 'public' | 'user' | 'admin'. Handlers receive ($user, $params).
 */
function routes(): array
{
    return [
        ['GET', '#^/health$#', fn() => json_response(['ok' => true]), 'public'],
    ];
}
