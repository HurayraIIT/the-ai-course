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
        ['GET', '#^/me$#', 'handle_me', 'public'],
        ['POST', '#^/auth/register$#', 'handle_register', 'public'],
        ['POST', '#^/auth/login$#', 'handle_login', 'public'],
        ['POST', '#^/auth/logout$#', 'handle_logout', 'user'],
        ['POST', '#^/auth/forgot-password$#', 'handle_forgot_password', 'public'],
        ['POST', '#^/auth/reset-password$#', 'handle_reset_password', 'public'],
        ['POST', '#^/auth/verify-email$#', 'handle_verify_email', 'public'],
        ['POST', '#^/auth/resend-verification$#', 'handle_resend_verification', 'user'],
        ['GET', '#^/outline$#', 'handle_outline', 'public'],
        ['GET', '#^/lessons/([a-z0-9-]+)$#', 'handle_lesson', 'user'],
        ['POST', '#^/lessons/(\d+)/resources/(\d+)/read$#', 'handle_resource_read', 'user'],
        ['POST', '#^/lessons/(\d+)/complete$#', 'handle_lesson_complete', 'user'],
        ['GET', '#^/lessons/(\d+)/comments$#', 'handle_comments_list', 'user'],
        ['POST', '#^/lessons/(\d+)/comments$#', 'handle_comment_create', 'user'],
        ['DELETE', '#^/comments/(\d+)$#', 'handle_comment_delete', 'user'],
        ['PUT', '#^/comments/(\d+)/reaction$#', 'handle_comment_reaction', 'user'],
        ['GET', '#^/leaderboard$#', 'handle_leaderboard', 'user'],
        ['PUT', '#^/profile$#', 'handle_profile_update', 'user'],
        ['PUT', '#^/profile/password$#', 'handle_password_update', 'user'],
        ['GET', '#^/admin/users$#', 'handle_admin_users', 'admin'],
        ['GET', '#^/admin/users/(\d+)$#', 'handle_admin_user_detail', 'admin'],
        ['PUT', '#^/admin/users/(\d+)$#', 'handle_admin_user_update', 'admin'],
        ['POST', '#^/admin/users/(\d+)/reset-progress$#', 'handle_admin_reset_progress', 'admin'],
        ['POST', '#^/admin/users/(\d+)/reset-password$#', 'handle_admin_reset_password', 'admin'],
        ['DELETE', '#^/admin/users/(\d+)$#', 'handle_admin_user_delete', 'admin'],
        ['GET', '#^/admin/analytics$#', 'handle_admin_analytics', 'admin'],
        ['GET', '#^/admin/comments$#', 'handle_admin_comments', 'admin'],
        ['PUT', '#^/admin/comments/(\d+)$#', 'handle_admin_comment_update', 'admin'],
        ['GET', '#^/admin/activity$#', 'handle_admin_activity', 'admin'],
        ['GET', '#^/admin/emails$#', 'handle_admin_emails', 'admin'],
    ];
}
