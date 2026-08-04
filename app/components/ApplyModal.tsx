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
  /** Country id, e.g. 'US' — dial codes are not unique. */
  country: string
  phone: string
  brand: string
  revenue: string
  service: string
  message: string
}

const EMPTY: FormState = {
  name: '', email: '', country: 'US', phone: '',
  brand: '', revenue: '', service: '', message: '',
}

/* Key markets first, then the rest alphabetically. Values carry a unique id
   because several countries share a dial code (+1, +7, +44 …). */
type DialCode = { id: string; code: string; label: string }

const priorityDialCodes: DialCode[] = [
  { id: 'US', code: '+1', label: 'United States' },
  { id: 'CA', code: '+1', label: 'Canada' },
  { id: 'GB', code: '+44', label: 'United Kingdom' },
  { id: 'AU', code: '+61', label: 'Australia' },
  { id: 'AE', code: '+971', label: 'United Arab Emirates' },
  { id: 'PK', code: '+92', label: 'Pakistan' },
  { id: 'IN', code: '+91', label: 'India' },
]

const otherDialCodes: DialCode[] = [
  { id: 'AF', code: '+93', label: 'Afghanistan' },
  { id: 'AL', code: '+355', label: 'Albania' },
  { id: 'DZ', code: '+213', label: 'Algeria' },
  { id: 'AR', code: '+54', label: 'Argentina' },
  { id: 'AM', code: '+374', label: 'Armenia' },
  { id: 'AT', code: '+43', label: 'Austria' },
  { id: 'AZ', code: '+994', label: 'Azerbaijan' },
  { id: 'BH', code: '+973', label: 'Bahrain' },
  { id: 'BD', code: '+880', label: 'Bangladesh' },
  { id: 'BY', code: '+375', label: 'Belarus' },
  { id: 'BE', code: '+32', label: 'Belgium' },
  { id: 'BO', code: '+591', label: 'Bolivia' },
  { id: 'BA', code: '+387', label: 'Bosnia & Herzegovina' },
  { id: 'BR', code: '+55', label: 'Brazil' },
  { id: 'BG', code: '+359', label: 'Bulgaria' },
  { id: 'KH', code: '+855', label: 'Cambodia' },
  { id: 'CM', code: '+237', label: 'Cameroon' },
  { id: 'CL', code: '+56', label: 'Chile' },
  { id: 'CN', code: '+86', label: 'China' },
  { id: 'CO', code: '+57', label: 'Colombia' },
  { id: 'CR', code: '+506', label: 'Costa Rica' },
  { id: 'HR', code: '+385', label: 'Croatia' },
  { id: 'CY', code: '+357', label: 'Cyprus' },
  { id: 'CZ', code: '+420', label: 'Czechia' },
  { id: 'DK', code: '+45', label: 'Denmark' },
  { id: 'DO', code: '+1809', label: 'Dominican Republic' },
  { id: 'EC', code: '+593', label: 'Ecuador' },
  { id: 'EG', code: '+20', label: 'Egypt' },
  { id: 'SV', code: '+503', label: 'El Salvador' },
  { id: 'EE', code: '+372', label: 'Estonia' },
  { id: 'ET', code: '+251', label: 'Ethiopia' },
  { id: 'FI', code: '+358', label: 'Finland' },
  { id: 'FR', code: '+33', label: 'France' },
  { id: 'GE', code: '+995', label: 'Georgia' },
  { id: 'DE', code: '+49', label: 'Germany' },
  { id: 'GH', code: '+233', label: 'Ghana' },
  { id: 'GR', code: '+30', label: 'Greece' },
  { id: 'GT', code: '+502', label: 'Guatemala' },
  { id: 'HN', code: '+504', label: 'Honduras' },
  { id: 'HK', code: '+852', label: 'Hong Kong' },
  { id: 'HU', code: '+36', label: 'Hungary' },
  { id: 'IS', code: '+354', label: 'Iceland' },
  { id: 'ID', code: '+62', label: 'Indonesia' },
  { id: 'IQ', code: '+964', label: 'Iraq' },
  { id: 'IE', code: '+353', label: 'Ireland' },
  { id: 'IL', code: '+972', label: 'Israel' },
  { id: 'IT', code: '+39', label: 'Italy' },
  { id: 'JM', code: '+1876', label: 'Jamaica' },
  { id: 'JP', code: '+81', label: 'Japan' },
  { id: 'JO', code: '+962', label: 'Jordan' },
  { id: 'KZ', code: '+7', label: 'Kazakhstan' },
  { id: 'KE', code: '+254', label: 'Kenya' },
  { id: 'KW', code: '+965', label: 'Kuwait' },
  { id: 'LV', code: '+371', label: 'Latvia' },
  { id: 'LB', code: '+961', label: 'Lebanon' },
  { id: 'LT', code: '+370', label: 'Lithuania' },
  { id: 'LU', code: '+352', label: 'Luxembourg' },
  { id: 'MY', code: '+60', label: 'Malaysia' },
  { id: 'MT', code: '+356', label: 'Malta' },
  { id: 'MU', code: '+230', label: 'Mauritius' },
  { id: 'MX', code: '+52', label: 'Mexico' },
  { id: 'MD', code: '+373', label: 'Moldova' },
  { id: 'MA', code: '+212', label: 'Morocco' },
  { id: 'NP', code: '+977', label: 'Nepal' },
  { id: 'NL', code: '+31', label: 'Netherlands' },
  { id: 'NZ', code: '+64', label: 'New Zealand' },
  { id: 'NG', code: '+234', label: 'Nigeria' },
  { id: 'NO', code: '+47', label: 'Norway' },
  { id: 'OM', code: '+968', label: 'Oman' },
  { id: 'PA', code: '+507', label: 'Panama' },
  { id: 'PY', code: '+595', label: 'Paraguay' },
  { id: 'PE', code: '+51', label: 'Peru' },
  { id: 'PH', code: '+63', label: 'Philippines' },
  { id: 'PL', code: '+48', label: 'Poland' },
  { id: 'PT', code: '+351', label: 'Portugal' },
  { id: 'QA', code: '+974', label: 'Qatar' },
  { id: 'RO', code: '+40', label: 'Romania' },
  { id: 'RU', code: '+7', label: 'Russia' },
  { id: 'SA', code: '+966', label: 'Saudi Arabia' },
  { id: 'RS', code: '+381', label: 'Serbia' },
  { id: 'SG', code: '+65', label: 'Singapore' },
  { id: 'SK', code: '+421', label: 'Slovakia' },
  { id: 'SI', code: '+386', label: 'Slovenia' },
  { id: 'ZA', code: '+27', label: 'South Africa' },
  { id: 'KR', code: '+82', label: 'South Korea' },
  { id: 'ES', code: '+34', label: 'Spain' },
  { id: 'LK', code: '+94', label: 'Sri Lanka' },
  { id: 'SE', code: '+46', label: 'Sweden' },
  { id: 'CH', code: '+41', label: 'Switzerland' },
  { id: 'TW', code: '+886', label: 'Taiwan' },
  { id: 'TZ', code: '+255', label: 'Tanzania' },
  { id: 'TH', code: '+66', label: 'Thailand' },
  { id: 'TT', code: '+1868', label: 'Trinidad & Tobago' },
  { id: 'TN', code: '+216', label: 'Tunisia' },
  { id: 'TR', code: '+90', label: 'Türkiye' },
  { id: 'UG', code: '+256', label: 'Uganda' },
  { id: 'UA', code: '+380', label: 'Ukraine' },
  { id: 'UY', code: '+598', label: 'Uruguay' },
  { id: 'UZ', code: '+998', label: 'Uzbekistan' },
  { id: 'VE', code: '+58', label: 'Venezuela' },
  { id: 'VN', code: '+84', label: 'Vietnam' },
  { id: 'ZM', code: '+260', label: 'Zambia' },
  { id: 'ZW', code: '+263', label: 'Zimbabwe' },
]

