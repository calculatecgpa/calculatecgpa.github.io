import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://calculatecgpa.github.io',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  output: 'static',
});
