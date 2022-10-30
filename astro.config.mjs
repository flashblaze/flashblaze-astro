import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  site: 'https://flashblaze.xyz',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  integrations: [tailwind(), mdx(), react(), sitemap(), image()],
  vite: {
    ssr: {
      noExternal: ['@fontsource/montserrat', '@fontsource/jetbrains-mono'],
    },
  },
});
