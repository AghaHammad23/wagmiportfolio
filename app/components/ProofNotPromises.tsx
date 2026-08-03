'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { HiPlay, HiPause, HiSpeakerWave, HiSpeakerXMark, HiXMark } from 'react-icons/hi2'

type Reel = {
  id: string
  title: string
  caption: string
  src: string
}

const reels: Reel[] = [
  {
    id: 'ad-creatives',
    title: 'Ad Creatives',
    caption: 'Story-driven & data-backed',
    src: '/heroVideo.mp4',
  },
  {
    id: 'short-long-form',
    title: 'Short and Long Form',
    caption: 'Omnipresence on all platforms',
    src: '/heroVideo.mp4',
  },
  {
    id: 'the-vsl',
    title: 'The VSL',
    caption: 'The asset that closes deals',
    src: '/heroVideo.mp4',
  },
]

export default function ProofNotPromises() {
  // The one reel that owns playback; null means nothing is playing.
  const [activeId, setActiveId] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  // True once the active reel's card has scrolled out of view.
  const [floating, setFloating] = useState(false)
  // Set when the user dismisses the mini player, so it stays gone.
  const [miniDismissed, setMiniDismissed] = useState(false)
  // Drives the dock-in / dock-out animation: false = offset + transparent.
  const [miniShown, setMiniShown] = useState(false)

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const activeVideo = () => (activeId ? videoRefs.current[activeId] : null)

  /** Starts one reel and stops every other one. */
  const playReel = useCallback((id: string) => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return
      if (key === id) return
      video.pause()
      video.currentTime = 0
    })

    const video = videoRefs.current[id]
    if (!video) return
    video.muted = muted
    void video.play()
    setActiveId(id)
    setPlaying(true)
    setMiniDismissed(false)
  }, [muted])

  const toggleReel = (id: string) => {
    const video = videoRefs.current[id]
    if (!video) return
    if (activeId === id && !video.paused) {
      video.pause()
      setPlaying(false)
      return
    }
    playReel(id)
  }

  const togglePlay = () => {
    const video = activeVideo()
    if (!video) return
    if (video.paused) void video.play()
    else video.pause()
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    const video = activeVideo()
    if (video) video.muted = next
  }

  // Playback finished on its own — dock the player away and reset the card.
  const endReel = () => {
    setPlaying(false)
    setMiniShown(false)
    window.setTimeout(() => {
      setMiniDismissed(true)
      setActiveId(null)
      const video = activeVideo()
      if (video) video.currentTime = 0
    }, 280)
  }

  const closeMini = () => {
    const video = activeVideo()
    if (video) video.pause()
    setPlaying(false)
    // Let the dock-out animation finish before the player unmounts.
    setMiniShown(false)
    window.setTimeout(() => setMiniDismissed(true), 280)
  }

  // Watch the active card — once it leaves the viewport the video moves into the
  // corner; scrolling it back into view returns it to the inline player.
  useEffect(() => {
    if (!activeId) {
      setFloating(false)
      return
    }
    const card = cardRefs.current[activeId]
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => setFloating(!entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [activeId])

  // The video element itself never moves in the DOM — its wrapper is re-parented
  // via fixed positioning, so playback is uninterrupted in both places.
  const showMini = Boolean(activeId) && floating && !miniDismissed

  // Flip to the resting state one frame after docking so the transition runs.
  useEffect(() => {
    if (!showMini) {
      setMiniShown(false)
      return
    }
    const frame = requestAnimationFrame(() => setMiniShown(true))
    return () => cancelAnimationFrame(frame)
  }, [showMini])

  return (
    <section
      style={{
        background: 'var(--hero-bg)',
        padding: 'clamp(56px, 8vw, 110px) var(--pad) clamp(72px, 10vw, 140px)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <h2
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(32px, 6vw, 72px)',
            lineHeight: 1.02,
            letterSpacing: '0.005em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--hero-cream)',
            marginBottom: 'clamp(32px, 5vw, 60px)',
          }}
        >
          Proof, not promises.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 34px)' }}>
          {reels.map((reel) => {
            const isActive = activeId === reel.id
            const isFloating = isActive && showMini

            return (
              <div
                key={reel.id}
                ref={(el) => { cardRefs.current[reel.id] = el }}
                className="pnp-card"
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 10',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(123,214,165,0.5)',
                  background: 'var(--hero-panel)',
                  cursor: 'pointer',
                }}
                onClick={() => !isFloating && toggleReel(reel.id)}
              >
                {/* Video — stays mounted; only its box moves when floating */}
                <div
                  style={
                    isFloating
                      ? {
                          position: 'fixed',
                          right: 'clamp(16px, 2vw, 28px)',
                          bottom: 'clamp(16px, 2vw, 28px)',
                          width: 'clamp(240px, 26vw, 340px)',
                          aspectRatio: '16 / 10',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          border: '1px solid rgba(123,214,165,0.6)',
                          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                          zIndex: 60,
                          background: '#000',
                          transformOrigin: 'bottom right',
                          transform: miniShown
                            ? 'translateY(0) scale(1)'
                            : 'translateY(24px) scale(0.88)',
                          opacity: miniShown ? 1 : 0,
                          transition:
                            'transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease',
                        }
                      : { position: 'absolute', inset: 0 }
                  }
                >
                  <video
                    ref={(el) => { videoRefs.current[reel.id] = el }}
                    src={reel.src}
                    playsInline
                    preload="metadata"
                    onPlay={() => { setActiveId(reel.id); setPlaying(true) }}
                    onPause={() => { if (activeId === reel.id) setPlaying(false) }}
                    onEnded={() => { if (activeId === reel.id) endReel() }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {isFloating && (
                    <MiniControls
                      playing={playing}
                      muted={muted}
                      onTogglePlay={togglePlay}
                      onToggleMute={toggleMute}
                      onClose={closeMini}
                      title={reel.title}
                    />
                  )}
                </div>

                {/* Poster overlay — hidden while this reel is the one playing */}
                <div
                  aria-hidden={isActive}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '14px',
                    background:
                      'linear-gradient(to bottom, rgba(0,37,27,0.35), rgba(0,37,27,0.75))',
                    opacity: isActive && playing && !isFloating ? 0 : 1,
                    transition: 'opacity 0.35s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      width: 'clamp(52px, 5vw, 66px)',
                      height: 'clamp(52px, 5vw, 66px)',
                      borderRadius: '50%',
                      background: 'var(--card-cream)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <HiPlay size={24} style={{ color: 'var(--green2)', marginLeft: '2px' }} />
                  </span>

                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-anton), sans-serif',
                        fontSize: 'clamp(20px, 2.6vw, 32px)',
                        letterSpacing: '0.01em',
                        textTransform: 'uppercase',
                        color: 'var(--hero-cream)',
                      }}
                    >
                      {reel.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-anton), sans-serif',
                        fontSize: 'clamp(10px, 1.1vw, 13px)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--hero-gold)',
                        marginTop: '6px',
                      }}
                    >
                      {reel.caption}
                    </div>
                  </div>
                </div>

                {/* Placeholder shown in the card while the video is in the corner */}
                {isFloating && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(244,241,214,0.5)',
                      pointerEvents: 'none',
                      opacity: miniShown ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    Playing in mini player
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .pnp-card { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .pnp-card:hover {
          border-color: rgba(123,214,165,0.9);
          box-shadow: 0 0 30px rgba(123,214,165,0.14);
        }
      `}</style>
    </section>
  )
}

function MiniControls({
  playing,
  muted,
  onTogglePlay,
  onToggleMute,
  onClose,
  title,
}: {
  playing: boolean
  muted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
  onClose: () => void
  title: string
}) {
  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--hero-cream)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>

        <button onClick={(e) => { stop(e); onClose() }} aria-label="Close mini player" style={miniBtn}>
          <HiXMark size={14} />
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
        }}
      >
        <button onClick={(e) => { stop(e); onTogglePlay() }} aria-label={playing ? 'Pause' : 'Play'} style={miniBtn}>
          {playing ? <HiPause size={14} /> : <HiPlay size={14} />}
        </button>

        <button onClick={(e) => { stop(e); onToggleMute() }} aria-label={muted ? 'Unmute' : 'Mute'} style={miniBtn}>
          {muted ? <HiSpeakerXMark size={14} /> : <HiSpeakerWave size={14} />}
        </button>
      </div>
    </>
  )
}

const miniBtn: React.CSSProperties = {
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  border: 'none',
  background: 'rgba(232,229,203,0.92)',
  color: 'var(--green2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
}
