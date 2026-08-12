'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/canon_at-1_retro_camera.glb'

type CameraModelProps = {
  onReady?: () => void
}

// Outer group is what the scroll timeline animates (position/rotation/scale).
// Inner group only holds the one-time auto-centre + auto-scale correction,
// so the two transforms never fight each other.
const CameraModel = forwardRef<THREE.Group, CameraModelProps>(({ onReady }, ref) => {
  const { scene } = useGLTF(MODEL_PATH)
  const outerRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const prepared = useRef(false)

  useImperativeHandle(ref, () => outerRef.current as THREE.Group)

  useEffect(() => {
    if (prepared.current || !innerRef.current) return
    prepared.current = true

    // Auto-centre and auto-scale: the raw GLB is ~0.14 world units and not
    // centred at the origin, so derive the fix from its actual bounding box
    // instead of hardcoding a magic number.
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    scene.position.set(-center.x, -center.y, -center.z)

    const largestDimension = Math.max(size.x, size.y, size.z)
    const targetSize = 2
    const scale = targetSize / largestDimension
    innerRef.current.scale.setScalar(scale)

    console.log('[CameraModel] bounding box size:', size)
    console.log('[CameraModel] bounding box center:', center)
    console.log('[CameraModel] largest dimension:', largestDimension)
    console.log('[CameraModel] computed scale:', scale)

    onReady?.()
  }, [scene, onReady])

  return (
    <group ref={outerRef} name="camera-model-scroll-group">
      <group ref={innerRef} name="camera-model-fit-group">
        <primitive object={scene} />
      </group>
    </group>
  )
})

CameraModel.displayName = 'CameraModel'

useGLTF.preload(MODEL_PATH)

export default CameraModel
