'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApply } from './Providers'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Meet the Team', href: '/meet-the-team' },
  { label: 'Careers', href: '/careers' },
]

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Navbar() {
  const pathname = usePathname()
  const { open } = useApply()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--pad)',
          borderBottom: '1px solid var(--line2)',
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Image src="/logo.png" alt="WAGMI Media" width={60} height={32} />
        </Link>

        {/* Center links — desktop */}
        <div
          className="nav-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: '12px',
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.01em',
                  color: isActive ? 'var(--green)' : 'var(--t3)',
                  textDecoration: 'none',
                  padding: '0 16px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--t1)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--t3)' }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* CTA — desktop */}
        <button
          onClick={open}
          className="nav-cta"
          style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--black)',
            background: 'var(--white)',
            border: 'none',
            padding: '8px 18px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'background 0.2s, transform 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Apply Now
        </button>

        {/* Hamburger — mobile */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '1.5px',
            background: 'var(--white)',
            transition: 'transform 0.3s ease',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px',
            background: 'var(--white)',
            transition: 'opacity 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px',
            background: 'var(--white)',
            transition: 'transform 0.3s ease',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>

        <style>{`
          @media (max-width: 768px) {
            .nav-center { display: none !important; }
            .nav-cta { display: none !important; }
            .nav-burger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '52px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px var(--pad) 60px',
              overflowY: 'auto',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {navLinks.map(({ label, href }, i) => {
                const isActive = pathname === href
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.05, duration: 0.4, ease }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-bricolage), sans-serif',
                        fontSize: 'clamp(28px, 8vw, 44px)',
                        fontWeight: 800,
                        letterSpacing: '-0.025em',
                        color: isActive ? 'var(--green)' : 'var(--white)',
                        textDecoration: 'none',
                        padding: '16px 0',
                        borderBottom: '1px solid var(--line2)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--t2)' }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--white)' }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.4, ease }}
              style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <button
                onClick={() => { setMenuOpen(false); open() }}
                style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '15px', fontWeight: 700, letterSpacing: '0.04em',
                  color: 'var(--black)', background: 'var(--green)',
                  border: 'none', padding: '16px 32px', cursor: 'pointer',
                  display: 'inline-block', alignSelf: 'flex-start',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Apply Now →
              </button>
              <a
                href="mailto:aghasaad@wagmihq.com"
                style={{ fontSize: '13px', fontWeight: 300, color: 'var(--t3)', textDecoration: 'none' }}
              >
                aghasaad@wagmihq.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
