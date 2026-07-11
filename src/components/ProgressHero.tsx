import { useStore } from '@nanostores/react';
import { $lastVisited, $progress } from '../lib/progress';

interface Props {
  topics: { slug: string; title: string }[]; // full course order
}

export default function ProgressHero({ topics }: Props) {
  const progress = useStore($progress);
  const lastVisited = useStore($lastVisited);

  const done = topics.filter((t) => progress.topics[t.slug]?.done).length;
  const pct = Math.round((done / topics.length) * 100);
  // Resume at last visited topic, else the first incomplete one
  const resume = topics.find((t) => t.slug === lastVisited) ?? topics.find((t) => !progress.topics[t.slug]?.done);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Your progress</p>
        <p className="text-sm font-semibold tabular-nums">
          {done}/{topics.length} topics · {pct}%
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div className="h-full rounded-full bg-accent-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
      {resume && (
        <a
          href={`/topics/${resume.slug}/`}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700"
        >
          {done === 0 ? 'Start the course' : 'Continue'}
          <span className="max-w-48 truncate font-normal text-white/80">· {resume.title}</span>
        </a>
      )}
      {!resume && done === topics.length && (
        <p className="mt-4 text-sm font-medium text-accent-600 dark:text-accent-400">
          🎉 Course complete — nice work!
        </p>
      )}
    </div>
  );
}
