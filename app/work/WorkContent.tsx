'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const results = [
  {
    number: '14.1M Subscribers',
    client: 'Omar Raja — ESPN',
    category: 'Sports Media',
    desc: 'Sports media channel scaled from 4,000 to 14.1 million subscribers. Over 2.1 billion total views generated through structured short and long-form content.',
    duration: '14 months',
    views: '2.1B views',
  },
  {
    number: '4.73M Subscribers',
    client: 'Answered That For You',
    category: 'Documentary / Faceless',
    desc: 'Faceless documentary channel built from zero to 4.73 million subscribers. 4.9 billion total views across 2,000+ published videos.',
    duration: '12 months',
    views: '4.9B views',
  },
  {
    number: '246,000 Subscribers',
    client: 'Matt Theriault — Epic Real Estate',
    category: 'Real Estate Education',
    desc: 'Real estate education channel grown from 2,000 to 246,000 subscribers through systematic publishing and content engine strategy.',
    duration: '12 months',
    views: '18M views',
  },
  {
    number: '126,000 Subscribers',
    client: 'Jonathan Catliff — AI Automation',
    category: 'AI & Tech',
    desc: 'Channel scaled from 100 to 126,000 subscribers. Paid Skool community simultaneously grown to 362 members generating recurring revenue.',
    duration: '7 months',
    views: '9.4M views',
  },
  {
    number: '89,600 Subscribers',
    client: 'Marketing Against the Grain',
    category: 'Marketing Education',
    desc: 'Marketing education channel built from zero to 89,600 subscribers with structured long-form content system and weekly optimisation.',
    duration: '9 months',
    views: '6.2M views',
  },
  {
    number: '75,700 Subscribers',
    client: 'Alec Wilcock — AI Education',
    category: 'AI Education',
    desc: 'AI content channel grown from 5,000 to 75,700 subscribers. Strong authority positioning in a highly competitive AI niche.',
    duration: '6 months',
    views: '4.1M views',
  },
]

const stats = [
  { num: '300+', label: 'Brands Served' },
  { num: '7B+', label: 'Total Views' },
  { num: '14.1M', label: 'Peak Subscribers' },
  { num: '100%', label: 'Done For You' },
]

export default function WorkContent() {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveals = revealRef.current?.querySelectorAll('.reveal')
    if (!reveals) return
    reveals.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  }, [])

  return (
    <main style={{ paddingTop: '52px' }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '100px var(--pad) 80px',
          borderBottom: '1px solid var(--line2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.04) 0%, transparent 65%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          style={{
            fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          Client Results
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.04, color: 'var(--white)',
            maxWidth: '760px', marginBottom: '24px',
          }}
        >
          Work That Speaks{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>for Itself.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.22 }}
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300,
            lineHeight: 1.7, color: 'var(--t2)', maxWidth: '480px',
          }}
        >
          300+ brands. 7 billion views. These are the numbers that happen when
          you hand the content machine to the right team.
        </motion.p>
      </section>

      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--line)', background: 'var(--off)',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: 'clamp(20px, 3vw, 40px) clamp(20px, 4vw, 48px)',
            borderRight: i < stats.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800,
              letterSpacing: '-0.03em', color: 'var(--white)', lineHeight: 1, marginBottom: '6px',
            }}>{s.num}</div>
            <div style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--t3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Results grid */}
      <div ref={revealRef} style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div
            className="results-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--line2)' }}
          >
            {results.map((r, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'var(--black)',
                  padding: 'clamp(32px, 4vw, 56px) clamp(24px, 3vw, 48px)',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--black)')}
              >
                <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(106,255,42,0.5)' }}>
                  {r.category}
                </div>
                <div style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800,
                  letterSpacing: '-0.03em', color: 'var(--white)', lineHeight: 1,
                }}>{r.number}</div>
                <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--t3)' }}>
                  {r.client}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 300, color: 'var(--t2)', lineHeight: 1.65 }}>{r.desc}</div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t4)', letterSpacing: '0.04em' }}>{r.duration}</span>
                  <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t4)', letterSpacing: '0.04em' }}>{r.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: 'clamp(80px, 12vw, 160px) var(--pad)',
        textAlign: 'center', borderBottom: '1px solid var(--line2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.025) 0%, transparent 60%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        }} />
        <h2 style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 800,
          letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--white)',
          maxWidth: '640px', margin: '0 auto 20px', position: 'relative', zIndex: 1,
        }}>
          Ready to be the next{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>success story?</em>
        </h2>
        <p style={{
          fontSize: '16px', fontWeight: 300, color: 'var(--t2)',
          maxWidth: '400px', margin: '0 auto 40px', lineHeight: 1.7,
          position: 'relative', zIndex: 1,
        }}>
          Limited spots available. Apply and we&apos;ll get back to you within 48 hours.
        </p>
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '14px',
            fontWeight: 700, color: 'var(--black)', background: 'var(--white)',
            padding: '14px 36px', textDecoration: 'none', display: 'inline-block',
            transition: 'background 0.2s, transform 0.15s', position: 'relative', zIndex: 1,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Apply to Work With Us
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) { .results-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
