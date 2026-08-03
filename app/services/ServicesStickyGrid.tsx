'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import StickyMedia from './StickyMedia'

interface Service {
  icon: React.ElementType
  title: string
  tag: string
  desc: string
  features: string[]
  media: { type: string; src: string }
}

interface ServicesStickyGridProps {
  services: Service[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  isMobile: boolean
}

export default function ServicesStickyGrid({
  services,
  activeIndex,
  setActiveIndex,
  sectionRefs,
  isMobile
}: ServicesStickyGridProps) {
  const [scrollListenerActive, setScrollListenerActive] = useState(false)

  useEffect(() => {
    if (isMobile || scrollListenerActive) return
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity
      sectionRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elCenter = window.scrollY + rect.top + rect.height / 2
        const dist = Math.abs(elCenter - viewportCenter)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActiveIndex(closest)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    setScrollListenerActive(true)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile, sectionRefs, setActiveIndex])

  if (isMobile) return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left: scrollable content panels */}
      <div>
        {services.map((s, i) => {
          const Icon = s.icon
          return (
            <div
              key={i}
              ref={el => { sectionRefs.current[i] = el }}
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(60px, 8vw, 100px) clamp(40px, 5vw, 72px)',
                borderBottom: i < services.length - 1 ? '1px solid var(--line2)' : 'none',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{ scaleY: activeIndex === i ? 1 : 0, opacity: activeIndex === i ? 1 : 0 }}
                initial={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', left: 0, top: '10%', bottom: '10%',
                  width: '3px',
                  background: 'linear-gradient(180deg, transparent, var(--green), transparent)',
                  transformOrigin: 'top',
                  borderRadius: '2px',
                }}
              />
              <motion.div
                animate={{ opacity: activeIndex === i ? 1 : 0.35, x: activeIndex === i ? 0 : 12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '72px', fontWeight: 800,
                  color: 'rgba(255,255,255,0.04)',
                  letterSpacing: '-0.04em', lineHeight: 1,
                  marginBottom: '16px', userSelect: 'none',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    border: '1px solid rgba(227,194,74,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(227,194,74,0.05)',
                  }}>
                    <Icon size={18} color="var(--green)" />
                  </div>
                  <span style={{
                    fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(227,194,74,0.6)',
                  }}>
                    {s.tag}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 800, letterSpacing: '-0.025em',
                  color: 'var(--white)', lineHeight: 1.08,
                  marginBottom: '20px',
                }}>
                  {s.title}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  fontWeight: 300, lineHeight: 1.75,
                  color: 'var(--t2)', marginBottom: '32px',
                  maxWidth: '480px',
                }}>
                  {s.desc}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {s.features.map((f, fi) => (
                    <li key={fi} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      fontSize: '13px', fontWeight: 400, color: 'var(--t3)',
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: 'rgba(227,194,74,0.6)', flexShrink: 0,
                      }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Right: sticky media */}
      <StickyMedia services={services} activeIndex={activeIndex} />
    </div>
  )
}