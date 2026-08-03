'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const steps = [
  {
    num: '01',
    label: 'Ideation',
    title: 'Nothing gets made on a guess.',
    body: "We map your niche's pain points, research what is already going viral in your space, and find your unique angle. Your content pillars rotate weekly, so you never face a blank page.",
  },
  {
    num: '02',
    label: 'Scripting',
    title: 'Written to be repurposed from the first line.',
    body: 'Every long form script has clip moments planned before you ever hit record. Every hook gets 2 to 3 variations written, because we test, we do not hope.',
  },
  {
    num: '03',
    label: 'Production. Your Only Job',
    title: 'One day. One sitting. Done.',
    body: 'You pick one day a week. You show up, record one long form video and 3 to 4 short forms in a single sitting, and you are done. That is your entire role in this machine. Everything before and after that camera is ours.',
  },
  {
    num: '04',
    label: 'Distribution',
    title: 'One sitting. 55 to 94 pieces. Every week.',
    body: 'Edited videos, repurposed clips, carousels, tweet graphics, pushed across YouTube, Instagram, and TikTok. Every piece opens with a hook and ends with a CTA that pulls people toward your offer. No exceptions.',
  },
  {
    num: '05',
    label: 'Feedback Loop',
    title: 'The system gets smarter every seven days.',
    body: "Every week we track which hooks won, which topics triggered DMs, what drove clicks. Next week's roadmap is built on that data, not written 90 days in advance. A system that learns beats a calendar that guesses.",
  },
]

const GREEN = '#E3C24A'
const BLACK = '#000000'

/* Easing */
function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

/* Rectangular fill animation (full coverage) */
function animateFill(
  fillEl: HTMLElement,
  fillColor: string,
  duration: number,
  onHalfway: () => void,
): Promise<void> {
  return new Promise(resolve => {
    fillEl.style.background = fillColor
    fillEl.style.height = '0%'
    const start = performance.now()
    let halfwayFired = false

    function frame(now: number) {
      const raw = Math.min((now - start) / duration, 1)
      const t = easeInOutSine(raw)
      fillEl.style.height = `${t * 100}%`
      if (!halfwayFired && t >= 0.46) {
        halfwayFired = true
        onHalfway()
      }
      if (raw < 1) requestAnimationFrame(frame)
      else { fillEl.style.height = '100%'; resolve() }
    }
    requestAnimationFrame(frame)
  })
}

function pause(ms: number) { return new Promise<void>(r => setTimeout(r, ms)) }

