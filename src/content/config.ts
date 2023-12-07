import { defineCollection, z } from 'astro:content'

const products = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    title_en: z.string(),
    title_es: z.string(),
    body_en: z.string(),
    body_es: z.string(),
    applications: z.array(z.string()),
    applications_en: z.array(z.string()),
    applications_es: z.array(z.string()),
    images: z.array(image()),
  })
})

export const collections = {
  products,
}