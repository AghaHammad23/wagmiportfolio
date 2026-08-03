'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Bonus = {
  asset: string
  value: string
}

const bonuses: Bonus[] = [
  { asset: 'Personal Brand Audit', value: '$297' },
  { asset: 'YouTube SEO Optimization', value: '$199' },
  { asset: 'Hook Framework Library', value: '$149' },
  { asset: 'Raw Footage Archive (LIFETIME)', value: '$397' },
  { asset: 'Growth Strategy Consultant Call', value: '$100' },
]

const TOTAL = '$1,142'

export default function IncludedFree() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.if-heading')
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          }
        )
      }

      const table = sectionRef.current?.querySelector('.if-table')
      if (table) {
        gsap.fromTo(
          table,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: table, start: 'top 86%', once: true },
          }
        )
      }

      const rows = sectionRef.current?.querySelectorAll<HTMLElement>('.if-row')
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: { trigger: table, start: 'top 82%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--hero-bg)',
        padding: 'clamp(56px, 8vw, 110px) var(--pad) clamp(72px, 10vw, 140px)',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>

        <h2
          className="if-heading"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(38px, 7.5vw, 92px)',
            lineHeight: 1,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-gold)',
            marginBottom: 'clamp(44px, 7vw, 88px)',
          }}
        >
          Included Free
        </h2>

        <div
          className="if-table"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(123,214,165,0.16)',
            background: '#052B20',
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          }}
        >
          {/* Header */}
          <div
            className="if-head"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              padding: 'clamp(18px, 2.2vw, 26px) clamp(20px, 2.6vw, 32px)',
              background: 'var(--green2)',
            }}
          >
            <span style={headCell}>Asset</span>
            <span style={headCell}>Value</span>
          </div>

          {/* Rows */}
          {bonuses.map((bonus) => (
            <div
              key={bonus.asset}
              className="if-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                padding: 'clamp(18px, 2.2vw, 26px) clamp(20px, 2.6vw, 32px)',
                borderTop: '1px solid rgba(123,214,165,0.12)',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(14px, 1.4vw, 17px)',
                  fontWeight: 400,
                  color: 'var(--hero-cream)',
                }}
              >
                {bonus.asset}
              </span>

              <span
                className="if-value"
                style={{
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontSize: 'clamp(17px, 1.9vw, 24px)',
                  letterSpacing: '0.01em',
                  color: 'var(--hero-gold)',
                  whiteSpace: 'nowrap',
                }}
              >
                {bonus.value}
              </span>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              padding: 'clamp(20px, 2.4vw, 28px) clamp(20px, 2.6vw, 32px)',
              borderTop: '1px solid rgba(123,214,165,0.2)',
              background: 'rgba(12,59,46,0.55)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-anton), sans-serif',
                fontSize: 'clamp(12px, 1.3vw, 16px)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--hero-cream)',
              }}
            >
              Total Bonus Value
            </span>

            <span
              style={{
                fontFamily: 'var(--font-anton), sans-serif',
                fontSize: 'clamp(15px, 1.7vw, 22px)',
                letterSpacing: '0.01em',
                color: 'var(--hero-gold)',
                whiteSpace: 'nowrap',
              }}
            >
              {TOTAL}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .if-row { transition: background 0.3s ease; }
        .if-row:hover { background: rgba(123,214,165,0.05); }
        .if-value { transition: transform 0.3s ease; display: inline-block; }
        .if-row:hover .if-value { transform: scale(1.06); }
      `}</style>
    </section>
  )
}

const headCell: React.CSSProperties = {
  fontFamily: 'var(--font-anton), sans-serif',
  fontSize: 'clamp(11px, 1.1vw, 14px)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--hero-cream)',
}
