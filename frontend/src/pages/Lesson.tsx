import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api, ApiError } from '../api';
import { buttonClass, PageTitle, Spinner } from '../components/ui';
import Comments from '../components/Comments';
import SourceBadges from '../components/SourceBadges';

interface Resource {
  id: number;
  type: string;
  title: string;
  url: string;
  read: boolean;
}

interface LessonData {
  id: number;
  position: number;
  slug: string;
  title: string;
  sources: string[];
  body_md: string;
  resources: Resource[];
  completed: boolean;
  viewing_locked: boolean;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export default function Lesson() {
  const { slug } = useParams();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [locked, setLocked] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(() => {
    setLesson(null);
    setLocked(false);
    setNotFound(false);
    api<LessonData>(`/lessons/${slug}`)
      .then(setLesson)
      .catch((err: ApiError) => {
        if (err.status === 403) setLocked(true);
        else if (err.status === 404) setNotFound(true);
        else throw err;
      });
  }, [slug]);

  useEffect(load, [load]);

  const markRead = async (resource: Resource) => {
    if (resource.read || !lesson) return;
    const result = await api<{ lesson_completed: boolean }>(
      `/lessons/${lesson.id}/resources/${resource.id}/read`,
      { method: 'POST' },
    );
    setLesson({
      ...lesson,
      completed: lesson.completed || result.lesson_completed,
      resources: lesson.resources.map((r) => (r.id === resource.id ? { ...r, read: true } : r)),
    });
  };

  const markComplete = async () => {
    if (!lesson) return;
    await api(`/lessons/${lesson.id}/complete`, { method: 'POST' });
    setLesson({ ...lesson, completed: true });
  };

  if (locked) {
    return (
      <div>
        <PageTitle>Lesson locked</PageTitle>
        <p className="mt-4 text-zinc-600">
          Complete the previous lessons to unlock this one.{' '}
          <Link to="/" className="text-blue-700 underline">
            Back to the course
          </Link>
        </p>
      </div>
    );
  }
  if (notFound) {
    return (
      <div>
        <PageTitle>Lesson not found</PageTitle>
        <p className="mt-4">
          <Link to="/" className="text-blue-700 underline">
            Back to the course
          </Link>
        </p>
      </div>
    );
  }
  if (!lesson) return <Spinner label="Loading lesson" />;

  const allRead = lesson.resources.every((r) => r.read);

  return (
    <article>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-zinc-500">Lesson {lesson.position} of 240</p>
        <SourceBadges sources={lesson.sources} />
      </div>
      <PageTitle>{lesson.title}</PageTitle>
      {lesson.completed && (
        <p role="status" className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          Completed
        </p>
      )}
      {lesson.viewing_locked && (
        <p role="status" className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          Admin preview — this lesson is still locked for you, so progress tracking is disabled.
        </p>
      )}

      <div className="prose prose-zinc mt-6 max-w-none">
        <ReactMarkdown>{lesson.body_md}</ReactMarkdown>
      </div>

      {lesson.resources.length > 0 ? (
        <section aria-labelledby="resources-heading" className="mt-8">
          <h2 id="resources-heading" className="text-lg font-semibold">
            Resources
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Mark every resource as read to complete this lesson{lesson.completed ? ' — done!' : '.'}
          </p>
          <ul className="mt-3 space-y-2">
            {lesson.resources.map((resource) => (
              <li key={resource.id} className="flex items-center gap-3 rounded-md border border-zinc-200 p-3">
                <button
                  onClick={() => markRead(resource)}
                  aria-pressed={resource.read}
                  disabled={resource.read || lesson.viewing_locked}
                  aria-label={`Mark "${resource.title}" as read`}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    resource.read ? 'border-green-600 bg-green-600 text-white' : 'border-zinc-300 bg-white hover:border-blue-500'
                  }`}
                >
                  {resource.read && (
                    <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06l2.72 2.72 6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  )}
                </button>
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs uppercase tracking-wide text-zinc-500">
                  {resource.type}
                </span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 underline"
                >
                  {resource.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        !lesson.completed &&
        !lesson.viewing_locked && (
          <div className="mt-8">
            <button onClick={markComplete} className={buttonClass}>
              Mark lesson as complete
            </button>
          </div>
        )
      )}

      <nav aria-label="Lesson navigation" className="mt-10 flex justify-between gap-4 border-t border-zinc-200 pt-4 text-sm">
        {lesson.prev ? (
          <Link to={`/lessons/${lesson.prev.slug}`} className="text-blue-700 underline">
            ← {lesson.prev.title}
          </Link>
        ) : (
          <span />
        )}
        {lesson.next &&
          (lesson.completed || allRead || lesson.viewing_locked ? (
            <Link to={`/lessons/${lesson.next.slug}`} className="text-right text-blue-700 underline">
              {lesson.next.title} →
            </Link>
          ) : (
            <span aria-disabled="true" className="flex items-center gap-1 text-right text-zinc-400">
              {lesson.next.title} <span className="sr-only">(locked)</span>
              <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <path d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5A1.5 1.5 0 0 1 12.5 15h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
              </svg>
            </span>
          ))}
      </nav>

      <Comments lessonId={lesson.id} />
    </article>
  );
}
