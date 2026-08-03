'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from '../components/Providers'
import ServicesHero from './ServicesHero'
import ServicesStickyGrid from './ServicesStickyGrid'
import ProcessStaircase from './ProcessStaircase'
import {
  RiVideoLine,
  RiFileTextLine,
  RiLineChartLine,
  RiBroadcastLine,
  RiTeamLine,
  RiSearchLine,
} from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: (props: any) => <RiFileTextLine {...props} />,
    title: 'Script Development',
    tag: 'Foundation',
    desc: "Every great video starts with a great script. Our writers craft hooks that stop the scroll, structures that hold attention, and CTAs that convert — all tuned to your voice and offer.",
    features: ['Hook writing', 'Story arc structuring', 'CTA optimisation', 'Voice matching'],
    media: { type: 'image', src: '/team/zubair.png' },
  },
  {
    icon: (props: any) => <RiVideoLine {...props} />,
    title: 'Short-Form Video',
    tag: 'Distribution',
    desc: 'Shorts, Reels, and TikToks that perform. We handle editing, captions, music, and posting cadence — turning one recording session into a short-form machine that publishes 7 days a week without you.',
    features: ['Multi-platform formatting', 'Caption design', 'Trend integration', 'A/B hook testing'],
    media: { type: 'video', src: '/heroVideo.mp4' },
  },
  {
    icon: (props: any) => <RiBroadcastLine {...props} />,
    title: 'Long-Form Production',
    tag: 'Authority',
    desc: 'YouTube is still the most powerful platform for building trust and inbound leads. We manage full production end-to-end: research, scripting, editing, thumbnails, and optimisation.',
    features: ['Full video editing', 'Thumbnail design', 'Title & SEO optimisation', 'Chapter structuring'],
    media: { type: 'image', src: '/team/aamir.png' },
  },
  {
    icon: (props: any) => <RiLineChartLine {...props} />,
    title: 'Content Strategy',
    tag: 'Growth Engine',
    desc: "We don't guess. Every roadmap is built on data: your audience, your competitors, and what's already working in your niche. Then we rebuild it every week, so the system compounds instead of going stale.",
    features: ['Weekly roadmap', 'Competitor analysis', 'Content pillar mapping', 'Weekly performance reviews'],
    media: { type: 'image', src: '/logo.png' },
  },
  {
    icon: (props: any) => <RiTeamLine {...props} />,
    title: 'Community Building',
    tag: 'Retention',
    desc: 'Views are vanity. Community is revenue. We help you convert subscribers into buyers — through engagement strategies, community management, and content that drives people to your offer.',
    features: ['Engagement strategy', 'Comment management', 'Community platform setup', 'Newsletter integration'],
    media: { type: 'image', src: '/name.png' },
  },
  {
    icon: (props: any) => <RiSearchLine {...props} />,
    title: 'Weekly Optimization',
    tag: 'Compounding',
    desc: "The system gets sharper every week. We analyse performance data, kill what's not working, and double down on what is. This is how content stops chasing views and starts booking calls — iteration, not luck.",
    features: ['Weekly analytics report', 'Trend monitoring', 'Format experimentation', 'Monthly strategy calls'],
    media: { type: 'video', src: '/heroVideo.mp4' },
  },
]

/* The five layers — mirrors the FiveLayers section on the homepage. */
const process = [
  { step: '01', title: 'Script Architecture', desc: 'We turn your expertise into high-performing psychological hooks and scripts.' },
  { step: '02', title: '60-Min Recording', desc: 'Record your monthly volume in a single streamlined, high-energy session.' },
  { step: '03', title: 'Elite Editing', desc: 'Cinema-grade assets designed for retention and brand authority.' },
  { step: '04', title: 'Distribution', desc: 'Every asset published across platforms on a schedule built for compounding reach.' },
  { step: '05', title: 'Optimization', desc: 'We read the data every week and feed the winners straight back into the next batch.' },
]

export default function ServicesContent() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileSectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const stickyGridRef = useRef<HTMLDivElement>(null)
  const { open } = useApply()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Refresh ScrollTrigger on resize – but only once after resize ends
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollToService = (i: number) => {
    const refs = isMobile ? mobileSectionRefs.current : sectionRefs.current
    refs[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToServices = () => {
    if (stickyGridRef.current) {
      stickyGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (isMobile === null) {
    return <div style={{ minHeight: '100vh' }} />
  }

  return (
    <main style={{ paddingTop: '72px', background: 'var(--hero-bg)' }}>
      <ServicesHero services={services} onPillClick={scrollToService} onScrollToServices={scrollToServices} />

      {/* Desktop sticky grid */}
      <div ref={stickyGridRef}>
        <ServicesStickyGrid
          services={services}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          sectionRefs={sectionRefs}
          isMobile={isMobile}
        />
      </div>

      {/* Mobile cards (simple vertical stack) */}
      {isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line2)' }}>
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                ref={el => { mobileSectionRefs.current[i] = el }}
                style={{ background: 'var(--black)' }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  {s.media.type === 'video' ? (
                    <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                      <source src={s.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      backgroundImage: `url(${s.media.src})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      minHeight: '200px',
                    }} />
                  )}
                  <div style={{
                    position: 'absolute', top: '14px', left: '14px',
                    background: 'rgba(227,194,74,0.9)', color: 'var(--black)',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '5px 10px', borderRadius: '4px',
                  }}>
                    {s.tag}
                  </div>
                </div>
                <div style={{ padding: '28px 24px 36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '8px',
                      border: '1px solid rgba(227,194,74,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(227,194,74,0.05)',
                    }}>
                      <Icon size={15} color="var(--green)" />
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-bricolage), sans-serif',
                      fontSize: '20px', fontWeight: 700,
                      color: 'var(--white)', letterSpacing: '-0.01em',
                    }}>
                      {s.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)', marginBottom: '20px' }}>
                    {s.desc}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {s.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 400, color: 'var(--t3)' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(227,194,74,0.6)', flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Process staircase – with bottom margin to prevent footer overlap */}
        <ProcessStaircase process={process} onApplyClick={open} isMobile={isMobile} />
    </main>
  )
}