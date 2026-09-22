export const SUPPORTED_LANGS = [
  'en',
  'he',
  'fr',
  'es',
  'ar',
  'ru',
  'de',
  'pt',
] as const

export type Lang = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_LANG: Lang = 'en'

export const RTL_LANGS: ReadonlySet<Lang> = new Set(['he', 'ar'])

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  he: 'עברית',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية',
  ru: 'Русский',
  de: 'Deutsch',
  pt: 'Português',
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value)
}
