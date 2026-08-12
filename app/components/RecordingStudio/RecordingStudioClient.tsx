'use client'

import dynamic from 'next/dynamic'

// R3F's Canvas touches window/document at module init, so it must be
// dynamically imported with ssr disabled or the Next.js build breaks.
const RecordingStudio = dynamic(() => import('./RecordingStudio'), {
  ssr: false,
})

export default function RecordingStudioClient() {
  return <RecordingStudio />
}
