import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.string().transform((str: string) => new Date(str)),
  }),
});

export const collections = {
  posts: postsCollection,
};
