'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useApply } from '../components/Providers'

// ─── CLIENT DATA ────────────────────────────────────────────────────────────
// Replace video/poster paths with your actual files in /public/
// Replace link with the client's YouTube channel or website
const clients = [
  {
    video: '/heroVideo.mp4',
    poster: '/logo.png',
    client: 'Omar Raja',
    subtitle: 'ESPN',
    link: 'https://youtube.com/@OmarRajaESPN',
    category: 'Sports Media',
    statsLeft: [
      { label: 'Started At', value: '4,000' },
      { label: 'Timeline', value: '14 months' },
    ],
    statsRight: [
      { label: 'Subscribers', value: '14.1M' },
      { label: 'Total Views', value: '2.1B' },
    ],
  },
  {
 video: '/heroVideo.mp4',
    poster: '/name.png',
    client: 'Answered That',
    subtitle: 'For You',
    link: 'https://youtube.com/@AnsweredThatForYou',
    category: 'Documentary / Faceless',
    statsLeft: [
      { label: 'Started At', value: '0' },
      { label: 'Timeline', value: '12 months' },
    ],
    statsRight: [
      { label: 'Subscribers', value: '4.73M' },
      { label: 'Total Views', value: '4.9B' },
    ],
  },
  {
 video: '/heroVideo.mp4',
    poster: '/logo.png',
    client: 'Matt Theriault',
    subtitle: 'Epic Real Estate',
    link: 'https://youtube.com/@EpicRealEstatePodcast',
    category: 'Real Estate Education',
    statsLeft: [
      { label: 'Started At', value: '2,000' },
      { label: 'Timeline', value: '12 months' },
    ],
    statsRight: [
      { label: 'Subscribers', value: '246K' },
      { label: 'Total Views', value: '18M' },
    ],
  },
  {
 video: '/heroVideo.mp4',
    poster: '/name.png',
    client: 'Jonathan Catliff',
    subtitle: 'AI Automation',
    link: 'https://youtube.com/@JonathanCatliff',
    category: 'AI & Tech',
    statsLeft: [
      { label: 'Started At', value: '100' },
      { label: 'Timeline', value: '7 months' },
    ],
    statsRight: [
      { label: 'Subscribers', value: '126K' },
      { label: 'Total Views', value: '9.4M' },
    ],
  },
  {
 video: '/heroVideo.mp4',
    poster: '/logo.png',
    client: 'Marketing Against',
    subtitle: 'the Grain',
    link: 'https://youtube.com/@MarketingAgainstTheGrain',
    category: 'Marketing Education',
    statsLeft: [
      { label: 'Started At', value: '0' },
      { label: 'Timeline', value: '9 months' },
    ],
    statsRight: [
      { label: 'Subscribers', value: '89.6K' },
      { label: 'Total Views', value: '6.2M' },
    ],
  },
  {
    video: '/heroVideo.mp4',
    poster: '/name.png',
    client: 'Alec Wilcock',
    subtitle: 'AI Education',
    link: 'https://youtube.com/@AlecWilcock',
    category: 'AI Education',
    statsLeft: [
      { label: 'Started At', value: '5,000' },
      { label: 'Timeline', value: '6 months' },
    ],
    statsRight: [
      { label: 'Subscribers', value: '75.7K' },
      { label: 'Total Views', value: '4.1M' },
    ],
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const TRANSITION_LOCK_MS = 700

export default function WorkContent() {
  const { open } = useApply()

  const [activeSlide, setActiveSlide] = useState(0)
  const [videosDone, setVideosDone] = useState(false)
  const [overlayMounted, setOverlayMounted] = useState(true)
  const [videoReady, setVideoReady] = useState<boolean[]>(() =>
    Array(clients.length).fill(false)
  )

  // Refs for imperative state inside event listeners
  const activeSlideRef = useRef(0)
  const isTransitioningRef = useRef(false)
  const videosDoneRef = useRef(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const lenis = useLenis() as {
    stop: () => void
    start: () => void
    scrollTo: (target: number, options?: { immediate?: boolean }) => void
  } | undefined

  // ─── LENIS CONTROL ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!lenis) return
    if (!videosDone) {
      lenis.stop()
      // Restart Lenis when navigating away so other pages can scroll
      return () => lenis.start()
    } else {
      // Flush any virtual scroll Lenis accumulated while stopped
      window.scrollTo(0, 0)
      const t = setTimeout(() => {
        lenis.start()
        lenis.scrollTo(0, { immediate: true })
      }, 920)
      return () => clearTimeout(t)
    }
  }, [lenis, videosDone])

  // ─── VIDEO PLAYBACK ───────────────────────────────────────────────────────
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === activeSlide) {
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [activeSlide])

  // Ref so re-entry can cancel the pending unmount
  const overlayUnmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ─── UNMOUNT OVERLAY AFTER EXIT ANIMATION ─────────────────────────────────
  useEffect(() => {
    if (!videosDone) return
    overlayUnmountTimerRef.current = setTimeout(() => setOverlayMounted(false), 1000)
    return () => {
      if (overlayUnmountTimerRef.current) clearTimeout(overlayUnmountTimerRef.current)
    }
  }, [videosDone])

  // ─── SLIDE NAVIGATION ─────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (videosDoneRef.current || isTransitioningRef.current) return
    if (activeSlideRef.current < clients.length - 1) {
      isTransitioningRef.current = true
      activeSlideRef.current += 1
      setActiveSlide(activeSlideRef.current)
      setTimeout(() => { isTransitioningRef.current = false }, TRANSITION_LOCK_MS)
    } else {
      videosDoneRef.current = true
      window.scrollTo(0, 0) // clear any accumulated native scroll before overlay exits
      setVideosDone(true)
    }
  }, [])

  const goPrev = useCallback(() => {
    if (videosDoneRef.current || isTransitioningRef.current) return
    if (activeSlideRef.current > 0) {
      isTransitioningRef.current = true
      activeSlideRef.current -= 1
      setActiveSlide(activeSlideRef.current)
      setTimeout(() => { isTransitioningRef.current = false }, TRANSITION_LOCK_MS)
    }
  }, [])

  // ─── WHEEL ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (videosDoneRef.current) return
      e.preventDefault()
      if (e.deltaY > 0) goNext()
      else if (e.deltaY < 0) goPrev()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goNext, goPrev])

  // ─── TOUCH ────────────────────────────────────────────────────────────────
  const touchStartY = useRef(0)
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      if (videosDoneRef.current) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) < 50) return
      if (diff > 0) goNext()
      else goPrev()
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [goNext, goPrev])

  // ─── KEYBOARD ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (videosDoneRef.current) return
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); goNext() }
      else if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // ─── RE-ENTRY: scroll up at top of CTA goes back to last video slide ──────
  const reenterCarousel = useCallback(() => {
    if (overlayUnmountTimerRef.current) {
      clearTimeout(overlayUnmountTimerRef.current)
      overlayUnmountTimerRef.current = null
    }
    videosDoneRef.current = false
    activeSlideRef.current = clients.length - 1
    isTransitioningRef.current = false
    setVideosDone(false)
    setActiveSlide(clients.length - 1)
    setOverlayMounted(true)
    lenis?.stop()
  }, [lenis])

  useEffect(() => {
    if (!videosDone) return
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY > 10 || e.deltaY >= 0) return
      e.preventDefault()
      reenterCarousel()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [videosDone, reenterCarousel])

  useEffect(() => {
    if (!videosDone) return
    let startY = 0
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      if (window.scrollY > 10) return
      // diff < 0 means finger moved down → user is scrolling up
      if (startY - e.changedTouches[0].clientY >= -50) return
      reenterCarousel()
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [videosDone, reenterCarousel])

  useEffect(() => {
    if (!videosDone) return
    const onKey = (e: KeyboardEvent) => {
      if (window.scrollY > 10) return
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); reenterCarousel() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [videosDone, reenterCarousel])

  // ─── MARK VIDEO READY ─────────────────────────────────────────────────────
  const markReady = useCallback((index: number) => {
    setVideoReady(prev => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }, [])

  const current = clients[activeSlide]

  return (
    <main style={{ background: 'var(--hero-bg)' }}>
      {/* ── FULL-SCREEN VIDEO OVERLAY ──────────────────────────────────────── */}
      {overlayMounted && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: videosDone ? '-100%' : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          onAnimationComplete={() => { if (videosDone) setOverlayMounted(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'var(--hero-bg)',
            overflow: 'hidden',
          }}
        >
          {/* ── VIDEOS ────────────────────────────────────────────────────── */}
          {clients.map((client, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === activeSlide ? 1 : 0,
                transition: 'opacity 0.65s ease',
                pointerEvents: 'none',
              }}
            >
              {/* Poster: visible until video is ready */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${client.poster})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: videoReady[i] ? 0 : 1,
                  transition: 'opacity 1s ease',
                  zIndex: 1,
                }}
              />
              <video
                ref={el => { videoRefs.current[i] = el }}
                src={client.video}
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onCanPlay={() => markReady(i)}
              />
              {/* Cinematic gradients */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.72) 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 32%, transparent 68%, rgba(0,0,0,0.6) 100%)',
              }} />
            </div>
          ))}

          {/* ── SLIDE CONTENT ─────────────────────────────────────────────── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>

            {/* Slide counter */}
            <div className="slide-counter" style={{
              position: 'absolute',
              top: '28px',
              right: 'clamp(24px, 6vw, 100px)',
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.28)',
              userSelect: 'none',
            }}>
              {String(activeSlide + 1).padStart(2, '0')} / {String(clients.length).padStart(2, '0')}
            </div>

            {/* Center layout: stats-left | name | stats-right */}
            <div className="slide-content-area" style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -32 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="slide-layout"
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: 'clamp(20px, 4vw, 80px)',
                    padding: '0 clamp(24px, 6vw, 100px)',
                  }}
                >
                  {/* Left stats */}
                  <div className="slide-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {current.statsLeft.map((stat, j) => (
                      <div key={j}>
                        <div style={{
                          fontSize: '9px',
                          fontWeight: 500,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.35)',
                          marginBottom: '7px',
                        }}>
                          {stat.label}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-bricolage), sans-serif',
                          fontSize: 'clamp(22px, 3vw, 44px)',
                          fontWeight: 800,
                          color: '#fff',
                          letterSpacing: '-0.03em',
                          lineHeight: 1,
                        }}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Client name — center */}
                  <div className="slide-center" style={{ textAlign: 'center', minWidth: 0 }}>
                    <div style={{
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--green)',
                      marginBottom: '20px',
                      userSelect: 'none',
                    }}>
                      {current.category}
                    </div>
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-bricolage), sans-serif',
                        fontSize: 'clamp(36px, 6.5vw, 100px)',
                        fontWeight: 800,
                        letterSpacing: '-0.045em',
                        lineHeight: 0.9,
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--green)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                    >
                      {current.client}
                    </a>
                    <div style={{
                      fontFamily: 'var(--font-bricolage), sans-serif',
                      fontSize: 'clamp(18px, 2.8vw, 44px)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      color: 'rgba(255,255,255,0.32)',
                      lineHeight: 1.1,
                      marginTop: '6px',
                    }}>
                      {current.subtitle}
                    </div>
                  </div>

                  {/* Right stats */}
                  <div className="slide-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'flex-end', textAlign: 'right' }}>
                    {current.statsRight.map((stat, j) => (
                      <div key={j}>
                        <div style={{
                          fontSize: '9px',
                          fontWeight: 500,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.35)',
                          marginBottom: '7px',
                        }}>
                          {stat.label}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-bricolage), sans-serif',
                          fontSize: 'clamp(22px, 3vw, 44px)',
                          fontWeight: 800,
                          color: '#fff',
                          letterSpacing: '-0.03em',
                          lineHeight: 1,
                        }}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom — progress dots + hint */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              userSelect: 'none',
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {clients.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '4px',
                      borderRadius: '2px',
                      width: i === activeSlide ? '28px' : '6px',
                      background: i === activeSlide ? 'var(--green)' : 'rgba(255,255,255,0.2)',
                      transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                ))}
              </div>
              <div style={{
                fontSize: '9px',
                fontWeight: 400,
                paddingBottom: '8px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)',
              }}>
                {activeSlide < clients.length - 1 ? '' : ''}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── CTA (revealed after all videos) ────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(80px, 12vw, 160px) var(--pad)',
          paddingTop: '80px',
          background: 'var(--hero-bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(227,194,74,0.03) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--t2)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
            Client Results
          </div>

          <h2 style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(34px, 5.5vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: 'var(--white)',
            maxWidth: '680px',
            margin: '0 auto 24px',
          }}>
            Ready to be the next{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>success story?</em>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontWeight: 300,
            color: 'var(--t2)',
            maxWidth: '420px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Limited spots available. Apply and we&apos;ll get back to you within 48 hours.
          </p>

          <button
            onClick={open}
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--black)',
              background: 'var(--white)',
              padding: '16px 40px',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--green)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--white)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Apply to Work With Us
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          /* Push counter below the mobile top nav (52px) */
          .slide-counter {
            top: 60px !important;
            right: 20px !important;
          }

          /* Add top clearance so content isn't hidden under mobile nav */
          .slide-content-area {
            padding-top: 52px !important;
            padding-bottom: 80px !important;
          }

          /* Collapse 3-column grid → flex column, name first */
          .slide-layout {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 24px !important;
            padding: 0 20px !important;
          }

          .slide-center { order: 1; width: 100%; }

          /* Left stats: vertical → horizontal row, centered */
          .slide-col-left {
            order: 2;
            flex-direction: row !important;
            gap: 28px !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100% !important;
          }

          /* Right stats: vertical → horizontal row, centered */
          .slide-col-right {
            order: 3;
            flex-direction: row !important;
            gap: 28px !important;
            align-items: flex-start !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </main>
  )
}
