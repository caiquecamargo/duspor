import type { RecursiveAccessKeyOf } from '@caiquecamargo/utils/core';
import { getProp } from '@caiquecamargo/utils/core';
import { match } from 'ts-pattern';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

export const locales = ['pt', 'en', 'es'] as const
export type Locales = typeof locales[number]
export type TranslationKey = RecursiveAccessKeyOf<typeof pt>

export const $t = (key: TranslationKey, locale: Locales = "pt") => {
  const lang = {
    pt,
    en,
    es
  }[locale]

  return getProp(lang, key) as string
}

export const getLangObject = (locale: Locales = "pt") => {
  return {
    pt,
    en,
    es
  }[locale]
}

export const resolveLocaleURL = (key: TranslationKey, locale: Locales = "pt") => {
  return match($t(key, locale))
    .when((url) => url.startsWith("/"), (url) => `/${locale}${url}`)
    .otherwise((url) => `/${locale}/${url}`)
}

export const resolvePropByLocale = <T extends Record<string, unknown>>(obj: T, prop: RecursiveAccessKeyOf<T>, locale: Locales = "pt"): string => {
  return match(locale)
    .with("pt", () => getProp(obj, prop))
    .with("en", () => getProp(obj, `${prop}_en` as RecursiveAccessKeyOf<T>))
    .with("es", () => getProp(obj, `${prop}_es` as RecursiveAccessKeyOf<T>))
    .otherwise(() => getProp(obj, prop)) as string
}

export const translateRoute = (route: string, from: Locales, to: Locales): string => {
  const rootRoute = match(route)
    .with($t("routes.about.page", from), () => $t("routes.about.page", to))
    .with($t("routes.products.page", from), () => $t("routes.products.page", to))
    .with($t("routes.budget.page", from), () => $t("routes.budget.page", to))
    .with($t("routes.contact.page", from), () => $t("routes.contact.page", to))
    .with($t("routes.success.page", from), () => $t("routes.success.page", to))
    .otherwise(() => route)

  return rootRoute ?? ""
}