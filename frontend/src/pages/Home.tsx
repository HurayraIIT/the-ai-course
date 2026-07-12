import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth';
import { PageTitle, Spinner } from '../components/ui';
import SourceBadges from '../components/SourceBadges';

interface OutlineLesson {
  position: number;
  slug: string;
  title: string;
  sources: string[];
  resource_count: number;
  completed?: boolean;
  unlocked?: boolean;
}

interface OutlineModule {
  slug: string;
  title: string;
  description: string;
  lessons: OutlineLesson[];
}

interface Outline {
  authenticated: boolean;
  completed_count: number | null;
  total_lessons: number;
  modules: OutlineModule[];
}

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="shrink-0 text-emerald-600"
    >
      <path d="M2.5 5.5A1.5 1.5 0 0 1 4 4h3.8a1.5 1.5 0 0 1 1.06.44l1.2 1.12H16a1.5 1.5 0 0 1 1.5 1.5v7.44A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      className={`shrink-0 text-zinc-400 transition-transform ${open ? '' : 'rotate-180'}`}
    >
      <path d="M3.22 10.53a.75.75 0 0 0 1.06 0L8 6.81l3.72 3.72a.75.75 0 1 0 1.06-1.06l-4.25-4.25a.75.75 0 0 0-1.06 0L3.22 9.47a.75.75 0 0 0 0 1.06Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="shrink-0 text-zinc-300">
      <path d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5A1.5 1.5 0 0 1 12.5 15h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="shrink-0 text-amber-500">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm.75 2.25a.75.75 0 0 0-1.5 0V8c0 .2.08.39.22.53l2 2a.75.75 0 1 0 1.06-1.06L8.75 7.69V4.75Z" />
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

/** The module containing the frontier lesson (next to work on); guests get the first module. */
function currentModuleSlug(outline: Outline): string | null {
  const frontier = (outline.completed_count ?? 0) + 1;
  for (const module of outline.modules) {
    if (module.lessons.some((lesson) => lesson.position === frontier)) {
      return module.slug;
    }
  }
  return outline.modules.at(-1)?.slug ?? null; // all lessons done
}

export default function Home() {
  const { user } = useAuth();
  const [outline, setOutline] = useState<Outline | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    api<Outline>('/outline').then((data) => {
      setOutline(data);
      const current = currentModuleSlug(data);
      setOpen(new Set(current ? [current] : []));
    });
  }, [user]);

  if (!outline) return <Spinner label="Loading course" />;

  const toggle = (slug: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const pct =
    outline.completed_count !== null
      ? Math.round((outline.completed_count / outline.total_lessons) * 100)
      : null;
  const frontier = (outline.completed_count ?? 0) + 1;

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

      <div className="mt-8 space-y-4">
        {outline.modules.map((module, mi) => {
          const isOpen = open.has(module.slug);
          const panelId = `module-panel-${module.slug}`;
          return (
            <section key={module.slug} className="overflow-hidden rounded-xl border border-zinc-200">
              <h2>
                <button
                  onClick={() => toggle(module.slug)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
                >
                  <FolderIcon />
                  <span className="flex-1 text-base font-semibold">
                    Module {mi + 1}: {module.title}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>
              </h2>
              {isOpen && (
                <div id={panelId}>
                  <p className="border-t border-zinc-100 px-5 py-3 text-sm text-zinc-500">{module.description}</p>
                  <ol>
                    {module.lessons.map((lesson) => {
                      const locked = outline.authenticated ? !lesson.unlocked : true;
                      const pending =
                        !locked &&
                        !lesson.completed &&
                        outline.completed_count !== null &&
                        lesson.position <= frontier;
                      const number = String(lesson.position).padStart(2, '0');
                      const inner = (
                        <>
                          <span className="flex w-5 shrink-0 justify-center">
                            {lesson.completed ? <CheckIcon /> : pending ? <PendingIcon /> : locked ? <LockIcon /> : null}
                          </span>
                          <span aria-hidden="true" className="w-8 shrink-0 font-mono text-xs text-zinc-400">
                            {number}
                          </span>
                          <span className="flex-1">{lesson.title}</span>
                          <SourceBadges sources={lesson.sources} />
                          {locked && <span className="sr-only">(locked)</span>}
                          {pending && <span className="sr-only">(in progress)</span>}
                          {lesson.completed && <span className="sr-only">(completed)</span>}
                        </>
                      );
                      return (
                        <li key={lesson.slug} className="border-t border-zinc-100 text-sm">
                          {locked ? (
                            <span aria-disabled="true" className="flex items-center gap-3 px-5 py-3 text-zinc-400">
                              {inner}
                            </span>
                          ) : (
                            <Link
                              to={`/lessons/${lesson.slug}`}
                              className="flex items-center gap-3 px-5 py-3 text-zinc-800 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
                            >
                              {inner}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
