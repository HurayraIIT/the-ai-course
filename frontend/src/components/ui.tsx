import { useEffect, useRef, type ReactNode } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
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
      src={`https://gravatar.com/avatar/${hash}?d=retro&s=${size * 2}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 self-start rounded-full bg-zinc-200 object-cover"
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

export function AdminNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      isActive ? 'bg-blue-100 font-semibold text-blue-800' : 'text-zinc-600 hover:text-blue-700'
    }`;
  return (
    <nav aria-label="Admin sections" className="mt-3 flex flex-wrap gap-1">
      <NavLink to="/admin/users" className={linkClass} end>
        Users
      </NavLink>
      <NavLink to="/admin/comments" className={linkClass}>
        Comments
      </NavLink>
      <NavLink to="/admin/activity" className={linkClass}>
        Activity
      </NavLink>
      <NavLink to="/admin/emails" className={linkClass}>
        Emails
      </NavLink>
      <NavLink to="/admin/analytics" className={linkClass}>
        Analytics
      </NavLink>
    </nav>
  );
}

export function Pagination({
  page,
  total,
  perPage,
  onPage,
}: {
  page: number;
  total: number;
  perPage: number;
  onPage: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center gap-3 text-sm">
      <button onClick={() => onPage(page - 1)} disabled={page <= 1} className={buttonSecondaryClass}>
        Previous
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button onClick={() => onPage(page + 1)} disabled={page >= pages} className={buttonSecondaryClass}>
        Next
      </button>
    </nav>
  );
}

// Shared table styling: bordered wrapper, padded cells, zebra-striped rows.
export const tableWrapClass = 'overflow-x-auto rounded-md border border-zinc-200';
export const tableClass = 'w-full text-left text-sm';
export const thClass = 'border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500';
export const tdClass = 'border-b border-zinc-100 px-4 py-2.5';
export const trZebraClass = 'odd:bg-white even:bg-zinc-50';

export const inputClass =
  'w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';
export const buttonClass =
  'rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50';
export const buttonSecondaryClass =
  'rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50';
export const buttonDangerClass =
  'rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50';
