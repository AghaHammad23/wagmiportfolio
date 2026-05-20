'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import type { CareerCardData } from './MagicBento'

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
  cnic: string
  email: string
  phone: string
  portfolioLink: string
  coverLetter: string
}

const EMPTY: FormState = { name: '', cnic: '', email: '', phone: '', portfolioLink: '', coverLetter: '' }

export default function JobApplyModal({ job, onClose }: { job: CareerCardData | null; onClose: () => void }) {
  const lenis = useLenis()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isOpen = job !== null

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
  })

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const body = [
      `Position: ${job?.title}`,
      `Department: ${job?.department} — ${job?.type} — ${job?.location}`,
      '',
      `Name: ${form.name}`,
      `CNIC: ${form.cnic}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Portfolio: ${form.portfolioLink || 'Not provided'}`,
      cvFile ? `CV File: ${cvFile.name} (please attach to this email before sending)` : 'CV: Not attached',
      '',
      '--- Cover Letter ---',
      form.coverLetter,
    ].join('\n')

    const mailto = `mailto:aghasaad@wagmihq.com?subject=${encodeURIComponent(`Application: ${job?.title ?? ''}`)}&body=${encodeURIComponent(body)}`

    window.open(mailto)

    await new Promise(r => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setForm(EMPTY)
      setCvFile(null)
    }, 400)
  }

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(171,248,47,0.4)'
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              maxWidth: '600px', width: '100%',
              maxHeight: '90vh',
              display: 'flex', flexDirection: 'column',
              borderRadius: '8px',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '28px 32px 20px',
              borderBottom: '1px solid var(--line2)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#ABF82F',
                    background: 'rgba(171,248,47,0.1)', padding: '3px 9px', borderRadius: '3px',
                  }}>
                    {job?.department}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--t4)', fontWeight: 300 }}>
                    {job?.type} · {job?.location}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em',
                  color: 'var(--white)',
                }}>
                  {job?.title}
                </h2>
                <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--t3)', marginTop: '4px' }}>
                  Fill in your details — we respond within 48 hours.
                </p>
              </div>

              <button
                onClick={handleClose}
                style={{
                  background: 'none', border: '1px solid var(--line)',
                  color: 'var(--t3)', cursor: 'pointer',
                  width: '32px', height: '32px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', lineHeight: 1,
                  transition: 'color 0.2s, border-color 0.2s',
                  flexShrink: 0, marginTop: '2px',
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
                    background: 'rgba(171,248,47,0.1)', border: '1px solid rgba(171,248,47,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px', fontSize: '24px', color: 'var(--green)',
                  }}>
                    ✓
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-bricolage), sans-serif',
                    fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em',
                    color: 'var(--white)', marginBottom: '12px',
                  }}>
                    Application Sent!
                  </h3>
                  <p style={{
                    fontSize: '14px', fontWeight: 300, color: 'var(--t2)',
                    lineHeight: 1.75, maxWidth: '360px', margin: '0 auto 10px',
                  }}>
                    Your email client opened with the application for{' '}
                    <strong style={{ color: 'var(--white)', fontWeight: 600 }}>{job?.title}</strong> pre-filled.
                  </p>
                  {cvFile && (
                    <p style={{
                      fontSize: '12px', fontWeight: 300, color: 'rgba(171,248,47,0.6)',
                      maxWidth: '360px', margin: '0 auto 28px', lineHeight: 1.65,
                    }}>
                      Remember to attach <strong>{cvFile.name}</strong> before hitting send.
                    </p>
                  )}
                  {!cvFile && <div style={{ marginBottom: '28px' }} />}
                  <button
                    onClick={handleClose}
                    style={{
                      fontFamily: 'var(--font-bricolage), sans-serif',
                      fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em',
                      color: 'var(--black)', background: 'var(--green)',
                      padding: '12px 32px', border: 'none', cursor: 'pointer',
                      borderRadius: '4px', transition: 'transform 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                  {/* Name + CNIC */}
                  <div className="apply-row">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        name="name" value={form.name} onChange={set} required
                        placeholder="John Smith"
                        style={fieldStyle} onFocus={focus} onBlur={blur}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>CNIC *</label>
                      <input
                        name="cnic" value={form.cnic} onChange={set} required
                        placeholder="12345-1234567-1"
                        style={fieldStyle} onFocus={focus} onBlur={blur}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="apply-row">
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={set} required
                        placeholder="you@email.com"
                        style={fieldStyle} onFocus={focus} onBlur={blur}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone *</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={set} required
                        placeholder="+92 300 1234567"
                        style={fieldStyle} onFocus={focus} onBlur={blur}
                      />
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div>
                    <label style={labelStyle}>Portfolio / Work Samples</label>
                    <input
                      type="url" name="portfolioLink" value={form.portfolioLink} onChange={set}
                      placeholder="https://yourportfolio.com or YouTube / Behance link"
                      style={fieldStyle} onFocus={focus} onBlur={blur}
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label style={labelStyle}>CV / Resume *</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        width: '100%', padding: '12px 16px',
                        border: `1px ${cvFile ? 'solid' : 'dashed'} ${cvFile ? 'rgba(171,248,47,0.4)' : 'rgba(255,255,255,0.12)'}`,
                        borderRadius: '4px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: cvFile ? 'rgba(171,248,47,0.04)' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { if (!cvFile) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)' }}
                      onMouseLeave={e => { if (!cvFile) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
                    >
                      <span style={{ fontSize: '16px' }}>{cvFile ? '📎' : '↑'}</span>
                      <span style={{ fontSize: '13px', fontWeight: 300, color: cvFile ? 'rgba(171,248,47,0.8)' : 'var(--t3)', flex: 1 }}>
                        {cvFile ? cvFile.name : 'Click to select PDF or DOC'}
                      </span>
                      {cvFile && (
                        <span
                          role="button"
                          onClick={e => { e.stopPropagation(); setCvFile(null) }}
                          style={{ fontSize: '12px', color: 'var(--t4)', cursor: 'pointer', padding: '2px 6px', borderRadius: '2px' }}
                        >
                          ✕
                        </span>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={e => setCvFile(e.target.files?.[0] ?? null)}
                    />
                    <p style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '5px', fontWeight: 300 }}>
                      PDF or DOC — you&apos;ll attach it to the email when it opens.
                    </p>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label style={labelStyle}>Cover Letter *</label>
                    <textarea
                      name="coverLetter" value={form.coverLetter} onChange={set} required
                      rows={5}
                      placeholder="Why are you the right person for this role? Be specific about your experience, what you've built, and why WAGMI."
                      style={{ ...fieldStyle, resize: 'vertical', minHeight: '124px', lineHeight: 1.65 }}
                      onFocus={focus} onBlur={blur}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      fontFamily: 'var(--font-bricolage), sans-serif',
                      fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
                      color: 'var(--black)',
                      background: submitting ? 'rgba(171,248,47,0.7)' : 'var(--green)',
                      border: 'none', padding: '14px 32px', borderRadius: '4px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.15s, background 0.2s',
                      width: '100%', marginTop: '4px',
                    }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {submitting ? 'Opening email client...' : `Apply for ${job?.title} →`}
                  </button>

                  <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--t4)', textAlign: 'center', lineHeight: 1.6 }}>
                    Submitting opens your email client with your application pre-filled. Attach your CV and send.
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
