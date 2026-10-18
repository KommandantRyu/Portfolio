import { useEffect, useState } from 'react'
import { apiUrl } from '../api.js'

const FALLBACK_IMG = '/images/beyond-code/placeholder.svg'

// Steam header art can 404 for delisted apps — fall back to the placeholder.
function onImgError(e) {
  e.currentTarget.onerror = null
  e.currentTarget.src = FALLBACK_IMG
}

function Eyebrow({ children }) {
  return (
    <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3 flex items-center gap-3">
      <span className="w-6 h-px bg-gold/50" />
      {children}
    </p>
  )
}

/**
 * Steam library highlights for the Games category:
 *  - "Fully conquered": games at 100% achievements
 *  - "Longest runs": top 8 by playtime, with achievement progress
 * Data comes from GET /api/steam/games (see api/steam.js).
 */
export default function SteamShowcase() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false
    fetch(apiUrl('/api/steam/games'))
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) throw new Error(body.error || 'Request failed')
          return body
        })
      )
      .then((body) => {
        if (cancelled) return
        setData(body)
        setStatus('ready')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted text-sm mb-8">Loading Steam library…</p>
  }

  if (status === 'error') {
    return (
      <div className="card max-w-prose mb-8">
        <p className="text-text font-medium mb-1">Steam stats are offline.</p>
        <p className="text-muted text-sm">{error}</p>
      </div>
    )
  }

  const { perfect, mostPlayed, totals } = data

  return (
    <section className="mb-8" aria-label="Steam library highlights">
      {/* ------------------------------------------------ Fully conquered */}
      {perfect.length > 0 ? (
        <div className="mb-8">
          <Eyebrow>Fully conquered — 100% achievements</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-4">
            {perfect.map((game) => (
              <article
                key={game.appid}
                className="notch-sm border border-gold/40 bg-ink/40 overflow-hidden"
              >
                <img
                  src={game.header}
                  alt={`${game.name} cover art`}
                  loading="lazy"
                  onError={onImgError}
                  className="w-full aspect-[460/215] object-cover border-b border-border"
                />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-sm font-semibold text-text leading-tight">
                      {game.name}
                    </h3>
                    <span className="notch-sm shrink-0 font-mono text-[10px] px-1.5 py-0.5 border border-gold/50 bg-gold/15 text-gold">
                      100%
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-muted">{game.hours} hrs</span>
                    <span className="text-gold">
                      {game.achievements.unlocked}/{game.achievements.total} achievements
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted text-sm mb-8">No fully-conquered games yet.</p>
      )}

      {/* --------------------------------------------------- Longest runs */}
      <Eyebrow>Longest runs — top {mostPlayed.length} by playtime</Eyebrow>
      <ol className="space-y-3">
        {mostPlayed.map((game, i) => (
          <li
            key={game.appid}
            className="flex items-center gap-3 border-l-2 border-border bg-ink/40 p-3"
          >
            <span className="tab-num hidden sm:flex">
              <span>{String(i + 1).padStart(2, '0')}</span>
            </span>
            <img
              src={game.header}
              alt=""
              loading="lazy"
              onError={onImgError}
              className="notch-sm w-24 h-12 object-cover border border-border shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-sm font-semibold text-text truncate">
                  {game.name}
                </p>
                <p className="font-mono text-xs text-gold shrink-0">{game.hours} hrs</p>
              </div>
              {game.achievements ? (
                <>
                  <div className="h-1 bg-border mt-2 mb-1" aria-hidden="true">
                    <div
                      className={
                        game.achievements.percent === 100 ? 'h-full bg-gold' : 'h-full bg-crimson'
                      }
                      style={{ width: `${game.achievements.percent}%` }}
                    />
                  </div>
                  <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    {game.achievements.unlocked}/{game.achievements.total} achievements ·{' '}
                    {game.achievements.percent}%
                  </p>
                </>
              ) : (
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mt-1">
                  no achievement stats
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="font-mono text-[10px] text-muted mt-3 tracking-widest uppercase">
        {totals.played} played of {totals.owned} owned · synced{' '}
        {new Date(data.updatedAt).toLocaleString()}
      </p>
    </section>
  )
}
