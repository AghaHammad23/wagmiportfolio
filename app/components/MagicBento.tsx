'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'

export interface CareerCardData {
  title: string
  department: string
  type: string
  location: string
  desc: string
  requirements: string[]
}

interface MagicBentoProps {
  cards: CareerCardData[]
  onApply?: (card: CareerCardData) => void
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  enableTilt?: boolean
  glowColor?: string
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const DEFAULT_PARTICLE_COUNT = 10
const DEFAULT_SPOTLIGHT_RADIUS = 280
const DEFAULT_GLOW_COLOR = '227,194,74'
const MOBILE_BREAKPOINT = 768

/* ─── Grid span algorithm ──────────────────────────────────── */
/*
 * Always fills the 3-column grid width regardless of card count.
 *
 * N=1 → [3]           full width
 * N=2 → [2,1]         asymmetric
 * N=3 → [1,1,1]       equal thirds
 * N=4 → [2,1,1,2]     bento (special-cased)
 * N=5 → [1,1,1, 1,2]  full row + bento partial
 * N=6 → [1,1,1,1,1,1] two equal rows
 * N=7 → [1,1,1,1,1,1,3] two rows + solo full-width
 * ...and so on
 */
function computeSpans(n: number): number[] {
  if (n <= 0) return []
  if (n === 1) return [3]
  if (n === 2) return [2, 1]
  if (n === 3) return [1, 1, 1]
  if (n === 4) return [2, 1, 1, 2]

  const spans: number[] = []
  let remaining = n
  let rowAlt = 0

  while (remaining > 0) {
    if (remaining >= 3) {
      spans.push(1, 1, 1)
      remaining -= 3
    } else if (remaining === 2) {
      // Alternate which side the wide card falls on
      if (rowAlt % 2 === 0) spans.push(2, 1)
      else spans.push(1, 2)
      remaining -= 2
    } else {
      spans.push(3) // solo → full width
      remaining -= 1
    }
    rowAlt++
  }

  return spans
}

/* ─── Particle helpers ─────────────────────────────────────── */
const createParticleElement = (x: number, y: number, color: string): HTMLDivElement => {
  const el = document.createElement('div')
  el.className = 'mb-particle'
  el.style.cssText = `
    position:absolute;width:3px;height:3px;border-radius:50%;
    background:rgba(${color},1);box-shadow:0 0 5px rgba(${color},0.5);
    pointer-events:none;z-index:10;left:${x}px;top:${y}px;
  `
  return el
}

const calculateSpotlight = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
})

const setCardGlow = (card: HTMLElement, mx: number, my: number, intensity: number, radius: number) => {
  const r = card.getBoundingClientRect()
  card.style.setProperty('--glow-x', `${((mx - r.left) / r.width) * 100}%`)
  card.style.setProperty('--glow-y', `${((my - r.top) / r.height) * 100}%`)
  card.style.setProperty('--glow-intensity', intensity.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

/* ─── ParticleCard ─────────────────────────────────────────── */
const ParticleCard: React.FC<{
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  disableAnimations: boolean
  particleCount: number
  glowColor: string
  enableTilt: boolean
  clickEffect: boolean
  enableMagnetism: boolean
}> = ({ children, className = '', style, disableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isHovered = useRef(false)
  const pool = useRef<HTMLDivElement[]>([])
  const poolReady = useRef(false)
  const magnetTween = useRef<gsap.core.Tween | null>(null)

  const initPool = useCallback(() => {
    if (poolReady.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    pool.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    poolReady.current = true
  }, [particleCount, glowColor])

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetTween.current?.kill()
    particlesRef.current.forEach(p =>
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) })
    )
    particlesRef.current = []
  }, [])

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHovered.current) return
    if (!poolReady.current) initPool()
    pool.current.forEach((src, i) => {
      const id = setTimeout(() => {
        if (!isHovered.current || !cardRef.current) return
        const clone = src.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
        gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true })
        gsap.to(clone, { opacity: 0.25, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true })
      }, i * 100)
      timeoutsRef.current.push(id)
    })
  }, [initPool])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return
    const el = cardRef.current

    const onEnter = () => {
      isHovered.current = true
      spawnParticles()
      if (enableTilt) gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 })
    }

    const onLeave = () => {
      isHovered.current = false
      clearParticles()
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' })
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
    }

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return
      const r = el.getBoundingClientRect()
      const cx = r.width / 2, cy = r.height / 2
      const x = e.clientX - r.left, y = e.clientY - r.top
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -8, rotateY: ((x - cx) / cx) * 8, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 })
      if (enableMagnetism) magnetTween.current = gsap.to(el, { x: (x - cx) * 0.04, y: (y - cy) * 0.04, duration: 0.3, ease: 'power2.out' })
    }

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      const d = Math.max(Math.hypot(x, y), Math.hypot(x - r.width, y), Math.hypot(x, y - r.height), Math.hypot(x - r.width, y - r.height))
      const ripple = document.createElement('div')
      ripple.style.cssText = `position:absolute;width:${d * 2}px;height:${d * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,rgba(${glowColor},0.15) 30%,transparent 70%);left:${x - d}px;top:${y - d}px;pointer-events:none;z-index:999;`
      el.appendChild(ripple)
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ripple.remove() })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('click', onClick)
    return () => {
      isHovered.current = false
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('click', onClick)
      clearParticles()
    }
  }, [spawnParticles, clearParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div ref={cardRef} className={className} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  )
}

