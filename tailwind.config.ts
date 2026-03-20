import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          abyss:  '#010810',
          deep:   '#010D1B',
          dark:   '#020F20',
          mid:    '#0A2540',
          blue:   '#0077B6',
          bright: '#0096C7',
          teal:   '#00B4D8',
          light:  '#48CAE4',
          foam:   '#ADE8F4',
        },
        danger: {
          orange: '#F97316',
          red:    '#EF4444',
          amber:  '#F59E0B',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body:    ['var(--font-source-sans)', 'sans-serif'],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'wave-in':      'waveIn 0.8s ease-out forwards',
        'fade-up':      'fadeUp 0.8s ease-out forwards',
        'counter':      'counter 2s ease-out forwards',
        'scroll-hint':  'scrollHint 2s ease-in-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        waveIn: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%':      { transform: 'translateY(8px)', opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(239, 68, 68, 0.7), 0 0 80px rgba(239, 68, 68, 0.3)' },
        },
      },
      backgroundImage: {
        'ocean-gradient':    'linear-gradient(180deg, #010810 0%, #0A2540 50%, #0077B6 100%)',
        'hero-overlay':      'linear-gradient(to bottom, rgba(1,8,16,0.7) 0%, rgba(1,8,16,0.3) 40%, rgba(1,8,16,0.8) 100%)',
        'card-glass':        'linear-gradient(135deg, rgba(0,119,182,0.1) 0%, rgba(0,180,216,0.05) 100%)',
        'danger-gradient':   'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
        'teal-gradient':     'linear-gradient(135deg, #0096C7 0%, #00B4D8 100%)',
        'section-gradient':  'radial-gradient(ellipse at center, #0A2540 0%, #010D1B 70%)',
      },
    },
  },
  plugins: [],
}

export default config
