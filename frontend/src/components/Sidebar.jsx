import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Chain from './Chain.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/beyond-code', label: 'Beyond Code' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/skills', label: 'Skills' },
]

const linkClasses = ({ isActive }) =>
  `group flex items-center gap-2 px-3 py-2 text-xs tracking-widest uppercase font-medium transition-colors ${
    isActive ? 'text-crimson' : 'text-muted hover:text-text'
  }`

const markerClasses = (isActive) =>
  `w-1.5 h-1.5 shrink-0 transition-colors ${
    isActive ? 'bg-crimson' : 'bg-border group-hover:bg-muted'
  }`

// Logo block shared by the desktop rail and the mobile drawer.
function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2">
      <span className="notch-sm bg-crimson text-ink font-mono text-[10px] font-bold px-1.5 py-0.5">
        RG
      </span>
      <Chain size={14} links={2} sway swayDuration="4s" className="text-gold/60" />
      <span className="font-display font-semibold text-lg tracking-wide text-text">
        Rud Gabriel
      </span>
    </NavLink>
  )
}

// Vertical stack of nav links — one source for rail + drawer.
function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          onClick={onNavigate}
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
  )
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ===== Desktop: fixed left rail ===== */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 z-40 flex-col bg-panel border-r border-border">
        {/* Brass pipe running down the rail's outer edge */}
        <div aria-hidden="true" className="pipe-v absolute inset-y-0 right-[-5px]" />

        <div className="px-5 pt-6 pb-4">
          <Logo />
        </div>

        <div className="flex-1 px-3 overflow-y-auto">
          <NavLinks />
        </div>

        <div className="px-3 pb-5 flex flex-col gap-3">
          <ThemeToggle className="justify-between" />
          {/* Steam venting from a pipe joint, echoing the old header motif */}
          <div aria-hidden="true" className="relative h-6 mx-1">
            <span className="steam-puff left-1" style={{ animationDelay: '0s' }} />
            <span className="steam-puff left-4" style={{ animationDelay: '1.1s' }} />
            <span className="steam-puff left-8" style={{ animationDelay: '2.2s' }} />
          </div>
          <div className="flex items-center justify-between px-3">
            <p className="font-mono text-[10px] text-muted tracking-widest">v2.0</p>
            <Chain size={12} links={3} sway reverse swayDuration="5s" className="text-gold/50" />
          </div>
        </div>
      </aside>

      {/* ===== Mobile: slim top bar + slide-in drawer ===== */}
      <header className="md:hidden sticky top-0 z-40 bg-ink border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="text-muted hover:text-text p-2"
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
        </div>
      </header>

      {/* Drawer overlay + panel */}
      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-ink/70"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-panel border-r border-border flex flex-col">
            <div aria-hidden="true" className="pipe-v absolute inset-y-0 right-[-5px]" />
            <div className="flex items-center justify-between px-5 pt-6 pb-4">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="text-muted hover:text-text p-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 px-3 overflow-y-auto">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <div className="px-3 pb-5">
              <ThemeToggle className="justify-between w-full" />
            </div>
          </div>
        </>
      )}
    </>
  )
}
