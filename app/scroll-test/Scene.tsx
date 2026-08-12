'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import CameraModel from './CameraModel'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.01, 0.01, 0.01]} />
    </mesh>
  )
}

export default function Scene() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const modelGroupRef = useRef<THREE.Group>(null)
  // R3F mounts the Canvas's children in its own reconciler, on a separate
  // schedule from the outer DOM commit — so modelGroupRef.current is still
  // null the instant useGSAP's effect body first runs. Re-run the setup
  // once CameraModel reports its group is actually attached.
  const [modelReady, setModelReady] = useState(false)

  useGSAP(
    () => {
      if (!sectionRef.current || !modelGroupRef.current) return
      const model = modelGroupRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // Stage 1 — move UP while rotating on Y
      tl.to(model.position, { y: 2.5, duration: 1 }, 0)
        .to(model.rotation, { y: Math.PI, duration: 1 }, 0)

        // Stage 2 — move DOWN and across to the RIGHT
        .to(model.position, { y: -2, x: 3, duration: 1 }, 1)

        // Stage 3 — move across to the LEFT and tilt on X
        .to(model.position, { x: -3, duration: 1 }, 2)
        .to(model.rotation, { x: Math.PI / 3, duration: 1 }, 2)

        // Stage 4 — return to centre, scale up slightly, full 360 on Y
        .to(model.position, { x: 0, y: 0, duration: 1 }, 3)
        .to(model.rotation, { x: 0, y: Math.PI * 4, duration: 1 }, 3)
        .to(model.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 1 }, 3)

      ScrollTrigger.refresh()
    },
    { scope: sectionRef, dependencies: [modelReady] }
  )

  return (
    <div ref={sectionRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 5, 3]} intensity={1.6} />
          <Suspense fallback={<Loader />}>
            <CameraModel
              ref={modelGroupRef}
              onReady={() => setModelReady(true)}
            />
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <ScrollLabels sectionRef={sectionRef} />
      </div>
    </div>
  )
}

const STAGE_LABELS = [
  'Stage 1 — Up',
  'Stage 2 — Down + Right',
  'Stage 3 — Left + Tilt',
  'Stage 4 — Centre + Scale + Spin',
]

function ScrollLabels({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const [activeStage, setActiveStage] = useState(0)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const stage = Math.min(3, Math.floor(self.progress * 4))
          setActiveStage(stage)
        },
      })
    },
    { scope: sectionRef, dependencies: [sectionRef.current] }
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-6">
      <div className="text-sm font-mono uppercase tracking-widest text-white/80 transition-opacity duration-300">
        {STAGE_LABELS[activeStage]}
      </div>
    </div>
  )
}
