import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { formatDateTime } from '../format';
import {
  AdminNav,
  PageTitle,
  Pagination,
  Spinner,
  tableClass,
  tableWrapClass,
  tdClass,
  thClass,
  trZebraClass,
} from '../components/ui';

interface Activity {
  id: number;
  user_id: number | null;
  username: string;
  action: string;
  detail: string;
  created_at: string;
}

interface ActivityPage {
  activity: Activity[];
  total: number;
  page: number;
  per_page: number;
}

const ACTION_LABELS: Record<string, string> = {
  registered: 'created an account',
  completed_lesson: 'completed lesson',
  read_resource: 'marked resource as read',
  commented: 'commented on lesson',
  updated_profile: 'updated their profile',
  changed_password: 'changed their password',
};

export default function AdminActivity() {
  const [data, setData] = useState<ActivityPage | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api<ActivityPage>(`/admin/activity?page=${page}`).then(setData);
  }, [page]);

  if (!data) return <Spinner label="Loading activity" />;

  return (
    <div>
      <PageTitle>Admin — Activity</PageTitle>
      <AdminNav />
      <p role="status" className="mt-4 text-sm text-zinc-600">
        {data.total} event{data.total === 1 ? '' : 's'}, most recent first
      </p>

      <div className={`mt-2 ${tableWrapClass}`}>
        <table className={tableClass}>
          <caption className="sr-only">Recent user activity</caption>
          <thead>
            <tr>
              <th scope="col" className={thClass}>User</th>
              <th scope="col" className={thClass}>Action</th>
              <th scope="col" className={thClass}>Detail</th>
              <th scope="col" className={thClass}>When</th>
            </tr>
          </thead>
          <tbody>
            {data.activity.map((event) => (
              <tr key={event.id} className={trZebraClass}>
                <td className={`${tdClass} font-medium`}>
                  {event.user_id === null ? (
                    <>
                      {event.username}
                      <span className="ml-1 text-xs text-zinc-400">(deleted)</span>
                    </>
                  ) : (
                    <Link to={`/admin/users/${event.user_id}`} className="text-blue-700 underline">
                      {event.username}
                    </Link>
                  )}
                </td>
                <td className={tdClass}>{ACTION_LABELS[event.action] ?? event.action}</td>
                <td className={`${tdClass} text-zinc-600`}>{event.detail || '—'}</td>
                <td className={`${tdClass} whitespace-nowrap`}>{formatDateTime(event.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={data.page} total={data.total} perPage={data.per_page} onPage={setPage} />
    </div>
  );
}
