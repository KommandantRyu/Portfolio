import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SteamShowcase from '../components/SteamShowcase.jsx'
import { apiUrl } from '../api.js'
import { sinColor, sinRgb } from '../utils/sinColors.js'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default function BeyondCodeCategory() {
  const { category: slug } = useParams()
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error | not-found
  const [tab, setTab] = useState('summary') // summary | entries

  useEffect(() => {
    setStatus('loading')
    setTab('summary')
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
  const sin = sinRgb(active.sin)
  const prev = categories[(index - 1 + categories.length) % categories.length]
  const next = categories[(index + 1) % categories.length]
  const fallback = '/images/beyond-code/placeholder.svg'

  return (
    <section style={{ '--sin': sin }}>
      {/* Back control — Limbus-style slanted arrow button */}
      <Link
        to="/beyond-code"
        className="notch-sm inline-flex items-center gap-2 border border-border hover:border-gold px-4 py-2 text-sm text-muted hover:text-text transition-colors mb-8"
      >
        ← all categories
      </Link>

      <div className="grid lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] gap-10 items-start">
        {/* ---- Left: big circular portrait + stat strip ---- */}
        <div>
          <div className="ego-detail-art">
            <div className="ego-detail-art-inner">
              <img
                src={active.cover || fallback}
                alt={active.title}
                onError={(e) => {
                  // Missing cover file → shared placeholder art
                  e.currentTarget.onerror = null
                  e.currentTarget.src = fallback
                }}
              />
            </div>
            {/* Prev/next arrows over the art, like the reference */}
            <Link
              to={`/beyond-code/${prev.slug}`}
              aria-label={`Previous: ${prev.title}`}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-ink/70 text-muted hover:text-text hover:border-gold flex items-center justify-center transition-colors"
            >
              ◀
            </Link>
            <Link
              to={`/beyond-code/${next.slug}`}
              aria-label={`Next: ${next.title}`}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-ink/70 text-muted hover:text-text hover:border-gold flex items-center justify-center transition-colors"
            >
              ▶
            </Link>
          </div>

          {/* Status strip — echoes the reference's Status / Resists row */}
          <dl className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="ego-stat">
              <dt>Entries</dt>
              <dd>{active.items.length}</dd>
            </div>
            <div className="ego-stat">
              <dt>Sin</dt>
              <dd className="text-base uppercase tracking-widest">{active.sin}</dd>
            </div>
            <div className="ego-stat">
              <dt>Tier</dt>
              <dd>{active.tier || '—'}</dd>
            </div>
            <div className="ego-stat">
              <dt>No.</dt>
              <dd>{ROMAN[index] || index + 1}</dd>
            </div>
          </dl>
        </div>

        {/* ---- Right: title banner, tabs, content ---- */}
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="ego-title-banner text-2xl md:text-3xl">
              {active.title}
            </h1>
            <span className="ego-tier shrink-0 mt-1" aria-hidden="true">
              {active.tier || '—'}
            </span>
          </div>
          <p className={`font-mono text-[10px] tracking-widest uppercase mt-3 ${color.text}`}>
            {active.emoji} beyond code / sin: {active.sin}
          </p>

          {/* Tab strip — Summary / Entries */}
          <div className="flex gap-2 mt-6" role="tablist" aria-label={`${active.title} views`}>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'summary'}
              className={`ego-tab${tab === 'summary' ? ' is-active' : ''}`}
              onClick={() => setTab('summary')}
            >
              Summary
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'entries'}
              className={`ego-tab${tab === 'entries' ? ' is-active' : ''}`}
              onClick={() => setTab('entries')}
            >
              Entries
            </button>
          </div>

          <div className="mt-6" role="tabpanel">
            {tab === 'summary' && (
              <div className="card max-w-prose">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tab-num">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <h2 className={`font-display text-xl font-semibold ${color.text}`}>
                    {active.title}
                  </h2>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {active.items.length} {active.detailLabel}
                  {active.items.length === 1 ? '' : 's'} worth showing off — every entry
                  below is one I keep coming back to. Pick the{' '}
                  <span className={color.text}>Entries</span> tab to read through them.
                </p>
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase mt-4">
                  classified as {active.tier || '—'} · sin: {active.sin}
                </p>
              </div>
            )}

            {tab === 'entries' && (
              <ul className="space-y-3">
                {active.items.map((item, i) => (
                  <li
                    key={item.name}
                    className={`flex gap-4 border-l-2 ${color.border} bg-ink/40 p-3`}
                  >
                    <span className="tab-num shrink-0 mt-1">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        // Missing local file → shared placeholder art
                        e.currentTarget.onerror = null
                        e.currentTarget.src = fallback
                      }}
                      className="notch-sm w-16 h-16 object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-text leading-tight mb-1.5">
                        {item.name}
                      </p>
                      <p className={`font-mono text-[10px] ${color.text} tracking-widest uppercase mb-1`}>
                        {active.detailLabel}
                      </p>
                      <p className="text-muted text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Live Steam stats: perfect games + longest playtime */}
      {slug === 'games' && (
        <div className="mt-12">
          <SteamShowcase />
        </div>
      )}

      {/* Prev / next between sibling category pages */}
      <div className="flex items-center justify-between mt-10 gap-4">
        <Link
          to={`/beyond-code/${prev.slug}`}
          className="notch-sm border border-border hover:border-gold px-4 py-2 text-sm text-muted hover:text-text transition-colors"
        >
          ← {prev.title}
        </Link>
        <Link
          to="/beyond-code"
          className="font-mono text-[10px] text-muted hover:text-text tracking-widest uppercase"
        >
          selection screen
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
