type Item = { text: string; hi?: boolean }

export type TickerVariant = 'capabilities' | 'proof' | 'urgency'

/* Each set is written to bridge the sections it sits between. */
const sets: Record<TickerVariant, Item[]> = {
  // After the 5-layer process → before the proof reels.
  capabilities: [
    { text: 'Script Architecture', hi: true },
    { text: '60-Min Recording' },
    { text: 'Elite Editing', hi: true },
    { text: 'Distribution' },
    { text: 'Weekly Optimization', hi: true },
    { text: 'Done For You' },
  ],
  // After the bonus table / guarantees → before the testimonials.
  proof: [
    { text: '200+ Assets Produced', hi: true },
    { text: '12 to 24 Hr Delivery' },
    { text: '60 Minutes of Your Time', hi: true },
    { text: 'Delivery Guarantee' },
    { text: '100k Audience in 90 Days', hi: true },
    { text: 'Real Growth. Real Numbers.' },
  ],
  // After the testimonials → before the closing CTA.
  urgency: [
    { text: '2 Client Slots This Month', hi: true },
    { text: 'Now Accepting Applications' },
    { text: '$20k+/mo Operators Only', hi: true },
    { text: 'Response Within 48 Hours' },
    { text: 'Book a Call', hi: true },
    { text: 'WAGMI Media' },
  ],
}

/* Palette per variant, keyed to the section it follows. */
const themes: Record<TickerVariant, { bg: string; border: string; hi: string; dim: string }> = {
  capabilities: {
    bg: 'var(--section-bg)',
    border: 'rgba(123,214,165,0.16)',
    hi: 'var(--hero-gold)',
    dim: 'rgba(244,241,214,0.42)',
  },
  proof: {
    bg: 'var(--green2)',
    border: 'rgba(123,214,165,0.22)',
    hi: 'var(--card-cream)',
    dim: 'rgba(244,241,214,0.5)',
  },
  urgency: {
    bg: 'var(--hero-bg)',
    border: 'rgba(227,194,74,0.28)',
    hi: 'var(--hero-gold)',
    dim: 'rgba(244,241,214,0.45)',
  },
}

export default function Ticker({
  variant = 'capabilities',
}: {
  variant?: TickerVariant
}) {
  const theme = themes[variant]

  // Interleave separators, then double the run so the loop is seamless.
  const items = sets[variant].flatMap((item) => [item, { text: '·' }])
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        background: theme.bg,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        padding: 'clamp(12px, 1.4vw, 18px) 0',
      }}
    >
      <div className="ticker-track" style={{ display: 'flex', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: item.hi ? theme.hi : theme.dim,
              padding: '0 clamp(18px, 2.2vw, 32px)',
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
