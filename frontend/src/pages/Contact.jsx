import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { apiUrl } from '../api.js'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="contact"
        title="Let's talk"
        description="Send a message and I'll get back to you. This form posts to the Express backend at /api/contact."
      />

      <form onSubmit={handleSubmit} className="max-w-prose space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-muted mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-panel border border-border rounded-md px-4 py-3 text-text placeholder:text-muted/60 focus:border-amber outline-none"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-muted mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-panel border border-border rounded-md px-4 py-3 text-text placeholder:text-muted/60 focus:border-amber outline-none"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-muted mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-panel border border-border rounded-md px-4 py-3 text-text placeholder:text-muted/60 focus:border-amber outline-none resize-none"
            placeholder="What would you like to build?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-amber text-ink font-medium px-6 py-3 rounded-md hover:bg-amber/90 transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'sent' && (
          <p className="text-teal text-sm">Message sent. Thanks — I'll reply soon.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-amber">
            Something went wrong. Make sure the Express backend is running on port 5000.
          </p>
        )}
      </form>

      <div className="mt-12 flex flex-wrap gap-6 text-sm">
        <a href="mailto:you@example.com" className="text-muted hover:text-text">
          you@example.com
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-muted hover:text-text">
          GitHub
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-muted hover:text-text">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
