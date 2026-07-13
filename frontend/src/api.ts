export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;
  constructor(message: string, status: number, data: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

let csrf = '';
export function setCsrf(token: string) {
  csrf = token;
}

export async function api<T = any>(path: string, opts: { method?: string; body?: unknown } = {}, retried = false): Promise<T> {
  const method = opts.method ?? 'GET';
  const res = await fetch('/api' + path, {
    method,
    headers: {
      ...(opts.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(method !== 'GET' ? { 'X-CSRF-Token': csrf } : {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  // Sessions rotate the CSRF token on login/logout; adopt it wherever it appears.
  if (typeof (data as any).csrf === 'string') {
    csrf = (data as any).csrf;
  }
  if (!res.ok) {
    // Our cached token can go stale whenever the server replaces the session
    // (deploy, multi-tab login, logout, expiry). Resync from /me and replay once.
    if (res.status === 403 && (data as any).error === 'Invalid CSRF token' && !retried && path !== '/me') {
      await api('/me'); // adopts the current session's CSRF token
      return api<T>(path, opts, true);
    }
    throw new ApiError((data as any).error ?? 'Request failed', res.status, data);
  }
  return data as T;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  is_admin: boolean;
  leaderboard_opt_in: boolean;
  email_verified: boolean;
  avatar_hash: string;
}
