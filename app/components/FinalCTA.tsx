'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useApply } from './Providers'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const { open } = useApply()

  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(100px, 14vw, 180px) var(--pad)',
        textAlign: 'center',
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.025) 0%, transparent 60%)',
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
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: 'clamp(32px, 5.5vw, 70px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.04,
          color: 'var(--white)',
          maxWidth: '800px',
          margin: '0 auto 20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Your content should be
        <br />
        making you money.
        <br />
        <em
          style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 300,
            color: 'var(--t2)',
          }}
        >
          If it isn&apos;t — that&apos;s what we fix.
        </em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          fontWeight: 300,
          color: 'var(--t2)',
          maxWidth: '440px',
          margin: '0 auto 48px',
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Limited spots available each month. Apply below and we&apos;ll get back to you
        within 48 hours.
      </motion.p>

      <motion.button
        onClick={open}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.28 }}
        whileHover={{ scale: 1.02, y: -1, backgroundColor: 'var(--green)' }}
        style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          letterSpacing: '0.01em',
          color: 'var(--black)',
          background: 'var(--white)',
          border: 'none',
          padding: '16px 44px',
          cursor: 'pointer',
          display: 'inline-block',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Apply to Work With Us
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.42 }}
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
        {['No long-term contracts', 'First results in 30 days', '100% done-for-you', 'Cancel anytime'].map(
          item => (
            <span key={item}>
              <span style={{ color: 'rgba(106,255,42,0.5)', marginRight: '4px' }}>✓</span>
              {item}
            </span>
          )
        )}
      </motion.div>
    </div>
  )
}
