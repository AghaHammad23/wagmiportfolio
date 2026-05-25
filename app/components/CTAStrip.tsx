'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from './Providers'
import ApplyButton from './ApplyButton'

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
                  color: 'var(--t2)',
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
                    background: 'var(--green)',
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

          {/* ── Button + badge column ── */}
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
              className="cssbuttons-io-button"
            >
              {buttonText}
              <div className="icon">
                <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
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
             CTA BUTTON
          ========================== */
          .cssbuttons-io-button {
            background: var(--green);
            color: var(--black);
            font-family: var(--font-jakarta), sans-serif;
            padding: 0.35em;
            padding-left: 1.2em;
            font-size: 17px;
            font-weight: 500;
            border-radius: 0.9em;
            border: none;
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            box-shadow: inset 0 0 1.6em -0.6em var(--green);
            overflow: hidden;
            position: relative;
            height: 2.8em;
            padding-right: 3.3em;
            cursor: pointer;
            white-space: nowrap;
          }
          .cssbuttons-io-button .icon {
            background: var(--black);
            margin-left: 1em;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2.2em;
            width: 2.2em;
            border-radius: 0.7em;
            box-shadow: 0.1em 0.1em 0.6em 0.2em var(--green);
            right: 0.3em;
            transition: all 0.3s;
          }
          .cssbuttons-io-button:hover .icon {
            width: calc(100% - 0.6em);
          }
          .cssbuttons-io-button .icon svg {
            width: 1.1em;
            transition: transform 0.3s;
            color: var(--green);
          }
          .cssbuttons-io-button:hover .icon svg {
            transform: translateX(0.1em);
          }
          .cssbuttons-io-button:active .icon {
            transform: scale(0.95);
          }

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
          .cta-wave-wrap::before {
            height: 14px;
            background-size: 28px 28px;
            background-image: radial-gradient(
              circle at 14px -7px,
              transparent 16px,
              var(--black) 17px
            );
            opacity: 0.95;
            z-index: 1;
          }
          .cta-wave-wrap::after {
            height: 20px;
            background-size: 56px 28px;
            background-image: radial-gradient(
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