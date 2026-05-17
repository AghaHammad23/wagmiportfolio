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
      <Hero />
      <StatsBar />
      <VSL />
      <Ticker />

      {/* Post-VSL — low pressure, curiosity hook */}
      <CTAStrip
        variant="minimal"
        badge="Now Accepting Clients"
        text="Seen enough? Let's talk about your channel."
        buttonText="Apply Now"
      />

      <HowItWorks />

      {/* Post-process — medium intent, hand-off framing */}
      <CTAStrip
        variant="bold"
        label="Done For You"
        text="Ready to hand off your entire content operation?"
        subtext="Scripts, edits, thumbnails, strategy, distribution — fully managed."
        badge="3 spots remaining"
        buttonText="Apply to Work With Us"
      />

      <Results />
      <ProofNote />

      {/* Post-results — high intent, social proof momentum */}
      {/* <CTAStrip
        variant="accent"
        label="Your Turn"
        text="Want results like these for your brand?"
        subtext="We've done it across sports, real estate, AI, and marketing. Your niche is next."
        badge="Response within 48 hours"
        buttonText="Apply to Work With Us"
      /> */}

      <FinalCTA />
    </>
  )
}