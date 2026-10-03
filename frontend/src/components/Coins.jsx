// Row of gold coin pips, painted entirely in CSS from a --coins custom
// property. The count for each tool/section lives in index.css (search
// "COIN COUNTS") keyed by a slug of its name — add, remove, or change
// coins there without touching this component or any page.
function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function Coins({ tool, size = 'md', className = '' }) {
  return (
    <span
      className={`coins ${size === 'sm' ? 'coins-sm' : ''} ${className}`}
      data-coin-key={slugify(tool)}
      aria-hidden="true"
    />
  )
}
