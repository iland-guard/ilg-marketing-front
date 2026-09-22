import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANG, SUPPORTED_LANGS } from './languages'

import en from './locales/en.json'
import he from './locales/he.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import ar from './locales/ar.json'
import ru from './locales/ru.json'
import de from './locales/de.json'
import pt from './locales/pt.json'

/** Explicit user choice only — never browser locale (that was forcing Hebrew). */
export const LANG_STORAGE_KEY = 'sentra_lang_choice'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
    fr: { translation: fr },
    es: { translation: es },
    ar: { translation: ar },
    ru: { translation: ru },
    de: { translation: de },
    pt: { translation: pt },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: [...SUPPORTED_LANGS],
  interpolation: { escapeValue: false },
})

export default i18n
