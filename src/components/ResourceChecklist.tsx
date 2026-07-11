import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { $lastVisited, $progress, setTopicDone, toggleResource } from '../lib/progress';

interface Resource {
  type: 'article' | 'official' | 'video' | 'course' | 'opensource' | 'roadmap';
  title: string;
  url: string;
}
interface Props {
  slug: string;
  resources: Resource[];
}

const TYPE_LABEL: Record<Resource['type'], string> = {
  article: 'Article',
  official: 'Official docs',
  video: 'Video',
  course: 'Course',
  opensource: 'Open source',
  roadmap: 'Roadmap',
};

const TYPE_BADGE: Record<Resource['type'], string> = {
  article: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  official: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  video: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  course: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  opensource: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  roadmap: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300',
};

export default function ResourceChecklist({ slug, resources }: Props) {
  const progress = useStore($progress);
  const [filter, setFilter] = useState<Resource['type'] | 'all'>('all');

  useEffect(() => {
    $lastVisited.set(slug);
  }, [slug]);

  const topic = progress.topics[slug];
  const checked = resources.filter((r) => topic?.resources[r.url]).length;
  const types = [...new Set(resources.map((r) => r.type))];
  const visible = filter === 'all' ? resources : resources.filter((r) => r.type === filter);

  return (
    <section className="mt-8">
      {resources.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Resources</h2>
            <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
              {checked}/{resources.length} completed
            </span>
          </div>

          {types.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter resources by type">
              {(['all', ...types] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filter === t
                      ? 'bg-accent-600 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                  }`}
                >
                  {t === 'all' ? 'All' : TYPE_LABEL[t]}
                </button>
              ))}
            </div>
          )}

          <ul className="mt-4 space-y-2">
            {visible.map((r) => {
              const isChecked = !!topic?.resources[r.url];
              return (
                <li
                  key={r.url}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleResource(slug, r.url)}
                    aria-label={`Mark "${r.title}" as completed`}
                    className="mt-1 size-4 shrink-0 accent-accent-600"
                  />
                  <div className="min-w-0">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium underline-offset-2 hover:underline ${
                        isChecked ? 'text-zinc-400 line-through dark:text-zinc-500' : ''
                      }`}
                    >
                      {r.title}
                    </a>
                    <span className={`ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[10px] font-medium ${TYPE_BADGE[r.type]}`}>
                      {TYPE_LABEL[r.type]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <button
        type="button"
        onClick={() => setTopicDone(slug, !topic?.done)}
        className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:w-auto ${
          topic?.done
            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25'
            : 'bg-accent-600 text-white hover:bg-accent-700'
        }`}
      >
        {topic?.done ? '✓ Completed — tap to undo' : 'Mark topic as complete'}
      </button>
    </section>
  );
}
