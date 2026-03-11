/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#EF4561',
          'pink-dark': '#d63550',
          'pink-light': '#f27080',
          orange: '#F99F33',
          purple: '#6a256f',
          'purple-light': '#8a3a8f',
          dark: '#222123',
        },
      },
      fontFamily: {
        serif: ['Quicksand', 'system-ui', 'sans-serif'],
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
