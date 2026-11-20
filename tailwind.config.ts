import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: 'var(--color-navy-deep)',
          mid: 'var(--color-navy-mid)',
          card: 'var(--color-navy-card)',
        },
        emerald: {
          DEFAULT: 'var(--color-emerald)',
          bright: 'var(--color-emerald-bright)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          dark: 'var(--color-gold-dark)',
        },
        chalk: 'var(--color-chalk)',
        ash: 'var(--color-ash)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
      },
    },
  },
  plugins: [],
};

export default config;
