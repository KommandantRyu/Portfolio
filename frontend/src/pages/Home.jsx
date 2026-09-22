import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-12 md:py-20">
      <div className="id-frame w-28 mb-8">
        <img
          src="/images/mypfp.jpg"
          alt="Rud Gabriel Ba-oy"
          className="w-28 h-28 object-cover block"
        />
        <div className="bg-crimson text-ink font-mono text-[10px] tracking-widest uppercase text-center py-1">
          identity
        </div>
      </div>

      <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-gold/50" />
        identity record
      </p>

      <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-text mb-6 max-w-xl">
        Rud Gabriel Ba-oy
      </h1>

      <p className="text-muted text-lg leading-relaxed max-w-prose mb-10">
        I'm a software developer. Replace this paragraph with one or two
        sentences introducing yourself — what you do, what you're focused on
        right now, and what brings you to this site.
      </p>

      <div className="flex flex-wrap gap-6">
        <Link to="/about" className="btn-slant bg-crimson hover:bg-crimson/90 transition-colors px-6 py-3">
          <span className="text-ink font-medium tracking-wide uppercase text-sm">About me</span>
        </Link>
        <Link to="/contact" className="btn-slant border border-border hover:bg-panel transition-colors px-6 py-3">
          <span className="text-text font-medium tracking-wide uppercase text-sm">Get in touch</span>
        </Link>
      </div>
    </section>
  )
}
