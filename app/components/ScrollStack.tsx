'use client'

import React, { useLayoutEffect, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[200px] my-5 p-10 rounded-2xl box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
  >
    {children}
  </div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  rotationAmount?: number
  blurAmount?: number
  onStackComplete?: () => void
}

/*
 * Uses window scroll events instead of creating a new Lenis instance,
 * so it integrates cleanly with the project's existing global Lenis.
 * Lenis v1.3 calls window.scrollTo() internally, which fires native
 * scroll events — so window.addEventListener('scroll', ...) works correctly.
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.025,
  itemStackDistance = 24,
  stackPosition = '18%',
  scaleEndPosition = '10%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number }>())
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef(false)

  const parsePercentage = useCallback((value: string, containerHeight: number) =>
    value.endsWith('%') ? (parseFloat(value) / 100) * containerHeight : parseFloat(value)
  , [])

  const update = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const scrollTop = window.scrollY
    const vh = window.innerHeight
    const stackPx = parsePercentage(stackPosition, vh)
    const scaleEndPx = parsePercentage(scaleEndPosition, vh)

    const endEl = document.querySelector<HTMLElement>('.scroll-stack-end')
    const endTop = endEl ? endEl.getBoundingClientRect().top + scrollTop : 0

    cards.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top + scrollTop
      const pinStart = cardTop - stackPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPx
      const pinEnd = endTop - vh / 2

      // Scale: shrinks as card scrolls into position
      const scaleProgress = scrollTop < pinStart ? 0 : scrollTop > triggerEnd ? 1 : (scrollTop - pinStart) / (triggerEnd - pinStart)
      const scale = 1 - scaleProgress * (1 - (baseScale + i * itemScale))

      // Translate: pin the card at the stacking position
      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i
      }

      const ty = Math.round(translateY * 10) / 10
      const sc = Math.round(scale * 1000) / 1000

      const last = lastTransformsRef.current.get(i)
      if (!last || Math.abs(last.translateY - ty) > 0.05 || Math.abs(last.scale - sc) > 0.0005) {
        card.style.transform = `translate3d(0, ${ty}px, 0) scale(${sc})`
        lastTransformsRef.current.set(i, { translateY: ty, scale: sc })
      }

      if (blurAmount) {
        let topIdx = 0
        cards.forEach((c, j) => {
          const top = c.getBoundingClientRect().top + scrollTop
          if (scrollTop >= top - stackPx - itemStackDistance * j) topIdx = j
        })
        const depth = i < topIdx ? topIdx - i : 0
        card.style.filter = depth > 0 ? `blur(${depth * blurAmount}px)` : ''
      }

      if (rotationAmount) {
        card.style.transform += ` rotate(${i * rotationAmount * scaleProgress}deg)`
      }
    })

    // Stack complete callback
    if (cards.length) {
      const lastCard = cards[cards.length - 1]
      const lTop = lastCard.getBoundingClientRect().top + scrollTop
      const lPin = lTop - stackPx - itemStackDistance * (cards.length - 1)
      const lEnd = endTop - vh / 2
      const inView = scrollTop >= lPin && scrollTop <= lEnd
      if (inView && !stackCompletedRef.current) { stackCompletedRef.current = true; onStackComplete?.() }
      else if (!inView && stackCompletedRef.current) { stackCompletedRef.current = false }
    }

    pendingRef.current = false
  }, [parsePercentage, stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale, blurAmount, rotationAmount, onStackComplete])

  const scheduleUpdate = useCallback(() => {
    if (pendingRef.current) return
    pendingRef.current = true
    rafRef.current = requestAnimationFrame(update)
  }, [update])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    cardsRef.current = cards

    cards.forEach((card, i) => {
      card.style.zIndex = String(i + 1)
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
    })

    update()

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      stackCompletedRef.current = false
      cardsRef.current = []
      lastTransformsRef.current.clear()
      pendingRef.current = false
    }
  }, [itemDistance, update, scheduleUpdate])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      {children}
      <div className="scroll-stack-end w-full h-px" />
    </div>
  )
}

export default ScrollStack
