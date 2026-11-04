import {
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useLangPath } from '../hooks/useLangPath'
import { DEFAULT_LANG, isLang } from '../i18n/languages'
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
} from '../constants/support'

/**
 * The site's privacy policy (covering the app and the website), the
 * account-deletion page and the support page, all linked from the App Store /
 * Google Play listings. Content lives in
 * `i18n/locales/app-legal/<lang>.json` (keys `appLegal`, `appPrivacy`,
 * `deleteAccount`, `support`) and is loaded into i18next only when one of these pages is
 * opened, so the long texts stay out of the landing-page bundle. Inline markup
 * is rendered through <Trans>.
 */

const legalBundles = import.meta.glob<{ default: Record<string, unknown> }>(
  '../i18n/locales/app-legal/*.json',
)
const loadedLangs = new Set<string>()

/** Adds the current language's legal texts to i18next; true once available. */
function useAppLegalBundle(): boolean {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const current = isLang(lang) ? lang : DEFAULT_LANG
  const [, setLoadedCount] = useState(loadedLangs.size)

  useEffect(() => {
    if (loadedLangs.has(current)) return
    let active = true
    const load = legalBundles[`../i18n/locales/app-legal/${current}.json`]
    void load?.().then((bundle) => {
      i18n.addResourceBundle(current, 'translation', bundle.default, true, false)
      loadedLangs.add(current)
      if (active) setLoadedCount(loadedLangs.size)
    })
    return () => {
      active = false
    }
  }, [current, i18n])

  return loadedLangs.has(current)
}

const PRIVACY_PATH = '/privacy-policy'
const DELETE_ACCOUNT_PATH = '/delete-account'

/** Kept in English in every locale so support can route requests reliably. */
const DELETION_EMAIL_SUBJECT = 'Account deletion request — Sentra AI'
const DELETION_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(DELETION_EMAIL_SUBJECT)}`

type ListItem = string | { text: string; ul: string[]; after?: string }

type Block =
  | { p: string }
  | { ul: ListItem[] }
  | { ol: ListItem[] }
  | { chips: true }
  | { cta: true }

type Section = { id: string; title: string; blocks: Block[] }

type PageKey = 'appPrivacy' | 'deleteAccount'

const linkClass = 'text-[#139bff] underline underline-offset-2'
const strongClass = 'font-semibold text-white'
const noticeClass =
  'rounded-xl border border-[#139bff]/30 bg-[#139bff]/10 px-4 py-3 text-sm leading-relaxed text-[#cfe3ff]'

function ExternalLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    />
  )
}

function useRichComponents(pagePath: string): Record<string, ReactElement> {
  const deletePath = useLangPath(DELETE_ACCOUNT_PATH)

  return useMemo(
    () => ({
      b: <strong className={strongClass} />,
      // Latin-only lines (company name, address) must not reorder inside RTL text.
      ltr: <span dir="ltr" />,
      mail: <a href={`mailto:${SUPPORT_EMAIL}`} dir="ltr" className={linkClass} />,
      tel: <a href={SUPPORT_PHONE_HREF} dir="ltr" className={linkClass} />,
      subjectMail: <a href={DELETION_MAILTO} dir="ltr" className={linkClass} />,
      deleteLink: <Link to={deletePath} className={linkClass} />,
      enLink: <Link to={`/${DEFAULT_LANG}${pagePath}`} className={linkClass} />,
      nvrImage: <a href="#nvr-image" className={linkClass} />,
      supportChat: <a href="#support-chat" className={linkClass} />,
      backend: <ExternalLink href="https://backend.x-sentral.com" />,
      google: <ExternalLink href="https://policies.google.com/privacy" />,
      firebase: <ExternalLink href="https://firebase.google.com/support/privacy" />,
      posthog: <ExternalLink href="https://posthog.com/privacy" />,
    }),
    [deletePath, pagePath],
  )
}

const richValues = { supportPhone: SUPPORT_PHONE, subject: DELETION_EMAIL_SUBJECT }

function Rich({
  i18nKey,
  components,
}: {
  i18nKey: string
  components: Record<string, ReactElement>
}) {
  return <Trans i18nKey={i18nKey} components={components} values={richValues} />
}

/** Lands at the top on navigation, or on the requested section for deep links. */
function useScrollOnEnter(ready: boolean) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!ready) return
    const { hash } = window.location
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    // Only on entering the page (or switching language) once the texts are
    // rendered; in-page anchor clicks change the hash and scroll natively.
  }, [pathname, ready])
}

function useSections(page: PageKey): Section[] {
  const { i18n } = useTranslation()
  const raw = i18n.t(`${page}.sections`, { returnObjects: true }) as
    | Section[]
    | string
  return Array.isArray(raw) ? raw : []
}

function List({
  ordered,
  items,
  baseKey,
  components,
}: {
  ordered: boolean
  items: ListItem[]
  baseKey: string
  components: Record<string, ReactElement>
}) {
  const ListTag = ordered ? 'ol' : 'ul'
  return (
    <ListTag
      className={`space-y-3 ps-5 marker:text-[#139bff] ${ordered ? 'list-decimal' : 'list-disc'}`}
    >
      {items.map((item, i) => {
        const key = `${baseKey}.${i}`
        if (typeof item === 'string') {
          return (
            <li key={key} className="ps-1">
              <Rich i18nKey={key} components={components} />
            </li>
          )
        }
        return (
          <li key={key} className="ps-1">
            <Rich i18nKey={`${key}.text`} components={components} />
            <ul className="mt-3 list-[circle] space-y-2 ps-5 marker:text-[#139bff]">
              {item.ul.map((_, j) => (
                <li key={j} className="ps-1">
                  <Rich i18nKey={`${key}.ul.${j}`} components={components} />
                </li>
              ))}
            </ul>
            {item.after ? (
              <p className="mt-3">
                <Rich i18nKey={`${key}.after`} components={components} />
              </p>
            ) : null}
          </li>
        )
      })}
    </ListTag>
  )
}

