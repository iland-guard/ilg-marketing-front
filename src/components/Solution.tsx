import { useTranslation } from 'react-i18next'
import { FeatureIcon } from './FeatureIcon'
import { Reveal } from './motion'
import { howItWorksIcons, solutionFeatureIcons } from '../data/content'

export function Solution() {
  const { t } = useTranslation()
  const features = t('solution.features', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>
  const howItWorks = t('solution.howItWorks', {
    returnObjects: true,
  }) as string[]

  return (
    <>
      <section
        id="SOLUTION"
        className="relative overflow-hidden bg-[#0b1424] py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,155,255,0.16),transparent_40%)]" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
              {t('solution.eyebrow')}
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              {t('solution.title')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#afc0d4] md:text-lg">
              {t('solution.body')}
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(features) &&
              features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.07}>
                  <article className="sentra-card h-full p-6">
                    <div className="mb-4 inline-flex rounded-full bg-[#139bff]/12 p-3 text-[#139bff]">
                      <FeatureIcon
                        name={solutionFeatureIcons[i] ?? 'clock'}
                      />
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-[#afc0d4]">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section id="WORKS" className="bg-[#050a14] py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-5">
          <Reveal className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
              {t('solution.worksEyebrow')}
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              {t('solution.worksTitle')}
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.isArray(howItWorks) &&
              howItWorks.map((title, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <article className="sentra-card h-full p-6 text-center">
                    <div className="mx-auto mb-4 inline-flex rounded-full bg-[#139bff]/12 p-3 text-[#139bff]">
                      <FeatureIcon name={howItWorksIcons[i] ?? 'camera'} />
                    </div>
                    <h3 className="text-lg font-bold">{title}</h3>
                  </article>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/soc-bg.png')" }}
        />
        <div className="absolute inset-0 bg-[#050a14]/80 backdrop-blur-[1px]" />
        <Reveal className="relative mx-auto max-w-[820px] px-4 text-center sm:px-5">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
            {t('solution.protectTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#afc0d4] md:text-lg">
            {t('solution.protectBody')}
          </p>
          <a
            href="#download"
            className="sentra-btn-primary mt-8 inline-flex transition hover:scale-[1.03]"
          >
            {t('solution.downloadCta')}
          </a>
          <p className="mt-4 text-sm text-[#afc0d4]">{t('solution.noCard')}</p>
        </Reveal>
      </section>
    </>
  )
}
