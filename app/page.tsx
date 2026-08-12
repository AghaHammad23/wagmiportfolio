import Hero from './components/Hero'
import Ticker from './components/Ticker'
import StatsBar from './components/StatsBar'
import PostingIsNotASystem from './components/PostingIsNotASystem'
import TwoCoreOffers from './components/TwoCoreOffers'
import FiveLayers from './components/FiveLayers'
import RecordingStudioClient from './components/RecordingStudio/RecordingStudioClient'
import ProofNotPromises from './components/ProofNotPromises'
import PickYourEngine from './components/PickYourEngine'
import IncludedFree from './components/IncludedFree'
import TwoGuarantees from './components/TwoGuarantees'
import RealGrowth from './components/RealGrowth'
import SixtyMinutesCTA from './components/SixtyMinutesCTA'
import VSL from './components/VSL'
import CTAStrip from './components/CTAStrip'
import HowItWorks from './components/HowItWorks'
import Results from './components/Results'
import ProofNote from './components/ProofNote'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PostingIsNotASystem />
      <TwoCoreOffers />
      <RecordingStudioClient />
      <FiveLayers />
      <Ticker variant="capabilities" />
      <ProofNotPromises />
      <PickYourEngine />
      <IncludedFree />
      <Ticker variant="proof" />
      <TwoGuarantees />
      <RealGrowth />
      <Ticker variant="urgency" />
      <SixtyMinutesCTA />
      {/* <VSL /> */}

      {/* Post-VSL — low pressure, curiosity hook */}
      {/* <CTAStrip
        variant="minimal"
        badge="Now Accepting Clients"
        text="Seen enough? Let's talk about your channel."
        buttonText="Apply Now"
      /> */}

      {/* <HowItWorks /> */}

      {/* Post-process — medium intent, hand-off framing */}
      {/* <CTAStrip
        variant="bold"
        label="Done For You"
        text="Ready to hand off your entire content operation?"
        subtext="Scripts, edits, thumbnails, strategy, distribution — fully managed."
        buttonText="Apply to Work With Us"
      /> */}

      {/* <Results /> */}
      {/* <ProofNote /> */}
      {/* <Testimonials /> */}

      {/* Post-results — high intent, social proof momentum */}
      {/* <CTAStrip
        variant="accent"
        label="Your Turn"
        text="Want results like these for your brand?"
        subtext="We've done it across sports, real estate, AI, and marketing. Your niche is next."
        badge="Response within 48 hours"
        buttonText="Apply to Work With Us"
      /> */}

      {/* <FinalCTA /> */}
    </>
  )
}