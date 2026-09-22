import { useState } from 'react'
import { Play, PlayCircle, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FeatureIcon } from './FeatureIcon'
import { Float, Reveal } from './motion'
import { VideoModal } from './VideoModal'

const avatars = [
  '/assets/person_555.jpg',
  '/assets/person_66.jpg',
  '/assets/maya-portrait.png',
]

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <section
      id="WHO"
      className="relative overflow-hidden bg-[#050A14] px-5 py-12 md:min-h-[82vh] md:py-[105px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: '#050A14',
          backgroundImage: "url('/assets/hero-house.png')",
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '60% auto',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(at center right, #06082900 0%, #060829 51%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="w-full max-w-xl lg:w-[60%] lg:max-w-none">
          <Reveal>
            <p
              className="mb-3 font-bold"
              style={{
                fontFamily: 'Rubik, system-ui, sans-serif',
                fontSize: 13,
                letterSpacing: '1.8px',
                color: '#28A8FF',
              }}
            >
              {t('hero.eyebrow')}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              className="font-extrabold text-white"
              style={{
                fontFamily: 'Rubik, system-ui, sans-serif',
                fontSize: 'clamp(32px, 5vw, 49px)',
                lineHeight: 1.08,
              }}
            >
              {t('hero.titleLine1')}
              <br />
              <span style={{ color: '#139BFF' }}>{t('hero.titleLine2')}</span>
              <br />
              <span style={{ color: '#139BFF' }}>{t('hero.titleLine3')}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              className="mt-5 space-y-3"
              style={{
                fontFamily: 'Rubik, system-ui, sans-serif',
                fontSize: 18,
                lineHeight: 1.55,
                color: '#B8C9DD',
              }}
            >
              <p>{t('hero.body1')}</p>
              <p>{t('hero.body2')}</p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#contact" className="sentra-btn-primary">
                {t('hero.ctaTrial')}
              </a>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="sentra-btn-ghost"
              >
                <PlayCircle className="size-5 shrink-0" />
                {t('hero.ctaWatch')}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-0.5 text-[#139BFF]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <div className="flex items-center">
                {avatars.map((src, i) => (
                  <Float
                    key={src}
                    delay={i * 0.3}
                    amplitude={7}
                    duration={4.2 + i * 0.25}
                    className={i === 0 ? '' : '-ml-[15px]'}
                  >
                    <img
                      src={src}
                      alt=""
                      className="size-[50px] rounded-full border-4 border-white object-cover"
                    />
                  </Float>
                ))}
              </div>
              <p className="max-w-[240px] text-sm text-[#AFC0D4]">
                {t('hero.trusted')}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="relative w-full max-w-[340px] lg:w-[30%] lg:max-w-[360px]"
        >
          <div className="relative rounded-[50px] bg-black p-0">
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="group relative block w-full overflow-hidden rounded-[30px] border-[10px] border-[#2E2E30]"
              aria-label={t('hero.playVideo')}
              style={{ aspectRatio: '9 / 16' }}
            >
              <img
                src="/assets/whatsapp-alert.png"
                alt={t('hero.alertAlt')}
                className="h-full w-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/5">
                <Play
                  className="size-[72px] fill-white text-white drop-shadow-lg sm:size-[86px]"
                  strokeWidth={1.25}
                />
              </div>
            </button>

            <div className="absolute -bottom-8 left-2 z-20 flex max-w-[230px] items-start gap-3 rounded-[18px] border border-[#1E3554] bg-[#0B1424] px-[22px] py-[26px] shadow-xl sm:-bottom-[50px] sm:-left-[40px] lg:-left-[80px] xl:-left-[100px]">
              <div className="mt-0.5 text-[#139BFF]">
                <FeatureIcon name="shield" className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {t('hero.camerasTitle')}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#AFC0D4]">
                  {t('hero.camerasDesc')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <VideoModal
        open={videoOpen}
        url="https://www.youtube.com/watch?v=Um78seeaFoU"
        onClose={() => setVideoOpen(false)}
      />
    </section>
  )
}
