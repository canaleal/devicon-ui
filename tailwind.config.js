/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          800: '#2b2c31',
          900: '#1f1e24'
        },
        primary: {
          800: '#6ca96d',
          900: '#588566'
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
