import { useParams } from 'react-router-dom'
import { DEFAULT_LANG, isLang } from '../i18n/languages'

export function useLangPath(path: string) {
  const { lang } = useParams()
  const current = isLang(lang) ? lang : DEFAULT_LANG
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${current}${clean === '/' ? '' : clean}`
}
