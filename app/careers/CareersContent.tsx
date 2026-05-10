'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RiArrowRightLine, RiMapPinLine, RiTimeLine, RiBriefcaseLine } from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const openings = [
  {
    title: 'Senior Video Editor',
    type: 'Full-time',
    location: 'Remote',
    department: 'Production',
    desc: 'We need an editor who lives and breathes retention. You\'ll be cutting long-form YouTube content for 8–15+ channels simultaneously — working from scripts and briefs to produce polished, high-CTR videos.',
    requirements: [
      '3+ years editing YouTube content (long-form preferred)',
      'Strong eye for pacing, hooks, and B-roll integration',
      'Proficiency in Premiere Pro or DaVinci Resolve',
      'Ability to handle multiple projects with fast turnaround',
      'Understanding of analytics — retention graphs, CTR, AVD',
    ],
  },
  {
    title: 'Content Strategist',
    type: 'Full-time',
    location: 'Remote',
    department: 'Strategy',
    desc: 'You\'ll be the architect of 90-day content roadmaps for our clients. This role requires deep platform knowledge, strong analytical instincts, and the ability to turn data into a clear, executable plan.',
    requirements: [
      '2+ years in YouTube channel strategy or content marketing',
      'Ability to read and interpret channel analytics clearly',
      'Strong written communication — you write crisp briefs and reports',
      'Understanding of niche positioning and audience development',
      'Experience running content for at least one channel past 50K subs',
    ],
  },
  {
    title: 'Short-Form Video Editor',
    type: 'Contract',
    location: 'Remote',
    department: 'Production',
    desc: 'YouTube Shorts, Instagram Reels, TikTok — you know what performs on each platform and you can cut fast. You\'ll be repurposing long-form content into short-form clips that actually get views.',
    requirements: [
      '2+ years editing short-form content for social platforms',
      'Strong understanding of hooks, captions, and vertical format',
      'Fast turnaround — 5–10 clips per week is the baseline',
      'Creative eye for what\'s trending without chasing trends blindly',
    ],
  },
  {
    title: 'Copywriter / Script Writer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Creative',
    desc: 'Words that hook. Scripts that hold. Copies that convert. You\'ll be writing YouTube scripts, email sequences, and ad copy for clients across multiple niches — fast, clearly, and in their voice.',
    requirements: [
      '2+ years writing YouTube scripts or long-form content',
      'Ability to write fast without sacrificing quality',
      'Strong research skills — you can get fluent on a topic quickly',
      'Portfolio of scripts with proven retention/view performance',
    ],
  },
]

