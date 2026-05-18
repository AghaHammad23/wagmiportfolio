'use client'

import { motion, Easing } from 'framer-motion'
import ServicePill from './ServicePill'

const ease: Easing[] = [0.16, 1, 0.3, 1] as unknown as Easing[]

interface ServicesHeroProps {
  services: Array<{ title: string; icon: React.ElementType }>
  onPillClick: (index: number) => void
}

export default function ServicesHero({ services, onPillClick }: ServicesHeroProps) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(80px, 10vw, 120px) var(--pad) clamp(60px, 8vw, 100px)',
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(106,255,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(106,255,42,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', zIndex: 0,
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(106,255,42,0.05) 0%, transparent 65%)',
        top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          style={{
            fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--t4)',
            marginBottom: '20px', display: 'flex', alignItems: 'center',
            gap: '12px', justifyContent: 'center',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          What We Do
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04,
            color: 'var(--white)', maxWidth: '820px',
            margin: '0 auto 20px',
          }}
        >
          Everything You Need.{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>
            Nothing You Don&apos;t.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.22 }}
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300,
            lineHeight: 1.7, color: 'var(--t2)', maxWidth: '480px',
            margin: '0 auto clamp(48px, 7vw, 80px)',
          }}
        >
          We don&apos;t offer à la carte. We build the entire content engine — strategy, production, distribution, and optimisation — all under one roof.
        </motion.p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          justifyContent: 'center', maxWidth: '860px', margin: '0 auto',
        }}>
          {services.map((s, i) => (
            <ServicePill
              key={i}
              label={s.title}
              icon={s.icon}
              index={i}
              onClick={() => onPillClick(i)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            marginTop: 'clamp(48px, 6vw, 72px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t4)' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ color: 'rgba(106,255,42,0.5)', fontSize: '18px' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}