/* ─── GlobalSpotlight ──────────────────────────────────────── */
const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>
  disableAnimations: boolean
  spotlightRadius: number
  glowColor: string
}> = ({ gridRef, disableAnimations, spotlightRadius, glowColor }) => {
  const spotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (disableAnimations || !gridRef.current) return

    const spot = document.createElement('div')
    spot.style.cssText = `position:fixed;width:700px;height:700px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.1) 0%,rgba(${glowColor},0.05) 20%,rgba(${glowColor},0.02) 40%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`
    document.body.appendChild(spot)
    spotRef.current = spot

    const onMove = (e: MouseEvent) => {
      if (!spotRef.current || !gridRef.current) return
      const section = gridRef.current.closest('.mb-section')
      const rect = section?.getBoundingClientRect()
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      const cards = gridRef.current.querySelectorAll<HTMLElement>('.mb-card')

      if (!inside) {
        gsap.to(spotRef.current, { opacity: 0, duration: 0.3 })
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'))
        return
      }

      const { proximity, fadeDistance } = calculateSpotlight(spotlightRadius)
      let minDist = Infinity

      cards.forEach(c => {
        const cr = c.getBoundingClientRect()
        const dist = Math.max(0, Math.hypot(e.clientX - (cr.left + cr.width / 2), e.clientY - (cr.top + cr.height / 2)) - Math.max(cr.width, cr.height) / 2)
        minDist = Math.min(minDist, dist)
        const intensity = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0
        setCardGlow(c, e.clientX, e.clientY, intensity, spotlightRadius)
      })

      gsap.to(spotRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 })
      const op = minDist <= proximity ? 0.7 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.7 : 0
      gsap.to(spotRef.current, { opacity: op, duration: op > 0 ? 0.2 : 0.4 })
    }

    const onLeave = () => {
      gridRef.current?.querySelectorAll<HTMLElement>('.mb-card').forEach(c => c.style.setProperty('--glow-intensity', '0'))
      if (spotRef.current) gsap.to(spotRef.current, { opacity: 0, duration: 0.3 })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      spotRef.current?.parentNode?.removeChild(spotRef.current)
    }
  }, [gridRef, disableAnimations, spotlightRadius, glowColor])

  return null
}

