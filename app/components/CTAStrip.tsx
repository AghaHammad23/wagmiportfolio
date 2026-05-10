'use client'

interface CTAStripProps {
  text: string
}

export default function CTAStrip({ text }: CTAStripProps) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--line2)',
        padding: 'clamp(24px, 3vw, 40px) var(--pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
        background: 'var(--off)',
      }}
    >
      <span
        style={{
          fontSize: '14px',
          fontWeight: 300,
          color: 'var(--t2)',
          maxWidth: '480px',
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.01em',
          color: 'var(--black)',
          background: 'var(--white)',
          border: 'none',
          padding: '14px 32px',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'background 0.2s, transform 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#e0e0e0'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--white)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Apply to Work With Us
      </a>

      <style>{`
        @media (max-width: 768px) {
          .cta-strip-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  )
}
