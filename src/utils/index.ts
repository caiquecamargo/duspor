import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

export const even = (index: number) => index % 2 === 0;

export const renderCollection = async <T extends CollectionKey>(key: T, filter?: (item: CollectionEntry<T>) => any): Promise<[any, CollectionEntry<T>['data'] & { slug: string }][]> => {
  const collection = await getCollection(key, filter)

  return await (Promise.all(
    collection.map(async (entry: any) => {
      const { Content } = await entry.render();
      return [Content, { ...entry.data, slug: entry.slug }];
    })
  ))
}

export const renderCollectionEntries = async <T extends CollectionKey>(collection: CollectionEntry<T>[]): Promise<[any, CollectionEntry<T>['data']][]> => {
  
  return await (Promise.all(
    collection.map(async (entry: any) => {
      const { Content } = await entry.render();
      return [Content, entry.data];
    })
  )) as [any, CollectionEntry<T>['data']][]
}

export const generateId = (prepend?: string) => {
  return `${prepend ? prepend + '-' : ''}${Math.random().toString(36).substring(2, 9)}`;
}

export const ifRequired = (required?: boolean, placeholder?: string) => {
  return `${placeholder}${required ? ' (obrigatório)' : ''}`
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('pt-BR', { dateStyle: 'short' })
}

export const generateWhatsappLink = (number: string, message: string) => {
  const clenedNumber = number.replace(/\D/g, '')
  
  return `https://wa.me/${clenedNumber}?text=${encodeURIComponent(message)}`
}