import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, type User } from '../api';
import { useAuth } from '../auth';
import { buttonClass, ErrorMessage, inputClass, PageTitle } from '../components/ui';
import OtpForm from '../components/OtpForm';

export default function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await api<{ email: string }>('/auth/register', { method: 'POST', body: form });
      setPendingEmail(data.email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onVerified = (user: User) => {
    setUser(user);
    navigate('/');
  };

  if (pendingEmail) {
    return (
      <div className="mx-auto max-w-sm">
        <PageTitle>Check your inbox</PageTitle>
        <div className="mt-6">
          <OtpForm email={pendingEmail} onVerified={onVerified} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm">
      <PageTitle>Create your account</PageTitle>
      <form onSubmit={submit} className="mt-6 space-y-4" aria-describedby="register-error">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            required
            minLength={3}
            maxLength={50}
            pattern="[a-zA-Z0-9_\-]+"
            autoComplete="username"
            placeholder="jane_doe"
            value={form.username}
            onChange={set('username')}
            className={inputClass}
            aria-describedby="username-hint"
          />
          <p id="username-hint" className="mt-1 text-xs text-zinc-500">
            Shown publicly on the leaderboard and comments. Letters, numbers, hyphens, underscores.
          </p>
        </div>
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
            value={form.email}
            onChange={set('email')}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+1 555 123 4567"
            value={form.phone}
            onChange={set('phone')}
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
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={set('password')}
            className={inputClass}
            aria-describedby="password-hint"
          />
          <p id="password-hint" className="mt-1 text-xs text-zinc-500">
            At least 8 characters.
          </p>
        </div>
        <ErrorMessage id="register-error" error={error} />
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-700 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
