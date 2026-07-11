import { persistentAtom } from '@nanostores/persistent';

export interface TopicProgress {
  done: boolean;
  resources: Record<string, boolean>; // keyed by resource URL
}
export interface Progress {
  topics: Record<string, TopicProgress>;
}

const codec = { encode: JSON.stringify, decode: JSON.parse };

export const $progress = persistentAtom<Progress>('aic:progress', { topics: {} }, codec);
export const $lastVisited = persistentAtom<string>('aic:last-visited', '');

export function toggleResource(slug: string, url: string) {
  const p = structuredClone($progress.get());
  const t = (p.topics[slug] ??= { done: false, resources: {} });
  t.resources[url] = !t.resources[url];
  $progress.set(p);
}

export function setTopicDone(slug: string, done: boolean) {
  const p = structuredClone($progress.get());
  const t = (p.topics[slug] ??= { done: false, resources: {} });
  t.done = done;
  $progress.set(p);
}

// For vanilla decorator scripts (no React) — same storage, one reader.
export function readProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem('aic:progress') ?? '') as Progress;
  } catch {
    return { topics: {} };
  }
}

export const countDone = (p: Progress, slugs: string[]) =>
  slugs.filter((s) => p.topics[s]?.done).length;
