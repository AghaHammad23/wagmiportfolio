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

  /* ── VARIANT: bold ────────────────────────────────────────────── */
  if (variant === 'bold') {
    return (
      <div
        ref={stripRef}
        className="cta-wave-wrap"
        style={{
          padding: 'clamp(40px, 6vw, 72px) var(--pad)',
          background: 'var(--off)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top glow rule */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 'var(--pad)',
            right: 'var(--pad)',
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(106,255,42,0.3), transparent)',
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            right: '-120px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '420px',
            height: '420px',
            background:
              'radial-gradient(circle, rgba(106,255,42,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 'var(--max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '48px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 3,
          }}
          className="bold-strip-grid"
        >
          <div>
            {label && (
              <div
                className="strip-anim"
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--t4)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '1px',
                    background: 'var(--t4)',
                    display: 'inline-block',
                  }}
                />
                {label}
              </div>
            )}

            <h3
              className="strip-anim"
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: 'clamp(20px, 3vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--white)',
                margin: '0 0 12px',
              }}
            >
              {text}
            </h3>

            {subtext && (
              <p
                className="strip-anim"
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'var(--t2)',
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: '500px',
                }}
              >
                {subtext}
              </p>
            )}
          </div>

          <div
            className="strip-anim"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
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
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--green)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--white)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {buttonText} →
            </button>

            {badge && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 400,
                  color: 'var(--t4)',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                }}
              >
                {badge}
              </span>
            )}
          </div>
        </div>

        <style>{`
          /* =========================
             WAVY BORDER
          ========================== */

          .cta-wave-wrap::before,
          .cta-wave-wrap::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            background-repeat: repeat-x;
            pointer-events: none;
          }

          /* top soft curve */
          .cta-wave-wrap::before {
            height: 14px;
            background-size: 28px 28px;
            background-image:
              radial-gradient(
                circle at 14px -7px,
                transparent 16px,
                var(--black) 17px
              );
            opacity: 0.95;
            z-index: 1;
          }

          /* lower deeper wave */
          .cta-wave-wrap::after {
            height: 20px;
            background-size: 56px 28px;
            background-image:
              radial-gradient(
                circle at 14px 20px,
                var(--black) 16px,
                transparent 17px
              );
            z-index: 1;
          }

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