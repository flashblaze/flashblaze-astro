import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import toc from '@jsdevtools/rehype-toc';
import remarkSlug from 'remark-slug';
import { astroImageTools } from 'astro-imagetools';

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
    astroImageTools,
    tailwind(),
    mdx({
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
        '@fontsource/montserrat',
        '@fontsource/jetbrains-mono',
        '@codesandbox/sandpack-react',
        '@codesandbox/sandpack-themes',
        '@codesandbox/sandpack-client',
      ],
    },
  },
});
