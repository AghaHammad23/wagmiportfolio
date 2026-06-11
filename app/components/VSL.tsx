'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'

gsap.registerPlugin(ScrollTrigger)

export default function VSL() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [muted, setMuted]       = useState(true)
  const [showHint, setShowHint] = useState(true)
  const [flash, setFlash]       = useState<'muted' | 'unmuted' | null>(null)

  const toggleMute = () => {
    if (!videoRef.current) return
    const nowMuted = !muted
    videoRef.current.muted = nowMuted
    setMuted(nowMuted)
    setShowHint(false)
    setFlash(nowMuted ? 'muted' : 'unmuted')
    setTimeout(() => setFlash(null), 900)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll<HTMLElement>('.vsl-reveal')
      if (!reveals?.length) return
      reveals.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ 
        padding: 'clamp(80px, 10vw, 140px) var(--pad)', 
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blob 1 - Bottom Left (outside the section partially) */}
      <div
        style={{
          position: 'absolute',
          left: '-120px',
          bottom: '-80px',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      {/* Blob 2 - Top Right (within section) */}
      <div
        style={{
          position: 'absolute',
          right: '-80px',
          top: '0%',
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

     

      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <div
          className="vsl-reveal"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--green)', opacity: 0.5, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--t2)' }}>
            Watch This First
          </span>
        </div>

        {/* Heading */}
        <h2
          className="vsl-reveal"
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            color: 'var(--white)',
            marginBottom: 'clamp(10px, 1.5vw, 16px)',
          }}
        >
          Watch This Before You Apply.
          <br />
          <span style={{ color: 'var(--green)', fontWeight: 900 }}>
            It Tells You Exactly How We Work.
          </span>
        </h2>

        {/* Subtext */}
        <p
          className="vsl-reveal"
          style={{
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            fontWeight: 300,
            color: 'var(--t3)',
            lineHeight: 1.65,
            maxWidth: '500px',
            marginBottom: 'clamp(32px, 5vw, 60px)',
          }}
        >
          3 minutes. No sales pitch. By the end you will know if we are the right fit for your brand, or not.
        </p>

        {/* Video frame */}
        <div
          className="vsl-reveal"
          onClick={toggleMute}
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            background: 'var(--surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.65)',
            zIndex: 2,
          }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/heroVideo.mp4" type="video/mp4" />
          </video>

          {/* Duration badge — top left */}
          <div
            style={{
              position: 'absolute', top: '14px', left: '14px', zIndex: 2,
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              userSelect: 'none',
            }}
          >
            3 min 
          </div>

          {/* Volume indicator — top right */}
          <div
            style={{
              position: 'absolute', top: '14px', right: '14px', zIndex: 2,
              background: 'rgba(0,0,0,0.55)',
              border: `1px solid ${muted ? 'rgba(255,255,255,0.08)' : 'rgba(171,248,47,0.3)'}`,
              borderRadius: '50%',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.3s',
              userSelect: 'none',
            }}
          >
            {muted
              ? <HiSpeakerXMark size={16} style={{ color: 'rgba(255,255,255,0.55)' }} />
              : <HiSpeakerWave  size={16} style={{ color: 'var(--green)' }} />
            }
          </div>

          {/* Center mute/unmute flash */}
          <AnimatePresence>
            {flash !== null && (
              <div
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 5, pointerEvents: 'none',
                }}
              >
                <motion.div
                  key={flash}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.3 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{
                    background: 'rgba(0,0,0,0.65)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '50%',
                    width: '72px', height: '72px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {flash === 'muted'
                    ? <HiSpeakerXMark size={30} style={{ color: 'rgba(255,255,255,0.9)' }} />
                    : <HiSpeakerWave  size={30} style={{ color: 'var(--green)' }} />
                  }
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom gradient — attribution + hint */}
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
              padding: 'clamp(48px, 8vw, 88px) clamp(14px, 2vw, 22px) clamp(14px, 2vw, 20px)',
              background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '12px',
              pointerEvents: 'none',
            }}
          >
            {/* Founder */}
            <div>
              <div style={{ fontSize: 'clamp(11px, 1.4vw, 13px)', fontWeight: 500, color: 'var(--white)', marginBottom: '2px' }}>
                Agha Saad
              </div>
              <div style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                Founder, WAGMI Media
              </div>
            </div>

            {/* Unmute hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    backdropFilter: 'blur(4px)',
                    userSelect: 'none',
                    pointerEvents: 'auto',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <HiSpeakerXMark size={12} />
                  Click to unmute
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Below-video row */}
        <div
          className="vsl-reveal"
          style={{
            marginTop: 'clamp(16px, 2.5vw, 24px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {/* Trust micro-line */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            {['3 min', 'No sales pitch'].map((item, i, arr) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t3)', letterSpacing: '0.02em' }}>
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--t4)', display: 'inline-block', flexShrink: 0 }} />
                )}
              </span>
            ))}
          </div>

          {/* Suggestion */}
          <span style={{ fontSize: '11px', fontStyle: 'italic', fontWeight: 300, color: 'var(--t3)' }}>
            Best watched with sound on
          </span>
        </div>

      </div>
    </section>
  )
}