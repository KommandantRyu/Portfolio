import { Link } from 'react-router-dom'

const NAV_ICONS = [
  { to: '/about', code: 'AB', label: 'About' },
  { to: '/beyond-code', code: 'BC', label: 'Beyond Code' },
  { to: '/projects', code: 'PR', label: 'Projects' },
  { to: '/skills', code: 'SK', label: 'Skills' },
]

const BANNERS = [
  { to: '/projects', tag: 'latest work', title: 'Projects', blurb: 'See what I\u2019ve built' },
  { to: '/skills', tag: 'toolset', title: 'Skills', blurb: 'Languages & tools I use' },
  { to: '/beyond-code', tag: 'off duty', title: 'Beyond Code', blurb: 'What I do outside of coding' },
]

export default function Home() {
  return (
    <section>
      <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-gold/50" />
        now viewing
      </p>

      <div className="grid md:grid-cols-[64px_1fr_200px] gap-4 md:gap-6 items-start">
        {/* Icon rail */}
        <nav className="flex md:flex-col gap-3 order-2 md:order-1">
          {NAV_ICONS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              className="notch-sm w-12 h-12 border border-border bg-panel/60 hover:bg-panel hover:border-gold flex items-center justify-center font-mono text-xs text-gold transition-colors shrink-0"
            >
              {item.code}
            </Link>
          ))}
        </nav>

        {/* Monitor — the window itself */}
        <div className="window-frame order-1 md:order-2 aspect-[4/5] sm:aspect-video md:aspect-[4/3]">
          <span className="hazard-stripe absolute top-0 left-0 right-0 z-10" />
          <span className="rivet top-3 left-3 z-10" />
          <span className="rivet top-3 right-3 z-10" />
          <span className="rivet bottom-3 left-3 z-10" />
          <span className="rivet bottom-3 right-3 z-10" />

          <img
            src="/images/mypfp.jpg"
            alt="Rud Gabriel Ba-oy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Toolbar */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-4">
            <span className="notch-sm bg-ink/70 text-gold font-mono text-[10px] tracking-widest uppercase px-2 py-1 border border-border">
              identity
            </span>
            <div className="flex gap-2">
              <a
                href="mailto:you@example.com"
                title="Email"
                className="notch-sm w-8 h-8 bg-ink/70 border border-border hover:border-gold flex items-center justify-center text-xs transition-colors"
              >
                ✉
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="notch-sm w-8 h-8 bg-ink/70 border border-border hover:border-gold flex items-center justify-center text-xs transition-colors"
              >
                gh
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="notch-sm w-8 h-8 bg-ink/70 border border-border hover:border-gold flex items-center justify-center text-xs transition-colors"
              >
                in
              </a>
            </div>
          </div>

          {/* Monologue overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent pt-16 pb-5 px-5">
            <p className="font-mono text-[10px] text-gold tracking-widest uppercase mb-2">
              Rud Gabriel Ba-oy
            </p>
            <p className="text-text text-base md:text-lg italic leading-relaxed max-w-prose">
               "An aspiring software developer."
            </p>
          </div>
        </div>

        {/* Banner stack */}
        <div className="flex md:flex-col gap-3 order-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {BANNERS.map((banner) => (
            <Link
              key={banner.to}
              to={banner.to}
              className="notch border border-border bg-panel/60 hover:bg-panel hover:border-gold transition-colors p-4 shrink-0 w-56 md:w-auto block"
            >
              <p className="font-mono text-[10px] text-gold tracking-widest uppercase mb-1">
                {banner.tag}
              </p>
              <p className="font-display text-base font-semibold text-text">
                {banner.title}
              </p>
              <p className="text-muted text-xs mt-1">{banner.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
