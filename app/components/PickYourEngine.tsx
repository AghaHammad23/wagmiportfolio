'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from './Providers'

gsap.registerPlugin(ScrollTrigger)

type Plan = {
  name: string
  price: string
  period: string
  body: string
  cta: string
  featured?: boolean
  /** Hover treatment for this plan's CTA — each tier gets its own. */
  hover: { bg: string; fg: string; border: string }
}

const plans: Plan[] = [
  {
    name: 'Ad Creatives + VSL',
    price: '$999',
    period: '/set',
    body: 'The perfect starting point for scaling paid traffic and high-ticket offers.',
    cta: 'Start Building',
    hover: { bg: '#7BD6A5', fg: '#00251B', border: '#7BD6A5' },
  },
  {
    name: 'Content Engine',
    price: '$2,999',
    period: '/mo',
    body: 'A complete production arm for your personal brand. Full management, zero friction.',
    cta: 'Get the Engine',
    featured: true,
    hover: { bg: '#E3C24A', fg: '#00251B', border: '#E3C24A' },
  },
  {
    name: 'The Full Funnel',
    price: '$4,999',
    period: '/mo',
    body: 'Paid ads, organic engine, and optimized landing pages. The ultimate growth system.',
    cta: 'Go Unlimited',
    hover: { bg: '#1E7B61', fg: '#F4F1D6', border: '#1E7B61' },
  },
]

/* Dot texture — dark dots for the cream card, light ones for the green cards. */
const DOTS_DARK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='2' cy='2' r='0.8' fill='%230C3B2E' fill-opacity='0.16'/%3E%3C/svg%3E\")"

const DOTS_LIGHT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='2' cy='2' r='0.8' fill='%23F4F1D6' fill-opacity='0.10'/%3E%3C/svg%3E\")"

