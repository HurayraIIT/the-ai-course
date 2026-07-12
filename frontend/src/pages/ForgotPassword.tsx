import { useState, type FormEvent } from 'react';
import { api } from '../api';
import { buttonClass, ErrorMessage, inputClass, PageTitle } from '../components/ui';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api('/auth/forgot-password', { method: 'POST', body: { email } });
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <PageTitle>Forgot password</PageTitle>
      {sent ? (
        <p role="status" className="mt-6 rounded-md bg-green-50 p-4 text-sm text-green-800">
          If an account exists for that email, a reset link is on its way. It expires in 60 minutes.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
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
          <ErrorMessage error={error} />
          <button type="submit" disabled={busy} className={buttonClass}>
            {busy ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </div>
  );
}
