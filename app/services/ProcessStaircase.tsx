'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ApplyButton from '../components/ApplyButton'

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  step: string
  title: string
  desc: string
}

interface ProcessStaircaseProps {
  process: ProcessStep[]
  onApplyClick: () => void
  isMobile: boolean
}

export default function ProcessStaircase({ process, onApplyClick, isMobile }: ProcessStaircaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  // Desktop staircase animation
  useEffect(() => {
    if (isMobile) return
    if (!containerRef.current) return

    const steps = stepsRef.current.filter(Boolean) as HTMLDivElement[]
    if (steps.length === 0) return

    // Kill any existing ScrollTrigger and timeline
    if (animationRef.current) {
      animationRef.current.kill()
      // Also kill the ScrollTrigger associated with this timeline
      const st = animationRef.current.scrollTrigger as ScrollTrigger | undefined
      if (st) st.kill()
    }

    // Even staircase rise, derived from the step count so any length works.
    const targetHeights = steps.map((_, i) => 30 + ((100 - 30) * i) / (steps.length - 1)) // %

    // Reset initial states
    gsap.set(steps, { height: '0%' })
    steps.forEach(step => {
      const content = step.querySelector('.step-content')
      if (content) gsap.set(content, { autoAlpha: 0, y: 15 })
      step.classList.remove('step-active')
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2200',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const stepCount = steps.length
          const stepProgress = progress * stepCount
          for (let i = 0; i < stepCount; i++) {
            if (stepProgress >= i + 0.9) {
              steps[i].classList.add('step-active')
            } else {
              steps[i].classList.remove('step-active')
            }
          }
        }
        // REMOVED onRefresh to avoid infinite recursion
      }
    })

    // Animate each step's height and content
    steps.forEach((step, idx) => {
      const startPoint = idx / steps.length
      tl.fromTo(step,
        { height: '0%' },
        { height: `${targetHeights[idx]}%`, duration: 1, ease: 'power3.out' },
        startPoint
      )
      const content = step.querySelector('.step-content')
      if (content) {
        tl.fromTo(content,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          startPoint + 0.1
        )
      }
    })

    animationRef.current = tl

    // Small delay to ensure ScrollTrigger refreshes once after mount
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => {
      clearTimeout(timeout)
      if (animationRef.current) {
        const st = animationRef.current.scrollTrigger as ScrollTrigger | undefined
        if (st) st.kill()
        animationRef.current.kill()
      }
    }
  }, [isMobile])

  // Mobile version (simple stacked reveal) – unchanged
  if (isMobile) {
    return (
      <div style={{ background: 'var(--black)', borderBottom: '1px solid var(--line2)' }}>
        <div style={{ padding: 'clamp(72px, 9vw, 112px) var(--pad) clamp(36px, 4.5vw, 52px)', maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
            The Five Layers
          </div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white)' }}>
            60 minutes a week, from{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>script to scale.</em>
          </h2>
        </div>
        {process.map((p, i) => {
          const isLast = i === process.length - 1
          return (
            <div
              key={i}
              className="reveal"
              style={{
                padding: 'clamp(28px, 6vw, 44px) var(--pad)',
                borderBottom: i < process.length - 1 ? '1px solid var(--line2)' : 'none',
                borderLeft: `3px solid ${isLast ? 'var(--green)' : 'var(--line)'}`,
                paddingLeft: 'calc(var(--pad) + 16px)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '44px', fontWeight: 800, color: isLast ? 'rgba(227,194,74,0.07)' : 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '10px' }}>{p.step}</div>
              <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '17px', fontWeight: 700, color: isLast ? 'var(--green)' : 'var(--white)', marginBottom: '8px', letterSpacing: '-0.01em' }}>{p.title}</div>
              <div style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t3)', marginBottom: isLast ? '20px' : 0 }}>{p.desc}</div>
              {isLast && (
                <button
                  onClick={onApplyClick}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 26px',
                    background: 'var(--green)', color: 'var(--black)',
                    border: 'none', borderRadius: '6px',
                    fontSize: '12px', fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'var(--font-bricolage), sans-serif',
                  }}
                >
                  Apply Now →
                </button>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Desktop version
  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--black)',
        borderBottom: '1px solid var(--line2)',
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid var(--line2)',
      }}
    >
      {/* Heading (stays visible while pinned) */}
      <div style={{ padding: 'clamp(72px, 9vw, 112px) var(--pad) clamp(36px, 4.5vw, 52px)', maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t2)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
          The Five Layers
        </div>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white)' }}>
          60 minutes a week, from{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>script to scale.</em>
        </h2>
      </div>

      {/* Steps container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        minHeight: 'clamp(420px, 48vw, 620px)',
      }}>
        {process.map((p, i) => {
          const isLast = i === process.length - 1
          return (
            <div
              key={i}
              ref={el => { stepsRef.current[i] = el }}
              className="stair-step"
              style={{
                flex: 1,
                height: '0%',
                borderTop: '2px solid var(--line)',
                borderLeft: i > 0 ? '1px solid var(--line2)' : 'none',
                padding: 'clamp(16px, 2vw, 26px) clamp(14px, 1.8vw, 22px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: 'transparent',
                overflow: 'hidden',
                transition: 'border-top-color 0.3s, box-shadow 0.3s, background 0.3s',
              }}
            >
              <div className="step-content" style={{ opacity: 0 }}>
                <div className="step-number" style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: 'rgba(227,194,74,0)',
                  WebkitTextStroke: '1px var(--green)',
                  transition: 'color 0.7s ease',
                  lineHeight: 1,
                  marginBottom: '12px',
                  userSelect: 'none',
                }}>
                  {p.step}
                </div>
                <div style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: 'clamp(13px, 1.5vw, 16px)',
                  fontWeight: 700,
                  color: 'var(--white)',
                  marginBottom: '7px',
                  letterSpacing: '-0.01em',
                }}>
                  {p.title}
                </div>
                <div style={{
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'var(--t3)',
                  flex: 1,
                }}>
                  {p.desc}
                </div>
                {isLast && (
                  <div style={{ marginTop: 'clamp(14px, 1.8vw, 22px)' }}>
                    <ApplyButton text="Apply Now" />
                  </div>
                )}
              </div>
              <div style={{
                position: 'absolute', bottom: '10px', right: '12px',
                fontSize: '9px', letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase',
              }}>
                {i + 1} / {process.length}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .stair-step.step-active {
          border-top-color: var(--green) !important;
          box-shadow: 0 -4px 20px rgba(227,194,74,0.2);
          background: rgba(227,194,74,0.03);
        }
        .stair-step.step-active .step-number {
          color: var(--green) !important;
        }
      `}</style>
    </div>
  )
}