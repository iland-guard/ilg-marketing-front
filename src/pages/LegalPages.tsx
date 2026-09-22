import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLangPath } from '../hooks/useLangPath'

type Section = {
  title: string
  paragraphs: string[]
}

function fillVars(
  text: string,
  vars: { company: string; email: string },
): string {
  return text
    .replaceAll('{{company}}', vars.company)
    .replaceAll('{{email}}', vars.email)
}

function LegalShell({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: Section[]
}) {
  const { t } = useTranslation()
  const home = useLangPath('/')
  const vars = {
    company: t('legal.companyPlaceholder'),
    email: t('legal.contactEmail'),
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
        {t('legal.eyebrow')}
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em]">{title}</h1>
      <p className="mt-2 text-sm text-[#7A7A7A]">{t('legal.lastUpdated')}</p>
      <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100/90">
        {t('legal.disclaimer')}
      </p>
      <div className="mt-6 space-y-4 leading-relaxed text-[#afc0d4]">
        <p>{fillVars(intro, vars)}</p>
        {sections.map((section) => (
          <div key={section.title} className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-white">{section.title}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={`${section.title}-${i}`}>{fillVars(p, vars)}</p>
            ))}
          </div>
        ))}
      </div>
      <Link to={home} className="sentra-btn-ghost mt-8 inline-flex">
        {t('legal.back')}
      </Link>
    </section>
  )
}

function useLegalSections(key: 'privacy' | 'terms' | 'siteRules') {
  const { t, i18n } = useTranslation()
  const raw = i18n.t(`${key}.sections`, { returnObjects: true }) as
    | Section[]
    | string
  return {
    title: t(`${key}.title`),
    intro: t(`${key}.intro`),
    sections: Array.isArray(raw) ? raw : [],
  }
}

export function PrivacyPage() {
  const data = useLegalSections('privacy')
  return <LegalShell {...data} />
}

export function TermsPage() {
  const data = useLegalSections('terms')
  return <LegalShell {...data} />
}

export function SiteRulesPage() {
  const data = useLegalSections('siteRules')
  return <LegalShell {...data} />
}

export function AccessibilityPage() {
  const { t } = useTranslation()
  const home = useLangPath('/')
  const email = t('legal.contactEmail')

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
        {t('legal.eyebrow')}
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em]">
        {t('accessibility.title')}
      </h1>
      <p className="mt-2 text-sm text-[#7A7A7A]">{t('legal.lastUpdated')}</p>
      <p className="mt-6 leading-relaxed text-[#afc0d4]">
        {fillVars(t('accessibility.body'), {
          company: t('legal.companyPlaceholder'),
          email,
        })}
      </p>
      <Link to={home} className="sentra-btn-ghost mt-8 inline-flex">
        {t('legal.back')}
      </Link>
    </section>
  )
}
