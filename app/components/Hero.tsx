'use client'

import { motion } from 'framer-motion'
import { useApply } from './Providers'
import Image from 'next/image'
import { useRef } from 'react'
import ApplyButton from './ApplyButton'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  }
}

export default function Hero() {
  const { open } = useApply()
  const resultsRef = useRef<HTMLDivElement | null>(null)

  const scrollToResults = () => {
    const resultsSection = document.getElementById('results-section')
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px var(--pad) 80px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line2)',
      }}
    >
      {/* Background Video */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.08) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Logo */}
        <motion.div
          {...rise(0.1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Image src="/logo.png" alt="WAGMI Media Logo" width={154} height={24} priority />
        </motion.div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 'clamp(32px, 6.5vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--white)',
            maxWidth: '900px',
            marginBottom: '28px',
          }}
        >
          {[
            { text: 'We Build the Content ', delay: 0.2,  muted: false },
            { text: 'That Turns Your Brand', delay: 0.32, muted: false },
            { text: 'Into a Client Magnet.', delay: 0.44, muted: true  },
          ].map(({ text, delay, muted }) => (
            <motion.span
              key={text}
              {...rise(delay)}
              style={{
                display: 'block',
                color: muted ? 'var(--green)' : 'var(--white)',
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
            fontSize: 'clamp(14px, 1.8vw, 19px)',
            fontWeight: 300,
            letterSpacing: '0.01em',
            lineHeight: 1.6,
            color: 'var(--t2)',
            maxWidth: '560px',
            margin: 'auto',
            padding: '0 16px 40px',
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
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
                    <button
   onClick={open}
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(12px, 1.5vw, 14px)',
              fontWeight: 700,
              letterSpacing: '0.01em',
              color: 'var(--black)',
              background: 'var(--white)',
              border: 'none',
              padding: 'clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s, transform 0.15s',
              textTransform: 'uppercase',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--green)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--white)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Apply to Work With Us
          </button>
          <button
            onClick={scrollToResults}
            className="shine-btn"
          >
            See Our Work ↓
          </button>
        </motion.div>

        {/* Risk strip */}
        <motion.div
          {...rise(0.86)}
          className="flex items-center justify-center flex-wrap gap-3 md:gap-6 mt-7 px-4"
          style={{
            fontSize: 'clamp(10px, 1.2vw, 11px)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            paddingTop: '28px',
          }}
        >
          {['No long-term contracts', 'Results in 30 days', '100% done-for-you'].map((item) => (
            <span
              key={item}
              className="relative cursor-default border-2 border-(--green) px-3 py-2 rounded-full transition-all duration-300 hover:text-black overflow-hidden group"
              style={{ padding: '10px', borderRadius: '30px' }}
            >
              {/* Fill layer */}
              <span className="absolute inset-0 bg-(--green) rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              {/* Text */}
              <span className="relative z-10 inline-block transition-colors duration-300 group-hover:text-black text-(--green)">
                {item}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        .shine-btn {
          position: relative;
          padding: 12px 48px;
          background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
          background-position: 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s infinite linear;
          animation-fill-mode: forwards;
          font-weight: 600;
          font-size: 16px;
          font-family: var(--font-jakarta), sans-serif;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          background-color: transparent;
        }

        @keyframes shine {
          0%   { background-position: 0; }
          60%  { background-position: 180px; }
          100% { background-position: 180px; }
        }
      `}</style>
    </section>
  )
}