function SectionBlocks({
  page,
  section,
  index,
  components,
  extras,
}: {
  page: PageKey
  section: Section
  index: number
  components: Record<string, ReactElement>
  extras: { chips?: ReactNode; cta?: ReactNode }
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-28 space-y-4 pt-8"
    >
      <h2 id={`${section.id}-title`} className="text-xl font-bold text-white md:text-2xl">
        {section.title}
      </h2>
      {section.blocks.map((block, bi) => {
        const key = `${page}.sections.${index}.blocks.${bi}`
        if ('p' in block) {
          return (
            <p key={key}>
              <Rich i18nKey={`${key}.p`} components={components} />
            </p>
          )
        }
        if ('ul' in block) {
          return (
            <List key={key} ordered={false} items={block.ul} baseKey={`${key}.ul`} components={components} />
          )
        }
        if ('ol' in block) {
          return (
            <List key={key} ordered items={block.ol} baseKey={`${key}.ol`} components={components} />
          )
        }
        if ('chips' in block) return <div key={key}>{extras.chips}</div>
        return <div key={key}>{extras.cta}</div>
      })}
    </section>
  )
}

function AppLegalShell({
  page,
  pagePath,
  notices,
  showContents,
  extras = {},
}: {
  page: PageKey
  pagePath: string
  notices: string[]
  showContents: boolean
  extras?: { chips?: ReactNode; cta?: ReactNode }
}) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const home = useLangPath('/')
  const ready = useAppLegalBundle()
  const sections = useSections(page)
  const components = useRichComponents(pagePath)
  useScrollOnEnter(ready)

  if (!ready) {
    return <div className="min-h-screen" aria-busy="true" />
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff] uppercase">
        {t(`${page}.badge`)}
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em]">{t(`${page}.title`)}</h1>
      <p className="mt-4 text-lg leading-relaxed text-[#afc0d4]">{t(`${page}.lede`)}</p>
      <p className="mt-2 text-sm text-[#7A7A7A]">{t(`${page}.lastUpdated`)}</p>

      <div className="mt-6 space-y-3">
        {lang !== DEFAULT_LANG ? (
          <p className={noticeClass}>
            <Rich i18nKey="appLegal.translationNotice" components={components} />
          </p>
        ) : null}
        {notices.map((noticeKey) => (
          <p key={noticeKey} className={noticeClass}>
            <Rich i18nKey={noticeKey} components={components} />
          </p>
        ))}
      </div>

      {showContents && sections.length > 0 ? (
        <nav
          aria-labelledby="contents-title"
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6"
        >
          <h2 id="contents-title" className="text-sm font-bold tracking-[0.12em] text-[#8fb3ff] uppercase">
            {t('appLegal.contents')}
          </h2>
          <ol className="mt-4 grid list-decimal gap-x-8 gap-y-2 ps-5 text-[#afc0d4] marker:text-[#7A7A7A] md:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id} className="ps-1">
                <a href={`#${section.id}`} className="transition hover:text-white">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="mt-2 leading-relaxed text-[#afc0d4]">
        {sections.map((section, index) => (
          <SectionBlocks
            key={section.id}
            page={page}
            section={section}
            index={index}
            components={components}
            extras={extras}
          />
        ))}
      </div>

      <p className="mt-10 border-t border-white/10 pt-6 text-sm text-[#7A7A7A]">
        {t(`${page}.lastUpdated`)}
      </p>
      <Link to={home} className="sentra-btn-ghost mt-6 inline-flex">
        {t('legal.back')}
      </Link>
    </article>
  )
}

