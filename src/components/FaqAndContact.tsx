import { useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { faqs } from '../data/content'
import { Reveal } from './motion'

export function FaqAndContact() {
  const [open, setOpen] = useState<number | null>(0)
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sent')
    e.currentTarget.reset()
  }

  return (
    <>
      <section id="FAQ" className="bg-[#050a14] py-16 md:py-24">
        <div className="mx-auto max-w-[860px] px-4 sm:px-5">
          <Reveal className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
              FAQ
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              Questions Before You Start?
            </h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((item, i) => {
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
                      <span className="font-semibold text-white">{item.q}</span>
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
              Questions Before You Start?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="sentra-card space-y-4 p-4 sm:p-6 md:p-8"
              name="Contact Form"
              aria-label="Contact Form"
            >
              <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                <input
                  required
                  name="name"
                  placeholder="NAME"
                  className="w-full rounded-xl border border-white/10 bg-[#050a14] px-4 py-3.5 text-base text-white outline-none placeholder:text-[#afc0d4]/70 focus:border-[#139bff] sm:py-3 sm:text-sm"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="E-MAIL"
                  className="w-full rounded-xl border border-white/10 bg-[#050a14] px-4 py-3.5 text-base text-white outline-none placeholder:text-[#afc0d4]/70 focus:border-[#139bff] sm:py-3 sm:text-sm"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="PHONE"
                  pattern="[0-9()#&+*\\-=.]+"
                  title="Only numbers and phone characters (#, -, *, etc) are accepted."
                  className="w-full rounded-xl border border-white/10 bg-[#050a14] px-4 py-3.5 text-base text-white outline-none placeholder:text-[#afc0d4]/70 focus:border-[#139bff] sm:py-3 sm:text-sm"
                />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder="HOW CAN WE HELP YOU"
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
                  אני מסכים ל
                  <Link
                    to="/privacy-policy"
                    className="text-[#139bff] underline underline-offset-2"
                  >
                    מדיניות הפרטיות
                  </Link>
                </span>
              </label>
              <button
                type="submit"
                className="sentra-btn-primary w-full transition hover:scale-[1.01]"
              >
                SEND
              </button>
              {status === 'sent' && (
                <p className="text-center text-sm text-[#42e6ad]">
                  Thanks — we’ll be in touch shortly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
