'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function PolicyModal({ isOpen, onClose, title, children }: PolicyModalProps) {
  const lenis = useLenis()

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isOpen, lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px var(--pad)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '28px 32px 20px',
                borderBottom: '1px solid var(--line2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--white)',
                }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid var(--line)',
                  color: 'var(--t3)',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  lineHeight: 1,
                  transition: 'color 0.2s, border-color 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--green)'
                  e.currentTarget.style.borderColor = 'var(--green)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--t3)'
                  e.currentTarget.style.borderColor = 'var(--line)'
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div
              className="apply-modal-body"
              style={{
                padding: '24px 32px 32px',
                overflowY: 'auto',
                color: 'var(--t2)',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
