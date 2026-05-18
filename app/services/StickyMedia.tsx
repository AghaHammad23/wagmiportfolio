'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  media: { type: string; src: string }
  tag: string
}

export default function StickyMedia({ services, activeIndex }: { services: Service[], activeIndex: number }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
    }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {services[activeIndex].media.type === 'video' ? (
            <video
              key={services[activeIndex].media.src}
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src={services[activeIndex].media.src} type="video/mp4" />
            </video>
          ) : (
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${services[activeIndex].media.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          )}

          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 100%)',
          }} />

          {/* Service index indicator */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </div>

          {/* Tag pill on media */}
          <div style={{
            position: 'absolute',
            top: '32px',
            right: '32px',
            background: 'rgba(106,255,42,0.9)',
            color: 'var(--black)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '4px',
          }}>
            {services[activeIndex].tag}
          </div>

          {/* Progress dots */}
          <div style={{
            position: 'absolute',
            right: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {services.map((_, i) => (
              <div key={i} style={{
                width: '4px',
                height: i === activeIndex ? '24px' : '4px',
                borderRadius: '2px',
                background: i === activeIndex ? 'var(--green)' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}