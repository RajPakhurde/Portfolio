/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'var(--bg-deep)',
        'bg-base': 'var(--bg-base)',
        'bg-elevated': 'var(--bg-elevated)',
        surface: {
          DEFAULT: 'var(--surface)',
          hover: 'var(--surface-hover)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          bright: 'var(--accent-bright)',
          glow: 'var(--accent-glow)',
        },
        border: {
          default: 'var(--border-default)',
          hover: 'var(--border-hover)',
          accent: 'var(--border-accent)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Geist Sans"', 'system-ui', 'sans-serif'],
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 12s ease-in-out infinite',
        'float-medium': 'float 9s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        }
      },
      boxShadow: {
        'button-primary': '0 0 0 1px rgba(94, 106, 210, 0.5), 0 4px 12px rgba(94, 106, 210, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'button-primary-hover': '0 0 0 1px rgba(94, 106, 210, 0.6), 0 6px 16px rgba(94, 106, 210, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
        'card-default': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)',
        'card-hover': '0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94, 106, 210, 0.1)',
        'inner-highlight': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}