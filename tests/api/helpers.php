<?php

declare(strict_types=1);

const BASE_URL = 'http://localhost:8001/api';

$GLOBALS['test_pass'] = 0;
$GLOBALS['test_fail'] = 0;

function check(bool $condition, string $label): void
{
    if ($condition) {
        $GLOBALS['test_pass']++;
        echo "  ok  $label\n";
    } else {
        $GLOBALS['test_fail']++;
        echo "FAIL  $label\n";
    }
}

/** Minimal HTTP client with an in-memory cookie jar + CSRF handling. */
class Client
{
    private array $cookies = [];
    public string $csrf = '';

    /** @return array{0:int,1:array} [status, decoded json] */
    public function request(string $method, string $path, ?array $body = null): array
    {
        $ch = curl_init(BASE_URL . $path);
        $headers = [];
        if ($body !== null) {
            $headers[] = 'Content-Type: application/json';
        }
        if ($method !== 'GET') {
            $headers[] = 'X-CSRF-Token: ' . $this->csrf;
        }
        if ($this->cookies !== []) {
            $pairs = [];
            foreach ($this->cookies as $name => $value) {
                $pairs[] = "$name=$value";
            }
            $headers[] = 'Cookie: ' . implode('; ', $pairs);
        }
        curl_setopt_array($ch, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $body !== null ? json_encode($body) : null,
        ]);
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);

        foreach (explode("\r\n", substr($response, 0, $headerSize)) as $line) {
            if (preg_match('/^Set-Cookie:\s*([^=]+)=([^;]*)/i', $line, $m)) {
                $this->cookies[$m[1]] = $m[2];
            }
        }
        $data = json_decode(substr($response, $headerSize), true);
        return [$status, is_array($data) ? $data : []];
    }

    public function get(string $path): array
    {
        return $this->request('GET', $path);
    }

    /** Fetches /me and stores the CSRF token for subsequent mutations. */
    public function bootstrap(): array
    {
        [$status, $data] = $this->get('/me');
        $this->csrf = $data['csrf'] ?? '';
        return [$status, $data];
    }

    /** Registers without verifying — for tests exercising the verification flow itself. */
    public function register_unverified(string $username, string $email, string $password = 'secret123'): array
    {
        $this->bootstrap();
        $result = $this->request('POST', '/auth/register', [
            'username' => $username,
            'email' => $email,
            'phone' => '+8801700000000',
            'password' => $password,
        ]);
        $this->bootstrap();
        return $result;
    }

    /** Registers and marks the email verified directly in the DB (most tests assume a verified user). */
    public function register(string $username, string $email, string $password = 'secret123'): array
    {
        $result = $this->register_unverified($username, $email, $password);
        test_pdo()->prepare('UPDATE users SET email_verified_at = NOW() WHERE email = ?')->execute([$email]);
        return $result;
    }

    public function login(string $email, string $password): array
    {
        $this->bootstrap();
        $result = $this->request('POST', '/auth/login', ['email' => $email, 'password' => $password]);
        $this->bootstrap();
        return $result;
    }
}

function test_pdo(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', getenv('DB_HOST') ?: '127.0.0.1', getenv('DB_DATABASE')),
            getenv('DB_USERNAME') ?: 'root',
            getenv('DB_PASSWORD') ?: '',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    }
    return $pdo;
}

function clear_rate_limits(): void
{
    test_pdo()->exec('DELETE FROM rate_limit_hits');
}

/** Last token in mail.log for the given link path ('reset-password' or 'verify-email'). */
function latest_mail_token(string $path): ?string
{
    $log = @file_get_contents(dirname(__DIR__, 2) . '/storage/mail.log') ?: '';
    return preg_match_all('#/' . $path . '\?token=([a-f0-9]{64})#', $log, $m) ? end($m[1]) : null;
}
