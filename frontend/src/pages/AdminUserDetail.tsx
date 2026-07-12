import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth';
import { formatDateTime } from '../format';
import {
  AdminNav,
  Avatar,
  buttonClass,
  buttonDangerClass,
  buttonSecondaryClass,
  ErrorMessage,
  inputClass,
  PageTitle,
  Spinner,
  tableClass,
  tableWrapClass,
  tdClass,
  thClass,
  trZebraClass,
} from '../components/ui';

interface Detail {
  user: {
    id: number;
    username: string;
    email: string;
    phone: string;
    is_admin: boolean;
    leaderboard_opt_in: boolean;
    created_at: string;
    last_login_at: string | null;
    avatar_hash: string;
  };
  completions: { position: number; slug: string; title: string; completed_at: string }[];
  total_lessons: number;
}

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [form, setForm] = useState({ username: '', email: '', phone: '', leaderboard_opt_in: true });
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirming, setConfirming] = useState<'reset-progress' | 'delete' | null>(null);

  const load = useCallback(() => {
    api<Detail>(`/admin/users/${id}`).then((d) => {
      setDetail(d);
      setForm({
        username: d.user.username,
        email: d.user.email,
        phone: d.user.phone,
        leaderboard_opt_in: d.user.leaderboard_opt_in,
      });
    });
  }, [id]);

  useEffect(load, [load]);

  if (!detail) return <Spinner label="Loading user" />;

  const isSelf = me?.id === detail.user.id;

  const flash = (message: string) => {
    setMsg(message);
    setError(null);
  };
  const fail = (message: string) => {
    setError(message);
    setMsg(null);
  };

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api(`/admin/users/${id}`, { method: 'PUT', body: form });
      flash('Profile saved.');
      load();
    } catch (err: any) {
      fail(err.message);
    }
  };

  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api(`/admin/users/${id}/reset-password`, { method: 'POST', body: { password: newPassword } });
      setNewPassword('');
      flash('Password reset.');
    } catch (err: any) {
      fail(err.message);
    }
  };

  const resetProgress = async () => {
    try {
      await api(`/admin/users/${id}/reset-progress`, { method: 'POST' });
      setConfirming(null);
      flash('Progress reset.');
      load();
    } catch (err: any) {
      fail(err.message);
    }
  };

  const deleteUser = async () => {
    try {
      await api(`/admin/users/${id}`, { method: 'DELETE' });
      navigate('/admin/users');
    } catch (err: any) {
      setConfirming(null);
      fail(err.message);
    }
  };

  return (
    <div>
      <p className="text-sm">
        <Link to="/admin/users" className="text-blue-700 underline">
          ← All users
        </Link>
      </p>
      <div className="mt-2 flex items-center gap-3">
        <Avatar hash={detail.user.avatar_hash} username={detail.user.username} size={40} />
        <PageTitle>{detail.user.username}</PageTitle>
      </div>
      <AdminNav />
      <p className="mt-3 text-sm text-zinc-600">
        Joined {formatDateTime(detail.user.created_at)} · Last login {formatDateTime(detail.user.last_login_at)} ·{' '}
        {detail.completions.length}/{detail.total_lessons} lessons completed
      </p>

      {msg && (
        <p role="status" className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
          {msg}
        </p>
      )}
      <ErrorMessage error={error} />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <section aria-labelledby="edit-heading">
          <h2 id="edit-heading" className="text-lg font-semibold">
            Edit profile
          </h2>
          <form onSubmit={saveProfile} className="mt-4 space-y-4">
            <div>
              <label htmlFor="a-username" className="mb-1 block text-sm font-medium">
                Username
              </label>
              <input
                id="a-username"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="a-email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="a-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="a-phone" className="mb-1 block text-sm font-medium">
                Phone
              </label>
              <input
                id="a-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex items-start gap-2">
              <input
                id="a-opt-in"
                type="checkbox"
                checked={form.leaderboard_opt_in}
                onChange={(e) => setForm({ ...form, leaderboard_opt_in: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300"
              />
              <label htmlFor="a-opt-in" className="text-sm">
                Visible on leaderboard
              </label>
            </div>
            <button type="submit" className={buttonClass}>
              Save
            </button>
          </form>

          <h2 className="mt-8 text-lg font-semibold">Reset password</h2>
          <form onSubmit={resetPassword} className="mt-4 flex gap-2">
            <label htmlFor="a-new-password" className="sr-only">
              New password
            </label>
            <input
              id="a-new-password"
              type="text"
              required
              minLength={8}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              autoComplete="off"
            />
            <button type="submit" className={buttonSecondaryClass}>
              Reset
            </button>
          </form>

          <h2 className="mt-8 text-lg font-semibold">Danger zone</h2>
          <div className="mt-4 space-y-3">
            {confirming === 'reset-progress' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">Reset all progress?</span>
                <button onClick={resetProgress} className={buttonDangerClass}>
                  Yes, reset
                </button>
                <button onClick={() => setConfirming(null)} className={buttonSecondaryClass}>
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirming('reset-progress')} className={buttonSecondaryClass}>
                Reset progress
              </button>
            )}
            {isSelf ? (
              <p className="text-sm text-zinc-500">You cannot delete your own account.</p>
            ) : confirming === 'delete' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">Permanently delete this user?</span>
                <button onClick={deleteUser} className={buttonDangerClass}>
                  Yes, delete
                </button>
                <button onClick={() => setConfirming(null)} className={buttonSecondaryClass}>
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirming('delete')} className={buttonDangerClass}>
                Delete user
              </button>
            )}
          </div>
        </section>

        <section aria-labelledby="completions-heading">
          <h2 id="completions-heading" className="text-lg font-semibold">
            Completed lessons ({detail.completions.length})
          </h2>
          {detail.completions.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-600">No lessons completed yet.</p>
          ) : (
            <div className={`mt-4 max-h-96 overflow-y-auto ${tableWrapClass}`}>
              <table className={tableClass}>
                <caption className="sr-only">Lessons completed by this user with completion dates</caption>
                <thead className="sticky top-0">
                  <tr>
                    <th scope="col" className={thClass}>#</th>
                    <th scope="col" className={thClass}>Lesson</th>
                    <th scope="col" className={thClass}>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.completions.map((c) => (
                    <tr key={c.slug} className={trZebraClass}>
                      <td className={`${tdClass} tabular-nums`}>{c.position}</td>
                      <td className={tdClass}>
                        <Link to={`/lessons/${c.slug}`} className="text-blue-700 underline">
                          {c.title}
                        </Link>
                      </td>
                      <td className={`${tdClass} whitespace-nowrap`}>{formatDateTime(c.completed_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
