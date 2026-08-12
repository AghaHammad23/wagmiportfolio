'use client'

import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import CameraScene, { type WorldSize } from './CameraScene'
import type { MouseInfluence } from './CameraModel'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Layout is expressed in *fractions of the stage*, then converted to world
 * units. The canvas is stretched over the same box as the DOM media, so a
 * fraction here lines up with the same percentage in the CSS below.
 */
function getLayout(world: WorldSize) {
  const narrow = world.w / world.h < 1.05
  const fx = (f: number) => world.w * (f - 0.5) // 0..1 across → world x
  const fy = (f: number) => world.h * (0.5 - f) // 0..1 down → world y

  if (narrow) {
    // Stacked: object sits above the media.
    return {
      narrow,
      camRest: { x: fx(0.5), y: fy(0.3) },
      camStart: { y: fy(-0.35) },
      camScale: world.w * 0.34,
      mediaCenter: { x: fx(0.5), y: fy(0.68) },
      penRest: { x: fx(0.5), y: fy(0.3) },
      penScale: world.w * 0.3,
    }
  }

  return {
    narrow,
    // Camera lives in the left gutter, media occupies 40%→98%.
    camRest: { x: fx(0.19), y: fy(0.58) },
    camStart: { y: fy(-0.35) },
    camScale: world.w * 0.16,
    mediaCenter: { x: fx(0.69), y: fy(0.58) },
    penRest: { x: fx(0.72), y: fy(0.58) },
    penScale: world.w * 0.13,
  }
}

