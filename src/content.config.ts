import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
    schema: z.object({
        name: z.string(),
        category: z.string(),
        price: z.string().optional(),
        image: z.string(),
        description : z.string().optional(),
    })
});

const reviews = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
    schema: z.object({
        author: z.string(),
        date: z.string(),
    })
});

export const collections = {
    products,
    reviews
};
