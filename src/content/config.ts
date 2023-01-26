import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform(str => new Date(str)),
  }),
});

export const collections = {
  posts: postsCollection,
};
