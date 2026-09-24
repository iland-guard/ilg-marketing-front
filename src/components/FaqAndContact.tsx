import { useMemo, useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PhoneInput } from 'react-international-phone'
import { isValidPhoneNumber } from 'libphonenumber-js'
import 'react-international-phone/style.css'
import { submitMarketingLead } from '../api/leads'
import { Reveal } from './motion'
import { useLangPath } from '../hooks/useLangPath'
import { isValidEmail, phoneToWhatsAppDigits } from '../utils/validation'

const LANG_DEFAULT_COUNTRY: Record<string, string> = {
  he: 'il',
  ar: 'ae',
  en: 'us',
  fr: 'fr',
  es: 'es',
  de: 'de',
  pt: 'pt',
  ru: 'ru',
}

type FieldErrors = {
  email?: string
  phone?: string
}

export function FaqAndContact() {
  const [open, setOpen] = useState<number | null>(0)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const { t, i18n } = useTranslation()
  const privacyPath = useLangPath('/privacy-policy')
  const faqs = t('faq.items', { returnObjects: true }) as Array<{
    q: string
    a: string
  }>

  const defaultCountry = useMemo(() => {
    const lang = (i18n.language || 'en').slice(0, 2)
    return LANG_DEFAULT_COUNTRY[lang] ?? 'il'
  }, [i18n.language])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const nextErrors: FieldErrors = {}
    if (!isValidEmail(email)) {
      nextErrors.email = t('contact.invalidEmail')
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      nextErrors.phone = t('contact.invalidPhone')
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('sending')
    try {
      await submitMarketingLead({
        name,
        email,
        phone: phoneToWhatsAppDigits(phone),
        message,
        language: (i18n.language || 'en').slice(0, 2),
      })
      setStatus('sent')
      setPhone('')
      setErrors({})
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section id="FAQ" className="bg-[#050a14] py-16 md:py-24">
        <div className="mx-auto max-w-[860px] px-4 sm:px-5">
          <Reveal className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
              {t('faq.eyebrow')}
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              {t('faq.title')}
            </h2>
          </Reveal>

          <div className="space-y-3">
            {Array.isArray(faqs) &&
              faqs.map((item, i) => {
                const isOpen = open === i
                return (
                  <Reveal key={item.q} delay={i * 0.04}>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <span className="font-semibold text-white">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`size-5 shrink-0 text-[#139bff] transition duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-5 py-4 text-[#afc0d4]">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                )
              })}
          </div>
        </div>
      </section>

      <section
        id="DEMO"
        className="relative overflow-hidden bg-[#0b1424] py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(4,89,224,0.18),rgba(6,177,244,0.08))]" />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-5" id="contact">
          <Reveal>
            <h2 className="mb-8 text-center text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              {t('contact.title')}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="sentra-card space-y-4 overflow-visible p-4 sm:p-6 md:p-8"
              name="Contact Form"
              aria-label={t('contact.formLabel')}
              noValidate
            >
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder={t('contact.name')}
                  className="w-full rounded-xl border border-white/10 bg-[#050a14] px-4 py-3.5 text-base text-white outline-none placeholder:text-[#afc0d4]/70 focus:border-[#139bff] sm:py-3 sm:text-sm"
                />
                <div>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t('contact.email')}
                    aria-invalid={Boolean(errors.email)}
                    onChange={() =>
                      setErrors((prev) => ({ ...prev, email: undefined }))
                    }
                    className={`w-full rounded-xl border bg-[#050a14] px-4 py-3.5 text-base text-white outline-none placeholder:text-[#afc0d4]/70 focus:border-[#139bff] sm:py-3 sm:text-sm ${
                      errors.email ? 'border-red-400/70' : 'border-white/10'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="relative z-20">
                <PhoneInput
                  defaultCountry={defaultCountry}
                  value={phone}
                  onChange={(value) => {
                    setPhone(value)
                    setErrors((prev) => ({ ...prev, phone: undefined }))
                  }}
                  placeholder={t('contact.phone')}
                  className={`sentra-phone ${errors.phone ? 'sentra-phone--error' : ''}`}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoComplete: 'tel',
                    'aria-invalid': Boolean(errors.phone),
                  }}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder={t('contact.message')}
                className="w-full rounded-xl border border-white/10 bg-[#050a14] px-4 py-3 text-base text-white outline-none placeholder:text-[#afc0d4]/70 focus:border-[#139bff] sm:text-sm"
              />
              <label className="flex items-start gap-2 text-sm text-[#afc0d4]">
                <input
                  required
                  type="checkbox"
                  name="privacy"
                  className="mt-1 accent-[#139bff]"
                />
                <span>
                  {t('contact.privacyAgree')}{' '}
                  <Link
                    to={privacyPath}
                    className="text-[#139bff] underline underline-offset-2"
                  >
                    {t('contact.privacyLink')}
                  </Link>
                </span>
              </label>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="sentra-btn-primary w-full transition hover:scale-[1.01] disabled:opacity-60"
              >
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
              {status === 'sent' && (
                <p className="text-center text-sm text-[#42e6ad]">
                  {t('contact.thanks')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-400">
                  {t('contact.error')}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
