import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', index: '01' },
  { to: '/about', label: 'About', index: '02' },
  { to: '/projects', label: 'Projects', index: '03' },
  { to: '/skills', label: 'Skills', index: '04' },
  { to: '/contact', label: 'Contact', index: '05' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `flex items-baseline gap-3 px-4 py-3 rounded-md transition-colors ${
      isActive
        ? 'bg-panel text-amber'
        : 'text-muted hover:text-text hover:bg-panel/60'
    }`

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border">
        <span className="font-display font-semibold text-lg">Your Name</span>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="text-muted hover:text-text"
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

      {/* Sidebar / mobile drawer */}
      <aside
        className={`
          md:fixed md:inset-y-0 md:left-0 md:w-64 md:flex md:flex-col
          border-r border-border bg-ink z-40
          ${open ? 'block' : 'hidden'} md:block
        `}
      >
        <div className="hidden md:block px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-1">
            <img
              src="/images/profile-placeholder.svg"
              alt="Your Name"
              className="w-9 h-9 rounded-full object-cover border border-border"
            />
            <p className="font-display font-semibold text-xl text-text">Your Name</p>
          </div>
          <p className="font-mono text-xs text-muted mt-1">software developer</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 md:px-3 py-4 md:py-0">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={linkClasses}
            >
              <span className="nav-index">{link.index}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block mt-auto px-6 py-6 border-t border-border">
          <p className="text-xs text-muted">
            Built with React, Vite, Tailwind &amp; Express.
          </p>
        </div>
      </aside>
    </>
  )
}
