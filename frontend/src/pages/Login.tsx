import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api, type User } from '../api';
import { useAuth } from '../auth';
import { buttonClass, ErrorMessage, inputClass, PageTitle } from '../components/ui';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await api<{ user: User }>('/auth/login', { method: 'POST', body: { email, password } });
      setUser(data.user);
      navigate((location.state as any)?.from ?? '/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <PageTitle>Log in</PageTitle>
      <form onSubmit={submit} className="mt-6 space-y-4" aria-describedby="login-error">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <ErrorMessage id="login-error" error={error} />
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        <Link to="/forgot-password" className="text-blue-700 underline">
          Forgot your password?
        </Link>
      </p>
      <p className="mt-2 text-sm text-zinc-600">
        No account?{' '}
        <Link to="/register" className="text-blue-700 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
