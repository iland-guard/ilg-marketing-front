import { Ban, CreditCard, Headphones, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { appStoreLinks } from '../data/content'
import { Reveal } from './motion'

const perkIcons = [CreditCard, Headphones, Ban, Sparkles] as const

export function DownloadApp() {
  const { t } = useTranslation()
  const perks = t('download.perks', { returnObjects: true }) as string[]

  return (
    <section
      id="download"
      className="relative flex min-h-[63vh] items-center overflow-hidden bg-[#050A14]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#050A14] bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/whatsapp-alert.png')",
          backgroundPosition: 'center right',
          backgroundSize: '84% auto',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(at center right, #06082970 0%, #060829 58%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:py-10">
        <div className="w-full max-w-[560px] shrink-0 lg:max-w-[52%] xl:pl-8">
          <Reveal>
            <h2
              className="text-start font-extrabold text-white"
              style={{
                fontFamily: 'Rubik, system-ui, sans-serif',
                fontSize: 'clamp(32px, 4.2vw, 46px)',
                lineHeight: 1.08,
              }}
            >
              {t('download.title')}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p
              className="mt-2 text-start"
              style={{
                fontFamily: 'Rubik, system-ui, sans-serif',
                fontSize: 17,
                lineHeight: 1.55,
                color: '#AFC0D4',
              }}
            >
              {t('download.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={appStoreLinks.googlePlay}
                target="_blank"
                rel="noreferrer"
                aria-label={t('download.googlePlay')}
                className="block transition hover:opacity-90"
              >
                <img
                  src="/assets/google-play.svg"
                  alt="Google Play"
                  className="h-auto w-[min(100%,220px)] rounded-[10px] border border-white sm:w-[260px] lg:w-[300px]"
                />
              </a>
              <a
                href={appStoreLinks.apple}
                target="_blank"
                rel="noreferrer"
                aria-label={t('download.appStore')}
                className="block transition hover:opacity-90"
              >
                <img
                  src="/assets/app-store.svg"
                  alt="App Store"
                  className="h-auto w-[min(100%,220px)] rounded-[10px] border border-white sm:w-[260px] lg:w-[300px]"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 pt-5 text-[15px] text-white sm:text-base">
              {Array.isArray(perks) &&
                perks.map((label, i) => {
                  const Icon = perkIcons[i] ?? Sparkles
                  return (
                    <li key={label} className="inline-flex items-center gap-2">
                      <Icon
                        className="size-[14px] shrink-0"
                        style={{ color: '#06B1F4' }}
                        strokeWidth={2}
                      />
                      <span>{label}</span>
                    </li>
                  )
                })}
            </ul>
          </Reveal>
        </div>

        <div className="relative flex w-full max-w-[480px] shrink-0 items-center justify-center lg:w-[37%] lg:max-w-none">
          <motion.img
            src="/assets/phone-home-alt.png"
            alt={t('download.phoneHomeAlt')}
            className="relative z-[2] w-[48%] max-w-[260px] -mr-3 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] sm:-mr-5 lg:w-[52%]"
            style={{ marginTop: -40, marginBottom: -20 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.75,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            loading="lazy"
          />
          <motion.img
            src="/assets/phone-cameras-alt.png"
            alt={t('download.phoneCamerasAlt')}
            className="relative z-[1] w-[50%] max-w-[280px] -ml-2 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] sm:-ml-4 lg:w-[54%]"
            style={{ marginTop: -70, marginBottom: -20 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
