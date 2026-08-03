'use client'

import { motion, Easing } from 'framer-motion'
import { gsap } from 'gsap'
import { useRef, useState, useCallback } from 'react'

const ease: Easing[] = [0.16, 1, 0.3, 1] as unknown as Easing[]

export default function ServicePill({ label, icon: Icon, index, onClick }: {
  label: string
  icon: React.ElementType
  index: number
  onClick: () => void
}) {
  const pillRef = useRef<HTMLButtonElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<SVGElement>(null)
  
  // Use RAF to batch DOM reads/writes and prevent forced reflows
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!fillRef.current || !pillRef.current) return
    
    // Batch DOM reads
    const rect = pillRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Use requestAnimationFrame to batch DOM writes
    requestAnimationFrame(() => {
      if (!fillRef.current) return
      gsap.set(fillRef.current, { left: x, top: y, scale: 0, opacity: 1 })
      gsap.to(fillRef.current, { scale: 6, duration: 0.4, ease: 'power2.out' }) // Reduced duration
      
      // Change text colors
      if (textRef.current) {
        textRef.current.style.color = 'var(--black)'
      }
      if (iconRef.current) {
        iconRef.current.style.color = 'var(--black)'
        iconRef.current.style.opacity = '1'
      }
    })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!fillRef.current || !pillRef.current) return

    const rect = pillRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Reset colors immediately rather than in the tween's onComplete: re-entering
    // the pill mid-shrink makes GSAP overwrite that tween, which skips onComplete
    // and would strand the hover colors permanently. The CSS colour transition on
    // the text/icon still animates the fade out.
    if (textRef.current) {
      textRef.current.style.color = ''
    }
    if (iconRef.current) {
      iconRef.current.style.color = ''
      iconRef.current.style.opacity = ''
    }

    requestAnimationFrame(() => {
      if (!fillRef.current) return
      gsap.to(fillRef.current, {
        scale: 0,
        opacity: 0,
        left: x,
        top: y,
        duration: 0.3, // Reduced duration
        ease: 'power2.in',
      })
    })
  }, [])

  // Reduced initial animation delay for better perceived performance
  const delay = 0.3 + index * 0.05 // Reduced from 0.4 + index * 0.07

  return (
    <motion.button
      ref={pillRef}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }} // Reduced duration from 0.6
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 2.5vw, 32px)',
        border: '1px solid rgba(227,194,74,0.2)',
        background: 'transparent',
        borderRadius: '999px',
        cursor: 'pointer',
        fontFamily: 'var(--font-bricolage), sans-serif',
        fontSize: 'clamp(14px, 1.8vw, 18px)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        transition: 'border-color 0.2s', // Faster transition
        zIndex: 0,
        willChange: 'transform', // Optimize for performance
      }}
      whileHover={{ borderColor: 'rgba(227,194,74,0.6)' }}
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
          willChange: 'transform', // Optimize for performance
        }}
      />
      <Icon 
        ref={iconRef}
        size={16} 
        style={{ 
          opacity: 0.7, 
          flexShrink: 0, 
          position: 'relative', 
          zIndex: 1,
          color: 'var(--white)',
          transition: 'color 0.15s, opacity 0.15s',
        }} 
      />
      <span 
        ref={textRef}
        style={{ 
          position: 'relative', 
          zIndex: 1,
          color: 'var(--white)',
          transition: 'color 0.15s',
        }}
      >
        {label}
      </span>
    </motion.button>
  )
}