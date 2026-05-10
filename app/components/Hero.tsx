'use client'

import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  }
}

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px var(--pad) 80px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line2)',
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.04) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Badge */}
      <motion.div
        {...rise(0.1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'var(--t3)',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}
      >
        <span
          style={{
            width: '4px',
            height: '4px',
            background: 'var(--green)',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
        Trusted by 300+ Brands Across US · UK · EU
      </motion.div>

      {/* H1 */}
      <h1
        style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: 'clamp(40px, 6.5vw, 80px)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--white)',
          maxWidth: '900px',
          marginBottom: '28px',
        }}
      >
        {[
          { text: 'We Build the Content Engine', delay: 0.2, muted: false },
          { text: 'That Turns Your Brand', delay: 0.32, muted: false },
          { text: 'Into a Client Magnet.', delay: 0.44, muted: true },
        ].map(({ text, delay, muted }) => (
          <motion.span
            key={text}
            {...rise(delay)}
            style={{
              display: 'block',
              color: muted ? 'var(--t3)' : 'var(--white)',
            }}
          >
            {text}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        {...rise(0.58)}
        style={{
          fontSize: 'clamp(16px, 1.8vw, 19px)',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'var(--t2)',
          maxWidth: '560px',
          marginBottom: '48px',
        }}
      >
        Scripts. Editing. Strategy. Distribution. We run the entire operation — so
        you stop creating content that gets views and start creating content that
        gets paid.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...rise(0.72)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            color: 'var(--black)',
            background: 'var(--white)',
            border: 'none',
            padding: '14px 32px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--green)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--white)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Apply to Work With Us
        </a>
        <a
          href="#"
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--t2)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
            padding: '14px 8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t2)')}
        >
          See Our Work ↓
        </a>
      </motion.div>

      {/* Risk strip */}
      <motion.div
        {...rise(0.86)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '28px',
          fontSize: '11px',
          fontWeight: 400,
          color: 'var(--t4)',
          letterSpacing: '0.04em',
        }}
      >
        {['No long-term contracts', 'Results in 30 days', '100% done-for-you'].map(
          (item) => (
            <span key={item}>
              <span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '4px' }}>✓</span>
              {item}
            </span>
          )
        )}
      </motion.div>
    </section>
  )
}
