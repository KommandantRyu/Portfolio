import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'

export default function BeyondCode() {
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
        description="A few things that round out the picture — pulled from the Express API."
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
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl" aria-hidden="true">{category.emoji}</span>
                <h2 className="font-display text-xl font-semibold text-text">
                  {category.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-muted text-sm leading-relaxed flex gap-2">
                    <span className="text-teal">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
