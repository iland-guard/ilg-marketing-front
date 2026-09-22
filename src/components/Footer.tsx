import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'

export function Footer() {
  const { t } = useTranslation()
  const home = useLangPath('/')
  const privacy = useLangPath('/privacy-policy')
  const terms = useLangPath('/terms')
  const siteRules = useLangPath('/site-rules')
  const accessibility = useLangPath('/accessibility')

  const links = [
    { to: privacy, label: t('footer.privacy') },
    { to: terms, label: t('footer.terms') },
    { to: siteRules, label: t('footer.siteRules') },
    { to: accessibility, label: t('footer.accessibility') },
  ]

  return (
    <footer className="bg-[#030712]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-5 py-[50px] text-center">
        <Link to={home} className="inline-block">
          <img
            src="/assets/logo-wide.png"
            alt="Sentra AI"
            width={200}
            height={27}
            className="h-auto w-[200px]"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-[50px] gap-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-base font-normal text-[#7A7A7A] transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="max-w-lg text-sm leading-relaxed text-[#7A7A7A] md:text-base">
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  )
}
