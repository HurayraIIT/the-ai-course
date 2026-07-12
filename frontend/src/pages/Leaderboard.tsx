import { useEffect, useState } from 'react';
import { api } from '../api';
import {
  Avatar,
  PageTitle,
  Pagination,
  Spinner,
  tableClass,
  tableWrapClass,
  tdClass,
  thClass,
  trZebraClass,
} from '../components/ui';

interface Row {
  rank: number;
  username: string;
  avatar_hash: string;
  completed: number;
  is_me: boolean;
}

interface LeaderboardData {
  leaderboard: Row[];
  total: number;
  page: number;
  per_page: number;
  total_lessons: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api<LeaderboardData>(`/leaderboard?page=${page}`).then(setData);
  }, [page]);

  if (!data) return <Spinner label="Loading leaderboard" />;

  return (
    <div>
      <PageTitle>Leaderboard</PageTitle>
      <p className="mt-2 text-sm text-zinc-600">
        Ranked by completed lessons out of {data.total_lessons}. You can opt out in Settings.
      </p>
      <div className={`mt-6 ${tableWrapClass}`}>
        <table className={tableClass}>
          <caption className="sr-only">Global leaderboard, ranked by completed lessons</caption>
          <thead>
            <tr>
              <th scope="col" className={thClass}>
                Rank
              </th>
              <th scope="col" className={thClass}>
                Learner
              </th>
              <th scope="col" className={`${thClass} text-right`}>
                Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {data.leaderboard.map((row) => (
              <tr key={row.rank} className={row.is_me ? 'bg-blue-50 font-medium' : trZebraClass}>
                <td className={tdClass}>{row.rank}</td>
                <td className={tdClass}>
                  <span className="flex items-center gap-2">
                    <Avatar hash={row.avatar_hash} username={row.username} size={28} />
                    {row.username}
                    {row.is_me && <span className="text-xs text-blue-700">(you)</span>}
                  </span>
                </td>
                <td className={`${tdClass} text-right tabular-nums`}>{row.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={data.page} total={data.total} perPage={data.per_page} onPage={setPage} />
    </div>
  );
}