const allDialCodes: DialCode[] = [...priorityDialCodes, ...otherDialCodes]

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
  // Digits only, so formatting like (555) 018-2244 still counts.
  const phoneValid = form.phone.replace(/\D/g, '').length >= 6
  const step1Valid = form.name.trim().length > 1 && emailValid && phoneValid

  const goNext = () => {
    setError(null)
    if (step === 1 && !step1Valid) {
      setError(
        !phoneValid && form.name.trim().length > 1 && emailValid
          ? 'Add a phone number so we can reach you.'
          : 'Add your name, email and phone number to continue.'
      )
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
      setError('Add your name, email and phone number to continue.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const { country, phone, ...rest } = form
      const dial = allDialCodes.find(c => c.id === country)?.code ?? '+1'
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send one combined number; the split is only a UI convenience.
        body: JSON.stringify({ ...rest, phone: `${dial} ${phone.trim()}`.trim() }),
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
                            <label style={labelStyle} htmlFor="apply-phone">Phone</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <CountrySelect
                                value={form.country}
                                onChange={id => setForm(p => ({ ...p, country: id }))}
                              />
                              <input
                                id="apply-phone"
                                type="tel" name="phone" value={form.phone} onChange={set}
                                placeholder="555 000 1234"
                                autoComplete="tel-national"
                                inputMode="tel"
                                style={fieldStyle} onFocus={focusBorder} onBlur={blurBorder}
                              />
                            </div>
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

/**
 * Searchable country/dial-code picker. A native <select> is unusable at 100+
 * entries, so this is a filterable listbox driven by keyboard or pointer.
 */
function CountrySelect({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  // Buffered keystrokes for typeahead, e.g. "p" then "o" jumps to Poland.
  const typed = useRef('')
  const typedTimer = useRef<number | undefined>(undefined)

  const selected = allDialCodes.find(c => c.id === value) ?? allDialCodes[0]

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Open on the current selection, and focus the list so keys are captured.
  useEffect(() => {
    if (!open) return
    const idx = allDialCodes.findIndex(c => c.id === value)
    setHighlight(idx < 0 ? 0 : idx)
    typed.current = ''
    setTimeout(() => listRef.current?.focus(), 20)
  }, [open, value])

  // Keep the highlighted row in view.
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${highlight}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlight, open])

  useEffect(() => () => window.clearTimeout(typedTimer.current), [])

  const choose = (id: string) => {
    onChange(id)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => Math.min(h + 1, allDialCodes.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => Math.max(h - 1, 0))
      return
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setHighlight(0)
      return
    }
    if (e.key === 'End') {
      e.preventDefault()
      setHighlight(allDialCodes.length - 1)
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const pick = allDialCodes[highlight]
      if (pick) choose(pick.id)
      return
    }
    if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
      return
    }

    // Typeahead: letters jump to the first country starting with what's typed.
    if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
      e.preventDefault()
      typed.current += e.key.toLowerCase()

      // Search the alphabetical section only — the pinned countries at the top
      // would otherwise swallow "p" (Pakistan) instead of jumping to Panama.
      const findFrom = (prefix: string) =>
        allDialCodes.findIndex(
          (c, i) => i >= priorityDialCodes.length && c.label.toLowerCase().startsWith(prefix)
        )

      let idx = findFrom(typed.current)
      // No match on the buffer means the user started a new word — restart it.
      if (idx < 0 && typed.current.length > 1) {
        typed.current = e.key.toLowerCase()
        idx = findFrom(typed.current)
      }
      if (idx >= 0) setHighlight(idx)

      window.clearTimeout(typedTimer.current)
      typedTimer.current = window.setTimeout(() => { typed.current = '' }, 800)
    }
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${selected.label} ${selected.code}`}
        className="apply-country-trigger"
      >
        <span>{selected.code}</span>
        <span className="apply-country-caret">▾</span>
      </button>

      {open && (
        <div className="apply-country-pop">
          <div
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            aria-activedescendant={`country-${allDialCodes[highlight]?.id}`}
            className="apply-country-list"
          >
            {allDialCodes.map((c, i) => (
              <button
                key={c.id}
                id={`country-${c.id}`}
                type="button"
                data-idx={i}
                role="option"
                tabIndex={-1}
                aria-selected={c.id === value}
                onClick={() => choose(c.id)}
                onMouseEnter={() => setHighlight(i)}
                /* Rule marks where the pinned countries end and A–Z begins. */
                style={i === priorityDialCodes.length
                  ? { borderTop: '1px solid rgba(244,241,214,0.14)' }
                  : undefined}
                className={`apply-country-item ${i === highlight ? 'is-active' : ''} ${c.id === value ? 'is-selected' : ''}`}
              >
                <span className="apply-country-name">{c.label}</span>
                <span className="apply-country-code">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
