import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import toc from '@jsdevtools/rehype-toc';
import remarkSlug from 'remark-slug';
import { astroImageTools } from 'astro-imagetools';
import vitesseLightSoft from './vitesse-light-soft.json';
import vitesseDarkSoft from './vitesse-dark-soft.json';

// https://astro.build/config
export default defineConfig({
  site: 'https://flashblaze.xyz',
  markdown: {
    shikiConfig: {
      // Alternatively, provide multiple themes
      // https://shikiji.netlify.app/guide/dual-themes#light-dark-dual-themes
      experimentalThemes: {
        light: vitesseLightSoft,
        dark: vitesseDarkSoft,
      },
      wrap: true,
    },
  },
  integrations: [
    astroImageTools,
    tailwind(),
    mdx({
      shikiConfig: {
        // Alternatively, provide multiple themes
        // https://shikiji.netlify.app/guide/dual-themes#light-dark-dual-themes
        experimentalThemes: {
          light: vitesseLightSoft,
          dark: vitesseDarkSoft,
        },
        wrap: true,
      },
      remarkPlugins: [remarkSlug],
      // https://discord.com/channels/830184174198718474/1031501044770943037/1032012597505040425
      rehypePlugins: [
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
          },
        ],
        toc,
      ],
      extendMarkdownConfig: false,
      smartypants: true,
      gfm: true,
    }),
    react(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: [
        '@fontsource/poppins',
        '@fontsource-variable/source-code-pro',
        '@codesandbox/sandpack-react',
        '@codesandbox/sandpack-themes',
        '@codesandbox/sandpack-client',
      ],
    },
  },
});
