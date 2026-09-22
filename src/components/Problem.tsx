import { useTranslation } from 'react-i18next'
import { FeatureIcon } from './FeatureIcon'
import { Reveal } from './motion'
import { mayaStepIcons } from '../data/content'

export function Problem() {
  const { t } = useTranslation()
  const steps = t('problem.steps', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <>
      <section id="PROBLEM" className="bg-[#071629] py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-4 text-center sm:px-5">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
              {t('problem.eyebrow')}
            </p>
            <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight tracking-[-0.03em] md:text-5xl">
              {t('problem.title')}
            </h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-[#afc0d4] md:text-lg">
              <p>{t('problem.p1')}</p>
              <p>{t('problem.p2')}</p>
              <p>{t('problem.p3')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#050a14] py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-5">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              {t('problem.mayaTitle')}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.isArray(steps) &&
              steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <article className="sentra-card h-full p-6">
                    <div className="mb-4 inline-flex rounded-full bg-[#139bff]/12 p-3 text-[#139bff]">
                      <FeatureIcon name={mayaStepIcons[i] ?? 'bulb'} />
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#afc0d4]">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
