import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import toc from '@jsdevtools/rehype-toc';
import remarkSlug from 'remark-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://flashblaze.xyz',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  integrations: [
    tailwind(),
    mdx({
      remarkPlugins: [remarkSlug],
      // https://discord.com/channels/830184174198718474/1031501044770943037/1032012597505040425
      rehypePlugins: [
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            test: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          },
        ],
        [
          toc,
          {
            headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          },
        ],
      ],
      extendPlugins: 'astroDefaults', // If set to false, features like autolinking from GFM aren't applied
    }),
    react(),
    sitemap(),
    image(),
  ],
  vite: {
    ssr: {
      noExternal: ['@fontsource/montserrat', '@fontsource/jetbrains-mono'],
    },
  },
});
