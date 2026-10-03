import { useEffect, useState } from 'react'
import { renderKeywordText } from '../utils/highlightText.jsx'
import Coins from './Coins.jsx'
import Gauge from './Gauge.jsx'

const ACCENTS = {
  languages: { border: 'border-sin-pride', text: 'text-sin-pride', bg: 'bg-sin-pride' },
  frontend: { border: 'border-crimson', text: 'text-crimson', bg: 'bg-crimson' },
  backend: { border: 'border-gold', text: 'text-gold', bg: 'bg-gold' },
  iot: { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500' },
  tools: { border: 'border-muted', text: 'text-muted', bg: 'bg-muted' },
}

const AUTO_ADVANCE_MS = 6000

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

export default function SkillSectionCarousel({ sections }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion] = useState(prefersReducedMotion)

  // A fresh timeout per slide: picking a tab by hand restarts the countdown,
  // and people who ask for reduced motion get manual control only.
  useEffect(() => {
    if (paused || reduceMotion || sections.length <= 1) return
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % sections.length)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(timer)
  }, [paused, reduceMotion, index, sections.length])

  if (!sections || sections.length === 0) return null

  const active = sections[index]
  const accent = ACCENTS[active.id] || ACCENTS.tools
  const progress = sections.length > 1 ? index / (sections.length - 1) : 0

  return (
    <div
      className="card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="brass-plate">skill index</span>
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
          {reduceMotion ? 'manual' : paused ? 'paused' : 'auto-cycling'} · {index + 1}/{sections.length}
        </span>
      </div>

      <div className="grid md:grid-cols-[180px_1fr] gap-6">
        {/* Section tabs */}
        <nav
          aria-label="Skill sections"
          className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
        >
          {sections.map((s, i) => {
            const a = ACCENTS[s.id] || ACCENTS.tools
            const isActive = i === index
            return (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-current={isActive}
                className={`notch-sm shrink-0 flex items-center justify-between gap-3 border px-3 py-2 text-left transition-colors ${
                  isActive ? `${a.border} bg-panel` : 'border-border hover:border-muted'
                }`}
              >
                <span
                  className={`font-display text-xs font-semibold uppercase tracking-wide ${
                    isActive ? a.text : 'text-text'
                  }`}
                >
                  {s.title}
                </span>
                <Coins tool={`section-${s.id}`} size="sm" />
              </button>
            )
          })}
        </nav>

        {/* Active section */}
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Coins tool={`section-${active.id}`} />
              <p className="font-display text-2xl font-semibold text-text leading-tight mt-2">
                {active.title}{' '}
                <span className="text-muted text-base font-normal">×{active.entries.length}</span>
              </p>
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase mt-1.5">
                <span aria-hidden="true">{active.icon}</span> section {index + 1}
              </p>
            </div>
            <Gauge value={progress} className="w-14 h-14" />
          </div>

          <p className="text-text/90 leading-relaxed text-sm">
            {renderKeywordText(active.description, accent.text)}
          </p>

          <ul className="mt-5 space-y-2">
            {active.entries.map((entry) => (
              <li key={entry.name} className={`border-l-2 ${accent.border} bg-ink/40 px-3 py-2.5`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-sm font-semibold text-text">{entry.name}</span>
                  <Coins tool={entry.name} size="sm" />
                </div>
                <p className="text-muted text-xs leading-relaxed mt-1">
                  {renderKeywordText(entry.note, accent.text)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress bars */}
      <div className="flex gap-2 mt-6">
        {sections.map((s, i) => {
          const a = ACCENTS[s.id] || ACCENTS.tools
          return (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.title}`}
              className={`h-1 flex-1 transition-colors ${i === index ? a.bg : 'bg-border'}`}
            />
          )
        })}
      </div>
    </div>
  )
}
