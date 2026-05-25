'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const results = [
  {
    number: '14.1M Subscribers',
    client: 'Omar Raja — ESPN',
    desc: 'Sports media channel scaled from 4,000 to 14.1 million subscribers. Over 2.1 billion total views generated.',
    duration: '14 months collaboration',
    mediaType: 'video',
    mediaUrl: '/heroVideo.mp4',
    thumbnail: '/thumbnails/omar-raja.jpg',
    channelHandle: '@omarraja',
    category: 'Sports Media',
  },
  {
    number: '4.73M Subscribers',
    client: 'Answered That For You',
    desc: 'Faceless documentary channel built from zero to 4.73 million subscribers. 4.9 billion total views. 2,000+ videos published.',
    duration: '12 months collaboration',
    mediaType: 'image',
    mediaUrl: '/pic.png',
    thumbnail: '/thumbnails/answered-that.jpg',
    channelHandle: '@answeredthat',
    category: 'Documentary',
  },
  {
    number: '246,000 Subscribers',
    client: 'Matt Theriault — Epic Real Estate',
    desc: 'Real estate education channel grown from 2,000 to 246,000 subscribers through structured content engine and systematic publishing.',
    duration: '12 months collaboration',
    mediaType: 'video',
    mediaUrl: '/heroVideo.mp4',
    thumbnail: '/thumbnails/matt-theriault.jpg',
    channelHandle: '@matttheriault',
    category: 'Real Estate',
  },
  {
    number: '126,000 Subscribers',
    client: 'Jonathan Catliff — AI Automation',
    desc: 'Channel scaled from 100 to 126,000 subscribers. Paid Skool community grown to 362 members simultaneously.',
    duration: '7 months collaboration',
    mediaType: 'image',
    mediaUrl: '/pic.png',
    thumbnail: '/thumbnails/jonathan-catliff.jpg',
    channelHandle: '@jonathancatliff',
    category: 'AI Automation',
  },
  {
    number: '89,600 Subscribers',
    client: 'Marketing Against the Grain',
    desc: 'Marketing education channel built from zero to 89,600 subscribers with structured long-form content system.',
    duration: '9 months collaboration',
    mediaType: 'video',
    mediaUrl: '/heroVideo.mp4',
    thumbnail: '/thumbnails/marketing-grain.jpg',
    channelHandle: '@marketinggrain',
    category: 'Marketing',
  },
  {
    number: '75,700 Subscribers',
    client: 'Alec Wilcock — AI Education',
    desc: 'AI content channel grown from 5,000 to 75,700 subscribers. Strong positioning in competitive AI niche.',
    duration: '6 months collaboration',
    mediaType: 'image',
    mediaUrl: '/pic.png',
    thumbnail: '/thumbnails/alec-wilcock.jpg',
    channelHandle: '@alecwilcock',
    category: 'AI Education',
  },
]

export default function Results() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % results.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isPlaying, currentIndex])

  useEffect(() => {
    const currentSlide = sliderRef.current
    if (!currentSlide) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.slide-grid',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      )

      gsap.fromTo('.slide-media',
        { opacity: 0, scale: 1.04, x: -16 },
        { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: 'expo.out' }
      )

      gsap.fromTo('.slide-content',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'expo.out', delay: 0.15 }
      )

      gsap.fromTo(
        ['.slide-number', '.slide-client', '.slide-desc', '.slide-duration'],
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.25,
        }
      )
    })

    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }

    return () => ctx.revert()
  }, [currentIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.slider-container',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const currentResult = results[currentIndex]

  return (
<div
  id="results-section"  // Add this line
  ref={sectionRef}
  style={{
    padding: 'clamp(80px, 10vw, 140px) var(--pad)',
    borderBottom: '1px solid var(--line2)',
  }}
>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

        {/* Label */}
        <div
          className="reveal"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--t2)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--green)', display: 'inline-block' }} />
          Proven Results
        </div>

        {/* Heading */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            color: 'var(--white)',
            marginBottom: 'clamp(40px, 6vw, 60px)',
          }}
        >
          Real growth.
          <br />
          <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>
            Real results.
          </em>
        </h2>

        {/* Slider Container */}
        <div className="slider-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Prev Arrow */}

          <button
            onClick={prevSlide}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
            style={{
              flexShrink: 0,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(106,255,42,0.25)',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              color: 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Slide + dots column */}
          <div style={{ flex: 1, minWidth: 0 }}>

          {/* Main Slide */}
          <div
            ref={sliderRef}
            className="slide-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(106,255,42,0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              minHeight: '500px',
            }}
          >
            {/* Media Side — Left */}
            <div
              className="slide-media"
              style={{
                position: 'relative',
                background: 'var(--surface)',
                overflow: 'hidden',
                minHeight: '400px',
              }}
            >
              {currentResult.mediaType === 'video' ? (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={currentResult.thumbnail}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                  <source src={currentResult.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={currentResult.mediaUrl}
                  alt={currentResult.client}
                  width={100}
                  height={100}
                  
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}

              {/* Category Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(106,255,42,0.9)',
                  color: 'var(--black)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {currentResult.category}
              </div>
            </div>

            {/* Content Side — Right */}
            <div
              className="slide-content"
              style={{
                padding: 'clamp(32px, 5vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div className="slide-number">
                <div
                  style={{
                    fontFamily: 'var(--font-bricolage), sans-serif',
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--white)',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {currentResult.number}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'var(--green)',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}
                >
                  Total Subscribers
                </div>
              </div>

              <div className="slide-client">
                <div
                  style={{
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: 700,
                    color: 'var(--white)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-bricolage), sans-serif',
                  }}
                >
                  {currentResult.client}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'var(--t3)',
                    marginBottom: '24px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {currentResult.channelHandle}
                </div>
              </div>

              <div className="slide-desc">
                <div
                  style={{
                    fontSize: 'clamp(14px, 1.6vw, 16px)',
                    fontWeight: 300,
                    color: 'var(--t2)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  {currentResult.desc}
                </div>
              </div>

              <div className="slide-duration">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'var(--t4)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    background: 'rgba(106,255,42,0.05)',
                    borderRadius: '4px',
                    width: 'fit-content',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      background: 'var(--green)',
                      borderRadius: '50%',
                      display: 'inline-block',
                    }}
                  />
                  {currentResult.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation — dots only */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '28px',
              gap: '8px',
            }}
          >
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.3, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                style={{
                  width: currentIndex === index ? '32px' : '8px',
                  height: '6px',
                  background: currentIndex === index ? 'var(--green)' : 'rgba(106,255,42,0.3)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s ease',
                  padding: 0,
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '16px',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--t4)',
              letterSpacing: '0.04em',
            }}
          >
            {String(currentIndex + 1).padStart(2, '0')} / {String(results.length).padStart(2, '0')}
          </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
            style={{
              flexShrink: 0,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(106,255,42,0.25)',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              color: 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .slide-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
            border-radius: 16px !important;
          }

          .slide-media {
            min-height: 260px !important;
            max-height: 300px !important;
          }

          .slide-content {
            padding: 28px 24px !important;
          }
        }
      `}</style>
    </div>
  )
}