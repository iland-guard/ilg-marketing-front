import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { Solution } from '../components/Solution'
import { BuiltAndCompare } from '../components/BuiltAndCompare'
import { FaqAndContact } from '../components/FaqAndContact'
import { DownloadApp } from '../components/DownloadApp'

export function HomePage() {
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
