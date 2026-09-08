import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'

export default function Skills() {
  const [skills, setSkills] = useState({})
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(apiUrl('/api/skills'))
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setSkills(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <PageHeader
        eyebrow="skills"
        title="Tools I work with"
        description="Grouped by category, served from the Express API."
      />

      {status === 'loading' && <p className="text-muted">Loading…</p>}

      {status === 'error' && (
        <div className="card max-w-prose">
          <p className="text-text font-medium mb-1">Couldn't reach the backend.</p>
          <p className="text-muted text-sm">
            Start the Express server on port 5000 to see this section populate.
          </p>
        </div>
      )}

      {status === 'ready' && (
        <div className="grid sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="card">
              <p className="font-mono text-xs text-muted mb-4">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-text bg-ink border border-border rounded px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
