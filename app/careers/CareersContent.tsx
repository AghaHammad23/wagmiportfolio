'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from '../components/Providers'
import MagicBento from '../components/MagicBento'
import type { CareerCardData } from '../components/MagicBento'
import JobApplyModal from '../components/JobApplyModal'
import PerksStack from './PerksStack'
import ServicePill from './../services/ServicePill'
import ApplyButton from '../components/ApplyButton'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const careerCategories = [
  { title: 'Video Editing', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg> },
  { title: 'Content Strategy', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9"/></svg> },
  { title: 'Script Writing', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg> },
  { title: 'Distribution', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.03.03A10 10 0 0 0 12 17.66a10 10 0 0 0 6.37-2.63z"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="M3 12h2"/><path d="M19 12h2"/></svg> },
  { title: 'Thumbnail Design', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> },
  { title: 'Analytics', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9"/></svg> },
]

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
  { icon: '🌍', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=144&h=144&fit=crop&auto=format&q=80', title: '100% Remote', desc: 'Work from anywhere in the world. We judge you by your output, not your timezone or office presence.' },
  { icon: '🕐', img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=144&h=144&fit=crop&auto=format&q=80', title: 'Flexible Hours', desc: 'Build your schedule around your life. We set deadlines, not clocks — work when you do your best thinking.' },
  { icon: '🎂', img: 'https://images.unsplash.com/photo-1558636508-e0969a0b0c96?w=144&h=144&fit=crop&auto=format&q=80', title: 'Birthday Off', desc: 'Your birthday is a fully paid day off, every year. No forms, no approvals — just enjoy your day.' },
  { icon: '📚', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=144&h=144&fit=crop&auto=format&q=80', title: 'Learners Are Earners', desc: 'Books, courses, tools — if it makes you sharper, we cover it. Growth is a team investment here.' },
  { icon: '💰', img: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=144&h=144&fit=crop&auto=format&q=80', title: 'Annual Bonus', desc: 'Hit targets, share the upside. The people who drive results should benefit directly from them.' },
  { icon: '📈', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=144&h=144&fit=crop&auto=format&q=80', title: 'Real Ownership', desc: 'See your work go from idea to millions of views. The feedback loop is immediate and genuinely yours.' },
  { icon: '🎉', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=144&h=144&fit=crop&auto=format&q=80', title: 'Social & Family Events', desc: 'Quarterly team events, family-inclusive gatherings, and proper celebrations for every milestone we hit together.' },
  { icon: '🥳', img: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=144&h=144&fit=crop&auto=format&q=80', title: 'Ice Breaking Party', desc: 'Every new hire gets a proper welcome. We make sure you know the faces behind the screens from day one.' },
]

export default function CareersContent() {
  const revealRef = useRef<HTMLDivElement>(null)
  const openRolesRef = useRef<HTMLDivElement>(null)
  const { open } = useApply()
  const [selectedJob, setSelectedJob] = useState<CareerCardData | null>(null)

  useEffect(() => {
    const reveals = revealRef.current?.querySelectorAll('.reveal')
    if (!reveals) return
    reveals.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  }, [])

  const scrollToOpenRoles = () => {
    if (openRolesRef.current) {
      openRolesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main>

      {/* ── Hero (ServicesHero style with pills) ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(80px, 10vw, 120px) var(--pad) clamp(60px, 8vw, 100px)',
        background: 'var(--hero-bg)',
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(227,194,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227,194,74,0.05) 1px, transparent 1px)',
          backgroundSize: '94px 94px',
          pointerEvents: 'none',
        }} />
        
        {/* Glow */}
        <div style={{
          position: 'absolute', zIndex: 0,
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(227,194,74,0.05) 0%, transparent 65%)',
          top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            style={{
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--t2)',
              marginBottom: '20px', display: 'flex', alignItems: 'center',
              gap: '12px', justifyContent: 'center',
            }}
          >
            <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
            We&apos;re Hiring
            <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04,
              color: 'var(--white)', maxWidth: '900px',
              margin: '0 auto 20px',
            }}
          >
            Join the team that builds{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>
              what others can&apos;t.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.22 }}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300,
              lineHeight: 1.7, color: 'var(--t2)', maxWidth: '560px',
              margin: '0 auto clamp(48px, 7vw, 80px)',
            }}
          >
            We&apos;re looking for obsessed people who want to work on channels that actually matter — and see the results of their work in real time.
          </motion.p>

          {/* Career Category Pills */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '12px',
            justifyContent: 'center', maxWidth: '860px', margin: '0 auto',
          }}>
            {careerCategories.map((category, i) => (
              <ServicePill
                key={i}
                label={category.title}
                icon={category.icon}
                index={i}
                onClick={scrollToOpenRoles}
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
              cursor: 'pointer',
            }}
            onClick={scrollToOpenRoles}
          >
            <span style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t4)' }}>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ color: 'rgba(227,194,74,0.5)', fontSize: '18px' }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div ref={revealRef}>

        {/* ── Open Roles ───────────────────────────────────── */}
        <section ref={openRolesRef} id="open-roles" style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', background: 'var(--section-bg)', borderBottom: '1px solid var(--line2)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t2)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
              Open Positions
            </div>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white)', marginBottom: 'clamp(36px, 5vw, 52px)' }}>
              {openings.length} roles open now.
            </h2>

            <div className="reveal">
              <MagicBento
                cards={openings}
                onApply={setSelectedJob}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={true}
                particleCount={8}
                spotlightRadius={280}
                glowColor="227,194,74"
              />
            </div>
          </div>
        </section>

      </div>

      {/* ── Why Join Us — pinned card stack ──────────────── */}
      <PerksStack perks={perks} />

      <div>

        {/* ── Open Application ─────────────────────────────── */}
        <section style={{
          padding: 'clamp(80px, 12vw, 140px) var(--pad)',
          background: 'var(--hero-bg)',
          borderBottom: '1px solid var(--line2)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* BG glow */}
          <div style={{
            position: 'absolute', width: '800px', height: '800px',
            background: 'radial-gradient(circle, rgba(227,194,74,0.03) 0%, transparent 60%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="open-app-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

              {/* Left — copy */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t2)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
                  Open Application
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 800,
                  letterSpacing: '-0.03em', lineHeight: 1.06,
                  color: 'var(--white)', marginBottom: '20px',
                }}>
                  Don&apos;t see your role listed?
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 300,
                  color: 'var(--t2)', lineHeight: 1.75, maxWidth: '420px',
                }}>
                  We always want to hear from talented people. Send us your work and tell us what you bring to the table — if you&apos;re exceptional we&apos;ll make room.
                </p>
              </div>

              {/* Right — CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ borderLeft: '2px solid rgba(227,194,74,0.3)', paddingLeft: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '8px' }}>
                    What to include
                  </div>
                  {['Your best work — links, portfolio, showreel', 'What role you\'re going for or creating', 'Why WAGMI specifically, not just any agency'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '6px', fontSize: '13px', fontWeight: 300, color: 'var(--t2)', lineHeight: 1.6 }}>
                      <span style={{ color: 'rgba(227,194,74,0.5)', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>

                 <ApplyButton text="Send us your work" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <a
                    href="mailto:aghasaad@wagmihq.com"
                    style={{ fontSize: '12px', fontWeight: 300, color: 'var(--t3)', textDecoration: 'none', letterSpacing: '0.02em' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--t2)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)' }}
                  >
                    or email aghasaad@wagmihq.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .open-app-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <JobApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  )
}