// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://the-ai-course.hurayraiit.com',
  output: 'static',
  prerenderConflictBehavior: 'error',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});