import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { Avatar, buttonSecondaryClass, inputClass, PageTitle, Spinner } from '../components/ui';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  last_login_at: string | null;
  completed: number;
  avatar_hash: string;
}

interface UsersPage {
  users: AdminUser[];
  total: number;
  page: number;
  per_page: number;
  total_lessons: number;
}

export default function AdminUsers() {
  const [data, setData] = useState<UsersPage | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const load = (q: string, p: number) => {
    api<UsersPage>(`/admin/users?q=${encodeURIComponent(q)}&page=${p}`).then(setData);
  };

  useEffect(() => load(query, page), [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const search = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    load(query, 1);
  };

  if (!data) return <Spinner label="Loading users" />;

  const pages = Math.max(1, Math.ceil(data.total / data.per_page));

  return (
    <div>
      <PageTitle>Admin — Users</PageTitle>
      <p className="mt-2 text-sm">
        <Link to="/admin/analytics" className="text-blue-700 underline">
          View analytics
        </Link>
      </p>

      <form onSubmit={search} role="search" className="mt-4 flex gap-2">
        <label htmlFor="user-search" className="sr-only">
          Search users by username or email
        </label>
        <input
          id="user-search"
          type="search"
          placeholder="Search username or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={inputClass}
        />
        <button type="submit" className={buttonSecondaryClass}>
          Search
        </button>
      </form>

      <p role="status" className="mt-3 text-sm text-zinc-600">
        {data.total} user{data.total === 1 ? '' : 's'}
      </p>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">All users</caption>
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500">
              <th scope="col" className="py-2 pr-2">User</th>
              <th scope="col" className="py-2 pr-2">Email</th>
              <th scope="col" className="py-2 pr-2">Progress</th>
              <th scope="col" className="py-2 pr-2">Joined</th>
              <th scope="col" className="py-2">Last login</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u) => (
              <tr key={u.id} className="border-b border-zinc-100">
                <td className="py-2 pr-2">
                  <Link to={`/admin/users/${u.id}`} className="flex items-center gap-2 text-blue-700 underline">
                    <Avatar hash={u.avatar_hash} username={u.username} size={24} />
                    {u.username}
                    {u.is_admin && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">admin</span>
                    )}
                  </Link>
                </td>
                <td className="py-2 pr-2">{u.email}</td>
                <td className="py-2 pr-2 tabular-nums">
                  {u.completed}/{data.total_lessons}
                </td>
                <td className="py-2 pr-2 whitespace-nowrap">{u.created_at.slice(0, 10)}</td>
                <td className="py-2 whitespace-nowrap">{u.last_login_at?.slice(0, 10) ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-4 flex items-center gap-3 text-sm">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className={buttonSecondaryClass}
          >
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= pages}
            className={buttonSecondaryClass}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
