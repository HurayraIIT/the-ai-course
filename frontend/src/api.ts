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

export async function api<T = any>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
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
  if (!res.ok) {
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
  avatar_hash: string;
}
