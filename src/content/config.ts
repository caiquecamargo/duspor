import { defineCollection, z } from 'astro:content'

const products = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    title_en: z.string(),
    title_es: z.string(),
    body_en: z.string(),
    body_es: z.string(),
    applications: z.array(z.string()).optional(),
    applications_en: z.array(z.string()).optional(),
    applications_es: z.array(z.string()).optional(),
    position: z.number(),
    youtube: z.ostring(),
    manuals: z.array(z.object({
      title: z.string(),
      link: z.string(),
    })).optional(),
    images: z.array(image()),
    subproducts: z.array(z.object({
      title: z.string(),
      title_en: z.string(),
      title_es: z.string(),
      description: z.ostring(),
      description_en: z.ostring(),
      description_es: z.ostring(),
      youtube: z.ostring(),
      images: z.array(image()),
    })).optional()
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
    testimonialsTitle: z.string(),
    testimonialsTitle_en: z.string(),
    testimonialsTitle_es: z.string(),
    testimonials: z.array(z.object({
      name: z.ostring(),
      testimonial: z.string(),
      testimonial_en: z.string(),
      testimonial_es: z.string(),
    })),
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
    mission: z.string(),
    mission_en: z.string(),
    mission_es: z.string(),
    vision: z.string(),
    vision_en: z.string(),
    vision_es: z.string(),
    values: z.string(),
    values_en: z.string(),
    values_es: z.string(),
    dna: z.string(),
    dna_en: z.string(),
    dna_es: z.string(),
    dnas: z.array(z.object({
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
    siteDescription: z.string(),
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

const blog = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    title_en: z.string(),
    title_es: z.string(),
    images: z.array(image()).nullable(),
    body_en: z.string(),
    body_es: z.string(),
    date: z.string(),
  })
})

export const collections = {
  products,
  home,
  about,
  blog,
  config
}