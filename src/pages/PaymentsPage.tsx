import { Link } from 'react-router-dom'

export function PaymentsPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#8fb3ff]">
        COMING NEXT
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
        Payments
      </h1>
      <p className="mt-4 max-w-xl text-[#afc0d4]">
        Placeholder route for the future checkout / subscription flow. Ready to
        connect to your backend when you are.
      </p>
      <Link to="/" className="sentra-btn-primary mt-8">
        Back to landing
      </Link>
    </section>
  )
}
