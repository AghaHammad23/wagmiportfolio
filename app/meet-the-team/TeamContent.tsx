'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApply } from '../components/Providers'

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

// Image component with fallback - FIXED: resets error state when src changes
function ImageWithFallback({ src, alt, initials, style }: { src: string; alt: string; initials: string; style?: React.CSSProperties }) {
  const [imgError, setImgError] = useState(false)

  // Reset error state when src changes (important for switching between members)
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
    <img
      src={src}
      alt={alt}
      style={style}
      onError={() => setImgError(true)}
    />
  )
}

export default function TeamContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const revealRef = useRef<HTMLDivElement>(null)
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

  const selectedMember = selected !== null ? team[selected] : null

  return (
    <main>
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px var(--pad) 80px',
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/team/team.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.18) saturate(0.4)',
        }} />

        <div style={{
          position: 'absolute', zIndex: 1,
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(106,255,42,0.06) 0%, transparent 65%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
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
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04,
              color: 'var(--white)', maxWidth: '800px', marginBottom: '24px',
            }}
          >
            The Team Behind<br />
            <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>Every Result.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.22 }}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300,
              lineHeight: 1.7, color: 'var(--t2)', maxWidth: '460px',
              margin: '0 auto 40px',
            }}
          >
            A small, obsessive team that builds content engines for brands that want to grow — fast, and for the long term.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.34 }}
            style={{
              display: 'flex', gap: '24px', flexWrap: 'wrap',
              justifyContent: 'center', fontSize: '12px',
              fontWeight: 400, color: 'var(--t4)', letterSpacing: '0.04em',
            }}
          >
            {['6 specialists', '300+ brands served', '7B+ views generated'].map(item => (
              <span key={item}>
                <span style={{ color: 'rgba(106,255,42,0.6)', marginRight: '6px' }}>✓</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div ref={revealRef}>
        <div style={{
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
                            border: isSelected ? '2px solid var(--green)' : '2px solid transparent',
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

        {/* Apply CTA */}
        <div style={{
          padding: 'clamp(80px, 12vw, 140px) var(--pad)',
          textAlign: 'center',
          borderBottom: '1px solid var(--line2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(106,255,42,0.025) 0%, transparent 60%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.06,
            color: 'var(--white)', maxWidth: '600px',
            margin: '0 auto 20px', position: 'relative', zIndex: 1,
          }}>
            Want this team working on your brand?
          </h2>
          <p className="reveal" style={{
            fontSize: '16px', fontWeight: 300, color: 'var(--t2)',
            maxWidth: '380px', margin: '0 auto 40px',
            lineHeight: 1.7, position: 'relative', zIndex: 1,
          }}>
            Apply today. Limited spots open each month.
          </p>
          <button
            onClick={open}
            className="reveal"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '14px', fontWeight: 700,
              color: 'var(--black)', background: 'var(--white)',
              padding: '14px 36px', border: 'none', cursor: 'pointer',
              display: 'inline-block',
              transition: 'background 0.2s, transform 0.15s',
              position: 'relative', zIndex: 1,
              borderRadius: '4px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            ∞Apply∞
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .team-circles {
            gap: 32px !important;
          }
        }
      `}</style>
    </main>
  )
}