'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    quote: "WAGMI took our YouTube from 8K to 340K subscribers in under a year. The strategy, the edits, the thumbnails — every deliverable on time and on point.",
    name: 'Jordan Malik',
    role: 'Founder, EliteCoach',
    company: 'Fitness',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=380&fit=crop&auto=format&q=80',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&auto=format&q=80',
  },
  {
    quote: "We went from zero online presence to 200K monthly views in 90 days. The roadmap they built isn't guesswork — it's a compounding system.",
    name: 'Priya Mehta',
    role: 'CEO, LaunchPad AI',
    company: 'AI / Tech',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=380&fit=crop&auto=format&q=80',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=80',
  },
  {
    quote: "Every script sounded like me but sharper. Our audience tripled and the DMs haven't stopped. The short-form machine they built runs itself.",
    name: 'Marcus Reid',
    role: 'Real Estate Educator',
    company: 'Real Estate',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=380&fit=crop&auto=format&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80',
  },
  {
    quote: "Clips from my podcast now bring more qualified leads than paid ads ever did. My whole team is obsessed with the output quality.",
    name: 'Aisha Torres',
    role: 'Host, The Growth Pod',
    company: 'Marketing',
    img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=380&fit=crop&auto=format&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format&q=80',
  },
  {
    quote: "I had the ideas but zero bandwidth. WAGMI became my full content department. 120K subscribers later and I barely open the editing suite.",
    name: 'Liam Brooks',
    role: 'Performance Coach',
    company: 'Sports',
    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=380&fit=crop&auto=format&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format&q=80',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const setHeight = () => {
      const dist = track.scrollWidth - window.innerWidth
      section.style.height = `${window.innerHeight + Math.max(0, dist)}px`
    }

    setHeight()

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const dist = track.scrollWidth - window.innerWidth
        gsap.set(track, { x: -(self.progress * Math.max(0, dist)) })
      },
      onRefresh: setHeight,
    })

    window.addEventListener('resize', setHeight)

    return () => {
      st.kill()
      gsap.set(track, { clearProps: 'x' })
      section.style.height = ''
      window.removeEventListener('resize', setHeight)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--black)', borderTop: '1px solid var(--green)', borderBottom: '1px solid var(--green)' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '20px',
            paddingLeft: 'var(--pad)',
            paddingRight: 'var(--pad)',
            willChange: 'transform',
          }}
        >
          {/* Title card */}
          <div style={{
            flexShrink: 0,
            width: 'clamp(260px, 28vw, 380px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: '40px',
          }}>
            <div style={{
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--t4)',
              marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
              Client Stories
            </div>
            <h2 style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(44px, 6vw, 80px)',
              fontWeight: 900, letterSpacing: '-0.04em',
              lineHeight: 0.95, color: 'var(--white)',
              marginBottom: '20px',
            }}>
              REAL <div style={{ color: 'var(--green)' }}>
                RESULTS
                </div>
            </h2>
            <p style={{
              fontSize: '14px', fontWeight: 300,
              color: 'var(--t3)', lineHeight: 1.7,
              marginBottom: '28px', maxWidth: '240px',
            }}>
              Brands that showed up consistently. Channels that compounded over time.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t4)' }}>Scroll</span>
              <span style={{ display: 'inline-block', width: '36px', height: '1px', background: 'rgba(171,248,47,0.3)' }} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(171,248,47,0.5)" strokeWidth="2.5">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
          </div>

          {/* Testimonial cards */}
          {items.map((t, i) => (
            <div key={i} style={{
              flexShrink: 0,
              width: 'clamp(300px, 34vw, 460px)',
              display: 'flex', flexDirection: 'column',
              background: '#0d0d0d',
              border: '1px solid rgba(171,248,47,0.12)',
              borderRadius: '16px', overflow: 'hidden',
            }}>
              {/* Image - FIXED: added width and height props */}
              <div style={{ position: 'relative', height: 'clamp(150px, 22vh, 240px)', flexShrink: 0, overflow: 'hidden' }}>
                <Image
                  src={t.img}
                  alt={t.company}
                  width={600}
                  height={380}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.7) grayscale(15%)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #0d0d0d 100%)' }} />
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(171,248,47,0.9)', color: 'var(--black)',
                  fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', padding: '4px 9px', borderRadius: '3px',
                }}>
                  {t.company}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 'clamp(18px, 2.2vw, 28px)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{
                  fontSize: 'clamp(13px, 1.3vw, 16px)',
                  fontWeight: 300, fontStyle: 'italic',
                  lineHeight: 1.8, color: 'rgba(255,255,255,0.8)',
                  marginBottom: '20px',
                }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <Image
                    src={t.avatar} 
                    alt={t.name}
                    width={36} 
                    height={36}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(171,248,47,0.25)', flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.01em' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--t3)', marginTop: '1px' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End CTA */}
          <div style={{
            flexShrink: 0,
            width: 'clamp(200px, 22vw, 300px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingLeft: '20px',
          }}>
            <div
              style={{
                width: '148px', height: '148px', borderRadius: '50%',
                border: '1px solid rgba(171,248,47,0.25)',
                background: 'rgba(171,248,47,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(171,248,47,0.1)'
                el.style.borderColor = 'rgba(171,248,47,0.5)'
                el.style.transform = 'scale(1.06)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(171,248,47,0.04)'
                el.style.borderColor = 'rgba(171,248,47,0.25)'
                el.style.transform = 'scale(1)'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: '14px', fontWeight: 700,
                color: 'var(--green)', lineHeight: 1.45,
              }}>
                Your Story<br />Next →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}