'use client'

import { useState } from 'react'
import PolicyModal from './PolicyModal'
import { useApply } from './Providers'

type PolicyKey = 'privacy' | 'terms' | 'cookie' | 'refund' | null

const policies: Record<Exclude<PolicyKey, null>, { title: string; body: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    body: (
      <>
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Last updated: January 1, 2025</strong></p>
        <br />
        <p>WAGMI Media LLC (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or engage with our services.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Information We Collect</strong></p>
        <p>We may collect information you provide directly, such as your name, email address, and business details when you apply to work with us or contact us. We also collect usage data automatically through cookies and analytics tools.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>How We Use Your Information</strong></p>
        <p>We use collected information to respond to inquiries, deliver our services, improve our website, and communicate relevant updates. We do not sell your personal data to third parties.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Data Retention</strong></p>
        <p>We retain your personal data only as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Contact</strong></p>
        <p>For privacy-related inquiries, contact us at aghasaad@wagmihq.com.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    body: (
      <>
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Last updated: January 1, 2025</strong></p>
        <br />
        <p>By accessing or using WAGMI Media&apos;s website and services, you agree to be bound by these Terms of Service. Please read them carefully.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Services</strong></p>
        <p>WAGMI Media provides content strategy, production, and distribution services. The specific scope of work is defined in individual client agreements. All services are subject to availability and our sole discretion to accept or decline engagements.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Intellectual Property</strong></p>
        <p>Content produced by WAGMI Media for clients becomes the client&apos;s property upon full payment. Our proprietary processes, templates, and systems remain the exclusive property of WAGMI Media LLC.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Limitation of Liability</strong></p>
        <p>WAGMI Media shall not be liable for indirect, incidental, or consequential damages arising from use of our services. Our total liability is limited to the fees paid in the preceding 30 days.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Governing Law</strong></p>
        <p>These terms are governed by the laws of the State of Delaware, United States.</p>
      </>
    ),
  },
  cookie: {
    title: 'Cookie Policy',
    body: (
      <>
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Last updated: January 1, 2025</strong></p>
        <br />
        <p>This Cookie Policy explains how WAGMI Media LLC uses cookies and similar tracking technologies on our website.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>What Are Cookies</strong></p>
        <p>Cookies are small text files stored on your device when you visit a website. They help us understand how you use our site and improve your experience.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Types of Cookies We Use</strong></p>
        <p><em>Essential cookies</em> — Required for the website to function. They cannot be disabled.</p>
        <p><em>Analytics cookies</em> — Help us understand visitor behaviour (e.g. Google Analytics). These are anonymised.</p>
        <p><em>Marketing cookies</em> — Used to track the effectiveness of our campaigns. These are only set with your consent.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Managing Cookies</strong></p>
        <p>You can control and delete cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Contact</strong></p>
        <p>Questions about our cookie use? Email aghasaad@wagmihq.com.</p>
      </>
    ),
  },
  refund: {
    title: 'Refund Policy',
    body: (
      <>
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Last updated: January 1, 2025</strong></p>
        <br />
        <p>At WAGMI Media, we stand behind the quality of our work. This policy outlines the terms under which refunds may be issued.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>General Policy</strong></p>
        <p>Due to the custom and time-intensive nature of content production, all payments are generally non-refundable once work has commenced. We encourage clients to review all proposals carefully before signing.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Pre-Production Cancellations</strong></p>
        <p>If a project is cancelled before production begins (within 48 hours of payment), a full refund will be issued minus any applicable processing fees.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Mid-Production Cancellations</strong></p>
        <p>If you cancel after work has commenced, you will be charged for work completed to date. Any remaining balance will be refunded within 14 business days.</p>
        <br />
        <p><strong style={{ color: 'var(--white)', fontWeight: 500 }}>Disputes</strong></p>
        <p>If you believe there has been an error in billing or service delivery, contact us at aghasaad@wagmihq.com within 14 days of the charge.</p>
      </>
    ),
  },
}

const footerLinks: { label: string; key: Exclude<PolicyKey, null> }[] = [
  { label: 'Privacy Policy', key: 'privacy' },
  { label: 'Terms of Service', key: 'terms' },
  { label: 'Cookie Policy', key: 'cookie' },
  { label: 'Refund Policy', key: 'refund' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/wagmimedia',
    abbr: 'IG',
    // SVG path for Instagram
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/wagmimedia',
    abbr: 'FB',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/wagmimedia',
    abbr: 'TW',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/15551234567',
    abbr: 'WA',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
]

function SocialLink({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        border: '1px solid var(--line2)',
        color: 'var(--t3)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s',
        background: 'transparent',
        flexShrink: 0,
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.borderColor = 'var(--green)'
        e.currentTarget.style.color = 'var(--green)'
        e.currentTarget.style.background = 'rgba(106,255,42,0.06)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.borderColor = 'var(--line2)'
        e.currentTarget.style.color = 'var(--t3)'
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {icon}
    </a>
  )
}

export default function Footer() {
  const [openPolicy, setOpenPolicy] = useState<PolicyKey>(null)
  const { open } = useApply()

  return (
    <>
      <footer style={{ background: 'var(--off)', borderTop: '1px solid var(--line2)' }}>

        {/* ── Mid strip: email + socials ───────────────────────── */}
        <div style={{
          padding: '20px var(--pad)',
          borderBottom: '1px solid var(--line2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          {/* Email */}
          <a
            href="mailto:aghasaad@wagmihq.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
          >
            {/* Mail icon */}
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid var(--line2)', color: 'var(--green)', flexShrink: 0,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              fontWeight: 500,
              color: 'var(--t2)',
              letterSpacing: '-0.01em',
            }}>
              aghasaad@wagmihq.com
            </span>
          </a>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--t4)', marginRight: '8px',
            }}>
              Follow
            </span>
            {socials.map(s => (
              <SocialLink key={s.label} label={s.label} href={s.href} icon={s.icon} />
            ))}
          </div>
        </div>

        {/* ── Big WAGMI wordmark ───────────────────────────────── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line2)',
          padding: 'clamp(24px, 4vw, 48px) 0 0',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--off) 0%, transparent 8%, transparent 92%, var(--off) 100%)',
            pointerEvents: 'none', zIndex: 1,
          }} />
          <div style={{
            fontSize: 'clamp(100px, 22vw, 280px)',
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            textAlign: 'center',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(106,255,42,0.2)',
            userSelect: 'none',
            display: 'block',
            width: '100%',
          }}>
            WAGMI
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div
          className="footer-bottom"
          style={{
            padding: '20px var(--pad)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Brand */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '13px', fontWeight: 700, color: 'var(--t3)',
              display: 'flex', alignItems: 'center', gap: '7px', textDecoration: 'none',
            }}
          >
            <span style={{
              width: '6px', height: '6px', background: 'var(--green)',
              borderRadius: '50%', opacity: 0.5, display: 'inline-block',
            }} />
            WAGMI Media LLC
          </a>

          {/* Policy links */}
          <div className="footer-links" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {footerLinks.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setOpenPolicy(key)}
                style={{
                  fontSize: '11px', fontWeight: 400, color: 'var(--t4)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.03em', transition: 'color 0.2s', padding: 0,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = 'var(--t4)')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t4)' }}>
            &copy; 2025 WAGMI Media LLC
          </span>
        </div>

        {/* Dock spacer — desktop only */}
        <div className="dock-spacer" style={{ height: '72px' }} />
      </footer>

      {footerLinks.map(({ key }) => (
        <PolicyModal
          key={key}
          isOpen={openPolicy === key}
          onClose={() => setOpenPolicy(null)}
          title={policies[key].title}
        >
          {policies[key].body}
        </PolicyModal>
      ))}

      <style>{`
        @media (min-width: 769px) {
          .dock-spacer { display: block; }
        }
        @media (max-width: 768px) {
          .dock-spacer { display: none; }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .footer-links { gap: 12px !important; }
        }
        @media (max-width: 520px) {
          .footer-mid-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </>
  )
}