export default function PickYourEngine() {
  const sectionRef = useRef<HTMLElement>(null)
  const { open } = useApply()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.pye-reveal')
      if (!items?.length) return
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Cursor position drives the dot layer's parallax and the card's glow.
  const trackCard = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    card.style.setProperty('--glow-x', `${px * 100}%`)
    card.style.setProperty('--glow-y', `${py * 100}%`)
    card.style.setProperty('--glow-intensity', '1')
    card.style.setProperty('--dot-x', `${(px - 0.5) * -16}px`)
    card.style.setProperty('--dot-y', `${(py - 0.5) * -16}px`)
  }

  const resetCard = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    card.style.setProperty('--glow-intensity', '0')
    card.style.setProperty('--dot-x', '0px')
    card.style.setProperty('--dot-y', '0px')
  }

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
          className="pye-reveal"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(38px, 7.5vw, 92px)',
            lineHeight: 1.02,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-cream)',
            marginBottom: 'clamp(52px, 8vw, 104px)',
          }}
        >
          Pick your engine.
        </h2>

        <div
          className="pye-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(16px, 2.2vw, 26px)',
            alignItems: 'center',
          }}
        >
          {plans.map((plan) => {
            const cream = Boolean(plan.featured)

            return (
              <div
                key={plan.name}
                className={`pye-reveal pye-card ${cream ? 'pye-card--featured' : ''}`}
                onMouseMove={trackCard}
                onMouseLeave={resetCard}
                style={{
                  position: 'relative',
                  background: cream ? 'var(--card-cream)' : '#0B3226',
                  border: `1px solid ${cream ? 'rgba(30,123,97,0.9)' : 'rgba(123,214,165,0.28)'}`,
                  borderRadius: '18px',
                  padding: cream
                    ? 'clamp(30px, 3.4vw, 44px) clamp(24px, 2.8vw, 34px)'
                    : 'clamp(24px, 2.8vw, 36px) clamp(22px, 2.6vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: cream
                    ? '0 24px 60px rgba(0,0,0,0.45)'
                    : '0 12px 32px rgba(0,0,0,0.3)',
                  ...({
                    '--glow-x': '50%',
                    '--glow-y': '50%',
                    '--glow-intensity': '0',
                    '--dot-x': '0px',
                    '--dot-y': '0px',
                  } as React.CSSProperties),
                }}
              >
                {/* Effects are clipped here so the card itself can stay
                    overflow-visible and let the badge hang past its edge. */}
                <div aria-hidden="true" className="pye-fx">
                  {/* Parallax dot layer */}
                  <div
                    className="pye-dots"
                    style={{
                      backgroundImage: cream ? DOTS_DARK : DOTS_LIGHT,
                      backgroundSize: '10px 10px',
                    }}
                  />

                  {/* Cursor glow */}
                  <div
                    className="pye-glow"
                    style={{
                      background: cream
                        ? 'radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(30,123,97,calc(var(--glow-intensity) * 0.20)), transparent 65%)'
                        : 'radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(123,214,165,calc(var(--glow-intensity) * 0.22)), transparent 65%)',
                    }}
                  />
                </div>

                {plan.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontFamily: 'var(--font-anton), sans-serif',
                      fontSize: 'clamp(10px, 1vw, 12px)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--green2)',
                      background: 'var(--hero-gold)',
                      borderRadius: '999px',
                      padding: '9px 22px',
                      whiteSpace: 'nowrap',
                      zIndex: 3,
                    }}
                  >
                    Most Picked
                  </span>
                )}

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Plan name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-anton), sans-serif',
                      fontWeight: 400,
                      fontSize: 'clamp(19px, 2vw, 26px)',
                      lineHeight: 1.15,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: cream ? 'var(--green2)' : 'var(--hero-cream)',
                    }}
                  >
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4px',
                      marginTop: 'clamp(14px, 1.8vw, 20px)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-anton), sans-serif',
                        fontSize: 'clamp(38px, 4.6vw, 60px)',
                        lineHeight: 1,
                        letterSpacing: '0.005em',
                        color: cream ? '#1E7B61' : 'var(--hero-gold)',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-anton), sans-serif',
                        fontSize: 'clamp(15px, 1.5vw, 20px)',
                        textTransform: 'uppercase',
                        color: cream ? 'rgba(12,59,46,0.55)' : 'rgba(244,241,214,0.6)',
                      }}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {/* Body */}
                  <p
                    style={{
                      fontSize: 'clamp(14px, 1.3vw, 16px)',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: cream ? 'rgba(12,59,46,0.72)' : 'rgba(244,241,214,0.72)',
                      margin: 'clamp(20px, 2.4vw, 30px) 0 clamp(26px, 3.4vw, 42px)',
                    }}
                  >
                    {plan.body}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={open}
                    className={`pye-btn ${cream ? 'pye-btn--solid' : ''}`}
                    style={{
                      marginTop: 'auto',
                      width: '100%',
                      fontFamily: 'var(--font-jakarta), sans-serif',
                      fontSize: 'clamp(13px, 1.3vw, 16px)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: cream ? 'var(--card-cream)' : 'var(--hero-cream)',
                      background: cream ? 'var(--hero-bg)' : 'transparent',
                      border: cream ? 'none' : '1px solid rgba(123,214,165,0.55)',
                      borderRadius: '999px',
                      padding: 'clamp(14px, 1.6vw, 20px) 20px',
                      cursor: 'pointer',
                      ...({
                        '--btn-hover-bg': plan.hover.bg,
                        '--btn-hover-fg': plan.hover.fg,
                        '--btn-hover-border': plan.hover.border,
                      } as React.CSSProperties),
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .pye-card {
          /* Visible so the "Most Picked" badge can sit over the top edge */
          overflow: visible;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .pye-fx {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .pye-card:hover {
          transform: translateY(-8px);
          border-color: rgba(123,214,165,0.85);
          box-shadow: 0 28px 60px rgba(0,0,0,0.5);
        }
        .pye-card--featured { transform: scale(1.045); }
        .pye-card--featured:hover { transform: scale(1.045) translateY(-8px); }

        /* Dots drift against the cursor for a shallow parallax */
        .pye-dots {
          position: absolute;
          inset: -20px;
          transform: translate(var(--dot-x), var(--dot-y));
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
          opacity: 0.75;
          pointer-events: none;
          z-index: 0;
        }
        .pye-card:hover .pye-dots { opacity: 1; }

        .pye-glow {
          position: absolute;
          inset: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 1;
        }

        /* Each tier carries its own hover palette via --btn-hover-* */
        .pye-btn { transition: background 0.28s ease, color 0.28s ease, transform 0.28s ease, border-color 0.28s ease; }
        .pye-btn:hover {
          background: var(--btn-hover-bg) !important;
          color: var(--btn-hover-fg) !important;
          border-color: var(--btn-hover-border) !important;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .pye-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
          .pye-card--featured, .pye-card--featured:hover { transform: none; }
          .pye-card--featured:hover { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
