import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    category: z.string(),
    status: z.string(),
    year: z.number(),
    role: z.string(),
    featured: z.boolean(),
    visibility: z.string(),
    order: z.number(),
    summary: z.string(),
    responsibilities: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string()
        })
      )
      .default([]),
    image: z.string(),
    imageAlt: z.string(),
    downloads: z.array(z.string()).default([])
  })
});

const localizedText = z.object({
  zh: z.string().optional(),
  en: z.string().optional()
});

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: localizedText,
    summary: localizedText,
    date: z.string(),
    category: localizedText,
    tags: z.array(z.string()).default([]),
    visibility: z.string(),
    featured: z.boolean().default(false),
    languageStatus: z
      .object({
        zh: z.string().optional(),
        en: z.string().optional()
      })
      .default({})
  })
});

export const collections = { projects, articles };
