import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import EgoEmblem from '../components/EgoEmblem.jsx'
import { apiUrl } from '../api.js'

export default function BeyondCodeHub() {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

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

  // Keyboard: ←/→ move the selection across the row. Enter is handled
  // natively by each emblem <button>, so focusing one and pressing
  // Enter opens it; these handlers make the row feel like a game menu
  // when nothing in particular is focused.
  function handleKeyDown(e) {
    if (status !== 'ready' || categories.length === 0) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const dir = e.key === 'ArrowRight' ? 1 : -1
      setSelected((i) => (i + dir + categories.length) % categories.length)
    }
  }

  function openCategory(index) {
    const cat = categories[index]
    if (cat) navigate(`/beyond-code/${cat.slug}`)
  }

  return (
    <section onKeyDown={handleKeyDown}>
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
        <div className="ego-row mt-2">
          {categories.map((cat, i) => (
            <EgoEmblem
              key={cat.slug}
              category={cat}
              index={i}
              selected={selected === i}
              onSelect={() => setSelected(i)}
              onActivate={() => openCategory(i)}
            />
          ))}
        </div>
      )}

      {status === 'ready' && categories.length > 0 && (
        <p className="mt-12 text-center font-mono text-[10px] text-muted tracking-widest uppercase">
          ← → to browse · click to open
        </p>
      )}
    </section>
  )
}
