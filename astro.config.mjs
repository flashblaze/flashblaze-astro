import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  site: 'https://flashblaze.xyz',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    image(),
  ],
  vite: {
    ssr: {
      noExternal: ['@fontsource/urbanist'],
    },
  },
});
