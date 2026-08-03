'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Stat = {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '200+',         label: 'Assets Produced' },
  { value: '60 min',       label: 'Client Input' },
  { value: '12 to 24 hrs', label: 'Delivery Speed' },
  { value: '1 system',     label: 'For Scale' },
]

export default function StatsBar() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cells = gridRef.current?.querySelectorAll<HTMLElement>('.stat-cell')
      if (!cells?.length) return

      gsap.fromTo(
        cells,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 88%', once: true },
        }
      )

      const rule = wrapRef.current?.querySelector('.stats-rule')
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 88%', once: true },
          }
        )
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        background: 'var(--hero-bg)',
        padding: '0 var(--pad) clamp(56px, 8vw, 110px)',
      }}
    >
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

        {/* Hairline rule above the row */}
        <div
          className="stats-rule"
          aria-hidden="true"
          style={{
            height: '1px',
            background: 'rgba(244,241,214,0.14)',
            transformOrigin: 'center',
            marginBottom: 'clamp(32px, 4.5vw, 56px)',
          }}
        />

        <div
          ref={gridRef}
          className="stats-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(28px, 4vw, 48px) 16px' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="stat-cell" style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(26px, 3.4vw, 44px)',
                  lineHeight: 1,
                  letterSpacing: '0.005em',
                  textTransform: 'uppercase',
                  color: 'var(--hero-gold)',
                  marginBottom: 'clamp(10px, 1.2vw, 16px)',
                }}
              >
                {s.value}
              </div>

              <div
                style={{
                  fontSize: 'clamp(11px, 1.1vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--hero-cream)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
