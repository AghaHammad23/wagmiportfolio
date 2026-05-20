'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from '../components/Providers'
import Link from 'next/link'
import ServicePill from '../services/ServicePill'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const team = [
  {
    name: 'Agha Saad',
    role: 'Founder & CEO',
    bio: 'Agha built WAGMI Media from the ground up after seeing too many talented creators leave views on the table. He\'s the strategic mind behind every content engine we\'ve built — from 0 to 14M subscribers.',
    tag: 'Strategy · Vision · Growth',
    initials: 'AS',
    headshot: '/team/saadP.png',
    portrait: '/team/agha-saad.png',
    stats: [
      { label: 'Channels Scaled', value: '300+' },
      { label: 'Views Generated', value: '7B+' },
      { label: 'Years Experience', value: '8' },
    ],
    quote: 'Great content without a system is just luck. We build the system.',
  },
  {
    name: 'Aamir Iqbal',
    role: 'Head of Production',
    bio: 'Aamir leads our editing team and has personally touched over 4,000 videos across 50+ channels. He obsesses over retention graphs and hook performance in a way that is slightly alarming.',
    tag: 'Editing · Direction · Quality',
    initials: 'AI',
    headshot: '/team/aamir.png',
    portrait: '/team/aamir.png',
    stats: [
      { label: 'Videos Edited', value: '4,000+' },
      { label: 'Channels Managed', value: '50+' },
      { label: 'Avg Retention Lift', value: '38%' },
    ],
    quote: 'The first 8 seconds decide everything. We get those right first.',
  },
  {
    name: 'Zubair Ahmad',
    role: 'Lead Strategist',
    bio: 'Zubair turns data into content roadmaps. With a background in brand strategy and 5 years of YouTube channel growth, he\'s the person responsible for the 90-day plans that actually work.',
    tag: 'Strategy · Analytics · Positioning',
    initials: 'ZA',
    headshot: '/team/zubair.png',
    portrait: '/team/zubair.png',
    stats: [
      { label: 'Roadmaps Built', value: '120+' },
      { label: 'Avg Sub Growth', value: '4.2×' },
      { label: 'Niches Covered', value: '30+' },
    ],
    quote: 'Data tells you what happened. Strategy tells you what to do next.',
  },
  {
    name: 'Liam Carter',
    role: 'Head of Scripts',
    bio: 'Liam writes the scripts that stop scrolls. He\'s studied viral content across every major platform and applies those patterns to every brief — with a voice that sounds like you, but sharper.',
    tag: 'Copywriting · Hooks · Storytelling',
    initials: 'LC',
    headshot: '/team/liam-carter-headshot.png',
    portrait: '/team/liam-carter-portrait.png',
    stats: [
      { label: 'Scripts Written', value: '2,000+' },
      { label: 'Avg CTR Lift', value: '22%' },
      { label: 'Viral Hits', value: '40+' },
    ],
    quote: 'Your audience doesn\'t owe you attention. You earn it word by word.',
  },
  {
    name: 'Sofia Reyes',
    role: 'Community & Distribution',
    bio: 'Sofia manages the full distribution side — scheduling, publishing, community engagement, and platform-specific optimisation. She runs the machine that makes sure content actually gets seen.',
    tag: 'Distribution · Engagement · Growth',
    initials: 'SR',
    headshot: '/team/sofia-reyes-headshot.png',
    portrait: '/team/sofia-reyes-portrait.png',
    stats: [
      { label: 'Posts Scheduled', value: '10K+' },
      { label: 'Avg Reach Lift', value: '3.1×' },
      { label: 'Platforms Managed', value: '6' },
    ],
    quote: 'Publishing without a distribution plan is whispering in a stadium.',
  },
  {
    name: 'Marcus Adeyemi',
    role: 'Thumbnail & Visuals Lead',
    bio: 'Marcus designs the thumbnails that get the click. His work is built on CTR data, colour psychology, and an obsessive understanding of what makes someone stop mid-scroll and choose your video.',
    tag: 'Design · CTR · Visual Strategy',
    initials: 'MA',
    headshot: '/team/marcus-adeyemi-headshot.png',
    portrait: '/team/marcus-adeyemi-portrait.png',
    stats: [
      { label: 'Thumbnails Designed', value: '5,000+' },
      { label: 'Avg CTR Achieved', value: '8.4%' },
      { label: 'A/B Tests Run', value: '300+' },
    ],
    quote: 'A thumbnail is a billboard on a highway. You have 0.3 seconds.',
  },
]

