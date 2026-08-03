'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Perk { icon: string; img: string; title: string; desc: string }

// Alternating rotations — give each card a unique tilt
const ROT = [0, -2.2, 1.6, -1.1, 2.0, -0.9, 1.5, -1.8]

export default function PerksStack({ perks }: { perks: Perk[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stack   = stackRef.current
    if (!section || !stack) return

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.perk-card'))
    const N = cards.length
    if (!N) return

    cards.forEach((c, i) => {
      c.style.zIndex     = String(i + 1)
      c.style.willChange = 'transform, filter'
    })

    // Stacked card state: compute transform + filter from depth
    const setStacked = (card: HTMLElement, depth: number, rotation: number) => {
      const y    = -(depth * 10)
      const sc   = Math.max(0.82, 1 - depth * 0.026)
      const blur = Math.min(9, depth * 1.6)
      const brt  = Math.max(0.42, 1 - depth * 0.12)
      card.style.transform = `translateY(${y}px) scale(${sc}) rotate(${rotation}deg)`
      card.style.filter    = depth > 0 ? `blur(${blur}px) brightness(${brt})` : ''
    }

    const applyState = (progress: number) => {
      const vh     = window.innerHeight
      const raw    = progress * (N - 1)
      const landed = Math.min(Math.floor(raw), N - 1)
      const frac   = landed < N - 1 ? raw - landed : 1

      // All cards stacked — final resting state
      if (landed >= N - 1) {
        cards.forEach((c, i) => setStacked(c, N - 1 - i, ROT[i % ROT.length]))
        return
      }

      cards.forEach((c, i) => {
        if (i > landed + 1) {
          // Waiting below viewport
          c.style.transform = `translateY(${vh + 40}px) scale(1) rotate(0deg)`
          c.style.filter    = ''
        } else if (i === landed + 1) {
          // Sliding in from below
          const y   = (vh + 40) * (1 - frac)
          const rot = ROT[i % ROT.length] * frac
          c.style.transform = `translateY(${y}px) scale(1) rotate(${rot}deg)`
          c.style.filter    = ''
        } else {
          // In the stack — depth grows as more cards land on top
          setStacked(c, landed - i + frac, ROT[i % ROT.length])
        }
      })
    }

    applyState(0)

    const st = ScrollTrigger.create({
      trigger : section,
      pin     : true,
      scrub   : 0.9,
      start   : 'top top',
      end     : `+=${(N - 1) * 480}`,
      onUpdate: (self) => applyState(self.progress),
    })

    return () => { st.kill() }
  }, [perks.length])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '0 var(--pad)',
        background: 'var(--black)',
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '1000px', height: '1000px', borderRadius: '80%', background: 'radial-gradient(circle, rgba(227,194,74,0.13) 0%, transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
       
      </div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vh, 60px)', flexShrink: 0 }}>
        <div style={{
          fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--t2)', marginBottom: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
          Why Join Us
          <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800,
          letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--white)',
        }}>
          A team that ships.{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>Not one that talks about it.</em>
        </h2>
      </div>

      {/* Card stack */}
      <div
        ref={stackRef}
        style={{
          position: 'relative',
          width: '100%', maxWidth: '680px',
          height: 'clamp(200px, 32vh, 290px)',
        }}
      >
        {perks.map((p, i) => (
          <div
            key={i}
            className="perk-card"
            style={{
              position: 'absolute', inset: 0,
              background: 'var(--green2)',
              border: '1px solid rgba(227,194,74,0.2)',
              borderRadius: '20px',
              padding: 'clamp(24px, 3.5vw, 40px)',
              display: 'flex', alignItems: 'center', gap: '24px',
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Image */}
            <div style={{ flexShrink: 0, width: '72px', height: '72px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(227,194,74,0.18)' }}>
              <Image
                src={p.img}
                alt={p.title}
                width={72}
                height={72}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: 'clamp(17px, 2.1vw, 24px)', fontWeight: 800,
                letterSpacing: '-0.02em', color: 'var(--white)',
                marginBottom: '8px', lineHeight: 1.15,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 300,
                lineHeight: 1.75, color: 'var(--t2)',
              }}>
                {p.desc}
              </p>
            </div>

            {/* Watermark index */}
            <span style={{
              flexShrink: 0,
              fontSize: 'clamp(44px, 5.5vw, 70px)',
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontWeight: 800, color: 'rgba(255,255,255,0.04)',
              lineHeight: 1, userSelect: 'none',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
