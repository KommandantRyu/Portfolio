import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import SkillSectionCarousel from '../components/SkillSectionCarousel.jsx'
import { apiUrl } from '../api.js'

export default function Skills() {
  const [sections, setSections] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    fetch(apiUrl('/api/skill-sections'))
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setSections(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <PageHeader
        eyebrow="skills"
        title="Tools I work with"
        description="Five sections, auto-cycling — coins mark how central each tool is to my work."
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

      {status === 'ready' && sections.length > 0 && (
        <SkillSectionCarousel sections={sections} />
      )}
    </section>
  )
}
