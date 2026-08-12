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
 * Layout is expressed in *fractions of the viewport*, then converted to world
 * units. The canvas is fixed full-viewport for the whole section (scene 1's
 * pin + scene 2's normal flow), so a fraction here always maps onto the same
 * screen position regardless of which scene is currently in view.
 */
function getLayout(world: WorldSize) {
  const narrow = world.w / world.h < 1.05
  const fx = (f: number) => world.w * (f - 0.5) // 0..1 across → world x
  const fy = (f: number) => world.h * (0.5 - f) // 0..1 down → world y

  if (narrow) {
    return {
      narrow,
      camRest: { x: fx(0.5), y: fy(0.3) },
      camStartY: fy(-0.35),
      camScale: world.w * 0.3,
      // Scene 2's video sits centred, lower in the (separate, normal-flow) block.
      camExit: { x: fx(0.5), y: fy(0.55) },
    }
  }

  return {
    narrow,
    // Camera lives in the left gutter, scene-1 media occupies 40%→98%.
    camRest: { x: fx(0.24), y: fy(0.58) },
    camStartY: fy(-0.35),
    camScale: world.w * 0.135,
    // Scene 2's video is centred — camera travels down and in behind it.
    camExit: { x: fx(0.5), y: fy(0.55) },
  }
}

export default function RecordingStudio() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pinnedSectionRef = useRef<HTMLElement>(null)
  const scene2Ref = useRef<HTMLDivElement>(null)

  const s1TextRef = useRef<HTMLDivElement>(null)
  const s2TextRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLDivElement>(null)
  const video1FrameRef = useRef<HTMLDivElement>(null)
  const video2FrameRef = useRef<HTMLDivElement>(null)

  const cameraRef = useRef<THREE.Group>(null)
  const mouseInfluence = useRef<MouseInfluence>({ value: 0 })

  // R3F mounts Canvas children on its own reconciler schedule, so the group
  // ref is still null when the outer effect first runs. Wait for the object
  // to report ready, plus the world measurement, before building the timeline.
  const [ready, setReady] = useState(false)
  const [world, setWorld] = useState<WorldSize | null>(null)
  // The canvas is `position: fixed` so the camera can travel past the pin
  // seam into scene 2. Once we've fully scrolled past this component it must
  // stop covering the viewport, or it sits (invisible but rendering) over
  // every section below it for the rest of the page.
  const [canvasLive, setCanvasLive] = useState(true)

  const handleReady = useCallback(() => setReady(true), [])
  const handleResize = useCallback((s: WorldSize) => {
    setWorld((prev) => (prev && prev.w === s.w && prev.h === s.h ? prev : s))
  }, [])

  useGSAP(
    () => {
      if (!ready || !world) return
      const cam = cameraRef.current
      if (!cam || !wrapperRef.current) return

      const L = getLayout(world)

      // ── Initial state ──────────────────────────────────────
      gsap.set(cam.position, { x: L.camRest.x, y: L.camStartY, z: 0 })
      gsap.set(cam.rotation, { x: 0, y: 0, z: 0 })
      gsap.set(cam.scale, { x: 0.0001, y: 0.0001, z: 0.0001 })
      mouseInfluence.current.value = 0

      gsap.set(s1TextRef.current, { opacity: 0, y: 34 })
      gsap.set(video1Ref.current, { opacity: 0, scale: 0.82 })
      gsap.set(video1FrameRef.current, { rotateY: 0, rotateX: 0 })
      gsap.set(s2TextRef.current, { opacity: 0, y: 28 })
      gsap.set(video2FrameRef.current, { opacity: 0, scale: 0.86 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      /* ── PHASE 1 — text + video land, camera descends from above ── */
      tl.to(
        s1TextRef.current,
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        0
      )
        .to(
          video1Ref.current,
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
          0.2
        )
        // Camera falls in from off the top, growing as it arrives.
        .to(cam.position, { y: L.camRest.y, duration: 2, ease: 'power2.out' }, 0.8)
        .to(
          cam.scale,
          { x: L.camScale, y: L.camScale, z: L.camScale, duration: 2, ease: 'back.out(1.2)' },
          0.8
        )
        // Turns linearly from 0 straight to facing right as it falls — one
        // continuous rotation, so it never swings through facing-left first.
        .to(cam.rotation, { y: Math.PI / 2, duration: 2.9, ease: 'power2.out' }, 0.8)
        .to(cam.rotation, { x: 0.05, duration: 0.9, ease: 'power2.inOut' }, 2.6)
        .to(
          video1FrameRef.current,
          { rotateY: -9, rotateX: 2, duration: 0.9, ease: 'power2.inOut' },
          2.6
        )

      /* ── PHASE 2 — recording hold: camera holds its scroll position, only
         the cursor moves it (see the pointer-drift group in CameraModel) ── */
      const phase2Start = 3.5
      const phase2Span = 0.6
      tl.to(mouseInfluence.current, { value: 1, duration: 0.4, ease: 'power1.out' }, phase2Start)
        .to(
          mouseInfluence.current,
          { value: 0, duration: 0.4, ease: 'power1.in' },
          phase2Start + phase2Span
        )

      /* ── PHASE 3 — camera continues down, past the pin, and disappears
         behind the video in the next (normal-flow) section ── */
      const p3 = phase2Start + phase2Span + 0.4

      tl.to(video2FrameRef.current, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, p3)

      tl.to(
        cam.position,
        { x: L.camExit.x, y: L.camExit.y, duration: 2.2, ease: 'power2.inOut' },
        p3 + 0.2
      )
        .to(
          cam.rotation,
          { y: '+=' + Math.PI * 1.1, x: 0.15, duration: 2.2, ease: 'power1.inOut' },
          p3 + 0.2
        )
        // Shrinks away as it tucks behind the video — the canvas sits below
        // the DOM media in z-order, so it is genuinely occluded.
        .to(
          cam.scale,
          { x: 0.0001, y: 0.0001, z: 0.0001, duration: 1.8, ease: 'power2.in' },
          p3 + 0.6
        )

      // Once the camera has fully shrunk away, release the fixed canvas so it
      // stops covering (and rendering behind) whatever section comes next.
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'bottom bottom',
        onEnter: () => setCanvasLive(false),
        onLeaveBack: () => setCanvasLive(true),
      })

      // Scene 2's heading is a plain one-shot reveal as it scrolls into
      // view — it lives in normal document flow, outside the scrubbed pin.
      gsap.to(s2TextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: 'top 75%',
          once: true,
        },
      })

      ScrollTrigger.refresh()
    },
    { scope: wrapperRef, dependencies: [ready, world] }
  )

  return (
    <div ref={wrapperRef} style={{ position: 'relative', background: 'var(--hero-bg)' }}>
      {/* One canvas, fixed to the viewport, spans the whole wrapper's scroll
          range so the camera can travel from the pinned scene into the
          normal-flow scene below without being clipped at the seam. Hidden
          (not unmounted, to keep useGLTF's cache warm) once we've scrolled
          past this component entirely. */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          visibility: canvasLive ? 'visible' : 'hidden',
        }}
      >
        <CameraScene
          cameraRef={cameraRef}
          mouseInfluence={mouseInfluence}
          onReady={handleReady}
          onResize={handleResize}
        />
      </div>

      {/* ── Scene 1 — pinned ─────────────────────────────────── */}
      <section ref={pinnedSectionRef} style={{ position: 'relative', height: '420vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
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
            {/* video (scene 1, right) — sits above the fixed canvas in z */}
            <div ref={video1Ref} className="rs-media rs-media-1" style={{ opacity: 0 }}>
              <div ref={video1FrameRef} className="rs-frame">
                <video autoPlay loop muted playsInline className="rs-video">
                  <source src="/heroVideo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

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
          </div>
        </div>
      </section>

      {/* ── Scene 2 — normal document flow, stacked beneath scene 1 ──────
          Just a video the camera ends up behind. Nothing here is pinned. */}
      <div
        ref={scene2Ref}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(28px, 4vw, 48px)',
          padding: 'clamp(48px, 8vw, 96px) var(--pad)',
        }}
      >
        <div ref={s2TextRef} style={{ textAlign: 'center', maxWidth: '640px', opacity: 0 }}>
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

        <div
          ref={video2FrameRef}
          className="rs-frame"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '900px',
            opacity: 0,
          }}
        >
          <video autoPlay loop muted playsInline className="rs-video">
            <source src="/heroVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <style>{`
        .rs-copy {
          position: absolute;
          top: 7%;
          left: var(--pad);
          right: var(--pad);
          z-index: 2;
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

        @media (max-aspect-ratio: 105/100) {
          .rs-copy { top: 4%; }
          .rs-media { top: 68%; }
          .rs-media-1 { left: 6%; width: 88%; }
        }
      `}</style>
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--hero-gold)', opacity: 0.55 }} />
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
