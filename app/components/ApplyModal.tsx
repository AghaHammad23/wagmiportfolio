'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(244,241,214,0.03)',
  border: '1px solid rgba(244,241,214,0.12)',
  color: 'var(--hero-cream)',
  fontSize: '15px',
  fontWeight: 400,
  fontFamily: 'var(--font-jakarta), sans-serif',
  padding: '14px 16px',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  borderRadius: '10px',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--t3)',
  marginBottom: '8px',
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

/* Tap-to-select options — one tap beats a native picker, especially on mobile. */
const revenueOptions = [
  { value: 'under-20k', label: 'Under $20k', hint: 'per month' },
  { value: '20-50k', label: '$20k – $50k', hint: 'per month' },
  { value: '50-200k', label: '$50k – $200k', hint: 'per month' },
  { value: '200k+', label: '$200k+', hint: 'per month' },
]

const serviceOptions = [
  { value: 'engine', label: 'The Engine', hint: 'Daily content production' },
  { value: 'converter', label: 'The Converter', hint: 'Ad creatives + VSL' },
  { value: 'full-funnel', label: 'The Full Funnel', hint: 'Everything, fully managed' },
  { value: 'not-sure', label: 'Not sure yet', hint: 'Help me pick' },
]

const TOTAL_STEPS = 3