const teamCategories = [
  { title: 'Teamwork', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { title: 'Excellence', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { title: 'Innovation', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2a10 10 0 0 1 10 10c0 4.5-3 8-6 10h-8c-3-2-6-5.5-6-10a10 10 0 0 1 10-10z"/><path d="M12 6v4"/><path d="M12 14h.01"/></svg> },
  { title: 'Integrity', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
  { title: 'Growth', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/><path d="M2 20h20"/><path d="M22 4l-4 4-4-4-4 4-4-4-4 4"/></svg> },
  { title: 'Impact', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
]

// Image component with fallback
function ImageWithFallback({ src, alt, initials, style }: { src: string; alt: string; initials: string; style?: React.CSSProperties }) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [src])

  if (imgError) {
    return (
      <div style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface)',
        fontFamily: 'var(--font-bricolage), sans-serif',
        fontSize: 'clamp(18px, 3vw, 28px)',
        fontWeight: 700,
        color: 'rgba(106,255,42,0.8)',
      }}>
        {initials}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      style={style}
      onError={() => setImgError(true)}
    />
  )
}

export default function TeamContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const revealRef = useRef<HTMLDivElement>(null)
  const teamCirclesRef = useRef<HTMLDivElement>(null)
  const { open } = useApply()

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

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelected(null)
      setIsClosing(false)
    }, 400)
  }

  const handleSelect = (index: number) => {
    if (selected === index) {
      handleClose()
    } else {
      setSelected(index)
    }
  }

  const scrollToTeamCircles = () => {
    if (teamCirclesRef.current) {
      teamCirclesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const selectedMember = selected !== null ? team[selected] : null

  return (
    <div style={{ 
      backgroundColor: '#0a0a0a', 
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Unified green background orb - spans the entire component (unchanged) */}
      <div style={{
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle at 50% 30%, rgba(106,255,42,0.2) 0%, rgba(106,255,42,0) 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
      }} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Hero (updated to match CareersHero style) ── */}
        <section style={{
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
        }}>
          {/* Grid background */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'linear-gradient(rgba(106,255,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(106,255,42,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            pointerEvents: 'none',
          }} />

          {/* Background image */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'url(/team/team.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.18) saturate(0.4)',
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
              The People
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
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
              The Team Behind{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>
                Every Result.
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
              A small, obsessive team that builds content engines for brands that want to grow — fast, and for the long term.
            </motion.p>

            {/* Team Category Pills */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '12px',
              justifyContent: 'center', maxWidth: '860px', margin: '0 auto',
            }}>
              {teamCategories.map((category, i) => (
                <ServicePill
                  key={i}
                  label={category.title}
                  icon={category.icon}
                  index={i}
                  onClick={scrollToTeamCircles}
                />
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{
                marginTop: 'clamp(48px, 6vw, 72px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                cursor: 'pointer',
              }}
              onClick={scrollToTeamCircles}
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

        <div ref={revealRef}>
          <div ref={teamCirclesRef} style={{
            padding: 'clamp(60px, 8vw, 100px) var(--pad)',
            borderBottom: '1px solid var(--line2)',
          }}>
            <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
              <motion.div 
                style={{
                  display: 'grid',
                  gap: '48px',
                }}
                animate={{
                  gridTemplateColumns: selectedMember && !isClosing ? '1fr 1fr' : '1fr',
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left side - Member details */}
                {(selectedMember && !isClosing) && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      border: '1px solid rgba(106,255,42,0.15)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(12px)',
                      height: '100%',
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}>
                        <div style={{
                          position: 'relative',
                          overflow: 'hidden',
                          background: 'var(--surface)',
                          minHeight: '300px',
                          maxHeight: '400px',
                        }}>
                          <ImageWithFallback
                            src={selectedMember.portrait}
                            alt={selectedMember.name}
                            initials={selectedMember.initials}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center top',
                              display: 'block',
                            }}
                          />
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            height: '100px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            pointerEvents: 'none',
                          }} />
                          <div style={{
                            position: 'absolute', top: '16px', left: '16px',
                            background: 'rgba(106,255,42,0.9)',
                            color: 'var(--black)',
                            fontSize: '9px', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '5px 10px', borderRadius: '4px',
                          }}>
                            {selectedMember.role}
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                          style={{
                            padding: 'clamp(24px, 3vw, 32px)',
                            flex: 1,
                          }}
                        >
                          <h2 style={{
                            fontFamily: 'var(--font-bricolage), sans-serif',
                            fontSize: 'clamp(24px, 3vw, 36px)',
                            fontWeight: 800, letterSpacing: '-0.025em',
                            color: 'var(--white)', lineHeight: 1.1,
                            marginBottom: '8px',
                          }}>
                            {selectedMember.name}
                          </h2>

                          <div style={{
                            fontSize: '11px', fontWeight: 500,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: 'rgba(106,255,42,0.6)', marginBottom: '20px',
                          }}>
                            {selectedMember.tag}
                          </div>

                          <blockquote style={{
                            borderLeft: '2px solid rgba(106,255,42,0.4)',
                            paddingLeft: '16px',
                            margin: '0 0 20px',
                            fontFamily: 'var(--font-jakarta), sans-serif',
                            fontSize: 'clamp(14px, 1.6vw, 16px)',
                            fontStyle: 'italic',
                            fontWeight: 300,
                            color: 'var(--t2)',
                            lineHeight: 1.6,
                          }}>
                            &ldquo;{selectedMember.quote}&rdquo;
                          </blockquote>

                          <p style={{
                            fontSize: '14px', fontWeight: 300,
                            lineHeight: 1.75, color: 'var(--t3)',
                            marginBottom: '24px',
                          }}>
                            {selectedMember.bio}
                          </p>

                          <div style={{
                            display: 'flex', gap: '1px',
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '10px', overflow: 'hidden',
                          }}>
                            {selectedMember.stats.map((stat, si) => (
                              <motion.div
                                key={si}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + si * 0.08 }}
                                style={{
                                  flex: 1, padding: '16px 12px',
                                  background: 'rgba(255,255,255,0.03)',
                                  textAlign: 'center',
                                }}
                              >
                                <div style={{
                                  fontFamily: 'var(--font-bricolage), sans-serif',
                                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                                  fontWeight: 800, color: 'var(--white)',
                                  letterSpacing: '-0.02em', lineHeight: 1,
                                  marginBottom: '4px',
                                }}>
                                  {stat.value}
                                </div>
                                <div style={{
                                  fontSize: '10px', fontWeight: 500,
                                  letterSpacing: '0.06em', textTransform: 'uppercase',
                                  color: 'var(--t4)',
                                }}>
                                  {stat.label}
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <button
                            onClick={handleClose}
                            style={{
                              width: '100%', marginTop: '20px',
                              padding: '12px',
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '8px',
                              cursor: 'pointer', color: 'var(--t4)',
                              fontSize: '11px', fontWeight: 500,
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              transition: 'all 0.2s',
                              display: 'flex', alignItems: 'center',
                              justifyContent: 'center', gap: '8px',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                              e.currentTarget.style.color = 'var(--white)'
                              e.currentTarget.style.borderColor = 'rgba(106,255,42,0.3)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                              e.currentTarget.style.color = 'var(--t4)'
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                            }}
                          >
                            <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
                            Close
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Right side - Team circles */}
                <motion.div
                  animate={{
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="team-circles" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'clamp(24px, 4vw, 48px)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {team.map((member, i) => {
                      const isSelected = selected === i
                      return (
                        <motion.div
                          key={i}
                          className="reveal"
                          onClick={() => handleSelect(i)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '14px',
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          <motion.div
                            animate={{
                              scale: isSelected ? 1.08 : 1,
                            }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              width: 'clamp(90px, 12vw, 120px)',
                              height: 'clamp(90px, 12vw, 120px)',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              background: 'transparent',
                              position: 'relative',
                              flexShrink: 0,
                              border: isSelected ? `2px solid var(--green)` : '2px solid transparent',
                            }}
                          >
                            <ImageWithFallback
                              src={member.headshot}
                              alt={member.name}
                              initials={member.initials}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center top',
                                display: 'block',
                              }}
                            />
                          </motion.div>

                          <div style={{ textAlign: 'center' }}>
                            <motion.div
                              animate={{ color: isSelected ? 'var(--green)' : 'var(--white)' }}
                              transition={{ duration: 0.25 }}
                              style={{
                                fontFamily: 'var(--font-bricolage), sans-serif',
                                fontSize: 'clamp(13px, 1.5vw, 15px)',
                                fontWeight: 700,
                                letterSpacing: '-0.01em',
                                marginBottom: '3px',
                              }}
                            >
                              {member.name}
                            </motion.div>
                            <div style={{
                              fontSize: '11px', fontWeight: 400,
                              color: 'var(--t4)', letterSpacing: '0.02em',
                            }}>
                              {member.role}
                            </div>
                          </div>

                          <motion.div
                            animate={{ opacity: isSelected ? 1 : 0, scaleX: isSelected ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              width: '24px', height: '2px',
                              background: 'var(--green)',
                              borderRadius: '1px',
                              marginTop: '-6px',
                            }}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Apply CTA - unchanged, keeps the orb glow */}
          <div style={{
            padding: 'clamp(80px, 12vw, 140px) var(--pad)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <h2 className="reveal" style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.06,
              color: 'var(--white)', maxWidth: '600px',
              margin: '0 auto 20px', position: 'relative', zIndex: 2,
            }}>
              Want this <span style={{ color: 'var(--green)' }}>team</span> working on your brand?
            </h2>
            <p className="reveal" style={{
              fontSize: '16px', fontWeight: 300, color: 'var(--t2)',
              maxWidth: '380px', margin: '0 auto 40px',
              lineHeight: 1.7, position: 'relative', zIndex: 2,
            }}>
              Apply today. Limited spots open each month.
            </p>
            
            <motion.div
              className="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Link
                href="/careers"
                style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '14px', fontWeight: 700,
                  color: 'var(--black)', background: 'var(--white)',
                  padding: '14px 36px', border: 'none', cursor: 'pointer',
                  display: 'inline-block',
                  transition: 'background 0.2s, transform 0.15s',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Work With Us →
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .team-circles {
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  )
}