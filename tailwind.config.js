/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Libre Franklin"', 'ui-sans-serif', 'system-ui'],
      serif: [
        '"Source Serif 4"',
        '"Times New Roman"',
        'Times',
        'ui-serif',
        'serif'
      ]
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper-base)',
          base: 'var(--paper-base)',
          tint: 'var(--paper-tint)',
          emphasis: 'var(--paper-emphasis)'
        },
        ink: {
          DEFAULT: 'var(--ink-primary)',
          primary: 'var(--ink-primary)',
          muted: 'var(--ink-muted)',
          faint: 'var(--ink-faint)',
          critic: 'var(--ink-critic)'
        },
        hairline: 'var(--hairline)',
        link: 'var(--link)',
        callout: {
          DEFAULT: 'var(--callout-bg)',
          bg: 'var(--callout-bg)',
          border: 'var(--callout-border)'
        }
      }
    }
  },
  plugins: []
}
