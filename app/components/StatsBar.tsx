'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '300', sup: '+', label: 'Brands Served' },
  { num: '7B', sup: '+', label: 'Total Views Generated' },
  { num: '14.1M', sup: '', label: 'Subscribers — Single Client' },
  { num: '48', sup: 'h', label: 'Response Guarantee' },
]

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cells = containerRef.current?.querySelectorAll('.stat-cell')
    if (!cells) return

    gsap.fromTo(
      cells,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--off)',
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="stat-cell"
          style={{
            padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 56px)',
            borderRight: i < stats.length - 1 ? '1px solid var(--line)' : 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--white)',
              lineHeight: 1,
              marginBottom: '6px',
            }}
          >
            {s.num}
            {s.sup && (
              <sup
                style={{
                  fontSize: '0.5em',
                  color: 'rgba(106,255,42,0.7)',
                  verticalAlign: 'super',
                  fontWeight: 700,
                }}
              >
                {s.sup}
              </sup>
            )}
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--t3)',
            }}
          >
            {s.label}
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}
