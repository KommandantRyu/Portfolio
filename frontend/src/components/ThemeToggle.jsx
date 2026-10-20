import { useEffect, useState } from 'react'

// Reads the persisted theme on mount. The inline script in index.html has
// already applied the `light` class before first paint, so this only needs
// to mirror the current state for the icon.
function readTheme() {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(readTheme)

  // Keep the toggle in sync if the theme changes from elsewhere (or the
  // user hits the browser back/forward cache).
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'theme') setTheme(e.newValue === 'light' ? 'light' : 'dark')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('light', next === 'light')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode — session-only theme is fine */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`notch-sm flex items-center gap-2 px-3 py-2 text-xs tracking-widest uppercase font-medium text-muted hover:text-text transition-colors border border-border hover:border-muted ${className}`}
    >
      {theme === 'light' ? (
        // Moon — click to return to dark
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun — click to switch to light
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
      <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
