'use client'

import { useState } from 'react'
import Image from 'next/image'
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

export default function Footer() {
  const [openPolicy, setOpenPolicy] = useState<PolicyKey>(null)
  const { open } = useApply()

  return (
    <>
      <footer style={{ background: 'var(--off)', borderTop: '1px solid var(--line2)' }}>
        {/* Contact strip */}
        <div style={{
          padding: 'clamp(40px, 6vw, 72px) var(--pad)',
          borderBottom: '1px solid var(--line2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--t4)',
              marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--t4)', display: 'inline-block' }} />
              Get in Touch
            </div>
            <p style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800,
              letterSpacing: '-0.025em', color: 'var(--white)',
              lineHeight: 1.1, marginBottom: '16px',
            }}>
              Ready to build your<br />
              <em style={{ fontStyle: 'normal', color: 'var(--t3)' }}>content engine?</em>
            </p>
            <a
              href="mailto:aghasaad@wagmihq.com"
              style={{
                fontSize: '14px', fontWeight: 300, color: 'var(--t2)',
                textDecoration: 'none', letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--t2)')}
            >
              aghasaad@wagmihq.com
            </a>
          </div>
          <button
            onClick={open}
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
              color: 'var(--black)', background: 'var(--white)',
              border: 'none', padding: '14px 32px', cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Apply to Work With Us →
          </button>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '20px var(--pad)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
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

          <div className="footer-links" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {footerLinks.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setOpenPolicy(key)}
                style={{
                  fontSize: '11px', fontWeight: 400, color: 'var(--t4)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.03em', transition: 'color 0.2s', padding: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--t4)')}
              >
                {label}
              </button>
            ))}
          </div>

          <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--t4)' }}>
            © 2025 WAGMI Media LLC
          </span>
        </div>
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
    </>
  )
}
