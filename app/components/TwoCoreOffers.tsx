'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { useApply } from './Providers'

gsap.registerPlugin(ScrollTrigger)

type Offer = {
  badge: string
  title: string
  body: string
  points: string[]
}

const offers: Offer[] = [
  {
    badge: 'Core Offer',
    title: 'The Engine',
    body: 'Daily content production that fuels your omnipresence across all platforms.',
    points: ['30 Shorts/Month', 'Professional Scripting', 'High-Retention Editing'],
  },
  {
    badge: 'Core Offer',
    title: 'The Converter',
    body: 'High-intent assets designed to move the needle and close the deal.',
    points: ['Video Sales Letter (VSL)', 'Paid Ad Creatives', 'Case Study Videos'],
  },
]

export default function TwoCoreOffers() {
  const sectionRef = useRef<HTMLElement>(null)
  const { open } = useApply()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.tco-reveal')
      if (!items?.length) return
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
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

  // Same masked-border glow as the careers "roles open now" cards, keyed to the
  // cursor position — gold, and driving the interior wash from the same vars.
  const trackGlow = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    card.style.setProperty('--glow-x', `${((e.clientX - r.left) / r.width) * 100}%`)
    card.style.setProperty('--glow-y', `${((e.clientY - r.top) / r.height) * 100}%`)
    card.style.setProperty('--glow-intensity', '1')
  }

  const clearGlow = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--glow-intensity', '0')
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--hero-bg)',
        padding: 'clamp(56px, 8vw, 110px) var(--pad) clamp(72px, 10vw, 140px)',
      }}
    >
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

        {/* Heading */}
        <h2
          className="tco-reveal"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(36px, 7vw, 84px)',
            lineHeight: 1.02,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-cream)',
            marginBottom: 'clamp(40px, 6vw, 76px)',
          }}
        >
          Two core offers.
          <span style={{ display: 'block', color: 'var(--hero-gold)' }}>Built to sell.</span>
        </h2>

        {/* Offer cards */}
        <div
          className="tco-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(16px, 2.4vw, 28px)',
          }}
        >
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="tco-reveal tco-card"
              onMouseMove={trackGlow}
              onMouseLeave={clearGlow}
              style={{
                position: 'relative',
                background: 'var(--card-cream)',
                borderRadius: '18px',
                padding: 'clamp(22px, 2.8vw, 34px)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
                ...({
                  '--glow-x': '50%',
                  '--glow-y': '50%',
                  '--glow-intensity': '0',
                  '--glow-radius': '260px',
                } as React.CSSProperties),
              }}
            >
              {/* Badge */}
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--card-cream)',
                  background: '#1E7B61',
                  borderRadius: '999px',
                  padding: '7px 14px',
                }}
              >
                {offer.badge}
              </span>

              {/* Title */}
              <h3
                style={{
                  /* Anton ships a single heavy weight — Bricolage at 700 reads lighter. */
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(26px, 3.2vw, 40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color: 'var(--green2)',
                  margin: 'clamp(18px, 2.2vw, 28px) 0 clamp(12px, 1.4vw, 16px)',
                }}
              >
                {offer.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(12,59,46,0.62)',
                  maxWidth: '34ch',
                }}
              >
                {offer.body}
              </p>

              {/* Divider */}
              <div
                aria-hidden="true"
                style={{
                  height: '1px',
                  background: 'rgba(12,59,46,0.14)',
                  margin: 'clamp(20px, 2.4vw, 28px) 0 clamp(16px, 1.8vw, 22px)',
                }}
              />

              {/* Checklist */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.2vw, 14px)' }}>
                {offer.points.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: 'clamp(12px, 1.1vw, 14px)',
                      color: 'rgba(12,59,46,0.8)',
                    }}
                  >
                    <HiOutlineCheckCircle size={17} style={{ color: 'var(--green2)', flexShrink: 0 }} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Add-on strip */}
        <div
          className="tco-reveal tco-strip"
          style={{
            background: 'var(--green2)',
            borderRadius: '16px',
            marginTop: 'clamp(16px, 2.4vw, 28px)',
            padding: 'clamp(18px, 2.2vw, 26px) clamp(20px, 2.6vw, 32px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.6vw, 20px)',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: 'var(--hero-cream)',
            }}
          >
            Landing page + VSL optimization
          </span>

          <button
            onClick={open}
            className="tco-addon-btn"
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: 'clamp(11px, 1.1vw, 13px)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--hero-cream)',
              background: '#1B6B4F',
              border: 'none',
              borderRadius: '999px',
              padding: 'clamp(11px, 1.3vw, 15px) clamp(20px, 2.4vw, 30px)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.25s ease, transform 0.25s ease',
            }}
          >
            Explore Add Ons
          </button>
        </div>
      </div>

      <style>{`
        /* Masked ring that only paints the border, lit where the cursor is */
        .tco-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(226,194,74, calc(var(--glow-intensity) * 1)) 0%,
            rgba(226,194,74, calc(var(--glow-intensity) * 0.5)) 32%,
            transparent 62%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 1;
        }

        /* Interior wash that follows the same cursor position as the ring */
        .tco-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(226,194,74, calc(var(--glow-intensity) * 0.4)) 0%,
            rgba(226,194,74, calc(var(--glow-intensity) * 0.16)) 38%,
            transparent 70%
          );
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 0;
        }

        /* Keep card content above both glow layers */
        .tco-card > * { position: relative; z-index: 2; }

        .tco-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px rgba(0,0,0,0.308), 0 0 34px rgba(226,194,74,0.28);
        }
        .tco-addon-btn:hover {
          background: #23845F !important;
          transform: translateY(-2px);
        }
        @media (max-width: 760px) {
          .tco-grid  { grid-template-columns: 1fr !important; }
          .tco-strip { justify-content: center; text-align: center; }
        }
      `}</style>
    </section>
  )
}
