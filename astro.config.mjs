import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import toc from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://flashblaze.xyz',
  integrations: [
    tailwind(),
    mdx({
      shikiConfig: {
        // Alternatively, provide multiple themes
        // https://shikiji.netlify.app/guide/dual-themes#light-dark-dual-themes
        themes: {
          light: 'rose-pine-dawn',
          dark: 'material-theme-darker',
        },
        wrap: true,
      },
      // https://discord.com/channels/830184174198718474/1031501044770943037/1032012597505040425
      rehypePlugins: [
        rehypeSlug,
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
    icon(),
  ],
  vite: {
    ssr: {
      noExternal: [
        '@codesandbox/sandpack-react',
        '@codesandbox/sandpack-themes',
        '@codesandbox/sandpack-client',
      ],
    },
  },
});
