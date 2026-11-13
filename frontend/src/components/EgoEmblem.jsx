import { sinRgb } from '../utils/sinColors.js'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/**
 * One circular slot on the Beyond Code selection screen — Limbus's
 * E.G.O pick row: ringed circular portrait, roman-numeral badge,
 * angled tier plate (ZAYIN…ALEPH), name underneath.
 *
 * `selected` drives the gold pointer + brightened art; hover/focus
 * mirror it via CSS. The whole slot is a <button> (selection is
 * handled by the parent — click/Enter navigates).
 */
export default function EgoEmblem({
  category,
  index,
  selected = false,
  onSelect,
  onActivate,
}) {
  const sin = sinRgb(category.sin)
  const fallback = '/images/beyond-code/placeholder.svg'

  return (
    <button
      type="button"
      className={`ego-slot${selected ? ' is-selected' : ''}`}
      style={{ '--sin': sin }}
      aria-label={`Open ${category.title}`}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onActivate}
    >
      <span className="ego-portrait">
        <span className="ego-portrait-inner">
          <img
            src={category.cover || fallback}
            alt=""
            loading="lazy"
            onError={(e) => {
              // Missing cover file → shared placeholder art
              e.currentTarget.onerror = null
              e.currentTarget.src = fallback
            }}
          />
        </span>
        <span className="ego-roman" aria-hidden="true">
          {ROMAN[index] || index + 1}
        </span>
      </span>

      <span className="ego-tier">{category.tier || '—'}</span>

      <span className="ego-name">{category.title}</span>
    </button>
  )
}
