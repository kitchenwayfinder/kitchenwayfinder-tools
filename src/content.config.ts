// Content collections for the tools section.
//
// Variation data lives here as JSON files; adding a variation means adding
// a data file, not writing a new page by hand. Tool pages are generated
// from these collections with getStaticPaths() (one static page per
// variation). The pilot engine (Ingredient Weight Converter) is the first
// collection to be filled in.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const engines = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/engines' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    description: z.string(),
  }),
});

const variations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/variations' }),
  schema: z.object({
    engine: z.string(),
    name: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { engines, variations };