export default function RecordingStudio() {
  const sectionRef = useRef<HTMLElement>(null)
  const s1TextRef = useRef<HTMLDivElement>(null)
  const s2TextRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLDivElement>(null)
  const video1FrameRef = useRef<HTMLDivElement>(null)
  const video2Ref = useRef<HTMLDivElement>(null)
  const video2FrameRef = useRef<HTMLDivElement>(null)

  const cameraRef = useRef<THREE.Group>(null)
  const penRef = useRef<THREE.Group>(null)
  const mouseInfluence = useRef<MouseInfluence>({ value: 0 })

  // R3F mounts Canvas children on its own reconciler schedule, so the group
  // refs are still null when the outer effect first runs. Wait for both
  // objects, plus the world measurement, before building the timeline.
  const [readyCount, setReadyCount] = useState(0)
  const [world, setWorld] = useState<WorldSize | null>(null)

  const handleReady = useCallback(() => setReadyCount((c) => c + 1), [])
  const handleResize = useCallback((s: WorldSize) => {
    setWorld((prev) => (prev && prev.w === s.w && prev.h === s.h ? prev : s))
  }, [])

  useGSAP(
    () => {
      if (readyCount < 2 || !world) return
      const cam = cameraRef.current
      const pen = penRef.current
      if (!cam || !pen || !sectionRef.current) return

      const L = getLayout(world)

      // ── Initial state ──────────────────────────────────────
      gsap.set(cam.position, { x: L.camRest.x, y: L.camStart.y, z: 0 })
      gsap.set(cam.rotation, { x: 0, y: -0.6, z: 0 })
      gsap.set(cam.scale, { x: 0.0001, y: 0.0001, z: 0.0001 })

      gsap.set(pen.position, { x: L.mediaCenter.x, y: L.mediaCenter.y, z: 0 })
      gsap.set(pen.rotation, { x: 0, y: -0.8, z: 0.35 })
      gsap.set(pen.scale, { x: 0.0001, y: 0.0001, z: 0.0001 })

      mouseInfluence.current.value = 0

      gsap.set([s1TextRef.current, video1Ref.current], { opacity: 0 })
      gsap.set(video1Ref.current, { scale: 0.82 })
      gsap.set(video1FrameRef.current, { rotateY: 0, rotateX: 0 })
      gsap.set([s2TextRef.current, video2Ref.current], { opacity: 0 })
      gsap.set(video2Ref.current, { scale: 0.86 })
      gsap.set(video2FrameRef.current, { rotateY: 0, rotateX: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      /* ── PHASE 1 — text + video land, camera descends from above ── */
      tl.fromTo(
        s1TextRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        0
      )
        .to(
          video1Ref.current,
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
          0.2
        )
        // Camera falls in from off the top, growing as it arrives.
        .to(
          cam.position,
          { y: L.camRest.y, duration: 2, ease: 'power2.out' },
          0.8
        )
        .to(
          cam.scale,
          {
            x: L.camScale,
            y: L.camScale,
            z: L.camScale,
            duration: 2,
            ease: 'back.out(1.2)',
          },
          0.8
        )
        .to(cam.rotation, { y: 0.1, duration: 2, ease: 'power2.out' }, 0.8)
        // Settle facing the video — a firmer tilt to the right so the body
        // clearly reads as pointed at the video, not just glancing toward it.
        .to(
          cam.rotation,
          { y: 0.75, x: 0.05, duration: 0.9, ease: 'power2.inOut' },
          2.6
        )
        .to(
          video1FrameRef.current,
          { rotateY: -9, rotateX: 2, duration: 0.9, ease: 'power2.inOut' },
          2.6
        )

      /* ── PHASE 2 — recording hold: micro-drift + pointer drift ── */
      tl.to(
        mouseInfluence.current,
        { value: 1, duration: 0.5, ease: 'power1.out' },
        3.5
      )

      // Scroll-scrubbed handheld wobble. Deliberately tiny — it should read as
      // "stabilised camera breathing", not as motion.
      const steps = 6
      const driftStart = 4
      const driftSpan = 3
      const step = driftSpan / steps
      for (let i = 0; i < steps; i++) {
        const dir = i % 2 === 0 ? 1 : -1
        tl.to(
          cam.rotation,
          {
            y: 0.75 + dir * 0.045,
            x: 0.05 + dir * 0.022,
            duration: step,
            ease: 'sine.inOut',
          },
          driftStart + i * step
        ).to(
          cam.position,
          {
            x: L.camRest.x + dir * world.w * 0.008,
            y: L.camRest.y + dir * world.h * 0.008,
            duration: step,
            ease: 'sine.inOut',
          },
          driftStart + i * step
        )
      }

      tl.to(
        mouseInfluence.current,
        { value: 0, duration: 0.5, ease: 'power1.in' },
        7
      )

      /* ── PHASE 3 — handoff: camera exits behind video 2, pen emerges ── */
      // Text crossfade.
      tl.to(
        s1TextRef.current,
        { opacity: 0, y: -26, duration: 1, ease: 'power2.in' },
        7.5
      ).fromTo(
        s2TextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        8.3
      )

      // Video 2 arrives on the left, directly over the camera.
      tl.to(
        video2Ref.current,
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
        7.8
      ).to(
        video2FrameRef.current,
        { rotateY: 7, rotateX: 1.5, duration: 1.4, ease: 'power2.out' },
        7.8
      )

      // Camera drifts into video 2's footprint, spins down and vanishes —
      // the canvas sits below the videos in z, so it is genuinely occluded.
      tl.to(
        cam.position,
        {
          x: L.narrow ? L.mediaCenter.x : L.camRest.x - world.w * 0.02,
          y: L.narrow ? L.mediaCenter.y : L.camRest.y,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        8
      )
        .to(
          cam.rotation,
          { y: '+=' + Math.PI * 1.2, x: 0.2, duration: 1.8, ease: 'power1.inOut' },
          8
        )
        .to(
          cam.scale,
          { x: 0.0001, y: 0.0001, z: 0.0001, duration: 1.8, ease: 'power2.in' },
          8
        )

      // Pen grows out from behind video 1 and travels clear of its edge.
      tl.to(
        pen.scale,
        {
          x: L.penScale,
          y: L.penScale,
          z: L.penScale,
          duration: 2,
          ease: 'back.out(1.1)',
        },
        8.6
      )
        .to(
          pen.position,
          { x: L.penRest.x, y: L.penRest.y, duration: 2, ease: 'power2.out' },
          8.6
        )
        .to(
          pen.rotation,
          { y: 0.3, z: 0.12, duration: 2, ease: 'power2.out' },
          8.6
        )

      // Video 1 retires, revealing the object that came out from behind it.
      tl.to(
        video1Ref.current,
        { opacity: 0, scale: 0.94, duration: 1.6, ease: 'power2.in' },
        9.4
      )

      ScrollTrigger.refresh()
    },
    { scope: sectionRef, dependencies: [readyCount, world] }
  )

  return (
    <section
      ref={sectionRef}
      className="rs-section"
      style={{ position: 'relative', height: '700vh', background: 'var(--hero-bg)' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Stage — the canvas and the DOM media share this exact box, which is
            what lets the world-unit fractions line up with the CSS percentages. */}
        <div
          className="rs-stage"
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 var(--pad)',
          }}
        >
          {/* z1 — 3D objects, deliberately BELOW the videos so they can be
              occluded by them. */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <CameraScene
              cameraRef={cameraRef}
              penRef={penRef}
              mouseInfluence={mouseInfluence}
              onReady={handleReady}
              onResize={handleResize}
            />
          </div>

          {/* z2 — video 1 (scene 1, right) */}
          <div ref={video1Ref} className="rs-media rs-media-1" style={{ opacity: 0 }}>
            <div ref={video1FrameRef} className="rs-frame">
              <video autoPlay loop muted playsInline className="rs-video">
                <source src="/heroVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* z2 — video 2 (scene 2, left) */}
          <div ref={video2Ref} className="rs-media rs-media-2" style={{ opacity: 0 }}>
            <div ref={video2FrameRef} className="rs-frame">
              <video autoPlay loop muted playsInline className="rs-video">
                <source src="/heroVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* z3 — copy */}
          <div ref={s1TextRef} className="rs-copy" style={{ opacity: 0 }}>
            <Eyebrow>Inside the session</Eyebrow>
            <Heading>
              One session.
              <span style={{ display: 'block', color: 'var(--hero-gold)' }}>
                A month of content.
              </span>
            </Heading>
            <Body>
              Sixty minutes in front of the lens is the only time we ask for. Every
              angle, every take, every asset — captured once, then cut into a full
              month of content.
            </Body>
          </div>

          <div ref={s2TextRef} className="rs-copy" style={{ opacity: 0 }}>
            <Eyebrow>After the camera stops</Eyebrow>
            <Heading>
              Then we write
              <span style={{ display: 'block', color: 'var(--hero-gold)' }}>
                the rest.
              </span>
            </Heading>
            <Body>
              Scripts, hooks, captions, and the edit plan. The moment recording ends,
              that footage becomes a publishing calendar that keeps working long
              after you have left the room.
            </Body>
          </div>
        </div>
      </div>

      <style>{`
        .rs-copy {
          position: absolute;
          top: 7%;
          left: var(--pad);
          right: var(--pad);
          z-index: 3;
          text-align: center;
          pointer-events: none;
        }
        .rs-media {
          position: absolute;
          z-index: 2;
          perspective: 1400px;
          top: 58%;
          transform: translateY(-50%);
        }
        .rs-media-1 { left: 40%; width: 58%; }
        .rs-media-2 { left: 2%;  width: 56%; }
        .rs-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          overflow: hidden;
          transform-style: preserve-3d;
          box-shadow: 0 0 0 1px rgba(244,241,214,0.08), 0 30px 80px rgba(0,0,0,0.55);
        }
        .rs-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Stacked layout — object above, media below.
           Mirrors the narrow branch in getLayout(). */
        @media (max-aspect-ratio: 105/100) {
          .rs-copy { top: 4%; }
          .rs-media { top: 68%; }
          .rs-media-1, .rs-media-2 { left: 6%; width: 88%; }
        }
      `}</style>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '14px',
      }}
    >
      <span
        style={{
          width: '24px',
          height: '1px',
          background: 'var(--hero-gold)',
          opacity: 0.55,
        }}
      />
      <span
        style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--t2)',
        }}
      >
        {children}
      </span>
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-anton), sans-serif',
        fontWeight: 400,
        fontSize: 'clamp(28px, 5vw, 64px)',
        lineHeight: 1.04,
        letterSpacing: '0.005em',
        textTransform: 'uppercase',
        color: 'var(--hero-cream)',
        margin: 0,
      }}
    >
      {children}
    </h2>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: 'clamp(12px, 1.6vw, 18px) auto 0',
        maxWidth: '560px',
        fontSize: 'clamp(12px, 1.3vw, 15px)',
        fontWeight: 300,
        lineHeight: 1.65,
        color: 'var(--t3)',
      }}
    >
      {children}
    </p>
  )
}
