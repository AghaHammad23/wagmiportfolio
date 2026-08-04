'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { HiPlay, HiPause, HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  }
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(true)
  // Autoplay only works muted — the sound control turns audio on.
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section
      style={{
        background: 'var(--hero-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        /* Top pad clears the fixed header (72px desktop / 52px mobile bar);
           section fills exactly one viewport. */
        padding: '80px clamp(16px, 3vw, 48px) clamp(16px, 2.2vh, 28px)',
        height: '100dvh',
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          /* Wide enough for the video; the text blocks cap themselves below. */
          maxWidth: '1500px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >

        {/* Kicker */}
        <motion.h2
          {...rise(0.1)}
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(20px, 3.2vw, 36px)',
            lineHeight: 1,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            color: 'var(--hero-cream)',
          }}
        >
          Your offer is fine.
        </motion.h2>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(40px, 8.5vw, 104px)',
            lineHeight: 0.94,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            color: 'var(--hero-gold)',
            marginTop: 'clamp(6px, 1vw, 12px)',
            maxWidth: '1000px',
            marginInline: 'auto',
          }}
        >
          {[
            { text: 'Your content is', delay: 0.2 },
            { text: 'the bottleneck.', delay: 0.32 },
          ].map(({ text, delay }) => (
            <motion.span key={text} {...rise(delay)} style={{ display: 'block' }}>
              {text}
            </motion.span>
          ))}
        </h1>

        {/* Video */}
        <motion.div
          {...rise(0.46)}
          style={{
            /* Shrinks to whatever height is left so the section never exceeds 100dvh. */
            flex: '1 1 auto',
            minHeight: 0,
            width: 'auto',
            maxWidth: 'min(1500px, 100%)',
            alignSelf: 'center',
            margin: 'clamp(14px, 2.2vh, 28px) auto 0',
            aspectRatio: '16 / 9',
            background: 'var(--hero-panel)',
            border: '2px solid var(--hero-edge)',
            borderRadius: 'clamp(16px, 2vw, 28px)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/heroVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom controls */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(12px, 1.6vw, 18px)',
              bottom: 'clamp(12px, 1.6vw, 18px)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 2,
            }}
          >
            <ControlButton
              label={playing ? 'Pause video' : 'Play video'}
              onClick={togglePlay}
            >
              {playing
                ? <HiPause size={18} style={{ color: 'var(--hero-bg)' }} />
                : <HiPlay  size={18} style={{ color: 'var(--hero-bg)' }} />}
            </ControlButton>

            <ControlButton
              label={muted ? 'Unmute video' : 'Mute video'}
              onClick={toggleMute}
            >
              {muted
                ? <HiSpeakerXMark size={18} style={{ color: 'var(--hero-bg)' }} />
                : <HiSpeakerWave  size={18} style={{ color: 'var(--hero-bg)' }} />}
            </ControlButton>
          </div>
        </motion.div>

        {/* Subtitle — sits under the video */}
        <motion.p
          {...rise(0.6)}
          style={{
            flexShrink: 0,
            fontSize: 'clamp(14px, 1.7vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.65,
            color: 'var(--hero-cream)',
            maxWidth: '680px',
            margin: 'clamp(12px, 2vh, 24px) auto 0',
          }}
        >
          Stop gambling on &ldquo;going viral.&rdquo; <br/>Build a content engine that predictably converts
          strangers into high-ticket clients with just 60 minutes of your time per week.
        </motion.p>
      </div>
    </section>
  )
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--hero-cream)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.08)'
        e.currentTarget.style.background = 'var(--hero-gold)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.background = 'var(--hero-cream)'
      }}
    >
      {children}
    </button>
  )
}
