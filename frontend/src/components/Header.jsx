import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/beyond-code', label: 'Beyond Code' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-2 px-3 py-2 text-xs tracking-widest uppercase font-medium transition-colors ${
      isActive ? 'text-crimson' : 'text-muted hover:text-text'
    }`

  const markerClasses = (isActive) =>
    `w-1.5 h-1.5 transition-colors ${
      isActive ? 'bg-crimson' : 'bg-border group-hover:bg-muted'
    }`

  return (
    <header className="bg-ink sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="notch-sm bg-crimson text-ink font-mono text-[10px] font-bold px-1.5 py-0.5">
              RG
            </span>
            <span className="font-display font-semibold text-lg tracking-wide text-text">
              Rud Gabriel
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClasses}>
                {({ isActive }) => (
                  <>
                    <span className={markerClasses(isActive)} />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="md:hidden text-muted hover:text-text"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <nav className="md:hidden flex flex-col gap-1 pb-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={linkClasses}
              >
                {({ isActive }) => (
                  <>
                    <span className={markerClasses(isActive)} />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}
      </div>

      {/* Rail-line accent beneath the header, echoing Limbus's train motif */}
      <div className="rail-track" />
    </header>
  )
}
