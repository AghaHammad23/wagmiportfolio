'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  RiVideoLine,
  RiFileTextLine,
  RiLineChartLine,
  RiBroadcastLine,
  RiTeamLine,
  RiSearchLine,
} from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const services = [
  {
    icon: RiFileTextLine,
    title: 'Script Development',
    tag: 'Foundation',
    desc: "Every great video starts with a great script. Our writers craft hooks that stop the scroll, structures that hold attention, and CTAs that convert — all tuned to your voice and offer.",
    features: ['Hook writing', 'Story arc structuring', 'CTA optimisation', 'Voice matching'],
  },
  {
    icon: RiVideoLine,
    title: 'Short-Form Video',
    tag: 'Distribution',
    desc: 'Shorts, Reels, and TikToks that perform. We handle editing, captions, music, and posting cadence — turning your long-form content into a short-form machine that runs 7 days a week.',
    features: ['Multi-platform formatting', 'Caption design', 'Trend integration', 'A/B hook testing'],
  },
  {
    icon: RiBroadcastLine,
    title: 'Long-Form Production',
    tag: 'Authority',
    desc: 'YouTube is still the most powerful platform for building trust and inbound leads. We manage full production end-to-end: research, scripting, editing, thumbnails, and optimisation.',
    features: ['Full video editing', 'Thumbnail design', 'Title & SEO optimisation', 'Chapter structuring'],
  },
  {
    icon: RiLineChartLine,
    title: 'Content Strategy',
    tag: 'Growth Engine',
    desc: "We don't guess. Every 90-day roadmap is built on data: your audience, your competitors, and what's already working in your niche. Then we build a system that compounds over time.",
    features: ['90-day roadmap', 'Competitor analysis', 'Content pillar mapping', 'Weekly performance reviews'],
  },
  {
    icon: RiTeamLine,
    title: 'Community Building',
    tag: 'Retention',
    desc: 'Views are vanity. Community is revenue. We help you convert subscribers into buyers — through engagement strategies, community management, and content that drives people to your offer.',
    features: ['Engagement strategy', 'Comment management', 'Community platform setup', 'Newsletter integration'],
  },
  {
    icon: RiSearchLine,
    title: 'Weekly Optimisation',
    tag: 'Compounding',
    desc: 'The system gets sharper every week. We analyse performance data, kill what\'s not working, and double down on what is. This is how channels go from 10K to 1M — iteration, not luck.',
    features: ['Weekly analytics report', 'Trend monitoring', 'Format experimentation', 'Monthly strategy calls'],
  },
]

const process = [
  { step: '01', title: 'Application', desc: 'Fill out our short application. We review every submission personally and respond within 48 hours.' },
  { step: '02', title: 'Strategy Call', desc: 'A 30-minute call with our team to understand your brand, goals, and current content situation.' },
  { step: '03', title: 'Custom Roadmap', desc: 'We build a 90-day content roadmap tailored to your niche, audience, and growth target.' },
  { step: '04', title: 'We Execute', desc: 'Production begins. You review, approve, and post. We handle everything else — every week.' },
]

export default function ServicesContent() {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveals = revealRef.current?.querySelectorAll('.reveal')
    if (!reveals) return
    reveals.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  }, [])

  return (
    <main style={{ paddingTop: '52px' }}>
      {/* Hero */}
      <section style={{
        minHeight: '50vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '100px var(--pad) 80px', borderBottom: '1px solid var(--line2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.04) 0%, transparent 65%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          What We Do
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04,
            color: 'var(--white)', maxWidth: '760px', marginBottom: '24px',
          }}
        >
          Everything You Need.{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>Nothing You Don&apos;t.</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.22 }}
          style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)', maxWidth: '520px' }}
        >
          We don&apos;t offer à la carte services. We build the entire content engine for your brand — strategy, production, distribution, and optimisation — all under one roof.
        </motion.p>
      </section>

      {/* Services grid */}
      <div ref={revealRef}>
        <div style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--line2)' }}>
              {services.map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={i}
                    className="reveal"
                    style={{
                      background: 'var(--black)', padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 36px)',
                      display: 'flex', flexDirection: 'column', gap: '16px',
                      transition: 'background 0.25s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--black)')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Icon size={22} color="var(--green)" style={{ opacity: 0.8 }} />
                      <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(106,255,42,0.5)' }}>
                        {s.tag}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '18px',
                      fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.01em',
                    }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)' }}>{s.desc}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                      {s.features.map((f) => (
                        <li key={f} style={{ fontSize: '12px', fontWeight: 400, color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'rgba(106,255,42,0.5)', fontSize: '10px' }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Process */}
        <div style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)', background: 'var(--off)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
              How We Onboard You
            </div>
            <h2 className="reveal" style={{
              fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06,
              color: 'var(--white)', marginBottom: 'clamp(40px, 6vw, 64px)',
            }}>
              Four steps from<br />
              <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>application to execution.</em>
            </h2>
            <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--line2)' }}>
              {process.map((p, i) => (
                <div key={i} className="reveal" style={{ background: 'var(--off)', padding: 'clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 32px)' }}>
                  <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '48px', fontWeight: 800, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '24px' }}>{p.step}</div>
                  <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--white)', marginBottom: '10px', letterSpacing: '-0.01em' }}>{p.title}</div>
                  <div style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: 'clamp(80px, 12vw, 160px) var(--pad)', textAlign: 'center', borderBottom: '1px solid var(--line2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(106,255,42,0.025) 0%, transparent 60%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--white)', maxWidth: '600px', margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>
            Let&apos;s build your content engine.
          </h2>
          <p className="reveal" style={{ fontSize: '16px', fontWeight: 300, color: 'var(--t2)', maxWidth: '380px', margin: '0 auto 40px', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            Apply today. Limited spots open each month.
          </p>
          <a href="#" className="reveal"
            style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--black)', background: 'var(--white)', padding: '14px 36px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, transform 0.15s', position: 'relative', zIndex: 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Apply to Work With Us
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .services-grid, .process-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
