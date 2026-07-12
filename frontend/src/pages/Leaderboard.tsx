import { useEffect, useState } from 'react';
import { api } from '../api';
import { Avatar, PageTitle, Spinner } from '../components/ui';

interface Row {
  rank: number;
  username: string;
  avatar_hash: string;
  completed: number;
  is_me: boolean;
}

export default function Leaderboard() {
  const [data, setData] = useState<{ leaderboard: Row[]; total_lessons: number } | null>(null);

  useEffect(() => {
    api('/leaderboard').then(setData);
  }, []);

  if (!data) return <Spinner label="Loading leaderboard" />;

  return (
    <div>
      <PageTitle>Leaderboard</PageTitle>
      <p className="mt-2 text-sm text-zinc-600">
        Ranked by completed lessons out of {data.total_lessons}. You can opt out in Settings.
      </p>
      <table className="mt-6 w-full text-left text-sm">
        <caption className="sr-only">Global leaderboard, ranked by completed lessons</caption>
        <thead>
          <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500">
            <th scope="col" className="py-2 pr-2">
              Rank
            </th>
            <th scope="col" className="py-2 pr-2">
              Learner
            </th>
            <th scope="col" className="py-2 text-right">
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((row) => (
            <tr
              key={row.rank}
              className={`border-b border-zinc-100 ${row.is_me ? 'bg-blue-50 font-medium' : ''}`}
            >
              <td className="py-2 pr-2">{row.rank}</td>
              <td className="py-2 pr-2">
                <span className="flex items-center gap-2">
                  <Avatar hash={row.avatar_hash} username={row.username} size={28} />
                  {row.username}
                  {row.is_me && <span className="text-xs text-blue-700">(you)</span>}
                </span>
              </td>
              <td className="py-2 text-right tabular-nums">{row.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
