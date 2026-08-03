'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useApply } from './Providers'
import DotGrid from './DotGrid'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const { open } = useApply()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        borderBottom: '1px solid var(--line2)',
        overflow: 'hidden',
      }}
    >
      {/* DotGrid — absolutely fills the section */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor="#0C3B2E"
          activeColor="#6AFF2A"
          proximity={140}
          shockRadius={320}
          shockStrength={5}
          resistance={550}
          returnDuration={1.4}
        />
      </div>

      {/* Dark overlay so text stays readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content sits on top */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(100px, 16vw, 200px) var(--pad)',
          textAlign: 'center',
        }}
      >
        {/* Green glow blob */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(227,194,74,0.07) 0%, transparent 60%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0 }}
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 'clamp(32px, 5.5vw, 70px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: 'var(--white)',
            maxWidth: '820px',
            margin: '0 auto 16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Your Expertise Deserves an Audience. Let Us Go Build It.
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
          style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 300,
            color: 'var(--t2)',
            maxWidth: '560px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
            fontSize: 'clamp(16px, 1.8vw, 22px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Limited spots open each month. We respond to every application within 12 hours.
        </motion.h3>

        <motion.button
          onClick={open}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          whileHover={{ scale: 1.03, y: -2, backgroundColor: 'var(--green)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            color: 'var(--black)',
            background: 'var(--white)',
            borderRadius: '8px',
            border: 'none',
            padding: '16px 44px',
            cursor: 'pointer',
            display: 'inline-block',
            position: 'relative',
            zIndex: 1,
            transition: 'color 0.2s',
          }}
        >
          I WANT CLIENTS COMING TO ME
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.38 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
            flexWrap: 'wrap',
            marginTop: '24px',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: 'var(--t4)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {['First content live in 48 hours after onboarding', '100% done for you', '90-Day Traction Guarantee'].map(
            item => (
              <span key={item}>
                <span style={{ color: 'rgba(227,194,74,0.6)', marginRight: '4px' }}>✓</span>
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </div>
  )
}