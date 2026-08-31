import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { comparisonRows } from '../data/content'
import { FeatureIcon } from './FeatureIcon'
import { Reveal } from './motion'
import { VideoModal } from './VideoModal'

const slides = [
  {
    poster: '/assets/soc-bg.png',
    video: 'https://www.youtube.com/watch?v=bcn06_Szb9c',
    label: 'How Maya works',
  },
  {
    poster: '/assets/hero-house.png',
    video: 'https://www.youtube.com/watch?v=Um78seeaFoU',
    label: 'Maya in action',
  },
  {
    poster: '/assets/whatsapp-alert.png',
    video: 'https://www.youtube.com/watch?v=bcn06_Szb9c',
    label: 'Alerts demo',
  },
]

export function BuiltAndCompare() {
  const [index, setIndex] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  return (
    <>
      <section id="BUILT" className="bg-[#071629] py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-5">
          <Reveal>
            <h2 className="mb-8 text-center text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              VIDEO AND HOW ITS WORK
            </h2>
          </Reveal>

          {/* Desktop: 3 thumbnails like original carousel */}
          <div className="mb-6 hidden gap-4 md:grid md:grid-cols-3">
            {slides.map((slide, i) => (
              <Reveal key={slide.label} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => setVideoUrl(slide.video)}
                  className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl"
                >
                  <img
                    src={slide.poster}
                    alt={slide.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-[#050a14] shadow-lg transition group-hover:scale-110">
                      <Play className="size-6 fill-current" />
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Mobile/tablet carousel */}
          <Reveal className="relative md:hidden">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <AnimatePresence mode="wait">
                <motion.button
                  key={index}
                  type="button"
                  initial={{ opacity: 0.4, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0.4, x: -24 }}
                  transition={{ duration: 0.28 }}
                  className="group relative aspect-video w-full"
                  onClick={() => setVideoUrl(slides[index].video)}
                >
                  <img
                    src={slides[index].poster}
                    alt={slides[index].label}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-[#050a14]">
                      <Play className="size-6 fill-current" />
                    </span>
                  </span>
                </motion.button>
              </AnimatePresence>

              <button
                type="button"
                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white"
                aria-label="Previous"
                onClick={() =>
                  setIndex((i) => (i - 1 + slides.length) % slides.length)
                }
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white"
                aria-label="Next"
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? 'bg-[#139bff]' : 'bg-white/35'
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top_right,rgba(36,101,255,0.16),transparent_34%),linear-gradient(135deg,#05070d_0%,#0a1020_55%,#05070d_100%)] py-16 md:py-[90px]">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-5">
          <Reveal className="mx-auto mb-8 max-w-[760px] text-left sm:mb-10 sm:text-center">
            <span className="mb-4 inline-flex items-center justify-center rounded-full border border-[rgba(77,139,255,0.35)] bg-[rgba(77,139,255,0.08)] px-3.5 py-2 text-[12px] font-bold tracking-[1.4px] text-[#8fb3ff] sm:text-[13px]">
              Traditional Monitoring vs Sentra
            </span>
            <h2 className="text-[clamp(28px,7vw,56px)] font-extrabold leading-[1.05] tracking-[-1px] sm:tracking-[-1.4px]">
              A smarter alternative to traditional monitoring centers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Sentra replaces expensive, human-dependent monitoring with an AI
              security operator that watches 24/7, reacts instantly, and scales
              across every site without adding more people.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sentra-table-wrap">
              <table className="sentra-comparison-table">
                <thead>
                  <tr>
                    <th>Traditional Monitoring</th>
                    <th>Sentra AI Operator</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([neg, pos]) => (
                    <tr key={neg}>
                      <td>
                        <span className="sentra-negative">{neg}</span>
                      </td>
                      <td>
                        <span className="sentra-positive">{pos}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 text-center">
            <a
              href="/#DEMO"
              className="sentra-btn-primary inline-flex transition hover:scale-[1.03]"
            >
              Schedule a Demo
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0b1424] py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-4 text-center sm:px-5">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
              NOT CCTV. NOT ANALYTICS.
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              A Virtual Security Professional.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#afc0d4] md:text-lg">
              Sentra AI is not another camera app, dashboard or analytics tool.
              It is a new category: an AI Security Operator that actively
              watches, verifies, alerts and responds — just like a trained
              security professional.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Not CCTV', desc: 'Just recording.', icon: 'x' },
              { title: 'Not Analytics', desc: 'Just data.', icon: 'chart' },
              { title: 'Sentra AI', desc: 'Real protection.', icon: 'shield' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="sentra-card h-full p-6">
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-[#139bff]/12 p-3 text-[#139bff]">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#afc0d4]">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        open={!!videoUrl}
        url={videoUrl}
        onClose={() => setVideoUrl(null)}
      />
    </>
  )
}
