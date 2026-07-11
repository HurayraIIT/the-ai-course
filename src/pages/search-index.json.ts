import type { APIRoute } from 'astro';
import { getOrderedTopics, modules } from '../lib/course';

export const GET: APIRoute = async () => {
  const moduleTitle = new Map(modules.map((m) => [m.slug, m.title]));
  const topics = await getOrderedTopics();
  const index = topics.map((t) => ({
    slug: t.id,
    title: t.data.title,
    module: moduleTitle.get(t.data.module),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
