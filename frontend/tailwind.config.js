/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D1117',       // page background
        panel: '#161B22',     // card / sidebar background
        border: '#232A34',    // hairline borders
        text: '#E6EDF3',      // primary text
        muted: '#8B98A5',     // secondary text
        amber: '#E3B341',     // primary accent
        teal: '#56A69A',      // secondary accent, used sparingly
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
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
