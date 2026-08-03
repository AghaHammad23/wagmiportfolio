'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiOutlineCheckBadge, HiOutlineEye } from 'react-icons/hi2'

gsap.registerPlugin(ScrollTrigger)

/* Same light dot texture used on the layer cards. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='2' cy='2' r='0.8' fill='%230C3B2E' fill-opacity='0.14'/%3E%3C/svg%3E\")"

const guarantees = [
  {
    icon: HiOutlineCheckBadge,
    label: 'Delivery',
    body: 'If we miss a single deadline, your next month of production is 100% on us. No questions asked.',
  },
  {
    icon: HiOutlineEye,
    label: 'Visibility',
    body: 'If you don’t reach a combined audience of 100k in 90 days, we work for free until you do.',
  },
]

export default function TwoGuarantees() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.tg-reveal')
      if (!items?.length) return
      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
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
      <div
        className="tg-panel"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          backgroundColor: 'var(--card-cream)',
          backgroundImage: GRAIN,
          backgroundSize: '10px 10px',
          border: '1px solid rgba(123,214,165,0.85)',
          borderRadius: '22px',
          padding: 'clamp(32px, 5vw, 68px) clamp(24px, 4vw, 64px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Heading */}
        <h2
          className="tg-reveal"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(30px, 5vw, 60px)',
            lineHeight: 1.08,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-bg)',
            marginBottom: 'clamp(36px, 5.5vw, 68px)',
          }}
        >
          Two guarantees.
          <span style={{ display: 'block', color: '#1E7B61' }}>One condition.</span>
        </h2>

        {/* Guarantees */}
        <div
          className="tg-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(28px, 4vw, 56px)',
          }}
        >
          {guarantees.map(({ icon: Icon, label, body }) => (
            <div key={label} className="tg-reveal tg-item">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: 'clamp(12px, 1.6vw, 18px)',
                }}
              >
                <Icon size={20} className="tg-icon" style={{ color: '#0F6B4F', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-anton), sans-serif',
                    fontSize: 'clamp(12px, 1.2vw, 15px)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--hero-bg)',
                  }}
                >
                  {label}
                </span>
              </div>

              <p
                style={{
                  fontSize: 'clamp(14px, 1.35vw, 17px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: 'rgba(12,59,46,0.72)',
                  maxWidth: '38ch',
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="tg-reveal"
          style={{
            height: '1px',
            background: 'rgba(12,59,46,0.16)',
            margin: 'clamp(36px, 5.5vw, 70px) 0 clamp(30px, 4.5vw, 56px)',
          }}
        />

        {/* Condition */}
        <div className="tg-reveal" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 'clamp(12px, 1.3vw, 15px)',
              fontWeight: 500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#1E7B61',
              marginBottom: 'clamp(12px, 1.6vw, 18px)',
            }}
          >
            The Condition
          </div>

          <div
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: 'clamp(12px, 1.3vw, 16px)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--hero-bg)',
            }}
          >
            You must record for 60 mins every week. No exceptions.
          </div>
        </div>
      </div>

      <style>{`
        .tg-icon { transition: transform 0.3s ease; }
        .tg-item:hover .tg-icon { transform: scale(1.15) rotate(-6deg); }

        @media (max-width: 720px) {
          .tg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
