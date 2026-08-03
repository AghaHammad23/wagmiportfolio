'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApply } from './Providers'
import Dock, { type DockItemData } from './Dock'
import {
  HiHome,
  HiBriefcase,
  HiUserGroup,
  HiAcademicCap,
  HiPaperAirplane,
} from 'react-icons/hi2'

const navLinks = [
  { label: 'Home', href: '/', icon: <HiHome size={18} /> },
  { label: 'Work', href: '/work', icon: <HiBriefcase size={18} /> },
  // Services is hidden from navigation for now — the route still exists and is
  // reachable directly at /services.
  // { label: 'Services', href: '/services', icon: <HiSparkles size={18} /> },
  { label: 'Meet the Team', href: '/meet-the-team', icon: <HiUserGroup size={18} /> },
  { label: 'Careers', href: '/careers', icon: <HiAcademicCap size={18} /> },
]

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { open } = useApply()
  const [menuOpen, setMenuOpen] = useState(false)
  // The bottom dock stays hidden while the page is at the top and slides up
  // once the user scrolls away from it.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const dockItems: DockItemData[] = [
    ...navLinks.map(({ label, href, icon }) => ({
      icon,
      label,
      onClick: () => router.push(href),
      isActive: pathname === href,
    })),
    {
      icon: <HiPaperAirplane size={18} />,
      label: 'Apply Now',
      onClick: open,
      isActive: false,
    },
  ]

  return (
    <>
      {/* Desktop top header — logo left, links centre, CTA right */}
      <header
        className="desktop-header"
        style={{
          /* Absolute, not fixed: it sits on the page and scrolls away with the
             hero rather than animating out on its own. */
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '0 var(--pad)',
          background: 'transparent',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          <Image src="/logo.png" alt="WAGMI Media" width={116} height={30} priority />
        </Link>

        {/* Centre links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(18px, 2.4vw, 38px)' }}>
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="header-link"
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-jakarta), sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--hero-gold)' : 'var(--hero-cream)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.25s ease',
                }}
              >
                {label}
                <span
                  aria-hidden="true"
                  className="header-underline"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-6px',
                    height: '1px',
                    background: 'var(--hero-gold)',
                    transform: `scaleX(${isActive ? 1 : 0})`,
                    transformOrigin: 'left center',
                    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <button onClick={open} className="header-cta">
          Book a Call
        </button>
      </header>

      {/* Mobile-only top bar */}
      <nav
        className="mobile-nav"
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
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Image src="/logo.png" alt="WAGMI Media" width={60} height={32} />
        </Link>

        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
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
      </nav>

      {/* Desktop dock — hidden at the top of the page, slides up on scroll */}
      <div
        className="desktop-dock"
        aria-hidden={!scrolled}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: scrolled ? 'translateY(0)' : 'translateY(120%)',
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
        }}
      >
        <Dock
          items={dockItems}
          panelHeight={40}
          baseItemSize={42}
          magnification={72}
          distance={150}
        />
      </div>

      {/* Mobile full-screen menu overlay */}
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

      <style>{`
        .header-link:hover { color: var(--hero-gold) !important; }
        .header-link:hover .header-underline { transform: scaleX(1) !important; }

        .header-cta {
          flex-shrink: 0;
          font-family: var(--font-jakarta), sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--hero-bg);
          background: var(--card-cream);
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 11px 24px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.28s ease, color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease;
        }
        .header-cta:hover {
          background: var(--hero-gold);
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(227,194,74,0.28);
        }

        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-dock, .desktop-header { display: none !important; }
        }
        /* Drop the centre links before they collide with the logo and CTA */
        @media (max-width: 1080px) and (min-width: 769px) {
          .desktop-header nav { gap: 16px !important; }
          .desktop-header nav a { font-size: 11px !important; }
        }
      `}</style>
    </>
  )
}
