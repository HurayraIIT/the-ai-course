import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api, type User } from '../api';
import { useAuth } from '../auth';
import { buttonClass, ErrorMessage, inputClass, PageTitle } from '../components/ui';
import OtpForm from '../components/OtpForm';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const destination = (location.state as any)?.from ?? '/';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await api<{ user: User }>('/auth/login', { method: 'POST', body: { email, password } });
      setUser(data.user);
      navigate(destination);
    } catch (err: any) {
      if (err.data?.needs_verification) {
        setPendingEmail(err.data.email ?? email);
      } else {
        setError(err.message);
      }
    } finally {
      setBusy(false);
    }
  };

  const onVerified = (user: User) => {
    setUser(user);
    navigate(destination);
  };

  if (pendingEmail) {
    return (
      <div className="mx-auto max-w-sm">
        <PageTitle>Verify your email</PageTitle>
        <p className="mt-4 text-sm text-zinc-600">
          Your account isn't verified yet. Use the code from your inbox, or request a fresh one below.
        </p>
        <div className="mt-4">
          <OtpForm email={pendingEmail} onVerified={onVerified} />
        </div>
      </div>
    );
  }

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
            placeholder="you@example.com"
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
            placeholder="Your password"
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
