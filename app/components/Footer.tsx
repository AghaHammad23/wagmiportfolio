'use client'

import { useState } from 'react'
import Image from 'next/image'
import PolicyModal from './PolicyModal'
import { useApply } from './Providers'

type PolicyKey = 'privacy' | 'terms' | 'cookie' | 'refund' | null

const policies: Record<
  Exclude<PolicyKey, null>,
  { title: string; body: React.ReactNode }
> = {
  privacy: {
    title: 'Privacy Policy',
    body: (
      <>
        <p>
          <strong
            style={{ color: 'var(--white)', fontWeight: 500 }}
          >
            Last updated: January 1, 2025
          </strong>
        </p>
        <br />
        <p>
          WAGMI Media LLC (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your data when you visit
          our website or engage with our services.
        </p>
      </>
    ),
  },

  terms: {
    title: 'Terms of Service',
    body: (
      <>
        <p>
          <strong
            style={{ color: 'var(--white)', fontWeight: 500 }}
          >
            Last updated: January 1, 2025
          </strong>
        </p>
        <br />
        <p>
          By accessing or using WAGMI Media&apos;s website and services, you
          agree to be bound by these Terms of Service.
        </p>
      </>
    ),
  },

  cookie: {
    title: 'Cookie Policy',
    body: (
      <>
        <p>
          <strong
            style={{ color: 'var(--white)', fontWeight: 500 }}
          >
            Last updated: January 1, 2025
          </strong>
        </p>
        <br />
        <p>
          This Cookie Policy explains how WAGMI Media LLC uses cookies and
          similar tracking technologies on our website.
        </p>
      </>
    ),
  },

  refund: {
    title: 'Refund Policy',
    body: (
      <>
        <p>
          <strong
            style={{ color: 'var(--white)', fontWeight: 500 }}
          >
            Last updated: January 1, 2025
          </strong>
        </p>
        <br />
        <p>
          At WAGMI Media, we stand behind the quality of our work.
        </p>
      </>
    ),
  },
}

const footerLinks: {
  label: string
  key: Exclude<PolicyKey, null>
}[] = [
  { label: 'Privacy Policy', key: 'privacy' },
  { label: 'Terms of Service', key: 'terms' },
  { label: 'Cookie Policy', key: 'cookie' },
  { label: 'Refund Policy', key: 'refund' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/wagmimedia',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="0.5"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },

  {
    label: 'Facebook',
    href: 'https://facebook.com/wagmimedia',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },

  {
    label: 'X / Twitter',
    href: 'https://twitter.com/wagmimedia',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },

  {
    label: 'WhatsApp',
    href: 'https://wa.me/15551234567',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
]

function SocialLink({
  label,
  href,
  icon,
}: {
  label: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex items-center justify-center
        w-10 h-10 rounded-[10px]
        text-(--t3)
        transition-all duration-200
        hover:border-(--green)
        hover:text-(--green)
        hover:bg-[rgba(106,255,42,0.06)]
        hover:-translate-y-0.5
        shrink-0
      "
    >
      {icon}
    </a>
  )
}

export default function Footer() {
  const [openPolicy, setOpenPolicy] = useState<PolicyKey>(null)
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer
        style={{
          background: 'var(--hero-bg)',
          borderTop: '1px solid var(--line2)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* MID STRIP */}

        <div
          className="
            flex flex-col items-center text-center
            md:flex-row md:justify-between md:items-center md:text-left
          "
          style={{
            padding: '20px var(--pad)',
            borderBottom: '1px solid var(--line2)',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* EMAIL */}

          <a
            href="mailto:aghasaad@wagmihq.com"
            className="
              flex flex-col items-center text-center
              sm:flex-row sm:text-left
            "
            style={{
              gap: '10px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid var(--line2)',
                color: 'var(--green)',
                flexShrink: 0,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>

            <span
              style={{
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                fontWeight: 500,
                color: 'var(--t2)',
                letterSpacing: '-0.01em',
              }}
            >
              aghasaad@wagmihq.com
            </span>
          </a>

          {/* SOCIALS */}

          <div
            className="
              flex items-center justify-center
              w-full md:w-auto
            "
            style={{ gap: '8px' }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--t4)',
                marginRight: '8px',
              }}
            >
              Follow
            </span>

            {socials.map((s) => (
              <SocialLink
                key={s.label}
                label={s.label}
                href={s.href}
                icon={s.icon}
              />
            ))}
          </div>
        </div>

        {/* BIG WORDMARK - Now with Logo */}

        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid var(--line2)',
            padding: 'clamp(24px, 4vw, 48px) 0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, var(--hero-bg) 0%, transparent 8%, transparent 92%, var(--hero-bg) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          <div
            className="text-center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Image
              src="/wlogo.png"
              alt="WAGMI Media Logo"
              width={280}
              height={80}
              className="w-auto h-auto"
              style={{
                maxWidth: 'clamp(180px, 40vw, 280px)',
                height: 'auto',
              }}
              priority
            />
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div
          className="
            footer-bottom
            flex flex-col items-center text-center
            md:flex-row md:justify-between md:items-center md:text-left
          "
          style={{
            padding: '20px var(--pad)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* BRAND */}

          <a
            href="#"
            className="flex items-center justify-center"
            style={{
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--t3)',
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

          {/* POLICY LINKS — FIXED HOVER */}

          <div
            className="
              footer-links
              flex flex-wrap items-center justify-center
            "
            style={{ gap: '20px' }}
          >
            {footerLinks.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setOpenPolicy(key)}
                className="
                  transition-colors
                  text-(--t4)
                  hover:text-(--green)
                "
                style={{
                  fontSize: '11px',
                  fontWeight: 400,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  padding: 0,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* COPYRIGHT - Dynamic Year */}

          <span
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--t4)',
            }}
          >
            © {currentYear} WAGMI Media LLC
          </span>
        </div>

        {/* DESKTOP SPACER */}

        <div className="hidden md:block h-18" />
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