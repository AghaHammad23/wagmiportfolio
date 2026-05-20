'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const steps = [
  {
    num: '01',
    title: 'Strategy & Roadmap',
    body: "We audit your content, identify your biggest growth lever, and build a 90-day content roadmap tailored to your offer and audience. You never stare at a blank screen again.",
  },
  {
    num: '02',
    title: 'We Build the Machine',
    body: 'Scripts, edits, thumbnails, hooks, shorts, long-form, posting schedules, weekly performance reviews. Our team handles full production end-to-end. You just show up.',
  },
  {
    num: '03',
    title: 'You Grow. We Optimise.',
    body: "Every week we cut what's dead and double what's working. Over time the system compounds — more views, more authority, more inbound clients. That's the engine.",
  },
]

const GREEN = '#ABF82F'
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
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)

  const boxBgRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const fillRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const numRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const titleRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const bodyRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null])

  const line1Ref = useRef<SVGPathElement>(null)
  const dot1Ref  = useRef<SVGCircleElement>(null)
  const line2Ref = useRef<SVGPathElement>(null)
  const dot2Ref  = useRef<SVGCircleElement>(null)

  const mLine1Ref = useRef<SVGLineElement>(null)
  const mDot1Ref  = useRef<SVGCircleElement>(null)
  const mLine2Ref = useRef<SVGLineElement>(null)
  const mDot2Ref  = useRef<SVGCircleElement>(null)

  const cycleRef         = useRef<boolean>(false)
  const runningRef       = useRef<boolean>(false)
  const animationStarted = useRef(false)
  const isMobileRef      = useRef(false)

  useEffect(() => {
    setIsClient(true)
    const check = () => {
      const m = window.innerWidth <= 900
      setIsMobile(m)
      isMobileRef.current = m
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
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
    const lines = [line1Ref.current, line2Ref.current, mLine1Ref.current, mLine2Ref.current]
    const dots = [dot1Ref.current, dot2Ref.current, mDot1Ref.current, mDot2Ref.current]
    lines.forEach(line => {
      if (line) {
        line.style.transition = 'stroke 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
        line.style.stroke = newColor
      }
    })
    dots.forEach(dot => {
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
    const mobile   = isMobileRef.current

    if (fillRefs.current[0]) {
      await animateFill(fillRefs.current[0]!, fillColor, FILL_DUR, () => transitionTextAt(fillColor, 0))
    }
    await pause(GAP)

    // Lines appear at this point with the current color (already correct)
    await pause(GAP)

    if (fillRefs.current[1]) {
      await animateFill(fillRefs.current[1]!, fillColor, FILL_DUR, () => transitionTextAt(fillColor, 1))
    }
    await pause(GAP)

    await pause(GAP)

    if (fillRefs.current[2]) {
      await animateFill(fillRefs.current[2]!, fillColor, FILL_DUR, () => transitionTextAt(fillColor, 2))
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
          const allLines = [line1Ref.current, line2Ref.current, mLine1Ref.current, mLine2Ref.current]
          const allDots = [dot1Ref.current, dot2Ref.current, mDot1Ref.current, mDot2Ref.current]
          allLines.forEach(l => { if (l) l.style.stroke = GREEN })
          allDots.forEach(d => { if (d) d.style.fill = GREEN })
          // Ensure dash offsets are zero (lines fully drawn)
          allLines.forEach(l => { if (l) l.style.strokeDashoffset = '0' })

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
    border: '1.5px solid rgba(106,255,42,0.22)',
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
        backgroundColor: '#0a0a0a', // dark base
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
        background: 'radial-gradient(circle at 50% 30%, rgba(106,255,42,0.25) 0%, rgba(106,255,42,0) 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 'var(--max,1200px)', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--t4,rgba(255,255,255,0.4))', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '16px', height: '1px', background: 'currentColor', display: 'inline-block' }} />
          The Process
        </div>

        <h2 style={{ fontFamily: 'var(--font-jakarta,sans-serif)', fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'var(--white,#fff)', marginBottom: 'clamp(48px,7vw,90px)' }}>
          Three movements.<br />
          <em style={{ fontStyle: 'normal', color: GREEN }}>One continuous flow.</em>
        </h2>

        {/* DESKTOP */}
        <div style={{ position: 'relative', minHeight: 'clamp(480px,60vh,640px)', display: isClient && isMobile ? 'none' : 'block' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }} viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path d="M 200,150 C 380,150 450,450 600,450 C 750,450 820,150 1000,150" fill="none" stroke="rgba(106,255,42,0.07)" strokeWidth="2" strokeLinecap="round" />
            <path ref={line1Ref} d="M 200,150 C 380,150 450,450 600,450" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="0" />
            <circle ref={dot1Ref} cx="600" cy="450" r="5" />
            <path ref={line2Ref} d="M 600,450 C 750,450 820,150 1000,150" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="0" />
            <circle ref={dot2Ref} cx="1000" cy="150" r="5" />
            <circle cx="200" cy="150" r="4" fill="rgba(106,255,42,0.2)" />
          </svg>

          {/* Box 1 */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 'clamp(260px,27vw,320px)' }}>
            <div style={boxShell}>
              <div ref={el => { boxBgRefs.current[0] = el }} style={absInset} />
              <div ref={el => { fillRefs.current[0] = el }} style={fillBase} />
              <div style={contentD}>
                <div ref={el => { numRefs.current[0] = el }} style={numD}>{steps[0].num}</div>
                <div ref={el => { titleRefs.current[0] = el }} style={titleD}>{steps[0].title}</div>
                <div ref={el => { bodyRefs.current[0] = el }} style={bodyD}>{steps[0].body}</div>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div style={{ position: 'absolute', bottom: 'clamp(0px,4vh,40px)', left: '50%', transform: 'translateX(-50%)', width: 'clamp(280px,30vw,360px)' }}>
            <div style={boxShell}>
              <div ref={el => { boxBgRefs.current[1] = el }} style={absInset} />
              <div ref={el => { fillRefs.current[1] = el }} style={fillBase} />
              <div style={contentD}>
                <div ref={el => { numRefs.current[1] = el }} style={numD}>{steps[1].num}</div>
                <div ref={el => { titleRefs.current[1] = el }} style={titleD}>{steps[1].title}</div>
                <div ref={el => { bodyRefs.current[1] = el }} style={bodyD}>{steps[1].body}</div>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 'clamp(260px,27vw,320px)' }}>
            <div style={boxShell}>
              <div ref={el => { boxBgRefs.current[2] = el }} style={absInset} />
              <div ref={el => { fillRefs.current[2] = el }} style={fillBase} />
              <div style={contentD}>
                <div ref={el => { numRefs.current[2] = el }} style={numD}>{steps[2].num}</div>
                <div ref={el => { titleRefs.current[2] = el }} style={titleD}>{steps[2].title}</div>
                <div ref={el => { bodyRefs.current[2] = el }} style={bodyD}>{steps[2].body}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE */}
        {isClient && isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, idx) => (
              <div key={idx}>
                <div style={boxShell}>
                  <div ref={el => { boxBgRefs.current[idx] = el }} style={absInset} />
                  <div ref={el => { fillRefs.current[idx] = el }} style={fillBase} />
                  <div style={contentM}>
                    <div ref={el => { numRefs.current[idx] = el }} style={numM}>{step.num}</div>
                    <div ref={el => { titleRefs.current[idx] = el }} style={titleM}>{step.title}</div>
                    <div ref={el => { bodyRefs.current[idx] = el }} style={bodyM}>{step.body}</div>
                  </div>
                </div>
                {idx < 2 && (
                  <div style={{ display: 'flex', justifyContent: 'center', height: '52px' }}>
                    <svg width="20" height="52" viewBox="0 0 20 52" style={{ overflow: 'visible' }}>
                      <line ref={idx === 0 ? mLine1Ref : mLine2Ref} x1="10" y1="4" x2="10" y2="48" strokeWidth="2" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="0" />
                      <circle ref={idx === 0 ? mDot1Ref : mDot2Ref} cx="10" cy="48" r="4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}