/* ─── MagicBento ───────────────────────────────────────────── */
export default function MagicBento({
  cards,
  onApply,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const noAnims = disableAnimations || isMobile
  const spans = computeSpans(cards.length)

  const deptColor: Record<string, string> = {
    Production: 'rgba(227,194,74,0.12)',
    Strategy: 'rgba(227,194,74,0.09)',
    Creative: 'rgba(227,194,74,0.10)',
  }

  const renderContent = (card: CareerCardData, wide: boolean) => (
    <>
      {/* Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '20px' }}>
        <span style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#E3C24A', background: deptColor[card.department] ?? 'rgba(227,194,74,0.1)',
          padding: '4px 10px', borderRadius: '4px',
        }}>
          {card.department}
        </span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[card.type, card.location].map(tag => (
            <span key={tag} style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-bricolage), sans-serif',
        fontSize: wide ? 'clamp(20px, 2.2vw, 28px)' : 'clamp(17px, 1.8vw, 22px)',
        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
        color: 'var(--white)', marginBottom: '10px',
      }}>
        {card.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '13px', fontWeight: 300, lineHeight: 1.75,
        color: 'rgba(255,255,255,0.45)', marginBottom: '18px',
        display: '-webkit-box', WebkitBoxOrient: 'vertical',
        WebkitLineClamp: wide ? 3 : 2, overflow: 'hidden',
      }}>
        {card.desc}
      </p>

      {/* Requirements */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px', flex: 1 }}>
        {card.requirements.slice(0, wide ? 3 : 2).map((req, j) => (
          <li key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.55 }}>
            <span style={{ color: 'rgba(227,194,74,0.55)', marginTop: '2px', flexShrink: 0, fontSize: '9px' }}>✓</span>
            {req}
          </li>
        ))}
        {card.requirements.length > (wide ? 3 : 2) && (
          <li style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)', paddingLeft: '17px' }}>
            +{card.requirements.length - (wide ? 3 : 2)} more
          </li>
        )}
      </ul>

      {/* Apply */}
      <button
        onClick={e => {
          e.stopPropagation()
          onApply ? onApply(card) : window.open(`mailto:aghasaad@wagmihq.com?subject=${encodeURIComponent(`Application: ${card.title}`)}`)
        }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-bricolage), sans-serif',
          color: '#000', background: '#E3C24A',
          padding: '10px 20px', borderRadius: '6px',
          border: 'none', cursor: 'pointer',
          transition: 'transform 0.15s, opacity 0.15s',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1' }}
      >
        Apply Now →
      </button>
    </>
  )

  const baseClass = `mb-card flex flex-col ${enableBorderGlow ? 'mb-card--glow' : ''}`

  const cardStyle = (span: number): React.CSSProperties => ({
    backgroundColor: 'var(--section-bg)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    padding: 'clamp(20px, 2.5vw, 28px)',
    minHeight: span > 1 ? '360px' : '320px',
    gridColumn: `span ${span}`,
    '--glow-x': '50%',
    '--glow-y': '50%',
    '--glow-intensity': '0',
    '--glow-radius': '200px',
  } as React.CSSProperties)

  return (
    <>
      <style>{`
        .mb-section { --glow-color: ${glowColor}; }

        .mb-card--glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        .mb-card--glow:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 24px rgba(${glowColor}, 0.06);
        }

        .mb-particle::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: rgba(${glowColor}, 0.15);
          border-radius: 50%;
          z-index: -1;
        }

        /* Grid — 3 cols desktop, spans from inline style */
        .mb-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
        }

        /* Tablet: 2 equal cols, reset all spans */
        @media (max-width: 1023px) {
          .mb-grid { grid-template-columns: repeat(2, 1fr); }
          .mb-grid .mb-card { grid-column: span 1 !important; }
        }

        /* Mobile: single column */
        @media (max-width: 639px) {
          .mb-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={noAnims}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="mb-section relative select-none" ref={gridRef}>
        <div className="mb-grid">
          {cards.map((card, i) => {
            const span = spans[i]
            const wide = span > 1

            if (enableStars) {
              return (
                <ParticleCard
                  key={i}
                  className={baseClass}
                  style={cardStyle(span)}
                  disableAnimations={noAnims}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {renderContent(card, wide)}
                </ParticleCard>
              )
            }

            return (
              <div key={i} className={baseClass} style={cardStyle(span)}>
                {renderContent(card, wide)}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
