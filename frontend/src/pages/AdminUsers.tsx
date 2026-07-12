import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { formatDateTime } from '../format';
import {
  AdminNav,
  Avatar,
  buttonSecondaryClass,
  inputClass,
  PageTitle,
  Pagination,
  Spinner,
  tableClass,
  tableWrapClass,
  tdClass,
  thClass,
  trZebraClass,
} from '../components/ui';

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

  return (
    <div>
      <PageTitle>Admin — Users</PageTitle>
      <AdminNav />

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

      <div className={`mt-2 ${tableWrapClass}`}>
        <table className={tableClass}>
          <caption className="sr-only">All users</caption>
          <thead>
            <tr>
              <th scope="col" className={thClass}>User</th>
              <th scope="col" className={thClass}>Email</th>
              <th scope="col" className={thClass}>Progress</th>
              <th scope="col" className={thClass}>Joined</th>
              <th scope="col" className={thClass}>Last login</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u) => (
              <tr key={u.id} className={trZebraClass}>
                <td className={tdClass}>
                  <Link to={`/admin/users/${u.id}`} className="flex items-center gap-2 text-blue-700 underline">
                    <Avatar hash={u.avatar_hash} username={u.username} size={24} />
                    {u.username}
                    {u.is_admin && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">admin</span>
                    )}
                  </Link>
                </td>
                <td className={tdClass}>{u.email}</td>
                <td className={`${tdClass} tabular-nums`}>
                  {u.completed}/{data.total_lessons}
                </td>
                <td className={`${tdClass} whitespace-nowrap`}>{formatDateTime(u.created_at)}</td>
                <td className={`${tdClass} whitespace-nowrap`}>{formatDateTime(u.last_login_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} total={data.total} perPage={data.per_page} onPage={setPage} />
    </div>
  );
}
