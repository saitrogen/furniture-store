import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['living-room', 'bedroom', 'dining', 'storage', 'seating', 'combo']),
    price: z.number(),
    originalPrice: z.number().optional(),   // for sale items
    material: z.string(),
    dimensions: z.string(),
    warranty: z.string(),
    featured: z.boolean().default(false),
    coverImage: z.string(),
    images: z.array(z.string()).default([]),
    whatsapp: z.string().default('919961612120'),
    relatedSlugs: z.array(z.string()).default([]),
  }),
});

const combos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/combos' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    items: z.array(z.string()),
    originalPrice: z.number(),
    salePrice: z.number(),
    whatsapp: z.string().default('919961612120'),
  }),
});

export const collections = { products, combos };