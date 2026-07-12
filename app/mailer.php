<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

function send_mail(string $to, string $subject, string $html): bool
{
    if (env('MAIL_DRIVER', 'log') === 'log') {
        $dir = APP_ROOT . '/storage';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $entry = sprintf("[%s] To: %s | Subject: %s\n%s\n---\n", date('c'), $to, $subject, $html);
        file_put_contents($dir . '/mail.log', $entry, FILE_APPEND | LOCK_EX);
        return true;
    }

    foreach (['MAIN', 'FALLBACK'] as $profile) {
        if (env("SMTP_{$profile}_HOST") === '') {
            continue;
        }
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = env("SMTP_{$profile}_HOST");
            $mail->Port = (int)env("SMTP_{$profile}_PORT", '587');
            $mail->SMTPAuth = true;
            $mail->Username = env("SMTP_{$profile}_USER");
            $mail->Password = env("SMTP_{$profile}_PASS");
            $mail->SMTPSecure = env("SMTP_{$profile}_ENCRYPTION", 'tls');
            $mail->setFrom(env('MAIL_FROM'), env('MAIL_FROM_NAME'));
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $html;
            $mail->send();
            return true;
        } catch (Throwable $e) {
            error_log("send_mail via $profile failed: " . $e->getMessage());
        }
    }
    return false;
}
