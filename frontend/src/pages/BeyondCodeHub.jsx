import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'
import { sinColor } from '../utils/sinColors.js'

export default function BeyondCodeHub() {
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

  return (
    <section>
      <PageHeader
        eyebrow="beyond code"
        title="What I do outside of coding"
        description="Pick a category — each one is its own page, color-coded by sin."
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
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => {
            const color = sinColor(cat.sin)
            return (
              <Link
                key={cat.slug}
                to={`/beyond-code/${cat.slug}`}
                className={`notch flex items-center gap-4 border ${color.border} bg-panel/40 hover:bg-panel/70 transition-colors p-5`}
              >
                <span className="tab-num shrink-0">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </span>
                <span className="text-2xl" aria-hidden="true">{cat.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className={`font-display text-lg font-semibold ${color.text}`}>
                    {cat.title}
                  </p>
                  <p className="font-mono text-[10px] text-muted tracking-widest uppercase mt-0.5">
                    sin: {cat.sin}
                  </p>
                </div>
                <span className={`${color.text} text-lg`}>→</span>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
