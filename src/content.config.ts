import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const topics = defineCollection({
  loader: glob({
    base: './src/content/topics',
    pattern: '**/*.md',
    // Flat, stable IDs: URLs survive module reshuffles
    generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    module: z.string(),
    order: z.number(),
    sources: z.array(z.enum(['ai-engineer', 'ai-agents', 'prompt-engineering'])),
    resources: z
      .array(
        z.object({
          type: z.enum(['article', 'official', 'video', 'course', 'opensource', 'roadmap']),
          title: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
  }),
});

export const collections = { topics };
