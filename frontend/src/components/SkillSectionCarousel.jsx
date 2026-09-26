import { useEffect, useState } from 'react'
import { renderKeywordText } from '../utils/highlightText.jsx'

const ACCENTS = {
  frontend: { border: 'border-crimson', text: 'text-crimson', bg: 'bg-crimson' },
  backend: { border: 'border-gold', text: 'text-gold', bg: 'bg-gold' },
  iot: { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500' },
  tools: { border: 'border-border', text: 'text-muted', bg: 'bg-border' },
}

const AUTO_ADVANCE_MS = 5000

export default function SkillSectionCarousel({ sections }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || sections.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % sections.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, sections.length])

  if (!sections || sections.length === 0) return null

  const active = sections[index]
  const accent = ACCENTS[active.id] || ACCENTS.tools

  return (
    <div
      className="card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slot tabs — Skill1 / Skill2 / Skill3 / Defense, repurposed as domains */}
      <div className="flex flex-wrap gap-1 mb-6 -mt-1">
        {sections.map((s, i) => {
          const a = ACCENTS[s.id] || ACCENTS.tools
          const isActive = i === index
          return (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`px-3 py-2 text-xs font-display font-semibold uppercase tracking-wide border-b-2 transition-colors ${
                isActive ? `${a.text} ${a.border}` : 'text-muted border-transparent hover:text-text'
              }`}
            >
              {s.title}
            </button>
          )
        })}
      </div>

      {/* Skill card */}
      <div className="flex items-start gap-4 mb-4">
        <span className="tab-num shrink-0">
          <span>{active.weight}</span>
        </span>
        <div className="min-w-0">
          <p className="font-display text-2xl font-semibold text-text leading-tight">
            {active.title}{' '}
            <span className="text-muted text-base font-normal">
              ×{active.tools.length}
            </span>
          </p>
          <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px] text-muted tracking-widest uppercase">
            <span aria-hidden="true">{active.icon}</span>
            <span>slot weight</span>
            <span className={accent.text}>{active.weight}</span>
            <span className={`w-2.5 h-2.5 border ${accent.border} ${accent.bg}/30`} />
          </div>
        </div>
      </div>

      <p className="text-text/90 leading-relaxed text-sm">
        {renderKeywordText(active.description, accent.text)}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.title}`}
            className={`h-1 flex-1 transition-colors ${
              i === index ? accent.bg : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
