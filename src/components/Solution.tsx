import { FeatureIcon } from './FeatureIcon'
import { Reveal } from './motion'
import { howItWorks, solutionFeatures } from '../data/content'

export function Solution() {
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
              THE SOLUTION
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              Sentra Watches, Verifies and Responds
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#afc0d4] md:text-lg">
              Sentra AI acts like a virtual security operator for your cameras.
              It detects, verifies and responds so you don’t have to.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.07}>
                <article className="sentra-card h-full p-6">
                  <div className="mb-4 inline-flex rounded-full bg-[#139bff]/12 p-3 text-[#139bff]">
                    <FeatureIcon name={feature.icon} />
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
              HOW IT WORKS
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              Simple. Smart. Always On.
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <article className="sentra-card h-full p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-[#139bff]/12 p-3 text-[#139bff]">
                    <FeatureIcon name={step.icon} />
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
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
            Start protecting What Matters
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#afc0d4] md:text-lg">
            Upgrade your existing camera system into an always-awake AI security
            operator.
          </p>
          <a
            href="#download"
            className="sentra-btn-primary mt-8 inline-flex transition hover:scale-[1.03]"
          >
            Download the App
          </a>
          <p className="mt-4 text-sm text-[#afc0d4]">No Credit Card Required.</p>
        </Reveal>
      </section>
    </>
  )
}
