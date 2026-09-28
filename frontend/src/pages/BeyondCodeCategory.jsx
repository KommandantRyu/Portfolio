import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'
import { sinColor } from '../utils/sinColors.js'

export default function BeyondCodeCategory() {
  const { category: slug } = useParams()
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error | not-found

  useEffect(() => {
    setStatus('loading')
    fetch(apiUrl('/api/beyond-code'))
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setCategories(data)
        setStatus(data.some((c) => c.slug === slug) ? 'ready' : 'not-found')
      })
      .catch(() => setStatus('error'))
  }, [slug])

  if (status === 'loading') {
    return <p className="text-muted">Loading…</p>
  }

  if (status === 'error') {
    return (
      <div className="card max-w-prose">
        <p className="text-text font-medium mb-1">Couldn't reach the backend.</p>
        <p className="text-muted text-sm">
          Make sure the Express server is running on port 5000
          (<code className="font-mono">npm start</code> inside{' '}
          <code className="font-mono">api/</code>).
        </p>
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="card max-w-prose">
        <p className="text-text font-medium mb-1">No category called "{slug}".</p>
        <Link to="/beyond-code" className="text-gold text-sm hover:underline">
          ← back to Beyond Code
        </Link>
      </div>
    )
  }

  const index = categories.findIndex((c) => c.slug === slug)
  const active = categories[index]
  const color = sinColor(active.sin)
  const prev = categories[(index - 1 + categories.length) % categories.length]
  const next = categories[(index + 1) % categories.length]

  return (
    <section>
      <Link to="/beyond-code" className="text-muted hover:text-text text-sm inline-flex items-center gap-2 mb-6">
        ← all categories
      </Link>

      <PageHeader
        eyebrow={`beyond code / sin: ${active.sin}`}
        title={active.title}
        description={`${active.emoji}  ${active.items.length} entries`}
      />

      <div className={`card border ${color.border}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="tab-num">
            <span>{String(index + 1).padStart(2, '0')}</span>
          </span>
          <span className="text-2xl" aria-hidden="true">{active.emoji}</span>
          <h2 className={`font-display text-xl font-semibold ${color.text}`}>
            {active.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {active.items.map((item) => (
            <div
              key={item.name}
              className={`flex gap-3 border-l-2 ${color.border} bg-ink/40 p-3`}
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
                <p className={`font-mono text-[10px] ${color.text} tracking-widest uppercase mb-1`}>
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

      {/* Prev / next between sibling category pages */}
      <div className="flex items-center justify-between mt-6 gap-4">
        <Link
          to={`/beyond-code/${prev.slug}`}
          className="notch-sm border border-border hover:border-gold px-4 py-2 text-sm text-muted hover:text-text transition-colors"
        >
          ← {prev.title}
        </Link>
        <Link
          to={`/beyond-code/${next.slug}`}
          className="notch-sm border border-border hover:border-gold px-4 py-2 text-sm text-muted hover:text-text transition-colors"
        >
          {next.title} →
        </Link>
      </div>
    </section>
  )
}
