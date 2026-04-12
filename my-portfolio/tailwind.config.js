/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          base: '#0f172a',
          soft: '#475569',
          line: '#e2e8f0',
          paperA: '#f8fafc',
          paperB: '#f1f5f9',
        },
      },
      fontFamily: {
        inkSerif: ['"Shippori Mincho"', 'serif'],
        inkSans: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        ink: '0 1px 2px 0 rgba(148,163,184,0.5)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.writing-vertical-rl': {
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        },
      })
    }),
  ],
}
