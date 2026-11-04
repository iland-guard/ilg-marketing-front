import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { Solution } from '../components/Solution'
import { BuiltAndCompare } from '../components/BuiltAndCompare'
import { FaqAndContact } from '../components/FaqAndContact'
import { DownloadApp } from '../components/DownloadApp'

const ALIGN_TIMEOUT_MS = 5000
const userScrollEvents = ['wheel', 'touchstart', 'keydown'] as const

export function HomePage() {
  // The page renders after load, so the browser can't scroll to a section when
  // arriving from another page (e.g. /en#DEMO). Clicks within the page scroll natively.
  useEffect(() => {
    const { hash } = window.location
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (!target) return

    const align = () => target.scrollIntoView({ behavior: 'instant' })
    align()

    // Fonts and images above the target load later and push it down, so stay
    // aligned until the layout settles or the visitor starts scrolling.
    const observer = new ResizeObserver(align)
    observer.observe(document.body)
    const stop = () => {
      observer.disconnect()
      clearTimeout(timer)
      userScrollEvents.forEach((name) => window.removeEventListener(name, stop))
    }
    const timer = setTimeout(stop, ALIGN_TIMEOUT_MS)
    userScrollEvents.forEach((name) => window.addEventListener(name, stop, { passive: true }))
    return stop
  }, [])

  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <BuiltAndCompare />
      <FaqAndContact />
      <DownloadApp />
    </>
  )
}
