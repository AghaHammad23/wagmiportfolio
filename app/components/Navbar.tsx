'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Meet the Team', href: '/meet-the-team' },
  { label: 'Careers', href: '/careers' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
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

      {/* Center links */}
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
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--t1)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--t3)'
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* CTA */}
      <Link
        href="#"
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
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'background 0.2s, transform 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--green)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--white)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Apply Now
      </Link>

      <style>{`
        @media (max-width: 768px) { .nav-center { display: none !important; } }
      `}</style>
    </nav>
  )
}
