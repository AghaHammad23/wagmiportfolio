'use client'

import { motion, Easing } from 'framer-motion'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'

// Define the custom cubic-bezier easing as an array of numbers,
// then cast to Easing[] to satisfy TypeScript.
const ease: Easing[] = [0.16, 1, 0.3, 1] as unknown as Easing[]

export default function ServicePill({ label, icon: Icon, index, onClick }: {
  label: string
  icon: React.ElementType
  index: number
  onClick: () => void
}) {
  const pillRef = useRef<HTMLButtonElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHovered(true)
    if (!fillRef.current || !pillRef.current) return
    const rect = pillRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.set(fillRef.current, { left: x, top: y, scale: 0, opacity: 1 })
    gsap.to(fillRef.current, { scale: 6, duration: 0.5, ease: 'power2.out' })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHovered(false)
    if (!fillRef.current || !pillRef.current) return
    const rect = pillRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to(fillRef.current, {
      scale: 0,
      left: x,
      top: y,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => gsap.set(fillRef.current, { opacity: 0 }),
    })
  }

  return (
    <motion.button
      ref={pillRef}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.4 + index * 0.07 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 2.5vw, 32px)',
        border: '1px solid rgba(106,255,42,0.2)',
        background: 'transparent',
        borderRadius: '999px',
        cursor: 'pointer',
        color: hovered ? 'var(--black)' : 'var(--white)',
        fontFamily: 'var(--font-bricolage), sans-serif',
        fontSize: 'clamp(14px, 1.8vw, 18px)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        transition: 'border-color 0.25s, color 0.15s',
        zIndex: 0,
      }}
      whileHover={{ borderColor: 'rgba(106,255,42,0.6)' }}
    >
      <span
        ref={fillRef}
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'var(--green)',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <Icon size={16} style={{ opacity: 0.7, flexShrink: 0, position: 'relative', zIndex: 1 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </motion.button>
  )
}