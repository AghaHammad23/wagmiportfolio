'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RiTwitterXLine, RiLinkedinBoxLine, RiInstagramLine } from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const team = [
  {
    name: 'Agha Saad',
    role: 'Founder & CEO',
    bio: 'Agha built WAGMI Media from the ground up after seeing too many talented creators leave views on the table. He\'s the strategic mind behind every content engine we\'ve built — from 0 to 14M subscribers.',
    tag: 'Strategy · Vision · Growth',
    initials: 'AS',
  },
  {
    name: 'Jordan Malik',
    role: 'Head of Production',
    bio: 'Jordan leads our editing team and has personally touched over 4,000 videos across 50+ channels. He obsesses over retention graphs and hook performance in a way that is slightly alarming.',
    tag: 'Editing · Direction · Quality',
    initials: 'JM',
  },
  {
    name: 'Priya Nair',
    role: 'Lead Strategist',
    bio: 'Priya turns data into content roadmaps. With a background in brand strategy and 5 years of YouTube channel growth, she\'s the person responsible for the 90-day plans that actually work.',
    tag: 'Strategy · Analytics · Positioning',
    initials: 'PN',
  },
  {
    name: 'Liam Carter',
    role: 'Head of Scripts',
    bio: 'Liam writes the scripts that stop scrolls. He\'s studied viral content across every major platform and applies those patterns to every brief — with a voice that sounds like you, but sharper.',
    tag: 'Copywriting · Hooks · Storytelling',
    initials: 'LC',
  },
  {
    name: 'Sofia Reyes',
    role: 'Community & Distribution',
    bio: 'Sofia manages the full distribution side — scheduling, publishing, community engagement, and platform-specific optimisation. She runs the machine that makes sure content actually gets seen.',
    tag: 'Distribution · Engagement · Growth',
    initials: 'SR',
  },
  {
    name: 'Marcus Adeyemi',
    role: 'Thumbnail & Visuals Lead',
    bio: 'Marcus designs the thumbnails that get the click. His work is built on CTR data, colour psychology, and an obsessive understanding of what makes someone stop mid-scroll and choose your video.',
    tag: 'Design · CTR · Visual Strategy',
    initials: 'MA',
  },
]

const values = [
  { title: 'Results over aesthetics', desc: 'Pretty content that doesn\'t convert is a hobby. We build systems that turn views into revenue.' },
  { title: 'Ownership mentality', desc: 'We treat every channel like it\'s our own. Your growth is our reputation.' },
  { title: 'Iteration over perfection', desc: 'We ship, measure, and optimise. The best content is the one that\'s live and improving.' },
  { title: 'Long-term compounding', desc: 'We\'re not here for a viral moment. We\'re building an engine that pays off for years.' },
]

export default function TeamContent() {
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
          The People
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04, color: 'var(--white)', maxWidth: '760px', marginBottom: '24px' }}
        >
          The People Behind{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>the Engine.</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.22 }}
          style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)', maxWidth: '480px' }}
        >
          A small team with an outsized impact. Every person here has one job — to make your content engine grow faster than you thought possible.
        </motion.p>
      </section>

      <div ref={revealRef}>
        {/* Team grid */}
        <div style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--line2)' }}>
              {team.map((member, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--black)', padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 36px)',
                    display: 'flex', flexDirection: 'column', gap: '16px',
                    transition: 'background 0.25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--black)')}
                >
                  {/* Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: 'var(--surface)', border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '16px',
                      fontWeight: 700, color: 'rgba(106,255,42,0.7)', flexShrink: 0,
                    }}>
                      {member.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.01em' }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 400, color: 'var(--green)', opacity: 0.7, letterSpacing: '0.02em', marginTop: '2px' }}>
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)' }}>{member.bio}</p>

                  <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t4)', marginTop: '4px' }}>
                    {member.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ padding: 'clamp(80px, 10vw, 120px) var(--pad)', borderBottom: '1px solid var(--line2)', background: 'var(--off)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="reveal" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
              How We Think
            </div>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white)', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
              Our values.<br />
              <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>Non-negotiable.</em>
            </h2>
            <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--line2)' }}>
              {values.map((v, i) => (
                <div key={i} className="reveal" style={{ background: 'var(--off)', padding: 'clamp(28px, 3.5vw, 48px) clamp(24px, 3vw, 40px)' }}>
                  <div style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--white)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                    <span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '8px' }}>→</span>
                    {v.title}
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: 'var(--t2)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: 'clamp(80px, 12vw, 140px) var(--pad)', textAlign: 'center', borderBottom: '1px solid var(--line2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(106,255,42,0.025) 0%, transparent 60%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--white)', maxWidth: '600px', margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>
            Want this team working on your brand?
          </h2>
          <p className="reveal" style={{ fontSize: '16px', fontWeight: 300, color: 'var(--t2)', maxWidth: '380px', margin: '0 auto 40px', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            Apply today. Limited spots open each month.
          </p>
          <a href="#" className="reveal"
            style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--black)', background: 'var(--white)', padding: '14px 36px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, transform 0.15s', position: 'relative', zIndex: 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Apply to Work With Us
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .team-grid, .values-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
