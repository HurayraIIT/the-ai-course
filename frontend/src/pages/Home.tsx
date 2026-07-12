import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth';
import { PageTitle, Spinner } from '../components/ui';

interface OutlineLesson {
  position: number;
  slug: string;
  title: string;
  resource_count: number;
  completed?: boolean;
  unlocked?: boolean;
}

interface Outline {
  authenticated: boolean;
  completed_count: number | null;
  total_lessons: number;
  modules: { slug: string; title: string; description: string; lessons: OutlineLesson[] }[];
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="shrink-0">
      <path d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5A1.5 1.5 0 0 1 12.5 15h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="shrink-0 text-green-600">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06l2.72 2.72 6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [outline, setOutline] = useState<Outline | null>(null);

  useEffect(() => {
    api<Outline>('/outline').then(setOutline);
  }, [user]);

  if (!outline) return <Spinner label="Loading course" />;

  const pct =
    outline.completed_count !== null
      ? Math.round((outline.completed_count / outline.total_lessons) * 100)
      : null;

  return (
    <div>
      <PageTitle>The AI Course</PageTitle>
      {outline.authenticated && pct !== null ? (
        <div className="mt-4">
          <p className="text-sm text-zinc-600">
            {outline.completed_count} of {outline.total_lessons} lessons completed ({pct}%)
          </p>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Course progress"
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200"
          >
            <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-md bg-blue-50 p-4 text-sm text-blue-900">
          Lessons unlock one at a time as you complete them.{' '}
          <Link to="/register" className="font-medium underline">
            Create a free account
          </Link>{' '}
          to start learning and track your progress.
        </p>
      )}

      <ol className="mt-8 space-y-8">
        {outline.modules.map((module, mi) => (
          <li key={module.slug}>
            <h2 className="text-lg font-semibold">
              {mi + 1}. {module.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">{module.description}</p>
            <ol className="mt-3 divide-y divide-zinc-100 rounded-md border border-zinc-200">
              {module.lessons.map((lesson) => {
                const locked = outline.authenticated ? !lesson.unlocked : true;
                const inner = (
                  <span className="flex items-center gap-2">
                    {lesson.completed ? <CheckIcon /> : locked ? <LockIcon /> : null}
                    <span>{lesson.title}</span>
                    {locked && <span className="sr-only">(locked)</span>}
                    {lesson.completed && <span className="sr-only">(completed)</span>}
                  </span>
                );
                return (
                  <li key={lesson.slug} className="text-sm">
                    {locked ? (
                      <span aria-disabled="true" className="flex items-center justify-between px-3 py-2 text-zinc-400">
                        {inner}
                      </span>
                    ) : (
                      <Link
                        to={`/lessons/${lesson.slug}`}
                        className="flex items-center justify-between px-3 py-2 text-zinc-800 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
