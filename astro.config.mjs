// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://the-ai-course.pages.dev',
  output: 'static',
  prerenderConflictBehavior: 'error',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
