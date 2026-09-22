import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { Footer } from './Footer'
import { DEFAULT_LANG, isLang, RTL_LANGS, type Lang } from '../i18n/languages'
import { LANG_STORAGE_KEY } from '../i18n'

export function LangLayout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const valid = isLang(lang)

  useEffect(() => {
    if (!valid || !lang) return
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang)
    }
    document.documentElement.lang = lang
    document.documentElement.dir = RTL_LANGS.has(lang as Lang) ? 'rtl' : 'ltr'
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, i18n, valid])

  if (!valid) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
