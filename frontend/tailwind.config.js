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
