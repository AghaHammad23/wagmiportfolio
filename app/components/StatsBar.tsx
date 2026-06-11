'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Stat = {
  value: number
  suffix: string
  sup: string
  label: string
  decimals?: number
}

const stats: Stat[] = [
  { value: 300,  suffix: '',  sup: '+', label: 'Brands Served' },
  { value: 7,    suffix: 'B', sup: '+', label: 'Total Views Generated' },
  { value: 220,  suffix: '',  sup: '+', label: 'Content Pieces / Month, From One Recording Day a Week' },
  { value: 48,   suffix: '',  sup: 'h', label: 'First Content Live' },
]

export default function StatsBar() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const gridRef  = useRef<HTMLDivElement>(null)
  const numRefs  = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cells = gridRef.current?.querySelectorAll<HTMLElement>('.stat-cell')
      if (!cells?.length) return

      // Entrance — cells rise in
      gsap.fromTo(
        cells,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        }
      )

      // Counter — each number counts up from 0
      stats.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
          onUpdate() {
            el.textContent = stat.decimals
              ? obj.val.toFixed(stat.decimals) + stat.suffix
              : Math.round(obj.val) + stat.suffix
          },
        })
      })

      // Accent line fades in after cells
      const accent = wrapRef.current?.querySelector('.stats-accent')
      if (accent) {
        gsap.fromTo(
          accent,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.3,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
          }
        )
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative', background: 'var(--off)', borderBottom: '1px solid var(--line)' }}>

      {/* Top gradient accent line */}
      <div
        className="stats-accent"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, var(--green), transparent)',
          transformOrigin: 'center',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={gridRef}
        className="stats-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-cell"
            style={{
              padding: 'clamp(28px, 4vw, 56px) clamp(20px, 3vw, 48px)',
              borderRight: i < stats.length - 1 ? '1px solid var(--line)' : 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Per-cell hover top border */}
            <div
              className="cell-accent"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(to right, transparent, var(--green), transparent)',
                opacity: 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: 'none',
              }}
            />

            {/* Number */}
            <div
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 46px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--white)',
                lineHeight: 1,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '2px',
              }}
            >
              <span ref={(el) => { numRefs.current[i] = el }}>
                0{s.suffix}
              </span>
              {s.sup && (
                <span style={{ fontSize: '0.42em', fontWeight: 700, color: 'var(--green)', opacity: 0.85 }}>
                  {s.sup}
                </span>
              )}
            </div>

            {/* Animated micro-divider */}
            <div
              className="cell-divider"
              style={{
                width: '20px',
                height: '1px',
                background: 'var(--line)',
                marginBottom: '10px',
                transition: 'width 0.35s ease, background 0.35s ease',
              }}
            />

            {/* Label */}
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--t3)',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stat-cell { transition: background 0.35s ease; }
        .stat-cell:hover { background: rgba(255,255,255,0.025) !important; }
        .stat-cell:hover .cell-accent  { opacity: 1 !important; }
        .stat-cell:hover .cell-divider { width: 44px !important; background: var(--green) !important; }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid .stat-cell:nth-child(1),
          .stats-grid .stat-cell:nth-child(2) { border-bottom: 1px solid var(--line) !important; }
          .stats-grid .stat-cell:nth-child(2),
          .stats-grid .stat-cell:nth-child(4) { border-right: none !important; }
          .stats-grid .stat-cell:nth-child(3) { border-right: 1px solid var(--line) !important; }
        }
      `}</style>
    </div>
  )
}
