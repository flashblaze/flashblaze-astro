import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkAlert } from 'remark-github-blockquote-alert';
import toc from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://flashblaze.xyz',
  // Astro 7 defaults Markdown to the native (Sätteri) pipeline. Opt back into
  // the remark/rehype processor so our unified plugins run; MDX inherits it.
  markdown: {
    // https://shikiji.netlify.app/guide/dual-themes#light-dark-dual-themes
    shikiConfig: {
      themes: {
        light: 'rose-pine-dawn',
        dark: 'material-theme-darker',
      },
      wrap: true,
    },
    processor: unified({
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
      remarkPlugins: [remarkAlert],
      smartypants: true,
      gfm: true,
    }),
  },
  integrations: [mdx(), react(), sitemap(), icon()],
  vite: {
    ssr: {
      noExternal: [
        '@codesandbox/sandpack-react',
        '@codesandbox/sandpack-themes',
        '@codesandbox/sandpack-client',
      ],
    },
    plugins: [tailwindcss()],
  },
});
