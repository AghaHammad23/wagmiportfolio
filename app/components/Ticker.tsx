const items = [
  { text: 'Content Strategy', hi: true },
  { text: '·', hi: false },
  { text: 'Short-Form Video', hi: false },
  { text: '·', hi: false },
  { text: '7 Billion Views Generated', hi: true },
  { text: '·', hi: false },
  { text: 'Long-Form Production', hi: false },
  { text: '·', hi: false },
  { text: 'Done For You', hi: true },
  { text: '·', hi: false },
  { text: '300+ Brands Served', hi: false },
  { text: '·', hi: false },
  { text: 'Script Development', hi: true },
  { text: '·', hi: false },
  { text: 'Community Building', hi: false },
  { text: '·', hi: false },
  { text: 'Weekly Optimisation', hi: true },
  { text: '·', hi: false },
  { text: 'WAGMI Media', hi: false },
  { text: '·', hi: false },
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)',
        background: 'var(--off)',
        padding: '14px 0',
      }}
    >
      <div
        className="ticker-track"
        style={{ display: 'flex', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: item.hi ? 'rgba(106,255,42,0.5)' : 'var(--t4)',
              padding: '0 32px',
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
