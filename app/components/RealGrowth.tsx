'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { HiPlay, HiPause, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

type Slide = {
  id: string
  video: string
  quote: string
  name: string
  role: string
  avatar: string
}

const slides: Slide[] = [
  {
    id: 'marcus-reed',
    video: '/heroVideo.mp4',
    quote:
      'We went from posting ghost town content to $50k in new inbound revenue in 45 days. The 60-minute system is the only reason I’m still doing content.',
    name: 'Marcus Reed',
    role: 'CEO, Reed Consulting',
    avatar: '/pic.png',
  },
  {
    id: 'sarah-chen',
    video: '/heroVideo.mp4',
    quote:
      'Wagmi completely transformed how we manage our roadmap. Three qualified calls a week now come straight from the content, without me touching an edit.',
    name: 'Sarah Chen',
    role: 'Founder & CEO, InnovateTech',
    avatar: '/pic.png',
  },
  {
    id: 'dana-alvarez',
    video: '/heroVideo.mp4',
    quote:
      'One hour of recording a week replaced an entire in-house team. Our pipeline doubled in a quarter and the cost went down.',
    name: 'Dana Alvarez',
    role: 'Managing Partner, North Peak',
    avatar: '/pic.png',
  },
]

/* Light dot grain for the cream testimonial card. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='2' cy='2' r='0.8' fill='%230C3B2E' fill-opacity='0.13'/%3E%3C/svg%3E\")"

export default function RealGrowth() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const goTo = useCallback((next: number) => {
    // Stop whatever is playing before moving — only one video runs at a time.
    videoRefs.current.forEach((video) => {
      if (!video) return
      video.pause()
      video.currentTime = 0
    })
    setPlaying(false)
    setIndex((next + slides.length) % slides.length)
  }, [])

  const togglePlay = () => {
    const video = videoRefs.current[index]
    if (!video) return
    if (video.paused) void video.play()
    else video.pause()
  }

  // Arrow keys move the pair.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, goTo])

  return (
    <section
      style={{
        background: 'var(--hero-bg)',
        padding: 'clamp(56px, 8vw, 110px) var(--pad) clamp(72px, 10vw, 140px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

        <h2
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(34px, 6.5vw, 82px)',
            lineHeight: 1.02,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            color: 'var(--hero-cream)',
            marginBottom: 'clamp(40px, 6vw, 80px)',
          }}
        >
          Real growth. Real numbers.
        </h2>

        {/* Viewport — both columns live on one track so they slide together */}
        <div className="rg-viewport" style={{ overflow: 'hidden' }}>
          <div
            className="rg-track"
            style={{
              display: 'flex',
              transform: `translateX(-${index * 100}%)`,
              transition: 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className="rg-slide"
                aria-hidden={i !== index}
                style={{
                  flex: '0 0 100%',
                  minWidth: 0,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)',
                  gap: 'clamp(24px, 4vw, 56px)',
                  alignItems: 'center',
                  opacity: i === index ? 1 : 0.25,
                  transition: 'opacity 0.55s ease',
                }}
              >
                {/* Phone */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 17.5',
                    background: '#0B0F0D',
                    border: '1px solid rgba(123,214,165,0.55)',
                    borderRadius: 'clamp(28px, 3vw, 40px)',
                    padding: 'clamp(10px, 1.2vw, 16px)',
                    boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: 'clamp(20px, 2.2vw, 30px)',
                      overflow: 'hidden',
                      background: '#000',
                    }}
                  >
                    <video
                      ref={(el) => { videoRefs.current[i] = el }}
                      src={slide.video}
                      playsInline
                      preload="metadata"
                      onPlay={() => i === index && setPlaying(true)}
                      onPause={() => i === index && setPlaying(false)}
                      onEnded={() => i === index && setPlaying(false)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />

                    {/* Play / pause */}
                    <button
                      onClick={togglePlay}
                      aria-label={playing && i === index ? 'Pause video' : 'Play video'}
                      className="rg-play"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: playing && i === index ? 'transparent' : 'rgba(0,23,16,0.35)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease',
                      }}
                    >
                      <span
                        style={{
                          width: '58px',
                          height: '58px',
                          borderRadius: '50%',
                          background: 'var(--card-cream)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: playing && i === index ? 0 : 1,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                      >
                        {playing && i === index
                          ? <HiPause size={22} style={{ color: 'var(--green2)' }} />
                          : <HiPlay size={22} style={{ color: 'var(--green2)', marginLeft: '2px' }} />}
                      </span>
                    </button>

                    {/* Caption */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '28px 14px 14px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                        pointerEvents: 'none',
                      }}
                    >
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hero-cream)' }}>
                        {slide.name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(244,241,214,0.6)', marginTop: '2px' }}>
                        {slide.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div
                  style={{
                    backgroundColor: 'var(--card-cream)',
                    backgroundImage: GRAIN,
                    backgroundSize: '10px 10px',
                    border: '1px solid rgba(123,214,165,0.75)',
                    borderRadius: '20px',
                    // Tighter than the mockup so the quote fills the card.
                    padding: 'clamp(22px, 2.6vw, 32px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      fontFamily: 'var(--font-anton), sans-serif',
                      fontSize: 'clamp(38px, 4.5vw, 56px)',
                      lineHeight: 0.7,
                      color: 'rgba(12,59,46,0.25)',
                      marginBottom: 'clamp(14px, 1.8vw, 20px)',
                    }}
                  >
                    &rdquo;
                  </div>

                  <p
                    style={{
                      fontSize: 'clamp(15px, 1.5vw, 19px)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: 1.55,
                      color: 'rgba(12,59,46,0.85)',
                    }}
                  >
                    &ldquo;{slide.quote}&rdquo;
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      marginTop: 'clamp(20px, 2.4vw, 28px)',
                    }}
                  >
                    <span
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid #1E7B61',
                        flexShrink: 0,
                        background: 'var(--green2)',
                        backgroundImage: `url(${slide.avatar})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-anton), sans-serif',
                          fontSize: 'clamp(13px, 1.3vw, 16px)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: 'var(--hero-bg)',
                        }}
                      >
                        {slide.name}
                      </div>
                      <div
                        style={{
                          fontSize: 'clamp(12px, 1.2vw, 15px)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#1E7B61',
                          marginTop: '3px',
                        }}
                      >
                        {slide.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginTop: 'clamp(24px, 3vw, 40px)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === index ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  border: 'none',
                  background: i === index ? 'var(--hero-gold)' : 'rgba(244,241,214,0.25)',
                  cursor: 'pointer',
                  transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease',
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => goTo(index - 1)} aria-label="Previous" className="rg-arrow">
              <HiChevronLeft size={18} />
            </button>
            <button onClick={() => goTo(index + 1)} aria-label="Next" className="rg-arrow">
              <HiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .rg-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(123,214,165,0.4);
          background: transparent;
          color: var(--hero-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .rg-arrow:hover {
          background: var(--hero-gold);
          border-color: var(--hero-gold);
          color: var(--hero-bg);
          transform: translateY(-2px);
        }

        @media (max-width: 820px) {
          .rg-slide {
            grid-template-columns: 1fr !important;
            justify-items: center;
          }
          .rg-slide > *:first-child { max-width: 260px; }
        }
      `}</style>
    </section>
  )
}
