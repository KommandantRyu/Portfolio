import Gauge from './Gauge.jsx'
import Chain from './Chain.jsx'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16">
      {/* Brass pipe closing out the page, mirroring the one under the header */}
      <div className="pipe" />
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 flex items-center justify-between gap-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Rud Gabrie Ba-oy. Built with React, Vite, Tailwind CSS and Express.
        </p>
        <div className="hidden sm:flex items-center gap-3 shrink-0" aria-hidden="true">
          <Chain size={18} links={3} sway reverse swayDuration="5s" className="text-gold/50" />
          <Gauge value={0.7} decorative className="w-9 h-9" />
        </div>
      </div>
    </footer>
  )
}
