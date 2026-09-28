// Row of gold coin pips — the coin count shown on each skill (1-3).
export default function Coins({ count = 1, size = 'md', className = '' }) {
  const n = Math.max(0, Math.min(5, count))
  return (
    <span
      className={`inline-flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`${n} coin${n === 1 ? '' : 's'}`}
    >
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={size === 'sm' ? 'coin coin-sm' : 'coin'} />
      ))}
    </span>
  )
}
