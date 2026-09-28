export default function Gear({ size = 20, className = '', spin = false, spinDuration = '20s', reverse = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} ${spin ? 'gear-spin' : ''}`}
      style={spin ? { animationDuration: spinDuration, animationDirection: reverse ? 'reverse' : 'normal' } : undefined}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm9.4 2.6-1.75-.3a7.7 7.7 0 0 0-.55-1.32l1.03-1.45a.6.6 0 0 0-.07-.77l-1.34-1.34a.6.6 0 0 0-.77-.07l-1.45 1.03a7.7 7.7 0 0 0-1.32-.55l-.3-1.75a.6.6 0 0 0-.59-.5h-1.9a.6.6 0 0 0-.6.5l-.3 1.75c-.47.14-.91.32-1.32.55L8.72 5.35a.6.6 0 0 0-.77.07L6.6 6.76a.6.6 0 0 0-.07.77l1.02 1.45c-.23.41-.41.85-.55 1.32l-1.75.3a.6.6 0 0 0-.5.6v1.9a.6.6 0 0 0 .5.59l1.75.3c.14.47.32.91.55 1.32L6.53 16.7a.6.6 0 0 0 .07.77l1.34 1.34a.6.6 0 0 0 .77.07l1.45-1.03c.41.23.85.41 1.32.55l.3 1.75a.6.6 0 0 0 .6.5h1.9a.6.6 0 0 0 .59-.5l.3-1.75c.47-.14.91-.32 1.32-.55l1.45 1.03a.6.6 0 0 0 .77-.07l1.34-1.34a.6.6 0 0 0 .07-.77l-1.03-1.45c.23-.41.41-.85.55-1.32l1.75-.3a.6.6 0 0 0 .5-.59v-1.9a.6.6 0 0 0-.5-.6Z"
      />
    </svg>
  )
}
