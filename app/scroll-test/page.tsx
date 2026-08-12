import SceneClient from './SceneClient'

// SANDBOX PAGE — isolated test for scroll-driven 3D animation setup.
// Not linked from nav; visit /scroll-test directly.
//
// PERFORMANCE NOTE: canon_at-1_retro_camera.glb is 19.5MB (all in its 3 PNG
// textures). That's too heavy for production — resize/compress the textures
// (target under 3MB total, e.g. resize + convert to KTX2/basis or compressed
// JPG) before this asset ships anywhere real.
export default function ScrollTestPage() {
  return (
    <main className="bg-black">
      <SceneClient />
    </main>
  )
}
