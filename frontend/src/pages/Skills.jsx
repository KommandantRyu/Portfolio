import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import LanguageCarousel from '../components/LanguageCarousel.jsx'
import SkillSectionCarousel from '../components/SkillSectionCarousel.jsx'
import { apiUrl } from '../api.js'

export default function Skills() {
  const [skills, setSkills] = useState({})
  const [sections, setSections] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    Promise.all([
      fetch(apiUrl('/api/skills')).then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      }),
      fetch(apiUrl('/api/skill-sections')).then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      }),
    ])
      .then(([skillsData, sectionsData]) => {
        setSkills(skillsData)
        setSections(sectionsData)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <PageHeader
        eyebrow="skills"
        title="Tools I work with"
        description="Auto-cycling by domain, served from the Express API."
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
        <div className="space-y-6">
          {skills.languages && (
            <LanguageCarousel languages={skills.languages} />
          )}

          {sections.length > 0 && (
            <SkillSectionCarousel sections={sections} />
          )}
        </div>
      )}
    </section>
  )
}
