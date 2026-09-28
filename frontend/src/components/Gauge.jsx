// Brass pressure gauge whose needle sweeps from lower-left, over the top,
// to lower-right as `value` goes 0 -> 1 (uses the .gauge CSS dial).
// Pass `decorative` for purely ornamental dials so screen readers skip them.
export default function Gauge({ value = 0, className = '', decorative = false, label }) {
  const v = Math.max(0, Math.min(1, value))
  const angle = 150 + v * 240
  const a11y = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label || `Gauge at ${Math.round(v * 100)} percent` }

  return (
    <span
      className={`gauge inline-block shrink-0 ${className}`}
      style={{ '--needle': `${angle}deg` }}
      {...a11y}
    />
  )
}
