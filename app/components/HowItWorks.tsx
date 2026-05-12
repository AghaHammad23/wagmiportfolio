'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Strategy & Roadmap',
    body: "We audit your content, identify your biggest growth lever, and build a 90-day content roadmap tailored to your offer and audience. You never stare at a blank screen again.",
    position: 'top-left',
  },
  {
    num: '02',
    title: 'We Build the Machine',
    body: 'Scripts, edits, thumbnails, hooks, shorts, long-form, posting schedules, weekly performance reviews. Our team handles full production end-to-end. You just show up.',
    position: 'bottom-center',
  },
  {
    num: '03',
    title: 'You Grow. We Optimise.',
    body: "Every week we cut what's dead and double what's working. Over time the system compounds — more views, more authority, more inbound clients. That's the engine.",
    position: 'top-right',
  },
]

export default function HowItWorks() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileLineRef = useRef<HTMLDivElement>(null)

  // Handle client-side initialization and window resize
  useEffect(() => {
    setIsClient(true)
    setIsMobile(window.innerWidth <= 968)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 968)
      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Set step refs properly
  const setStepRef = (index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el
  }

  // GSAP animations
  useEffect(() => {
    if (!isClient) return // Don't run on server
    
    const ctx = gsap.context(() => {
      // Animate the connecting line/path for desktop
      if (pathRef.current && !isMobile) {
        const pathLength = pathRef.current.getTotalLength()
        
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })
        
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(pathRef.current, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: 'power3.inOut',
            })
          },
        })
      }
      
      // Animate mobile connecting lines
      if (mobileLineRef.current && isMobile) {
        const lines = mobileLineRef.current.querySelectorAll('.mobile-line')
        lines.forEach((line, index) => {
          gsap.fromTo(line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              delay: index * 0.3,
              ease: 'back.out(0.4)',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                once: true,
              },
            }
          )
        })
      }
      
      // Animate each step with stagger and custom animations
      steps.forEach((_, index) => {
        const step = stepRefs.current[index]
        if (!step) return
        
        // Initial entrance animation
        gsap.fromTo(step,
          { 
            opacity: 0, 
            scale: isMobile ? 0.95 : 0.8,
            rotation: isMobile ? 0 : (index === 1 ? 15 : -15),
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: index * 0.3,
            ease: 'back.out(0.5)',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              once: true,
            },
          }
        )
        
        // Pulse animation on the step number when scrolled into view
        const stepNumber = step.querySelector('.step-number')
        if (stepNumber) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 75%',
            once: true,
            onEnter: () => {
              gsap.to(stepNumber, {
                scale: 1.1,
                duration: 0.5,
                repeat: 2,
                yoyo: true,
                ease: 'power2.inOut',
                delay: index * 0.2,
              })
            },
          })
        }
      })
      
      // Animate connecting dots with heartbeat effect (desktop only)
      if (!isMobile) {
        const dots = document.querySelectorAll('.flow-dot')
        dots.forEach((dot, index) => {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.8 + (index * 0.15),
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          )
          
          // Continuous pulse animation
          gsap.to(dot, {
            scale: 1.2,
            opacity: 0.8,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.2,
          })
        })
      }
    })
    
    return () => {
      ctx.revert()
    }
  }, [isClient, isMobile])

  // Provide default values for SSR
  const desktopDisplay = !isClient ? 'block' : (isMobile ? 'none' : 'block')
  const mobileDisplay = !isClient ? 'none' : (isMobile ? 'flex' : 'none')
  const marginBottomValue = !isClient ? 'clamp(60px, 8vw, 100px)' : 
    (isMobile ? 'clamp(40px, 6vw, 100px)' : 'clamp(60px, 8vw, 100px)')

  return (
    <div
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 140px) var(--pad)',
        borderBottom: '1px solid var(--line2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient for depth */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle at 50% 50%, rgba(106,255,42,0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', position: 'relative' }}>
        <div
          className="reveal"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--t4)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
          The Process
        </div>
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            color: 'var(--white)',
            marginBottom: marginBottomValue,
          }}
        >
          Three movements.
          <br />
          <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>
            One continuous flow.
          </em>
        </h2>
      </div>

      {/* Desktop Rollercoaster/Heartbeat Flow Container */}
      <div
        className="desktop-flow"
        style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          position: 'relative',
          minHeight: 'clamp(500px, 70vh, 700px)',
          display: desktopDisplay,
        }}
      >
        {/* SVG Connecting Line */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 200,150 
               C 400,150 500,450 600,450 
               C 700,450 800,150 1000,150"
            fill="none"
            stroke="rgba(106,255,42,0.15)"
            strokeWidth="2"
            strokeLinecap="round"
            className="flow-line"
          />
          
          {/* Heartbeat effect nodes */}
          <circle cx="200" cy="150" r="4" fill="var(--green)" className="flow-dot" opacity="0">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="450" r="4" fill="var(--green)" className="flow-dot" opacity="0">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.7s" />
          </circle>
          <circle cx="1000" cy="150" r="4" fill="var(--green)" className="flow-dot" opacity="0">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.4s" />
          </circle>
        </svg>

        {/* Step 1 - Top Left */}
        <div
          ref={setStepRef(0)}
          style={{
            position: 'absolute',
            top: 'clamp(0px, 2vw, 0px)',
            left: 'clamp(0px, 2vw, 0px)',
            width: 'clamp(280px, 30vw, 340px)',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(106,255,42,0.15)',
            borderRadius: '20px',
            padding: 'clamp(24px, 3vw, 32px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            if (!isClient) return
            gsap.to(e.currentTarget, {
              scale: 1.02,
              borderColor: 'rgba(106,255,42,0.4)',
              duration: 0.3,
            })
          }}
          onMouseLeave={(e) => {
            if (!isClient) return
            gsap.to(e.currentTarget, {
              scale: 1,
              borderColor: 'rgba(106,255,42,0.15)',
              duration: 0.3,
            })
          }}
        >
          <div
            className="step-number"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--green) 0%, rgba(106,255,42,0.5) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            {steps[0].num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {steps[0].title}
          </div>
          <div
            style={{
              fontSize: 'clamp(13px, 1.5vw, 14px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--t2)',
            }}
          >
            {steps[0].body}
          </div>
        </div>

        {/* Step 2 - Bottom Center */}
        <div
          ref={setStepRef(1)}
          style={{
            position: 'absolute',
            bottom: 'clamp(20px, 5vh, 40px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(300px, 32vw, 380px)',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(106,255,42,0.15)',
            borderRadius: '20px',
            padding: 'clamp(24px, 3vw, 32px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            if (!isClient) return
            gsap.to(e.currentTarget, {
              scale: 1.02,
              borderColor: 'rgba(106,255,42,0.4)',
              duration: 0.3,
            })
          }}
          onMouseLeave={(e) => {
            if (!isClient) return
            gsap.to(e.currentTarget, {
              scale: 1,
              borderColor: 'rgba(106,255,42,0.15)',
              duration: 0.3,
            })
          }}
        >
          <div
            className="step-number"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--green) 0%, rgba(106,255,42,0.5) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            {steps[1].num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {steps[1].title}
          </div>
          <div
            style={{
              fontSize: 'clamp(13px, 1.5vw, 14px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--t2)',
            }}
          >
            {steps[1].body}
          </div>
        </div>

        {/* Step 3 - Top Right */}
        <div
          ref={setStepRef(2)}
          style={{
            position: 'absolute',
            top: 'clamp(0px, 2vw, 0px)',
            right: 'clamp(0px, 2vw, 0px)',
            width: 'clamp(280px, 30vw, 340px)',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(106,255,42,0.15)',
            borderRadius: '20px',
            padding: 'clamp(24px, 3vw, 32px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            if (!isClient) return
            gsap.to(e.currentTarget, {
              scale: 1.02,
              borderColor: 'rgba(106,255,42,0.4)',
              duration: 0.3,
            })
          }}
          onMouseLeave={(e) => {
            if (!isClient) return
            gsap.to(e.currentTarget, {
              scale: 1,
              borderColor: 'rgba(106,255,42,0.15)',
              duration: 0.3,
            })
          }}
        >
          <div
            className="step-number"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--green) 0%, rgba(106,255,42,0.5) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            {steps[2].num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {steps[2].title}
          </div>
          <div
            style={{
              fontSize: 'clamp(13px, 1.5vw, 14px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--t2)',
            }}
          >
            {steps[2].body}
          </div>
        </div>
      </div>

      {/* Mobile Flow Container - with straight line connections */}
      <div
        ref={mobileLineRef}
        className="mobile-flow"
        style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          display: mobileDisplay,
          flexDirection: 'column',
          gap: '0px',
          position: 'relative',
        }}
      >
        {/* Step 1 */}
        <div
          ref={setStepRef(0)}
          style={{
            position: 'relative',
            width: '100%',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(106,255,42,0.15)',
            borderRadius: '20px',
            padding: 'clamp(28px, 4vw, 32px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            marginBottom: '0px',
          }}
        >
          {/* Connecting line to step 2 */}
          <div 
            className="mobile-line"
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '30px',
              background: 'linear-gradient(180deg, rgba(106,255,42,0.4) 0%, rgba(106,255,42,0.1) 100%)',
              transformOrigin: 'top',
            }}
          />
          
          <div
            className="step-number"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '56px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--green) 0%, rgba(106,255,42,0.5) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            {steps[0].num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {steps[0].title}
          </div>
          <div
            style={{
              fontSize: 'clamp(14px, 3vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--t2)',
            }}
          >
            {steps[0].body}
          </div>
        </div>

        {/* Step 2 */}
        <div
          ref={setStepRef(1)}
          style={{
            position: 'relative',
            width: '100%',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(106,255,42,0.15)',
            borderRadius: '20px',
            padding: 'clamp(28px, 4vw, 32px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            marginTop: '30px',
            marginBottom: '0px',
          }}
        >
          {/* Connecting line to step 3 */}
          <div 
            className="mobile-line"
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '30px',
              background: 'linear-gradient(180deg, rgba(106,255,42,0.4) 0%, rgba(106,255,42,0.1) 100%)',
              transformOrigin: 'top',
            }}
          />
          
          <div
            className="step-number"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '56px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--green) 0%, rgba(106,255,42,0.5) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            {steps[1].num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {steps[1].title}
          </div>
          <div
            style={{
              fontSize: 'clamp(14px, 3vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--t2)',
            }}
          >
            {steps[1].body}
          </div>
        </div>

        {/* Step 3 */}
        <div
          ref={setStepRef(2)}
          style={{
            position: 'relative',
            width: '100%',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(106,255,42,0.15)',
            borderRadius: '20px',
            padding: 'clamp(28px, 4vw, 32px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            marginTop: '30px',
          }}
        >
          <div
            className="step-number"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '56px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--green) 0%, rgba(106,255,42,0.5) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            {steps[2].num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {steps[2].title}
          </div>
          <div
            style={{
              fontSize: 'clamp(14px, 3vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--t2)',
            }}
          >
            {steps[2].body}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        
        .flow-dot {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .mobile-line {
          animation: lineGrow 0.8s ease-out forwards;
        }
        
        @keyframes lineGrow {
          from {
            transform: translateX(-50%) scaleY(0);
          }
          to {
            transform: translateX(-50%) scaleY(1);
          }
        }
      `}</style>
    </div>
  )
}