export default function HowItWorks() {
  const [isClient, setIsClient] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)

  const boxBgRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])
  const fillRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])
  const numRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])
  const titleRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])
  const bodyRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])

  const lineRefs = useRef<(SVGLineElement | null)[]>([null, null, null, null])
  const dotRefs  = useRef<(SVGCircleElement | null)[]>([null, null, null, null])

  const cycleRef         = useRef<boolean>(false)
  const runningRef       = useRef<boolean>(false)
  const animationStarted = useRef(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const setTextColors = useCallback((solidBgColor: string) => {
    const onGreen    = solidBgColor === GREEN
    const numColor   = onGreen ? BLACK : GREEN
    const titleColor = onGreen ? BLACK : '#ffffff'
    const bodyColor  = onGreen ? 'rgba(0,0,0,0.62)' : 'rgba(255,255,255,0.55)'
    numRefs.current.forEach(el => {
      if (!el) return; el.style.transition = 'none'; el.style.color = numColor
    })
    titleRefs.current.forEach(el => {
      if (!el) return; el.style.transition = 'none'; el.style.color = titleColor
    })
    bodyRefs.current.forEach(el => {
      if (!el) return; el.style.transition = 'none'; el.style.color = bodyColor
    })
  }, [])

  const transitionTextAt = useCallback((fillColor: string, index: number) => {
    const onGreen    = fillColor === GREEN
    const numColor   = onGreen ? BLACK : GREEN
    const titleColor = onGreen ? BLACK : '#ffffff'
    const bodyColor  = onGreen ? 'rgba(0,0,0,0.62)' : 'rgba(255,255,255,0.55)'
    const n = numRefs.current[index]
    const t = titleRefs.current[index]
    const b = bodyRefs.current[index]
    if (n) { n.style.transition = 'color 0.5s ease'; n.style.color = numColor }
    if (t) { t.style.transition = 'color 0.5s ease'; t.style.color = titleColor }
    if (b) { b.style.transition = 'color 0.5s ease'; b.style.color = bodyColor }
  }, [])

  // Smooth line color transition (no abrupt reset)
  const transitionLineColors = useCallback((newColor: string) => {
    lineRefs.current.forEach(line => {
      if (line) {
        line.style.transition = 'stroke 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
        line.style.stroke = newColor
      }
    })
    dotRefs.current.forEach(dot => {
      if (dot) {
        dot.style.transition = 'fill 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
        dot.style.fill = newColor
      }
    })
  }, [])

  const resetForNextCycle = useCallback((justFilledColor: string) => {
    const nextLineColor = justFilledColor === GREEN ? BLACK : GREEN

    // Background boxes become the color that just filled
    boxBgRefs.current.forEach(el => {
      if (!el) return
      el.style.background = justFilledColor
    })

    // Collapse fills instantly (background catches it)
    fillRefs.current.forEach(el => {
      if (!el) return
      el.style.transition = 'none'
      el.style.height = '0%'
    })

    setTextColors(justFilledColor)

    // Smoothly transition line colors to the next phase
    transitionLineColors(nextLineColor)
  }, [setTextColors, transitionLineColors])

  const runCycle = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true

    const isGreenPhase = cycleRef.current
    const fillColor    = isGreenPhase ? GREEN : BLACK
    // Line color for next phase will be applied after reset, but during this cycle we keep current
    // (lines were already set to the correct color in the previous reset)

    const FILL_DUR = 1800
    const GAP      = 60

    for (let i = 0; i < steps.length; i++) {
      if (fillRefs.current[i]) {
        await animateFill(fillRefs.current[i]!, fillColor, FILL_DUR, () => transitionTextAt(fillColor, i))
      }
      await pause(GAP)
    }

    await pause(1200)

    resetForNextCycle(fillColor)
    cycleRef.current = !cycleRef.current

    await pause(300)
    runningRef.current = false
    runCycle()
  }, [transitionTextAt, resetForNextCycle])

  useEffect(() => {
    if (!isClient || !sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted.current) {
          animationStarted.current = true

          // Initial state: boxes black, fills green, text black (on black), lines green
          boxBgRefs.current.forEach(el => { if (el) el.style.background = BLACK })
          fillRefs.current.forEach(el => {
            if (!el) return; el.style.height = '0%'; el.style.background = GREEN
          })
          setTextColors(BLACK)

          // Set initial line colors (green so they're visible on dark bg)
          lineRefs.current.forEach(l => { if (l) { l.style.stroke = GREEN; l.style.strokeDashoffset = '0' } })
          dotRefs.current.forEach(d => { if (d) d.style.fill = GREEN })

          cycleRef.current = true // first fill will be GREEN
          setTimeout(() => runCycle(), 500)
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [isClient, runCycle, setTextColors])

  // Shared styles
  const boxShell: React.CSSProperties = {
    position: 'relative',
    borderRadius: '20px',
    border: '1.5px solid rgba(227,194,74,0.22)',
    overflow: 'hidden',
  }
  const absInset: React.CSSProperties = { position: 'absolute', inset: 0, zIndex: 0 }
  const fillBase: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '0%',
    pointerEvents: 'none',
    zIndex: 1,
    transition: 'none',
  }
  const contentD: React.CSSProperties = { position: 'relative', zIndex: 2, padding: 'clamp(24px,3vw,32px)' }
  const contentM: React.CSSProperties = { position: 'relative', zIndex: 2, padding: '28px 24px 26px' }

  const numD:   React.CSSProperties = { fontFamily: 'var(--font-bricolage,sans-serif)', fontSize: 'clamp(52px,5vw,68px)', fontWeight: 800, lineHeight: 1, marginBottom: '16px', letterSpacing: '-2px' }
  const titleD: React.CSSProperties = { fontFamily: 'var(--font-bricolage,sans-serif)', fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.01em', lineHeight: 1.25 }
  const bodyD:  React.CSSProperties = { fontSize: 'clamp(12px,1.3vw,13px)', fontWeight: 300, lineHeight: 1.75 }
  const numM:   React.CSSProperties = { ...numD,   fontSize: '52px' }
  const titleM: React.CSSProperties = { ...titleD, fontSize: '20px' }
  const bodyM:  React.CSSProperties = { ...bodyD,  fontSize: '14px' }

  return (
    <div
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,10vw,140px) var(--pad,24px)',
        borderBottom: '1px solid var(--line2,rgba(255,255,255,0.08))',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--section-bg)', // dark base
      }}
    >
      {/* Green background orb for line visibility */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        background: 'radial-gradient(circle at 50% 30%, rgba(227,194,74,0.25) 0%, rgba(227,194,74,0) 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 'var(--max,1200px)', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--t2)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '16px', height: '1px', background: 'currentColor', color: 'var(--green)', display: 'inline-block',  }} />
          The Process
        </div>

        <h2 style={{ fontFamily: 'var(--font-jakarta,sans-serif)', fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white,#fff)', marginBottom: '16px' }}>
          One Recording Day a Week Becomes<br />
          <em style={{ fontStyle: 'normal', color: GREEN }}>55 to 94 Pieces of Content.</em>
        </h2>

        <p style={{ fontSize: 'clamp(13px,1.4vw,15px)', fontWeight: 300, color: 'var(--t3,rgba(255,255,255,0.5))', lineHeight: 1.65, maxWidth: '620px', marginBottom: 'clamp(48px,7vw,90px)' }}>
          Five layers. Each one feeds the next. Follow the line, this is exactly what happens to your content every single week.
        </p>

        {/* Unified column — all screen sizes */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', margin: '0 auto' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ width: '100%' }}>
              <div style={boxShell}>
                <div ref={el => { boxBgRefs.current[idx] = el }} style={absInset} />
                <div ref={el => { fillRefs.current[idx] = el }} style={fillBase} />
                <div style={contentD}>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', opacity: 0.7, marginBottom: '8px' }}>
                    {step.label}
                  </div>
                  <div ref={el => { numRefs.current[idx] = el }} style={numD}>{step.num}</div>
                  <div ref={el => { titleRefs.current[idx] = el }} style={titleD}>{step.title}</div>
                  <div ref={el => { bodyRefs.current[idx] = el }} style={bodyD}>{step.body}</div>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', height: '56px' }}>
                  <svg width="20" height="56" viewBox="0 0 20 56" style={{ overflow: 'visible' }}>
                    <line ref={el => { lineRefs.current[idx] = el }} x1="10" y1="4" x2="10" y2="52" strokeWidth="2" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="0" />
                    <circle ref={el => { dotRefs.current[idx] = el }} cx="10" cy="52" r="4" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* Outcome */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '8px' }}>
              The only metric that matters
            </div>
            <div style={{ fontFamily: 'var(--font-bricolage,sans-serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.02em', color: GREEN }}>
              Inbound Clients
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}