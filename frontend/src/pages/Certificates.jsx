import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'certificate', label: 'Certificates' },
  { value: 'seminar', label: 'Seminars' },
]

const PLACEHOLDER = '/images/certificates/placeholder.svg'

export default function Certificates() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [filter, setFilter] = useState('all') // all | certificate | seminar

  useEffect(() => {
    fetch(apiUrl('/api/certificates'))
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setItems(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const visible =
    filter === 'all' ? items : items.filter((item) => item.type === filter)

  return (
    <section>
      <PageHeader
        eyebrow="certificates & seminars"
        title="Papers I've earned"
        description="Certificates completed and seminars attended — pulled live from the Express API — edit api/index.js to add your own."
      />

      {status === 'loading' && (
        <p className="text-muted">Loading credentials…</p>
      )}

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
        <>
          {/* Filter tabs: All / Certificates / Seminars */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`notch-sm font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${
                  filter === f.value
                    ? 'text-crimson border-crimson'
                    : 'text-muted border-border hover:text-text'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-muted">Nothing here yet — check back soon.</p>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {visible.map((item, i) => (
              <article key={item.id} className="card flex flex-col">
                <div className="relative mb-4">
                  <img
                    src={item.image || PLACEHOLDER}
                    alt={`${item.title} — ${item.issuer}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = PLACEHOLDER
                    }}
                    className="notch-sm w-full h-40 object-cover border border-border"
                  />
                  <span
                    className={`absolute top-2 left-2 notch-sm font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border bg-ink/80 ${
                      item.type === 'seminar'
                        ? 'text-gold border-gold/50'
                        : 'text-crimson border-crimson/50'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="tab-num">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <h2 className="font-display text-xl font-semibold text-text">
                    {item.title}
                  </h2>
                </div>
                <p className="font-mono text-xs text-muted mb-2">
                  {item.issuer} · {item.date}
                </p>
                {item.note && (
                  <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                    {item.note}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold text-sm font-medium hover:underline mt-auto"
                  >
                    Verify ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
