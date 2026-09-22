import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { navLinkHrefs, navLinkIds } from '../data/content'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLangPath } from '../hooks/useLangPath'
import { DEFAULT_LANG, isLang } from '../i18n/languages'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()
  const { lang } = useParams()
  const home = useLangPath('/')
  const currentLang = isLang(lang) ? lang : DEFAULT_LANG

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[60] border-b border-[#102039] bg-[#050A14]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-[15px] xl:gap-3 xl:px-[15px]">
          <Link to={home} className="shrink-0">
            <img
              src="/assets/logo-wide.png"
              alt="Sentra AI"
              className="h-auto w-[100px] object-contain md:w-[160px] xl:w-[200px]"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            {navLinkIds.map((id) => (
              <a
                key={id}
                href={`/${currentLang}${navLinkHrefs[id]}`}
                className="mx-1.5 whitespace-nowrap text-[12px] font-normal tracking-[0.02em] text-white transition hover:text-[#06B1F4] 2xl:mx-2.5 2xl:text-sm"
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 xl:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <a
              href={`/${currentLang}#DEMO`}
              className="hidden whitespace-nowrap rounded-xl border border-[#139BFF] bg-[#139BFF] px-3 py-2 text-xs font-bold text-white shadow-[0px_14px_34px_0px_rgba(19,155,255,0.25)] transition hover:bg-gradient-to-b hover:from-[#06B1F4] hover:to-[#0459E0] sm:inline-flex xl:px-4 xl:py-2.5 xl:text-sm"
            >
              {t('nav.scheduleDemo')}
            </a>
            <button
              type="button"
              className="inline-flex rounded-xl border border-white/20 p-2 text-white xl:hidden"
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[#102039] bg-[#050A14] px-5 py-4 xl:hidden">
            <div className="flex flex-col gap-3">
              {navLinkIds.map((id) => (
                <a
                  key={id}
                  href={`/${currentLang}${navLinkHrefs[id]}`}
                  className="py-1 text-sm text-white"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
              <LanguageSwitcher compact />
              <a
                href={`/${currentLang}#DEMO`}
                className="mt-2 inline-flex justify-center rounded-xl bg-[#139BFF] px-5 py-3 text-sm font-bold whitespace-nowrap text-white"
                onClick={() => setOpen(false)}
              >
                {t('nav.scheduleDemo')}
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="h-[70px] md:h-[78px]" aria-hidden />
    </>
  )
}
