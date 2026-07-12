import { useEffect, useRef, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';

/** Page h1: receives focus on mount so screen readers announce route changes. */
export function PageTitle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    document.title = `${typeof children === 'string' ? children : 'The AI Course'} — The AI Course`;
    ref.current?.focus();
  }, [children]);
  return (
    <h1 ref={ref} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none">
      {children}
    </h1>
  );
}

export function Avatar({ hash, username, size = 32 }: { hash: string; username: string; size?: number }) {
  return (
    <img
      src={`https://gravatar.com/avatar/${hash}?d=identicon&s=${size * 2}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="rounded-full bg-zinc-200"
      data-username={username}
    />
  );
}

export function ErrorMessage({ id, error }: { id?: string; error: string | null }) {
  return (
    <p id={id} role="alert" aria-live="polite" className={error ? 'text-sm text-red-600' : 'sr-only'}>
      {error ?? ''}
    </p>
  );
}

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <p role="status" className="p-8 text-center text-zinc-500">
      {label}…
    </p>
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user?.is_admin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export const inputClass =
  'w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';
export const buttonClass =
  'rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50';
export const buttonSecondaryClass =
  'rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50';
export const buttonDangerClass =
  'rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50';
