'use client'

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// TODO(pen): swap this path for the real pen GLB once it lands in
// /public/models. Until then both objects in this section share the camera
// model — see `PEN_MODEL_PATH` usage in RecordingStudio.tsx.
const MODEL_PATH = '/models/canon_at-1_retro_camera.glb'

// PERF: this GLB is 19.5 MB, effectively all of it PNG textures. Resize and
// compress the maps (target < 3 MB, ideally KTX2/basis) before launch.

export type MouseInfluence = { value: number }

type CameraModelProps = {
  /** Largest-dimension size, in world units, after the auto-fit. */
  targetSize?: number
  onReady?: () => void
  /** GSAP tweens `.value` 0→1 to fade the pointer drift in and out. */
  mouseInfluence?: React.RefObject<MouseInfluence>
  /** Max pointer rotation in radians (0.09 ≈ 5°). */
  mouseStrength?: number
}

/**
 * Three nested groups, each with exactly one writer, so nothing fights:
 *   scrollGroup — GSAP timeline (position / rotation / scale)
 *     mouseGroup — useFrame pointer drift (rotation only)
 *       fitGroup — one-time auto-centre + auto-scale
 */
const CameraModel = forwardRef<THREE.Group, CameraModelProps>(
  ({ targetSize = 2, onReady, mouseInfluence, mouseStrength = 0.09 }, ref) => {
    const { scene } = useGLTF(MODEL_PATH)

    // Always clone. useGLTF hands back a shared cached scene, and the centring
    // step below mutates `.position` — mutating the cache would corrupt every
    // later mount (and the second instance). Cloning shares geometry and
    // materials by reference, so there's no extra GPU upload.
    const model = useMemo(() => scene.clone(true), [scene])

    const scrollRef = useRef<THREE.Group>(null)
    const mouseRef = useRef<THREE.Group>(null)
    const fitRef = useRef<THREE.Group>(null)
    const prepared = useRef(false)

    useImperativeHandle(ref, () => scrollRef.current as THREE.Group)

    useEffect(() => {
      if (prepared.current || !fitRef.current) return
      prepared.current = true

      const box = new THREE.Box3().setFromObject(model)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box.getSize(size)
      box.getCenter(center)

      model.position.set(-center.x, -center.y, -center.z)
      fitRef.current.scale.setScalar(targetSize / Math.max(size.x, size.y, size.z))

      onReady?.()
    }, [model, targetSize, onReady])

    useFrame((state) => {
      const g = mouseRef.current
      if (!g) return
      const influence = mouseInfluence?.current?.value ?? 0
      // state.pointer is normalised to -1..1 across the canvas.
      const targetY = state.pointer.x * mouseStrength * influence
      const targetX = -state.pointer.y * mouseStrength * influence
      g.rotation.y += (targetY - g.rotation.y) * 0.06
      g.rotation.x += (targetX - g.rotation.x) * 0.06
    })

    return (
      // Starts collapsed so nothing flashes on screen before the scroll
      // timeline has been built.
      <group ref={scrollRef} scale={0.0001}>
        <group ref={mouseRef}>
          <group ref={fitRef}>
            <primitive object={model} />
          </group>
        </group>
      </group>
    )
  }
)

CameraModel.displayName = 'CameraModel'

useGLTF.preload(MODEL_PATH)

export default CameraModel
