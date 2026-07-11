import { useEffect, useRef, useState } from 'react';

type Entry = { slug: string; title: string; module: string };

function score(title: string, q: string): number {
  const t = title.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 50;
  // every query word must prefix-match some title word
  const words = t.split(/[^a-z0-9]+/);
  const qWords = q.split(/\s+/).filter(Boolean);
  if (qWords.every((qw) => words.some((w) => w.startsWith(qw)))) return 25;
  if (t.includes(q)) return 10;
  return 0;
}

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onTrigger = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    const trigger = document.getElementById('search-trigger');
    trigger?.addEventListener('click', onTrigger);
    return () => {
      window.removeEventListener('keydown', onKey);
      trigger?.removeEventListener('click', onTrigger);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      if (!index) {
        fetch('/search-index.json')
          .then((r) => r.json())
          .then(setIndex)
          .catch(() => setIndex([]));
      }
    }
  }, [open, index]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const results = q && index
    ? index
        .map((e) => ({ e, s: score(e.title, q) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 10)
        .map((r) => r.e)
    : [];

  const go = (slug: string) => {
    setOpen(false);
    window.location.href = `/topics/${slug}/`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-zinc-950/40 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search topics"
    >
      <div
        className="mx-auto max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter' && results[active]) {
              go(results[active].slug);
            }
          }}
          placeholder="Search topics…"
          className="w-full border-b border-zinc-200 bg-transparent px-4 py-3 text-base outline-none placeholder:text-zinc-400 dark:border-zinc-700"
        />
        <ul className="max-h-80 overflow-y-auto p-2">
          {q && results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-zinc-500">
              {index ? 'No topics found.' : 'Loading…'}
            </li>
          )}
          {results.map((r, i) => (
            <li key={r.slug}>
              <button
                type="button"
                onClick={() => go(r.slug)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                  i === active
                    ? 'bg-accent-600 text-white'
                    : 'text-zinc-700 dark:text-zinc-200'
                }`}
              >
                <span className="truncate">{r.title}</span>
                <span className={`shrink-0 text-xs ${i === active ? 'text-white/70' : 'text-zinc-400'}`}>
                  {r.module}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