// Rendered by the shell, i.e. only after the legal texts are loaded.
function CategoryChips() {
  const { t, i18n } = useTranslation()
  const raw = i18n.t('appPrivacy.categories', { returnObjects: true }) as string[] | string
  const categories = Array.isArray(raw) ? raw : []

  return (
    <ul aria-label={t('appPrivacy.categoriesLabel')} className="flex flex-wrap gap-2 pt-2">
      {categories.map((category) => (
        <li
          key={category}
          className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm text-[#cfe3ff]"
        >
          {category}
        </li>
      ))}
    </ul>
  )
}

function DeletionEmailButton() {
  const { t } = useTranslation()
  return (
    <a href={DELETION_MAILTO} className="sentra-btn-primary mt-2">
      {t('deleteAccount.emailCta')}
    </a>
  )
}

export function PrivacyPage() {
  return (
    <AppLegalShell
      page="appPrivacy"
      pagePath={PRIVACY_PATH}
      notices={['appPrivacy.notice']}
      showContents
      extras={{ chips: <CategoryChips /> }}
    />
  )
}

/** Target of the App Store "Support URL": Apple requires real contact details there. */
export function SupportPage() {
  const { t } = useTranslation()
  const ready = useAppLegalBundle()
  const home = useLangPath('/')
  const deletePath = useLangPath(DELETE_ACCOUNT_PATH)
  const privacyPath = useLangPath(PRIVACY_PATH)
  useScrollOnEnter(ready)

  if (!ready) {
    return <div className="min-h-screen" aria-busy="true" />
  }

  const panelClass = 'mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6'
  const panelTitleClass = 'text-xl font-bold text-white'
  const labelClass = 'text-sm text-[#7A7A7A]'

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff] uppercase">
        Sentra AI
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em]">{t('support.title')}</h1>
      <p className="mt-4 text-lg leading-relaxed text-[#afc0d4]">{t('support.lede')}</p>

      <section aria-labelledby="support-contact" className={panelClass}>
        <h2 id="support-contact" className={panelTitleClass}>
          {t('support.contactTitle')}
        </h2>
        <dl className="mt-4 space-y-4 text-[#afc0d4]">
          <div>
            <dt className={labelClass}>{t('support.email')}</dt>
            <dd className="mt-1">
              <a href={`mailto:${SUPPORT_EMAIL}`} dir="ltr" className={linkClass}>
                {SUPPORT_EMAIL}
              </a>
            </dd>
          </div>
          <div>
            <dt className={labelClass}>{t('support.phone')}</dt>
            <dd className="mt-1">
              <a href={SUPPORT_PHONE_HREF} dir="ltr" className={linkClass}>
                {SUPPORT_PHONE}
              </a>
            </dd>
          </div>
          <div>
            <dt className={labelClass}>{t('support.company')}</dt>
            <dd className="mt-1">
              <span dir="ltr">{COMPANY_NAME}</span>
              <br />
              <span dir="ltr">{COMPANY_ADDRESS}</span>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="support-more" className={panelClass}>
        <h2 id="support-more" className={panelTitleClass}>
          {t('support.moreTitle')}
        </h2>
        <ul className="mt-4 space-y-3">
          <li>
            <a href={`${home}#DEMO`} className={linkClass}>
              {t('support.messageLink')}
            </a>
          </li>
          <li>
            <Link to={deletePath} className={linkClass}>
              {t('support.deleteLink')}
            </Link>
          </li>
          <li>
            <Link to={privacyPath} className={linkClass}>
              {t('support.privacyLink')}
            </Link>
          </li>
        </ul>
      </section>

      <Link to={home} className="sentra-btn-ghost mt-8 inline-flex">
        {t('legal.back')}
      </Link>
    </article>
  )
}

export function DeleteAccountPage() {
  return (
    <AppLegalShell
      page="deleteAccount"
      pagePath={DELETE_ACCOUNT_PATH}
      notices={['deleteAccount.noticeProcessing', 'deleteAccount.noticeVerification']}
      showContents={false}
      extras={{ cta: <DeletionEmailButton /> }}
    />
  )
}
