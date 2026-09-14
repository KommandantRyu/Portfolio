import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-12 md:py-20">
      <img
        src="/images/mypfp.jpg"
        alt="Your Name"
        className="w-24 h-24 rounded-full object-cover border border-border mb-8"
      />

      <p className="font-mono text-xs text-teal mb-4">hello, I'm</p>

      <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-text mb-6 max-w-xl">
        Rud Gabriel Ba-oy
      </h1>

      <p className="text-muted text-lg leading-relaxed max-w-prose mb-10">
        I'm a software developer. Replace this paragraph with one or two
        sentences introducing yourself — what you do, what you're focused on
        right now, and what brings you to this site.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/about"
          className="bg-amber text-ink font-medium px-6 py-3 rounded-md hover:bg-amber/90 transition-colors"
        >
          About me
        </Link>
        <Link
          to="/contact"
          className="border border-border text-text font-medium px-6 py-3 rounded-md hover:bg-panel transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </section>
  )
}