export default function ApplyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const lenis = useLenis()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      // Focus the first field so desktop users can type immediately.
      const t = setTimeout(() => firstFieldRef.current?.focus(), 350)
      return () => clearTimeout(t)
    }
    lenis?.start()
    document.body.style.overflow = ''
  }, [isOpen, lenis])

  useEffect(() => {
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const pick = (field: 'revenue' | 'service', value: string) => {
    setForm(p => ({ ...p, [field]: value }))
    // Selecting an answer advances automatically — no extra "next" tap needed.
    if (field === 'service') {
      setTimeout(() => setStep(3), 220)
    }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const step1Valid = form.name.trim().length > 1 && emailValid

  const goNext = () => {
    setError(null)
    if (step === 1 && !step1Valid) {
      setError('Add your name and a valid email to continue.')
      return
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }

  const goBack = () => {
    setError(null)
    setStep(s => Math.max(s - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!step1Valid) {
      setStep(1)
      setError('Add your name and a valid email to continue.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setForm(EMPTY)
      setStep(1)
      setError(null)
    }, 400)
  }

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--hero-gold)'
    e.currentTarget.style.background = 'rgba(244,241,214,0.06)'
  }
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(244,241,214,0.12)'
    e.currentTarget.style.background = 'rgba(244,241,214,0.03)'
  }

  const stepTitles = [
    { title: 'Let’s start with you', sub: 'Two quick details and you’re most of the way there.' },
    { title: 'What are we working with?', sub: 'Tap to answer — takes about ten seconds.' },
    { title: 'Anything else?', sub: 'Optional. Skip it and hit send if you’d rather talk live.' },
  ]

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
            background: 'rgba(0,11,8,0.9)',
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
              background: 'var(--green2)',
              border: '1px solid rgba(123,214,165,0.24)',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              borderRadius: '18px',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '24px 28px 0',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              flexShrink: 0,
            }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  color: 'var(--hero-cream)',
                }}>
                  {submitted ? 'You’re in.' : 'Apply to Work With Us'}
                </h2>
                {!submitted && (
                  <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(244,241,214,0.55)', marginTop: '4px' }}>
                    Takes under a minute · We reply within 48 hours
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="apply-close"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Progress */}
            {!submitted && (
              <div style={{ padding: '18px 28px 0', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '3px',
                        borderRadius: '999px',
                        background: i < step ? 'var(--hero-gold)' : 'rgba(244,241,214,0.14)',
                        transition: 'background 0.4s ease',
                      }}
                    />
                  ))}
                </div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(244,241,214,0.4)',
                  marginTop: '10px',
                }}>
                  Step {step} of {TOTAL_STEPS}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="apply-modal-body" style={{ padding: '20px 28px 28px', overflowY: 'auto', flex: 1 }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  style={{ textAlign: 'center', padding: '32px 0 16px' }}
                >
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: 'rgba(227,194,74,0.12)', border: '1px solid rgba(227,194,74,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 22px', fontSize: '26px', color: 'var(--hero-gold)',
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: 'var(--font-anton), sans-serif',
                    fontSize: '24px', fontWeight: 400, letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    color: 'var(--hero-cream)', marginBottom: '12px',
                  }}>
                    Application Sent
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(244,241,214,0.65)', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 28px' }}>
                    We&apos;ll get back to you within 48 hours at{' '}
                    <strong style={{ color: 'var(--hero-cream)', fontWeight: 600 }}>{form.email}</strong>.
                  </p>
                  <button onClick={handleClose} className="apply-primary" style={{ width: 'auto', padding: '13px 36px' }}>
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-jakarta), sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--hero-cream)',
                      marginBottom: '4px',
                    }}>
                      {stepTitles[step - 1].title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(244,241,214,0.5)', lineHeight: 1.6 }}>
                      {stepTitles[step - 1].sub}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                      {/* ── Step 1: contact ── */}
                      {step === 1 && (
                        <>
                          <div>
                            <label style={labelStyle} htmlFor="apply-name">Your name</label>
                            <input
                              id="apply-name"
                              ref={firstFieldRef}
                              name="name" value={form.name} onChange={set}
                              placeholder="John Smith"
                              autoComplete="name"
                              style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                            />
                          </div>
                          <div>
                            <label style={labelStyle} htmlFor="apply-email">Email</label>
                            <input
                              id="apply-email"
                              type="email" name="email" value={form.email} onChange={set}
                              placeholder="you@brand.com"
                              autoComplete="email"
                              inputMode="email"
                              style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                            />
                          </div>
                          <div>
                            <label style={labelStyle} htmlFor="apply-brand">
                              Brand or channel <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                            </label>
                            <input
                              id="apply-brand"
                              name="brand" value={form.brand} onChange={set}
                              placeholder="Your brand or @handle"
                              style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                            />
                          </div>
                        </>
                      )}

                      {/* ── Step 2: qualify, tap to answer ── */}
                      {step === 2 && (
                        <>
                          <div>
                            <label style={labelStyle}>Monthly revenue</label>
                            <div className="apply-options">
                              {revenueOptions.map(opt => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => pick('revenue', opt.value)}
                                  className={`apply-option ${form.revenue === opt.value ? 'is-selected' : ''}`}
                                >
                                  <span className="apply-option-label">{opt.label}</span>
                                  <span className="apply-option-hint">{opt.hint}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label style={labelStyle}>What do you need?</label>
                            <div className="apply-options">
                              {serviceOptions.map(opt => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => pick('service', opt.value)}
                                  className={`apply-option ${form.service === opt.value ? 'is-selected' : ''}`}
                                >
                                  <span className="apply-option-label">{opt.label}</span>
                                  <span className="apply-option-hint">{opt.hint}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* ── Step 3: optional detail ── */}
                      {step === 3 && (
                        <div>
                          <label style={labelStyle} htmlFor="apply-message">
                            Anything we should know? <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                          </label>
                          <textarea
                            id="apply-message"
                            name="message" value={form.message} onChange={set}
                            rows={4}
                            placeholder="Where you are now, where you want to be, and your timeline."
                            style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px', lineHeight: 1.65 }}
                            onFocus={focusBorder} onBlur={blurBorder}
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {error && (
                    <p role="alert" style={{
                      fontSize: '13px',
                      color: '#F2A6A6',
                      marginTop: '14px',
                    }}>
                      {error}
                    </p>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
                    {step > 1 && (
                      <button type="button" onClick={goBack} className="apply-ghost">
                        Back
                      </button>
                    )}

                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="apply-primary"
                        disabled={step === 1 && !step1Valid}
                      >
                        Continue →
                      </button>
                    ) : (
                      <button type="submit" disabled={submitting} className="apply-primary">
                        {submitting ? 'Sending…' : 'Send Application →'}
                      </button>
                    )}
                  </div>

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="apply-skip"
                    >
                      Skip this step
                    </button>
                  )}

                  <p style={{
                    fontSize: '11px', fontWeight: 400,
                    color: 'rgba(244,241,214,0.35)',
                    textAlign: 'center', lineHeight: 1.6, marginTop: '18px',
                  }}>
                    Your information is kept private and never shared.
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
