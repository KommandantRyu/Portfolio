/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Limbus Company-inspired palette: near-black backgrounds, dried-blood
        // hairline borders, bone-white text, and a signature crimson accent.
        ink: '#0B0908',        // page background
        panel: '#161011',      // card / header background
        border: '#3A1418',     // hairline borders, dried-blood red
        text: '#EDE6DD',       // primary text, warm bone white
        muted: '#8F7F77',      // secondary text, warm grey-brown
        crimson: '#C8202F',    // primary accent — the signature red
        gold: '#B99456',       // secondary accent, aged brass/gold, used sparingly
        sin: {
          // Sin-affinity colors, used to color-code Beyond Code categories
          wrath: '#D64545',
          lust: '#E08830',
          sloth: '#D4B23C',
          gluttony: '#4CAF6D',
          envy: '#9B6FC4',
          gloom: '#6FB8D9',
          pride: '#4A7FC7',
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
