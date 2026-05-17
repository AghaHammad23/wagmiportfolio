'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.08)',
  color: 'var(--white)',
  fontSize: '14px',
  fontWeight: 300,
  fontFamily: 'var(--font-jakarta), sans-serif',
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 0.2s',
  borderRadius: '4px',
}

interface FormState {
  name: string
  email: string
  brand: string
  revenue: string
  service: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', brand: '', revenue: '', service: '', message: '' }

export default function ApplyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const lenis = useLenis()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setForm(EMPTY)
    }, 400)
  }

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(106,255,42,0.4)'
  }
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(0,0,0,0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px var(--pad)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <motion.div
          data-lenis-prevent
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              maxWidth: '580px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              borderRadius: '8px',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '28px 32px 20px',
              borderBottom: '1px solid var(--line2)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--white)',
                }}>
                  Apply to Work With Us
                </h2>
                <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--t3)', marginTop: '4px' }}>
                  We respond to every application within 48 hours.
                </p>
              </div>
              <button
                onClick={handleClose}
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
                  marginTop: '2px',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.borderColor = 'var(--green)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)'; e.currentTarget.style.borderColor = 'var(--line)' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="apply-modal-body" style={{ padding: '24px 32px 32px', overflowY: 'auto', flex: 1 }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  style={{ textAlign: 'center', padding: '48px 0' }}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(106,255,42,0.1)', border: '1px solid rgba(106,255,42,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px', fontSize: '24px', color: 'var(--green)',
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: 'var(--font-bricolage), sans-serif',
                    fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em',
                    color: 'var(--white)', marginBottom: '12px',
                  }}>
                    Application Sent!
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--t2)', lineHeight: 1.75, maxWidth: '360px', margin: '0 auto 32px' }}>
                    We&apos;ve received your application and will get back to you within 48 hours at{' '}
                    <strong style={{ color: 'var(--white)', fontWeight: 500 }}>{form.email}</strong>.
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
                      fontFamily: 'var(--font-bricolage), sans-serif',
                      fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em',
                      color: 'var(--black)', background: 'var(--green)',
                      padding: '12px 32px', border: 'none', cursor: 'pointer',
                      transition: 'transform 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="apply-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>
                        Full Name *
                      </label>
                      <input
                        name="name" value={form.name} onChange={set} required
                        placeholder="John Smith"
                        style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>
                        Email *
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={set} required
                        placeholder="you@brand.com"
                        style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>
                      Brand / Channel Name *
                    </label>
                    <input
                      name="brand" value={form.brand} onChange={set} required
                      placeholder="Your Brand or YouTube Channel"
                      style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </div>

                  <div className="apply-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>
                        Monthly Revenue
                      </label>
                      <select
                        name="revenue" value={form.revenue} onChange={set}
                        style={{ ...fieldStyle, cursor: 'pointer' }}
                        onFocus={focusBorder} onBlur={blurBorder}
                      >
                        <option value="">Select range</option>
                        <option value="starting">Just starting out</option>
                        <option value="under10k">Under $10k / mo</option>
                        <option value="10-50k">$10k – $50k / mo</option>
                        <option value="50-200k">$50k – $200k / mo</option>
                        <option value="200k+">$200k+ / mo</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>
                        Service Needed
                      </label>
                      <select
                        name="service" value={form.service} onChange={set}
                        style={{ ...fieldStyle, cursor: 'pointer' }}
                        onFocus={focusBorder} onBlur={blurBorder}
                      >
                        <option value="">Select service</option>
                        <option value="short-form">Short-Form Video</option>
                        <option value="long-form">Long-Form YouTube</option>
                        <option value="full">Full Content Engine</option>
                        <option value="strategy">Strategy Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>
                      Tell us about your brand & goals *
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={set} required
                      rows={4}
                      placeholder="Where are you now, where do you want to be, and what's your timeline?"
                      style={{ ...fieldStyle, resize: 'vertical', minHeight: '104px', lineHeight: 1.65 }}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      fontFamily: 'var(--font-bricolage), sans-serif',
                      fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
                      color: 'var(--black)',
                      background: submitting ? 'rgba(106,255,42,0.7)' : 'var(--green)',
                      border: 'none', padding: '14px 32px',
                      borderRadius: '4px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.15s, background 0.2s',
                      width: '100%',
                    }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {submitting ? 'Sending...' : 'Submit Application →'}
                  </button>

                  <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--t4)', textAlign: 'center', lineHeight: 1.6 }}>
                    We respond within 48 hours. Your information is kept private and never shared.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
