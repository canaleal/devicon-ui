/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#4336f4',
          700: '#3c2de3',
          800: '#3525d1',
          900: '#2e1cc0'
        },
        error: {
          600: '#EF476F'
        },
        dark: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d1d1d1',
          300: '#b6b6b6',
          400: '#808080',
          500: '#292929',
          600: '#171717',
          700: '#141414',
          800: '#111111',
          900: '#000000'
        }
      }
    }
  },
  plugins: []
}
