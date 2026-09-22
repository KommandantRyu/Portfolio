import { useState } from 'react'

export default function LanguageCarousel({ languages }) {
  const [index, setIndex] = useState(0)

  if (!languages || languages.length === 0) return null

  const goTo = (i) => setIndex((i + languages.length) % languages.length)

  return (
    <div className="card">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">languages I use</p>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous language"
          className="text-muted hover:text-text notch-sm border border-border w-9 h-9 flex items-center justify-center shrink-0"
        >
          ‹
        </button>

        <div className="flex-1 text-center py-6">
          <p className="font-display text-3xl md:text-4xl font-semibold text-crimson">
            {languages[index]}
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

      <div className="flex justify-center gap-2 mt-2">
        {languages.map((lang, i) => (
          <button
            key={lang}
            onClick={() => goTo(i)}
            aria-label={`Show ${lang}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'bg-crimson' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
