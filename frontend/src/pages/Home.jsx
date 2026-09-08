import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <p className="font-mono text-xs text-teal mb-4">available for new roles</p>

      <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.1] text-text mb-6 max-w-2xl">
        I build software that turns hard problems into simple interfaces.
      </h1>

      <p className="text-muted text-lg leading-relaxed max-w-prose mb-10">
        I'm a software developer focused on backend systems and web apps.
        This site walks through my background, the projects I've shipped,
        the tools I use daily, and how to get in touch.
      </p>

      <div className="flex flex-wrap gap-4 mb-16">
        <Link
          to="/projects"
          className="bg-amber text-ink font-medium px-6 py-3 rounded-md hover:bg-amber/90 transition-colors"
        >
          See my projects
        </Link>
        <Link
          to="/contact"
          className="border border-border text-text font-medium px-6 py-3 rounded-md hover:bg-panel transition-colors"
        >
          Get in touch
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card">
          <p className="font-display text-3xl font-semibold text-amber mb-1">3+</p>
          <p className="text-sm text-muted">years writing production code</p>
        </div>
        <div className="card">
          <p className="font-display text-3xl font-semibold text-amber mb-1">12</p>
          <p className="text-sm text-muted">projects shipped end to end</p>
        </div>
        <div className="card">
          <p className="font-display text-3xl font-semibold text-amber mb-1">2</p>
          <p className="text-sm text-muted">languages I ship in weekly</p>
        </div>
      </div>
    </section>
  )
}
