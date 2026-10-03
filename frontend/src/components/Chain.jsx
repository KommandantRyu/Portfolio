// A short run of interlocking chain links — replaces the old rotating-gear
// motif. `links` controls how many ovals are drawn (alternating horizontal/
// vertical, the way real chain links interlock); `sway` makes it hang and
// swing gently instead of spinning.
export default function Chain({
  size = 16,
  links = 3,
  className = '',
  sway = false,
  swayDuration = '4.5s',
  reverse = false,
}) {
  const rx = size * 0.4375
  const ry = size * 0.2625
  const strokeWidth = size * 0.15
  const spacing = size * 0.6875
  const firstCx = size * 0.5
  const cy = size / 2

  const cxs = Array.from({ length: links }, (_, i) => firstCx + i * spacing)
  const width = Math.round(cxs[cxs.length - 1] + rx + 2)

  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${width} ${size}`}
      fill="none"
      className={`${className} ${sway ? 'chain-sway' : ''}`}
      style={sway ? { animationDuration: swayDuration, animationDirection: reverse ? 'reverse' : 'normal' } : undefined}
      aria-hidden="true"
    >
      {cxs.map((cx, i) => {
        const vertical = i % 2 === 1
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={vertical ? ry : rx}
            ry={vertical ? rx : ry}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        )
      })}
    </svg>
  )
}
