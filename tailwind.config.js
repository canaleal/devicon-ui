/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      'secondary': '#9B9EA7',        // used as secondary text in light mode
      'secondary-dark': '#676B7A',   // used as secondary text in dark mode

      colors: {
        dark: {
          200: '#9B9EA7',
          400: '#676B7A',
          700: '#2B2B2D',
          800: '#1F1F21',
          900: '#19191C'
        },
        primary: {
          800: '#3B86FF',
          900: '#3573F1'
        },
        rose: '#f44336',
        orange: '#ff9800',
        yellow: '#ffc107',
        cyan: '#00bcd4',
        green: '#4caf50',
        brown: '#795548',
        purple: '#673ab7'
      }
    }
  },
  plugins: []
}
