import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-[#030712]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-5 py-[50px] text-center">
        <Link to="/" className="inline-block">
          <img
            src="/assets/logo-wide.png"
            alt="Sentra AI"
            width={200}
            height={27}
            className="h-auto w-[200px]"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-[50px] gap-y-3">
          <Link
            to="/privacy-policy"
            className="font-[Heebo,sans-serif] text-base font-normal text-[#7A7A7A] transition hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            to="/accessibility"
            className="font-[Heebo,sans-serif] text-base font-normal text-[#7A7A7A] transition hover:text-white"
          >
            Accessibility Statement
          </Link>
        </nav>

        <p className="max-w-lg text-sm leading-relaxed text-[#7A7A7A] md:text-base">
          Always Watching. Never Sleeping.© 2026 Sentra AI. All rights reserved.
        </p>

        <a
          href="https://www.ezpoint.co.il/"
          target="_blank"
          rel="noreferrer"
          className="opacity-90 transition hover:opacity-100"
        >
          <img
            src="/assets/badge-45.png"
            alt="ezpoint"
            className="mx-auto h-auto w-[120px]"
          />
        </a>
      </div>
    </footer>
  )
}