const perks = [
  { icon: '🌍', title: '100% Remote', desc: 'Work from anywhere. We don\'t care about location — we care about output.' },
  { icon: '📈', title: 'Real Ownership', desc: 'You\'ll see your work go from idea to millions of views. The feedback loop is immediate.' },
  { icon: '⚡', title: 'Fast-moving team', desc: 'No bureaucracy. No pointless meetings. You\'ll ship more here in a month than most places do in a year.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'We pay above market for people who deliver above average. Performance is rewarded directly.' },
]

export default function CareersContent() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveals = revealRef.current?.querySelectorAll('.reveal')
    if (!reveals) return
    reveals.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  }, [])

  return (
    <main style={{ paddingTop: '52px' }}>
      {/* Hero */}
      <section style={{
        minHeight: '50vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '100px var(--pad) 80px', borderBottom: '1px solid var(--line2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(106,255,42,0.04) 0%, transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
          style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          We&apos;re Hiring
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04, color: 'var(--white)', maxWidth: '760px', marginBottom: '24px' }}
        >
          Join the team that builds{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>what others can&apos;t.</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.22 }}
          style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)', maxWidth: '480px', marginBottom: '40px' }}
        >
          We&apos;re looking for obsessed people who want to work on channels that actually matter — and see the results of their work in real time.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.34 }}
          style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '12px', fontWeight: 400, color: 'var(--t4)', letterSpacing: '0.04em' }}
        >
          <span><span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '6px' }}>✓</span>100% remote</span>
          <span><span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '6px' }}>✓</span>Fast-paced environment</span>
          <span><span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '6px' }}>✓</span>Real ownership</span>
          <span><span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '6px' }}>✓</span>Competitive pay</span>
        </motion.div>
      </section>

      <div ref={revealRef}>
        {/* Open roles */}
        <div style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
              Open Positions
            </div>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white)', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
              {openings.length} roles open now.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line2)' }}>
              {openings.map((job, i) => {
                const isOpen = expandedJob === i
                return (
                  <div key={i} className="reveal" style={{ background: 'var(--black)', transition: 'background 0.25s' }}>
                    {/* Header row */}
                    <button
                      onClick={() => setExpandedJob(isOpen ? null : i)}
                      style={{
                        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                        padding: 'clamp(24px, 3vw, 36px) clamp(24px, 3vw, 40px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '16px', textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.01em' }}>
                          {job.title}
                        </span>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RiBriefcaseLine size={12} /> {job.department}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RiTimeLine size={12} /> {job.type}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RiMapPinLine size={12} /> {job.location}
                          </span>
                        </div>
                      </div>
                      <div style={{
                        width: '32px', height: '32px', border: '1px solid var(--line)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isOpen ? 'var(--green)' : 'var(--t3)',
                        borderColor: isOpen ? 'var(--green)' : 'var(--line)',
                        transition: 'all 0.25s', flexShrink: 0,
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}>
                        <RiArrowRightLine size={14} />
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                        style={{
                          padding: '0 clamp(24px, 3vw, 40px) clamp(28px, 3vw, 40px)',
                          borderTop: '1px solid var(--line2)',
                        }}
                      >
                        <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--t2)', marginBottom: '24px', paddingTop: '24px' }}>
                          {job.desc}
                        </p>
                        <div style={{ marginBottom: '28px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '12px' }}>Requirements</div>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {job.requirements.map((req, j) => (
                              <li key={j} style={{ fontSize: '13px', fontWeight: 300, color: 'var(--t2)', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: 1.6 }}>
                                <span style={{ color: 'rgba(106,255,42,0.5)', marginTop: '2px', flexShrink: 0 }}>✓</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a
                          href={`mailto:aghasaad@wagmihq.com?subject=Application: ${job.title}`}
                          style={{
                            fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '13px',
                            fontWeight: 700, color: 'var(--black)', background: 'var(--white)',
                            padding: '12px 28px', textDecoration: 'none', display: 'inline-block',
                            transition: 'background 0.2s, transform 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                          Apply for this Role →
                        </a>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Perks */}
        <div style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)', background: 'var(--off)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
              Why Join Us
            </div>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white)', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
              A team that ships.<br />
              <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>Not one that talks about it.</em>
            </h2>
            <div className="perks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--line2)' }}>
              {perks.map((p, i) => (
                <div key={i} className="reveal" style={{ background: 'var(--off)', padding: 'clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 32px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '28px' }}>{p.icon}</span>
                  <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.01em' }}>{p.title}</div>
                  <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open application */}
        <div style={{ padding: 'clamp(80px, 12vw, 140px) var(--pad)', textAlign: 'center', borderBottom: '1px solid var(--line2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(106,255,42,0.025) 0%, transparent 60%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--white)', maxWidth: '600px', margin: '0 auto 16px', position: 'relative', zIndex: 1 }}>
            Don&apos;t see your role listed?
          </h2>
          <p className="reveal" style={{ fontSize: '16px', fontWeight: 300, color: 'var(--t2)', maxWidth: '440px', margin: '0 auto 40px', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            We always want to hear from talented people. Send us your work and tell us what you bring to the table.
          </p>
          <a href="mailto:aghasaad@wagmihq.com?subject=Open Application — WAGMI Media" className="reveal"
            style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--black)', background: 'var(--white)', padding: '14px 36px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, transform 0.15s', position: 'relative', zIndex: 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Send an Open Application
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .perks-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .perks-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
