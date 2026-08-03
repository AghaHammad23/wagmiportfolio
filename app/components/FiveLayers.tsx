'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Layer = {
  n: number
  label: string
  title: string
  body: string
}

const layers: Layer[] = [
  {
    n: 1,
    label: 'Layer 01',
    title: 'Script Architecture',
    body: 'We turn your expertise into high-performing psychological hooks and scripts.',
  },
  {
    n: 2,
    label: 'Layer 02',
    title: '60-Min Recording',
    body: 'Record your monthly volume in a single streamlined, high-energy session.',
  },
  {
    n: 3,
    label: 'Layer 03',
    title: 'Elite Editing',
    body: 'Cinema-grade assets designed for retention and brand authority.',
  },
  {
    n: 4,
    label: 'Layer 04',
    title: 'Distribution',
    body: 'Every asset published across platforms on a schedule built for compounding reach.',
  },
  {
    n: 5,
    label: 'Layer 05',
    title: 'Optimization',
    body: 'We read the data every week and feed the winners straight back into the next batch.',
  },
]

/* Light dot-grain, tinted to sit on the cream card without dirtying it. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Ccircle cx='2' cy='2' r='0.9' fill='%230C3B2E' fill-opacity='0.16'/%3E%3Ccircle cx='8' cy='7' r='0.9' fill='%230C3B2E' fill-opacity='0.12'/%3E%3C/svg%3E\")"

export default function FiveLayers() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.fl-heading')
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

      // Each row slides in from the side its card sits on.
      sectionRef.current?.querySelectorAll<HTMLElement>('.fl-row').forEach((row) => {
        const fromLeft = row.dataset.side === 'left'
        gsap.fromTo(
          row,
          { opacity: 0, x: fromLeft ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%', once: true },
          }
        )
      })

      // Spine draws itself as the section scrolls past.
      const spine = sectionRef.current?.querySelector('.fl-spine-fill')
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.fl-timeline',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.6,
            },
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
        background: 'var(--section-bg)',
        padding: 'clamp(56px, 8vw, 110px) var(--pad) clamp(72px, 10vw, 140px)',
      }}
    >
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

        {/* Heading */}
        <h2
          className="fl-heading"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(36px, 7vw, 88px)',
            lineHeight: 1.02,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-cream)',
            marginBottom: 'clamp(48px, 8vw, 110px)',
          }}
        >
          Five layers.
          <span style={{ display: 'block', color: 'var(--hero-gold)' }}>
            60 minutes of recording a week.
          </span>
        </h2>

        {/* Timeline */}
        <div className="fl-timeline" style={{ position: 'relative' }}>

          {/* Spine */}
          <div
            aria-hidden="true"
            className="fl-spine"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '1px',
              transform: 'translateX(-50%)',
              background: 'rgba(244,241,214,0.14)',
            }}
          >
            <div
              className="fl-spine-fill"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(123,214,165,0.55)',
                transformOrigin: 'top center',
              }}
            />
          </div>

          {layers.map((layer) => {
            // Odd layers put the card on the right, even ones on the left.
            const cardRight = layer.n % 2 === 1

            return (
              <div
                key={layer.n}
                className="fl-row"
                data-side={cardRight ? 'right' : 'left'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'center',
                  gap: 'clamp(16px, 3vw, 40px)',
                  marginBottom: 'clamp(36px, 6vw, 76px)',
                }}
              >
                {/* Left cell */}
                <div style={{ gridColumn: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  {cardRight ? <LayerMeta layer={layer} align="right" /> : <LayerCard body={layer.body} />}
                </div>

                {/* Node */}
                <div
                  style={{
                    gridColumn: 2,
                    width: 'clamp(44px, 4vw, 56px)',
                    height: 'clamp(44px, 4vw, 56px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(123,214,165,0.6)',
                    background: 'var(--card-cream)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-jakarta), sans-serif',
                    fontSize: 'clamp(13px, 1.3vw, 16px)',
                    color: 'var(--hero-bg)',
                    fontWeight: 600,
                    boxShadow: '0 0 0 6px var(--section-bg), 0 0 22px rgba(123,214,165,0.18)',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {layer.n}
                </div>

                {/* Right cell */}
                <div style={{ gridColumn: 3, display: 'flex', justifyContent: 'flex-start' }}>
                  {cardRight ? <LayerCard body={layer.body} /> : <LayerMeta layer={layer} align="left" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .fl-card { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease; }
        .fl-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(123,214,165,0.9), 0 18px 40px rgba(0,0,0,0.4);
        }

        /* Stack everything to one side on small screens */
        @media (max-width: 720px) {
          .fl-spine { left: 22px !important; }
          .fl-row {
            grid-template-columns: 44px 1fr !important;
            align-items: start !important;
          }
          .fl-row > *:nth-child(1) { grid-column: 2 !important; grid-row: 1; justify-content: flex-start !important; }
          .fl-row > *:nth-child(2) { grid-column: 1 !important; grid-row: 1; }
          .fl-row > *:nth-child(3) { grid-column: 2 !important; grid-row: 2; justify-content: flex-start !important; }
          .fl-meta { text-align: left !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  )
}

function LayerMeta({ layer, align }: { layer: Layer; align: 'left' | 'right' }) {
  return (
    <div
      className="fl-meta"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
        textAlign: align,
        gap: 'clamp(10px, 1.4vw, 16px)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-anton), sans-serif',
          fontSize: 'clamp(11px, 1.1vw, 14px)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--hero-gold)',
        }}
      >
        {layer.label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-anton), sans-serif',
          fontSize: 'clamp(12px, 1.2vw, 15px)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--hero-cream)',
        }}
      >
        {layer.title}
      </span>
    </div>
  )
}

function LayerCard({ body }: { body: string }) {
  return (
    <div
      className="fl-card"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        // Grain dots layered over the cream fill.
        backgroundColor: '#E8E5CB',
        backgroundImage: GRAIN,
        backgroundSize: '12px 12px',
        border: '1px solid rgba(123,214,165,0.75)',
        borderRadius: '18px',
        padding: 'clamp(18px, 2.2vw, 26px) clamp(20px, 2.4vw, 30px)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
      }}
    >
      <p
        style={{
          fontSize: 'clamp(13px, 1.2vw, 15px)',
          fontWeight: 400,
          lineHeight: 1.6,
          color: 'rgba(12,59,46,0.85)',
        }}
      >
        {body}
      </p>
    </div>
  )
}
