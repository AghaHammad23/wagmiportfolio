'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from './Providers'

gsap.registerPlugin(ScrollTrigger)

export default function SixtyMinutesCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { open } = useApply()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.sm-reveal')
      if (!items?.length) return
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
        background: 'var(--green2)',
        padding: 'clamp(72px, 11vw, 150px) var(--pad)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <h2
          className="sm-reveal"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(44px, 9vw, 110px)',
            lineHeight: 1.02,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            color: 'var(--hero-cream)',
          }}
        >
          60 minutes a week.
          <span style={{ display: 'block', color: 'var(--hero-gold)' }}>
            Everything else handled.
          </span>
        </h2>

        <p
          className="sm-reveal"
          style={{
            fontSize: 'clamp(12px, 1.4vw, 16px)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            lineHeight: 1.7,
            color: 'rgba(244,241,214,0.6)',
            maxWidth: '620px',
            margin: 'clamp(28px, 4vw, 48px) auto 0',
          }}
        >
          We are taking on 2 new clients this month. If you are doing $20k+/mo and want to
          scale, click below.
        </p>

        <button
          className="sm-reveal sm-btn"
          onClick={open}
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--hero-bg)',
            background: 'var(--card-cream)',
            border: '1px solid rgba(123,214,165,0.9)',
            borderRadius: '999px',
            padding: 'clamp(16px, 1.8vw, 22px) clamp(34px, 4vw, 54px)',
            marginTop: 'clamp(28px, 4vw, 48px)',
            cursor: 'pointer',
          }}
        >
          Book a Call
        </button>
      </div>

      <style>{`
        .sm-btn {
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 12px 34px rgba(0,0,0,0.3);
        }
        /* !important so these beat the button's inline style */
        .sm-btn:hover {
          background: var(--hero-gold) !important;
          color: var(--green2) !important;
          border-color: var(--hero-gold) !important;
          transform: translateY(-3px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.4), 0 0 32px rgba(227,194,74,0.35);
        }
        .sm-btn:active { transform: translateY(-1px); }
      `}</style>
    </section>
  )
}
