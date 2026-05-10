'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VSL() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    if (!reveals) return

    reveals.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    })
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 140px) var(--pad)',
        borderBottom: '1px solid var(--line2)',
      }}
    >
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
        {/* Label */}
        <div
          className="reveal"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--t4)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          Watch This First
        </div>

        {/* Heading */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            color: 'var(--white)',
            marginBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          See how we turn content
          <br />
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>
            into clients — in 3 minutes.
          </em>
        </h2>

        {/* Video placeholder */}
        <div
          className="reveal"
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(106,255,42,0.03), transparent 60%)',
            }}
          />
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              transition: 'border-color 0.3s, transform 0.2s',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '18px solid var(--white)',
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                marginLeft: '4px',
              }}
            />
          </div>
          <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--t3)', letterSpacing: '0.02em', position: 'relative', zIndex: 1 }}>
            Your VSL — 2 to 3 minutes
          </div>
          <div style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t4)', letterSpacing: '0.05em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
            Agha Saad · Founder, WAGMI Media
          </div>
        </div>

        <p
          className="reveal"
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '13px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--t3)',
          }}
        >
          Watch before applying — this tells you if we&apos;re the right fit for your brand.
        </p>
      </div>
    </div>
  )
}
