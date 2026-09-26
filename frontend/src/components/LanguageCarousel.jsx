import { useEffect, useState } from 'react'
import { renderKeywordText } from '../utils/highlightText.jsx'

const AUTO_ADVANCE_MS = 5000

export default function LanguageCarousel({ languages }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || !languages || languages.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % languages.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, languages])

  if (!languages || languages.length === 0) return null

  const goTo = (i) => setIndex((i + languages.length) % languages.length)
  const active = languages[index]

  return (
    <div
      className="card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">languages I use</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous language"
          className="text-muted hover:text-text notch-sm border border-border w-9 h-9 flex items-center justify-center shrink-0"
        >
          ‹
        </button>

        <div className="flex-1">
          <div className="flex items-start gap-4 mb-3">
            <span className="tab-num shrink-0">
              <span>{active.weight}</span>
            </span>
            <div className="min-w-0">
              <p className="font-display text-2xl font-semibold text-crimson leading-tight">
                {active.name}
              </p>
              <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px] text-muted tracking-widest uppercase">
                <span aria-hidden="true">{active.icon}</span>
                <span>slot weight</span>
                <span className="text-crimson">{active.weight}</span>
              </div>
            </div>
          </div>
          <p className="text-text/90 leading-relaxed text-sm">
            {renderKeywordText(active.description, 'text-crimson')}
          </p>
        </div>

        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next language"
          className="text-muted hover:text-text notch-sm border border-border w-9 h-9 flex items-center justify-center shrink-0"
        >
          ›
        </button>
      </div>

      <div className="flex gap-2 mt-6">
        {languages.map((lang, i) => (
          <button
            key={lang.name}
            onClick={() => goTo(i)}
            aria-label={`Show ${lang.name}`}
            className={`h-1 flex-1 transition-colors ${
              i === index ? 'bg-crimson' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
