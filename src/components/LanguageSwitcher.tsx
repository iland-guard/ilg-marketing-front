import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Globe } from 'lucide-react'
import {
  DEFAULT_LANG,
  LANG_LABELS,
  SUPPORTED_LANGS,
  isLang,
  type Lang,
} from '../i18n/languages'

function swapLangInPath(pathname: string, nextLang: Lang): string {
  const parts = pathname.split('/')
  if (parts.length > 1 && isLang(parts[1])) {
    parts[1] = nextLang
    return parts.join('/') || `/${nextLang}`
  }
  return `/${nextLang}${pathname === '/' ? '' : pathname}`
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const current = isLang(lang) ? lang : DEFAULT_LANG
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  function select(next: Lang) {
    setOpen(false)
    if (next === current) return
    const nextPath = swapLangInPath(location.pathname, next)
    navigate(`${nextPath}${location.hash}${location.search}`)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-2.5 py-2 text-sm text-white transition hover:border-[#139BFF] hover:text-[#06B1F4] ${
          compact ? 'w-full justify-between' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe className="size-4 shrink-0 opacity-80" />
          <span>{LANG_LABELS[current]}</span>
        </span>
        <ChevronDown
          className={`size-4 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-[70] mt-2 max-h-72 w-44 overflow-auto rounded-xl border border-[#1E3554] bg-[#0B1424] py-1 shadow-xl ${
            compact ? 'left-0 right-0 w-full' : 'end-0'
          }`}
        >
          {SUPPORTED_LANGS.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === current}
                className={`flex w-full px-3 py-2 text-left text-sm transition hover:bg-white/5 ${
                  code === current ? 'text-[#139BFF]' : 'text-white'
                }`}
                onClick={() => select(code)}
              >
                {LANG_LABELS[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
