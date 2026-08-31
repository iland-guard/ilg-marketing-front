import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Fixed sticky header — matches Elementor sticky:top + solid #050A14 */}
      <header className="fixed top-0 right-0 left-0 z-[60] border-b border-[#102039] bg-[#050A14]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-[15px] py-[15px]">
          <Link to="/" className="shrink-0">
            <img
              src="/assets/logo-wide.png"
              alt="Sentra AI"
              className="h-auto w-[100px] object-contain md:w-[200px]"
            />
          </Link>

          <nav className="hidden items-center lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mx-[15px] font-[Heebo,sans-serif] text-sm font-normal text-white transition hover:text-[#06B1F4]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/#DEMO"
              className="hidden rounded-xl border border-[#139BFF] bg-[#139BFF] px-5 py-2.5 font-[Inter,sans-serif] text-sm font-bold text-white shadow-[0px_14px_34px_0px_rgba(19,155,255,0.25)] transition hover:bg-gradient-to-b hover:from-[#06B1F4] hover:to-[#0459E0] sm:inline-flex"
            >
              SCHEDULE A DEMO
            </a>
            <button
              type="button"
              className="inline-flex rounded-xl border border-white/20 p-2 text-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[#102039] bg-[#050A14] px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1 font-[Heebo,sans-serif] text-sm text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#DEMO"
                className="mt-2 inline-flex justify-center rounded-xl bg-[#139BFF] px-5 py-3 text-sm font-bold text-white"
                onClick={() => setOpen(false)}
              >
                SCHEDULE A DEMO
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content isn't under the fixed header */}
      <div className="h-[70px] md:h-[78px]" aria-hidden />
    </>
  )
}
