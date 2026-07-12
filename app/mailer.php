<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

/** Every outgoing email is recorded in email_log for the admin panel, whatever the driver. */
function log_email(string $to, string $subject, string $html, string $status): void
{
    try {
        pdo()->prepare('INSERT INTO email_log (recipient, subject, body, status) VALUES (?, ?, ?, ?)')
            ->execute([$to, $subject, $html, $status]);
    } catch (Throwable $e) {
        error_log('log_email failed: ' . $e->getMessage());
    }
}

function send_mail(string $to, string $subject, string $html): bool
{
    if (env('MAIL_DRIVER', 'log') === 'log') {
        $dir = APP_ROOT . '/storage';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $entry = sprintf("[%s] To: %s | Subject: %s\n%s\n---\n", date('c'), $to, $subject, $html);
        file_put_contents($dir . '/mail.log', $entry, FILE_APPEND | LOCK_EX);
        log_email($to, $subject, $html, 'logged');
        return true;
    }

    foreach (['PRIMARY', 'FAILOVER'] as $profile) {
        if (env("MAIL_{$profile}_HOST") === '') {
            continue;
        }
        try {
            $mail = new PHPMailer(true);
            $mail->CharSet = PHPMailer::CHARSET_UTF8;
            $mail->isSMTP();
            $mail->Host = env("MAIL_{$profile}_HOST");
            $mail->Port = (int)env("MAIL_{$profile}_PORT", '587');
            $mail->SMTPAuth = true;
            $mail->Username = env("MAIL_{$profile}_USERNAME");
            $mail->Password = env("MAIL_{$profile}_PASSWORD");
            $mail->SMTPSecure = env("MAIL_{$profile}_ENCRYPTION", 'tls');
            $mail->setFrom(
                env("MAIL_{$profile}_FROM_ADDRESS"),
                env("MAIL_{$profile}_FROM_NAME", env('APP_NAME', 'The AI Course'))
            );
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $html;
            $mail->send();
            log_email($to, $subject, $html, 'sent');
            return true;
        } catch (Throwable $e) {
            error_log("send_mail via $profile failed: " . $e->getMessage());
        }
    }
    log_email($to, $subject, $html, 'failed');
    return false;
}
