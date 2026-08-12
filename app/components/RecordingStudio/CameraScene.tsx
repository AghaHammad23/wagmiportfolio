'use client'

import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import CameraModel, { type MouseInfluence } from './CameraModel'

export type WorldSize = { w: number; h: number }

/**
 * Reports the canvas size in *world units at z=0*, so the scroll timeline can
 * place objects as fractions of the viewport instead of hardcoded coordinates.
 * The canvas covers the full viewport, so these map 1:1 onto screen pixels.
 */
function ViewportProbe({ onResize }: { onResize: (s: WorldSize) => void }) {
  const { viewport } = useThree()
  useEffect(() => {
    onResize({ w: viewport.width, h: viewport.height })
  }, [viewport.width, viewport.height, onResize])
  return null
}

type CameraSceneProps = {
  cameraRef: React.RefObject<THREE.Group | null>
  mouseInfluence: React.RefObject<MouseInfluence>
  onReady: () => void
  onResize: (s: WorldSize) => void
}

export default function CameraScene({
  cameraRef,
  mouseInfluence,
  onReady,
  onResize,
}: CameraSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ViewportProbe onResize={onResize} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 4]} intensity={1.8} />
      <directionalLight position={[-3, -1, -3]} intensity={0.45} />
      <Suspense fallback={null}>
        <CameraModel
          ref={cameraRef as React.RefObject<THREE.Group>}
          onReady={onReady}
          mouseInfluence={mouseInfluence}
        />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
