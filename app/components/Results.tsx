'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const results = [
  {
    number: '14.1M Subscribers',
    client: 'Omar Raja — ESPN',
    desc: 'Sports media channel scaled from 4,000 to 14.1 million subscribers. Over 2.1 billion total views generated.',
    duration: '14 months collaboration',
  },
  {
    number: '4.73M Subscribers',
    client: 'Answered That For You',
    desc: 'Faceless documentary channel built from zero to 4.73 million subscribers. 4.9 billion total views. 2,000+ videos published.',
    duration: '12 months collaboration',
  },
  {
    number: '246,000 Subscribers',
    client: 'Matt Theriault — Epic Real Estate',
    desc: 'Real estate education channel grown from 2,000 to 246,000 subscribers through structured content engine and systematic publishing.',
    duration: '12 months collaboration',
  },
  {
    number: '126,000 Subscribers',
    client: 'Jonathan Catliff — AI Automation',
    desc: 'Channel scaled from 100 to 126,000 subscribers. Paid Skool community grown to 362 members simultaneously.',
    duration: '7 months collaboration',
  },
  {
    number: '89,600 Subscribers',
    client: 'Marketing Against the Grain',
    desc: 'Marketing education channel built from zero to 89,600 subscribers with structured long-form content system.',
    duration: '9 months collaboration',
  },
  {
    number: '75,700 Subscribers',
    client: 'Alec Wilcock — AI Education',
    desc: 'AI content channel grown from 5,000 to 75,700 subscribers. Strong positioning in competitive AI niche.',
    duration: '6 months collaboration',
  },
]

export default function Results() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    if (!reveals) return

    reveals.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      )
    })
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 140px) var(--pad)',
        borderBottom: '1px solid var(--line2)',
      }}
    >
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
        <div
          className="reveal"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--t4)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          Client Results
        </div>
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            color: 'var(--white)',
            marginBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          From zero to millions.
          <br />
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>
            Here&apos;s what the engine does.
          </em>
        </h2>

        {/* Results grid */}
        <div
          className="results-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'var(--line2)',
          }}
        >
          {results.map((r, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                background: 'var(--black)',
                padding: 'clamp(32px, 4vw, 56px) clamp(24px, 3vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'background 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--black)')}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--white)',
                  lineHeight: 1,
                }}
              >
                {r.number}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--t3)',
                }}
              >
                {r.client}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'var(--t2)',
                  lineHeight: 1.65,
                }}
              >
                {r.desc}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'var(--t4)',
                  letterSpacing: '0.04em',
                  marginTop: '4px',
                }}
              >
                {r.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .results-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
