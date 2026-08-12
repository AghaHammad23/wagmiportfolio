'use client'

import dynamic from 'next/dynamic'

// R3F's Canvas touches window/document at module init, so it must be
// dynamically imported with ssr disabled or the Next.js build breaks.
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400vh] w-full items-center justify-center bg-black text-white/60">
      Loading 3D scene…
    </div>
  ),
})

export default function SceneClient() {
  return <Scene />
}
