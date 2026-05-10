'use client'

const footerLinks = [
  'Privacy Policy',
  'Terms of Service',
  'Cookie Policy',
  'Refund Policy',
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '24px var(--pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--off)',
        borderTop: '1px solid var(--line2)',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--t3)',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            background: 'var(--green)',
            borderRadius: '50%',
            opacity: 0.5,
            display: 'inline-block',
          }}
        />
        WAGMI Media LLC
      </a>

      {/* Links */}
      <div
        className="footer-links"
        style={{ display: 'flex', gap: '24px' }}
      >
        {footerLinks.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--t4)',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--t2)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t4)')}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t4)' }}>
        © 2025 WAGMI Media LLC · aghasaad@wagmihq.com
      </span>

      <style>{`
        @media (max-width: 768px) { .footer-links { display: none !important; } }
      `}</style>
    </footer>
  )
}
