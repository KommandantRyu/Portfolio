import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'

const ACCENTS = {
  gold: {
    border: 'border-gold',
    text: 'text-gold',
    bg: 'bg-gold/10',
  },
  crimson: {
    border: 'border-crimson',
    text: 'text-crimson',
    bg: 'bg-crimson/10',
  },
  emerald: {
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  border: {
    border: 'border-border',
    text: 'text-muted',
    bg: 'bg-panel/60',
  },
}

export default function BeyondCode() {
  const { category: activeSlug } = useParams()
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    fetch(apiUrl('/api/beyond-code'))
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setCategories(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const active =
    categories.find((c) => c.slug === activeSlug) || categories[0]

  return (
    <section>
      <PageHeader
        eyebrow="beyond code"
        title="What I do outside of coding"
        description="Pick a station to see what's there — pulled from the Express API."
      />

      {status === 'loading' && <p className="text-muted">Loading…</p>}

      {status === 'error' && (
        <div className="card max-w-prose">
          <p className="text-text font-medium mb-1">Couldn't reach the backend.</p>
          <p className="text-muted text-sm">
            Make sure the Express server is running on port 5000
            (<code className="font-mono">npm start</code> inside{' '}
            <code className="font-mono">api/</code>).
          </p>
        </div>
      )}

      {status === 'ready' && (
        <div className="grid md:grid-cols-[220px_1fr] gap-6 items-start">
          {/* Station list — the Drive-screen station selector */}
          <nav className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {categories.map((cat) => {
              const accent = ACCENTS[cat.accent] || ACCENTS.border
              const isActive = active?.slug === cat.slug
              return (
                <Link
                  key={cat.slug}
                  to={`/beyond-code/${cat.slug}`}
                  className={`notch shrink-0 md:shrink flex items-center gap-2 border px-4 py-3 transition-colors whitespace-nowrap ${
                    accent.border
                  } ${isActive ? accent.bg : 'bg-panel/40 hover:bg-panel/70'}`}
                >
                  <span aria-hidden="true">{cat.emoji}</span>
                  <span className={`font-display text-sm font-semibold uppercase tracking-wide ${
                    isActive ? accent.text : 'text-text'
                  }`}>
                    {cat.title}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Detail pane — the map-equivalent, shows the selected station's contents */}
          {active && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <span className="tab-num">
                  <span>{String(categories.indexOf(active) + 1).padStart(2, '0')}</span>
                </span>
                <span className="text-2xl" aria-hidden="true">{active.emoji}</span>
                <h2 className="font-display text-xl font-semibold text-text">
                  {active.title}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {active.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex gap-3 border-l-2 border-border hover:border-gold transition-colors bg-ink/40 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="notch-sm w-16 h-16 object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-text leading-tight mb-1.5">
                        {item.name}
                      </p>
                      <p className="font-mono text-[10px] text-gold tracking-widest uppercase mb-1">
                        {active.detailLabel}
                      </p>
                      <p className="text-muted text-xs leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
