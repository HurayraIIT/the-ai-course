import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth';
import { PageTitle, Spinner } from '../components/ui';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const { loading, refresh } = useAuth();
  const token = params.get('token') ?? '';
  const [state, setState] = useState<'verifying' | 'done' | 'error'>('verifying');
  const [error, setError] = useState('');
  const fired = useRef(false); // StrictMode double-mount guard: the token is single-use

  useEffect(() => {
    // Wait for the auth bootstrap: it delivers the CSRF token this POST needs.
    if (loading || fired.current) return;
    fired.current = true;
    api('/auth/verify-email', { method: 'POST', body: { token } })
      .then(async () => {
        await refresh();
        setState('done');
      })
      .catch((err) => {
        setError(err.message);
        setState('error');
      });
  }, [loading, token, refresh]);

  return (
    <div className="mx-auto max-w-sm">
      <PageTitle>Email verification</PageTitle>
      {state === 'verifying' && <Spinner label="Verifying your email" />}
      {state === 'done' && (
        <p role="status" className="mt-6 rounded-md bg-green-50 p-4 text-sm text-green-800">
          Your email is verified — you're all set.{' '}
          <Link to="/" className="font-medium underline">
            Start learning
          </Link>
        </p>
      )}
      {state === 'error' && (
        <p role="alert" className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error} If you're logged in, you can request a new link from the banner at the top of the page.
        </p>
      )}
    </div>
  );
}
