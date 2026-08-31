import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
        LEGAL
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em]">Privacy Policy</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-[#afc0d4]">
        <p>
          This is a lightweight placeholder matching the original site’s privacy
          link. Replace with your full policy text when ready.
        </p>
        <p>
          Sentra AI processes contact details you submit (name, email, phone,
          message) only to respond to demo / support requests.
        </p>
      </div>
      <Link to="/" className="sentra-btn-ghost mt-8 inline-flex">
        Back to home
      </Link>
    </section>
  )
}

export function AccessibilityPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
        LEGAL
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em]">
        Accessibility Statement
      </h1>
      <p className="mt-6 leading-relaxed text-[#afc0d4]">
        Placeholder accessibility statement. The original WordPress site used
        accessibility widgets; this React version aims for semantic HTML,
        keyboard-friendly navigation, and readable contrast.
      </p>
      <Link to="/" className="sentra-btn-ghost mt-8 inline-flex">
        Back to home
      </Link>
    </section>
  )
}
