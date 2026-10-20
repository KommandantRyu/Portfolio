/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Limbus Company-inspired palette: near-black backgrounds, dried-blood
        // hairline borders, bone-white text, and a signature crimson accent.
        // Core tokens are driven by CSS variables (space-separated RGB channels
        // so Tailwind's /opacity modifiers keep working). Dark values live in
        // :root in index.css; the light "paper/dossier" values live on
        // html.light — toggle via ThemeToggle.jsx (persisted in localStorage).
        ink: 'rgb(var(--c-ink) / <alpha-value>)',        // page background
        panel: 'rgb(var(--c-panel) / <alpha-value>)',    // card / header background
        border: 'rgb(var(--c-border) / <alpha-value>)',  // hairline borders
        text: 'rgb(var(--c-text) / <alpha-value>)',      // primary text
        muted: 'rgb(var(--c-muted) / <alpha-value>)',    // secondary text
        crimson: 'rgb(var(--c-crimson) / <alpha-value>)',// primary accent — the signature red
        gold: 'rgb(var(--c-gold) / <alpha-value>)',      // secondary accent, aged brass/gold
        sin: {
          // Sin-affinity colors, color-code Beyond Code categories. Driven by
          // CSS vars: dark-bright values in :root, darkened legible overrides
          // on html.light (see index.css) so they read on the blue light ground.
          wrath: 'rgb(var(--c-sin-wrath) / <alpha-value>)',
          lust: 'rgb(var(--c-sin-lust) / <alpha-value>)',
          sloth: 'rgb(var(--c-sin-sloth) / <alpha-value>)',
          gluttony: 'rgb(var(--c-sin-gluttony) / <alpha-value>)',
          envy: 'rgb(var(--c-sin-envy) / <alpha-value>)',
          gloom: 'rgb(var(--c-sin-gloom) / <alpha-value>)',
          pride: 'rgb(var(--c-sin-pride) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
