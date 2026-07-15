import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { formatDate } from '../format';
import {
  Spinner,
  tableClass,
  tableWrapClass,
  tdClass,
  thClass,
  trZebraClass,
} from '../components/ui';

interface Analytics {
  total_users: number;
  total_comments: number;
  total_completions: number;
  active_users_7d: number;
  active_users_30d: number;
  signups_by_day: { day: string; count: number }[];
  top_lessons: { title: string; slug: string; position: number; completions: number }[];
  completion_funnel: { bucket: string; users: number }[];
  total_lessons: number;
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-zinc-200 p-4">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tabular-nums">{value}</dd>
    </div>
  );
}

export default function AdminAnalytics() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    api<Analytics>('/admin/analytics').then(setData);
  }, []);

  if (!data) return <Spinner label="Loading analytics" />;

  return (
    <div>

      <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        <Stat label="Users" value={data.total_users} />
        <Stat label="Active (7d)" value={data.active_users_7d} />
        <Stat label="Active (30d)" value={data.active_users_30d} />
        <Stat label="Completions" value={data.total_completions} />
        <Stat label="Comments" value={data.total_comments} />
      </dl>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section aria-labelledby="signups-heading">
          <h2 id="signups-heading" className="text-lg font-semibold">
            Signups (last 30 days)
          </h2>
          {data.signups_by_day.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-600">No signups in the last 30 days.</p>
          ) : (
            <div className={`mt-3 ${tableWrapClass}`}>
              <table className={tableClass}>
                <caption className="sr-only">Signups per day over the last 30 days</caption>
                <thead>
                  <tr>
                    <th scope="col" className={thClass}>Day</th>
                    <th scope="col" className={`${thClass} text-right`}>Signups</th>
                  </tr>
                </thead>
                <tbody>
                  {data.signups_by_day.map((row) => (
                    <tr key={row.day} className={trZebraClass}>
                      <td className={tdClass}>{formatDate(row.day)}</td>
                      <td className={`${tdClass} text-right tabular-nums`}>{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section aria-labelledby="funnel-heading">
          <h2 id="funnel-heading" className="text-lg font-semibold">
            Progress distribution
          </h2>
          <p className="mt-1 text-xs text-zinc-500">Users grouped by completed-lesson count.</p>
          <div className={`mt-3 ${tableWrapClass}`}>
            <table className={tableClass}>
              <caption className="sr-only">Users grouped by number of completed lessons</caption>
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Lessons completed</th>
                  <th scope="col" className={`${thClass} text-right`}>Users</th>
                </tr>
              </thead>
              <tbody>
                {data.completion_funnel.map((row) => (
                  <tr key={row.bucket} className={trZebraClass}>
                    <td className={tdClass}>
                      {row.bucket}–{Number(row.bucket) + 9}
                    </td>
                    <td className={`${tdClass} text-right tabular-nums`}>{row.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section aria-labelledby="top-heading" className="mt-8">
        <h2 id="top-heading" className="text-lg font-semibold">
          Most-completed lessons
        </h2>
        <div className={`mt-3 ${tableWrapClass}`}>
          <table className={tableClass}>
            <caption className="sr-only">Top 20 lessons by completion count</caption>
            <thead>
              <tr>
                <th scope="col" className={thClass}>#</th>
                <th scope="col" className={thClass}>Lesson</th>
                <th scope="col" className={`${thClass} text-right`}>Completions</th>
              </tr>
            </thead>
            <tbody>
              {data.top_lessons.map((lesson) => (
                <tr key={lesson.position} className={trZebraClass}>
                  <td className={`${tdClass} tabular-nums`}>{lesson.position}</td>
                  <td className={tdClass}>
                    <Link to={`/lessons/${lesson.slug}`} className="text-blue-700 underline">
                      {lesson.title}
                    </Link>
                  </td>
                  <td className={`${tdClass} text-right tabular-nums`}>{lesson.completions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
