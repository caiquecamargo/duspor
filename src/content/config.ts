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
    position: z.number(),
    images: z.array(image()),
  })
})

const home = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    title_en: z.string(),
    title_es: z.string(),
    titleBackground: image(),
    description: z.string(),
    description_en: z.string(),
    description_es: z.string(),
    descriptionBackgrounds: z.array(image()),
    clients: z.string(),
    clients_en: z.string(),
    clients_es: z.string(),
    images: z.array(image()),
})})

const about = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    title_en: z.string(),
    title_es: z.string(),
    titleBackground: image(),
    description: z.string(),
    description_en: z.string(),
    description_es: z.string(),
    dna: z.string(),
    dna_en: z.string(),
    dna_es: z.string(),
    values: z.array(z.object({
      title: z.string(),
      title_en: z.string(),
      title_es: z.string(),
      image: image(),
    }))
})
})

const config = defineCollection({
  type: "content",
  schema: z.object({
    email: z.string(),
    phone: z.string(),
    whatsapp: z.object({
      number: z.string(),
      message: z.string(),
    }),
    address: z.object({
      maps: z.string(),
      address: z.string(),
    }),
    instagram: z.object({
      url: z.string(),
      arroba: z.string(),
    }),
    facebook: z.object({
      url: z.string(),
      arroba: z.string(),
    }),
    linkedin: z.object({
      url: z.string(),
      arroba: z.string(),
    }),
  })
})

export const collections = {
  products,
  home,
  about,
  config
}