import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import StatsBar from './components/StatsBar'
import VSL from './components/VSL'
import CTAStrip from './components/CTAStrip'
import HowItWorks from './components/HowItWorks'
import Results from './components/Results'
import ProofNote from './components/ProofNote'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <VSL />
      <Ticker />
      <CTAStrip text="Seen enough? Let's talk." />
      <HowItWorks />
      <CTAStrip text="Ready to hand off your entire content operation?" />
      <Results />
      <ProofNote />
      <CTAStrip text="Want results like these for your brand?" />
      <FinalCTA />
      <Footer />
    </>
  )
}
