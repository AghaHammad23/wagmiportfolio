'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from './Providers'

gsap.registerPlugin(ScrollTrigger)

interface CTAStripProps {
  text: string
  variant?: 'default' | 'accent' | 'minimal' | 'bold'
  label?: string
  subtext?: string
  badge?: string
  buttonText?: string
}

export default function CTAStrip({
  text,
  variant = 'default',
  label,
  subtext,
  badge,
  buttonText = 'Apply to Work With Us',
}: CTAStripProps) {
  const { open } = useApply()
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = stripRef.current?.querySelectorAll('.strip-anim')
      if (!els) return
      gsap.fromTo(
        els,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, stripRef)
    return () => ctx.revert()
  }, [])

  /* ── VARIANT: default ─────────────────────────────────────────── */
  if (variant === 'default') {
    return (
      <div
        ref={stripRef}
        style={{
          borderBottom: '1px solid var(--line2)',
          padding: 'clamp(28px, 4vw, 48px) var(--pad)',
          background: 'var(--off)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle left accent bar */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '3px',
          background: 'linear-gradient(180deg, transparent, rgba(106,255,42,0.5), transparent)',
        }} />

        <div style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            {label && (
              <div className="strip-anim" style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--t4)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ width: '12px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
                {label}
              </div>
            )}
            <p className="strip-anim" style={{
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 300,
              color: 'var(--t2)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: 0,
            }}>
              {text}
            </p>
            {subtext && (
              <p className="strip-anim" style={{
                fontSize: '11px',
                fontWeight: 400,
                color: 'var(--t4)',
                marginTop: '8px',
                letterSpacing: '0.03em',
              }}>
                {subtext}
              </p>
            )}
          </div>

          <div className="strip-anim" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, flexWrap: 'wrap' }}>
            {badge && (
              <span style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--green)',
                padding: '5px 10px',
                border: '1px solid rgba(106,255,42,0.25)',
                borderRadius: '8px',
              }}>
                {badge}
              </span>
            )}
            <button
              onClick={open}
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: 'var(--black)',
                background: 'var(--white)',
                border: 'none',
                padding: '13px 28px',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'background 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--green)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--white)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {buttonText} →
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── VARIANT: accent ──────────────────────────────────────────── */
  if (variant === 'accent') {
    return (
      <div
        ref={stripRef}
        style={{
          borderBottom: '1px solid var(--line2)',
          borderTop: '1px solid rgba(106,255,42,0.12)',
          padding: 'clamp(32px, 5vw, 56px) var(--pad)',
          background: 'rgba(106,255,42,0.03)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Green glow blob */}
        <div style={{
          position: 'absolute',
          right: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          left: '190px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(106,155,142,0.09) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap',
          position: 'relative',
        }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            {label && (
              <div className="strip-anim" style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(106,255,42,0.6)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '6px', height: '6px',
                  background: 'var(--green)',
                  borderRadius: '50%',
                  display: 'inline-block',
                  opacity: 0.7,
                }} />
                {label}
              </div>
            )}
            <p className="strip-anim" style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              maxWidth: '540px',
              margin: 0,
            }}>
              {text}
            </p>
            {subtext && (
              <p className="strip-anim" style={{
                fontSize: '13px',
                fontWeight: 300,
                color: 'var(--t3)',
                marginTop: '10px',
                lineHeight: 1.6,
              }}>
                {subtext}
              </p>
            )}
          </div>

          <div className="strip-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={open}
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: 'var(--black)',
                background: 'var(--green)',
                border: 'none',
                padding: '14px 32px',
                 borderRadius: '8px',

                cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.85'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {buttonText} →
            </button>
            {badge && (
              <span style={{
                fontSize: '10px',
                fontWeight: 400,
                color: 'var(--t4)',
                letterSpacing: '0.04em',
              }}>
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  /* ── VARIANT: minimal ─────────────────────────────────────────── */
  if (variant === 'minimal') {
    return (
      <div
        ref={stripRef}
        style={{
          borderBottom: '1px solid var(--line2)',
          padding: 'clamp(20px, 2.5vw, 32px) var(--pad)',
          background: 'var(--black)',
        }}
      >
        <div style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <div className="strip-anim" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            {badge && (
              <span style={{
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--black)',
                background: 'var(--green)',
                padding: '4px 8px',
              }}>
                {badge}
              </span>
            )}
            <span style={{
              fontSize: '13px',
              fontWeight: 300,
              color: 'var(--t3)',
              lineHeight: 1.5,
            }}>
              {text}
            </span>
          </div>

          <button
            className="strip-anim"
            onClick={open}
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              background: 'none',
              border: '1px solid var(--line)',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
              flexShrink: 0,
              borderRadius: '8px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--green)'
              e.currentTarget.style.color = 'var(--green)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.color = 'var(--white)'
            }}
          >
            {buttonText} →
          </button>
        </div>
      </div>
    )
  }

  /* ── VARIANT: bold ────────────────────────────────────────────── */
  if (variant === 'bold') {
    return (
      <div
        ref={stripRef}
        style={{
          borderBottom: '1px solid var(--line2)',
          padding: 'clamp(40px, 6vw, 72px) var(--pad)',
          background: 'var(--off)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top rule */}
        <div style={{
          position: 'absolute',
          top: 0, left: 'var(--pad)', right: 'var(--pad)',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(106,255,42,0.3), transparent)',
        }} />

        <div style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px',
          alignItems: 'center',
        }}
          className="bold-strip-grid"
        >
          <div>
            {label && (
              <div className="strip-anim" style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--t4)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
                {label}
              </div>
            )}
            <h3 className="strip-anim" style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(20px, 3vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--white)',
              margin: '0 0 12px',
            }}>
              {text}
            </h3>
            {subtext && (
              <p className="strip-anim" style={{
                fontSize: '14px',
                fontWeight: 300,
                color: 'var(--t2)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '500px',
              }}>
                {subtext}
              </p>
            )}
          </div>

          <div className="strip-anim" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}>
            <button
              onClick={open}
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.01em',
                color: 'var(--black)',
                background: 'var(--white)',
                border: 'none',
                padding: '16px 36px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--green)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--white)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {buttonText} →
            </button>
            {badge && (
              <span style={{
                fontSize: '10px',
                fontWeight: 400,
                color: 'var(--t4)',
                letterSpacing: '0.04em',
                textAlign: 'center',
              }}>
                {badge}
              </span>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .bold-strip-grid {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
            }
          }
        `}</style>
      </div>
    )
  }

  return null
}