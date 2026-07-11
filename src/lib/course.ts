import { getCollection, type CollectionEntry } from 'astro:content';
import { modules } from '../data/curriculum';

export type Topic = CollectionEntry<'topics'>;

// Flat course order: curriculum module order, then topic order within module.
export async function getOrderedTopics(): Promise<Topic[]> {
  const moduleIndex = new Map(modules.map((m, i) => [m.slug, i]));
  const all = await getCollection('topics');
  return all.sort(
    (a, b) =>
      moduleIndex.get(a.data.module)! - moduleIndex.get(b.data.module)! || a.data.order - b.data.order
  );
}

export { modules };
