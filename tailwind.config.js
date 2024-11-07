/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent-primary': {
          DEFAULT: 'var(--accent-primary)',
          20: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)',
        },
        'accent-secondary': {
          DEFAULT: 'var(--accent-secondary)',
          20: 'color-mix(in srgb, var(--accent-secondary) 20%, transparent)',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'accent-glow': '0 0 20px var(--accent-primary)',
      },
    },
  },
  plugins: [],
};