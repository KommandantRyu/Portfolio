import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    fetch(apiUrl('/api/projects'))
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setProjects(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <PageHeader
        eyebrow="projects"
        title="Things I've built"
        description="Pulled live from the Express API — edit api/index.js to add your own."
      />

      {status === 'loading' && (
        <p className="text-muted">Loading projects…</p>
      )}

      {status === 'error' && (
        <div className="card max-w-prose">
          <p className="text-text font-medium mb-1">Couldn't reach the backend.</p>
          <p className="text-muted text-sm">
            Make sure the Express server is running on port 5000
            (<code className="font-mono">npm start</code> inside{' '}
            <code className="font-mono">backend/</code>).
          </p>
        </div>
      )}

      {status === 'ready' && (
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article key={project.id} className="card flex flex-col">
              <h2 className="font-display text-xl font-semibold text-text mb-2">
                {project.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-teal border border-border rounded px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber text-sm font-medium hover:underline"
                >
                  View project
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
