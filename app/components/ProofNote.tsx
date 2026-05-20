'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProofNote() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      }
    )
  }, [])

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '40px var(--pad)',
        fontSize: '20px',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--green)',
        borderBottom: '1px solid var(--green)',
        borderTop: '1px solid var(--green)',
      }}
    >
      No testimonials needed when the numbers speak this clearly.
    </div>   
  )
}
