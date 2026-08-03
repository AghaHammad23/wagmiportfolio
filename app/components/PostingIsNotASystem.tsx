'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Card = {
  n: string
  /** Two words, one per line — keeps every card's title block exactly two lines. */
  title: [string, string]
  body: string
}

const cards: Card[] = [
  {
    n: '01',
    title: ['No', 'System'],
    body: 'You’re shooting random videos, hoping for a miracle that never comes.',
  },
  {
    n: '02',
    title: ['No', 'Inbound'],
    body: 'The content gets likes but zero qualified leads in your calendar.',
  },
  {
    n: '03',
    title: ['Referral', 'Ceiling'],
    body: 'You are capped by your network and can’t reach a new cold audience.',
  },
  {
    n: '04',
    title: ['Losing', 'Ground'],
    body: 'Competitors are eating your market share with professional media presence.',
  },
]

export default function PostingIsNotASystem() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.pins-heading')
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

      const cells = gridRef.current?.querySelectorAll<HTMLElement>('.pins-card')
      if (cells?.length) {
        gsap.fromTo(
          cells,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 88%', once: true },
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

        <h2
          className="pins-heading"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(40px, 8vw, 96px)',
            lineHeight: 1,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-cream)',
            marginBottom: 'clamp(40px, 6vw, 76px)',
          }}
        >
          Posting is not a system.
        </h2>

        <div
          ref={gridRef}
          className="pins-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(16px, 2vw, 24px)',
            perspective: '1000px',
          }}
        >
          {cards.map((card) => (
            <TiltCard key={card.n} card={card} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .pins-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .pins-grid { grid-template-columns: 1fr !important; } }
        @media (prefers-reduced-motion: reduce) { .pins-card { transform: none !important; } }
      `}</style>
    </section>
  )
}

const MAX_TILT = 10 // degrees

function TiltCard({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    // Cursor left of centre tips the card left; above centre tips it back.
    setTilt({ x: (0.5 - py) * 2 * MAX_TILT, y: (px - 0.5) * 2 * MAX_TILT })
    setGlow({ x: px * 100, y: py * 100 })
  }

  const reset = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
  }

  return (
    <div
      ref={ref}
      className="pins-card"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{
        position: 'relative',
        background: 'var(--green2)',
        border: '1px solid rgba(123,214,165,0.18)',
        borderRadius: '14px',
        padding: 'clamp(24px, 2.6vw, 34px)',
        minHeight: 'clamp(260px, 26vw, 340px)',
        display: 'flex',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 14 : 0}px)`,
        /* Short easing while tracking the cursor; long, soft settle on exit. */
        transition: hovered
          ? 'transform 0.18s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s ease, border-color 0.6s ease',
        boxShadow: hovered
          ? '0 26px 60px rgba(0,0,0,0.45)'
          : '0 8px 24px rgba(0,0,0,0.25)',
        borderColor: hovered ? 'rgba(227,194,74,0.45)' : 'rgba(123,214,165,0.18)',
        willChange: 'transform',
      }}
    >
      {/* Cursor-following sheen */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, rgba(244,241,214,0.10), transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Content sits above the card face in 3D space, spread over its full height */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: 'translateZ(28px)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(38px, 4.2vw, 56px)',
            lineHeight: 1,
            color: 'rgba(227,194,74,0.55)',
          }}
        >
          {card.n}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(22px, 2.4vw, 32px)',
            lineHeight: 1.08,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--hero-cream)',
            marginTop: 'clamp(16px, 2vw, 26px)',
          }}
        >
          {card.title.map((word) => (
            <span key={word} style={{ display: 'block' }}>
              {word}
            </span>
          ))}
        </h3>

        {/* Number + title align across cards; the body settles on a shared bottom edge */}
        <div style={{ flex: '1 1 auto', minHeight: 'clamp(16px, 2.5vw, 32px)' }} />

        <p
          style={{
            fontSize: 'clamp(12px, 1.15vw, 15px)',
            fontWeight: 400,
            lineHeight: 1.65,
            color: 'rgba(244,241,214,0.62)',
          }}
        >
          {card.body}
        </p>
      </div>
    </div>
  )
}
