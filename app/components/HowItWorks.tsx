'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Strategy & Roadmap',
    body: "We audit your content, identify your biggest growth lever, and build a 90-day content roadmap tailored to your offer and audience. You never stare at a blank screen again.",
  },
  {
    num: '02',
    title: 'We Build the Machine',
    body: 'Scripts, edits, thumbnails, hooks, shorts, long-form, posting schedules, weekly performance reviews. Our team handles full production end-to-end. You just show up.',
  },
  {
    num: '03',
    title: 'You Grow. We Optimise.',
    body: "Every week we cut what's dead and double what's working. Over time the system compounds — more views, more authority, more inbound clients. That's the engine.",
  },
]

export default function HowItWorks() {
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
          How It Works
        </div>
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
          Three steps.
          <br />
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>
            We handle everything else.
          </em>
        </h2>
      </div>

      {/* Steps grid */}
      <div
        style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--line2)',
        }}
        className="steps-grid"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              background: 'var(--black)',
              padding: 'clamp(32px, 4vw, 56px) clamp(24px, 3vw, 40px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: '56px',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.04)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '28px',
              }}
            >
              {step.num}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'var(--t2)',
              }}
            >
              {step.body}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
