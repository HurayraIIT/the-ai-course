import { useState, type FormEvent } from 'react';
import { api, type User } from '../api';
import { buttonClass, ErrorMessage, inputClass } from './ui';

/** Second step of registration/login: enter the 6-digit code emailed to `email`. */
export default function OtpForm({ email, onVerified }: { email: string; onVerified: (user: User) => void }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await api<{ user: User }>('/auth/verify-otp', { method: 'POST', body: { email, otp } });
      onVerified(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setResendStatus('sending');
    try {
      await api('/auth/resend-otp', { method: 'POST', body: { email } });
      setResendStatus('sent');
    } catch {
      setResendStatus('error');
    }
  };

  return (
    <div>
      <p role="status" className="rounded-md bg-blue-50 p-4 text-sm text-blue-900">
        We sent a 6-digit verification code to <strong>{email}</strong>. Enter it below to finish signing in.
      </p>
      <form onSubmit={submit} className="mt-4 space-y-4" aria-describedby="otp-error">
        <div>
          <label htmlFor="otp" className="mb-1 block text-sm font-medium">
            Verification code
          </label>
          <input
            id="otp"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className={`${inputClass} text-center text-lg tracking-[0.5em]`}
          />
        </div>
        <ErrorMessage id="otp-error" error={error} />
        <button type="submit" disabled={busy || otp.length !== 6} className={buttonClass}>
          {busy ? 'Verifying…' : 'Verify and log in'}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        Didn't get it?{' '}
        {resendStatus === 'sent' ? (
          <span role="status" className="font-medium text-green-700">
            New code sent.
          </span>
        ) : resendStatus === 'error' ? (
          <span role="alert" className="text-red-600">
            Could not send — try again later.
          </span>
        ) : (
          <button
            onClick={resend}
            disabled={resendStatus === 'sending'}
            className="font-medium text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            {resendStatus === 'sending' ? 'Sending…' : 'Resend code'}
          </button>
        )}
      </p>
    </div>
  );
}
