import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'

export function PaymentsPage() {
  const { t } = useTranslation()
  const home = useLangPath('/')

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
        {t('payments.eyebrow')}
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
        {t('payments.title')}
      </h1>
      <p className="mt-4 max-w-xl text-[#afc0d4]">{t('payments.body')}</p>
      <Link to={home} className="sentra-btn-primary mt-8">
        {t('payments.back')}
      </Link>
    </section>
  )
}
