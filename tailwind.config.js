/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#5158bb',
          700: '#3f46a9',
          800: '#2d3497',
          900: '#1b2285',
        },
        error: {
          600: '#EF476F',
        },
        dark: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d1d1d1',
          300: '#b6b6b6',
          400: '#808080',
          500: '#292929',
          600: '#171717',
          900: '#121212',
        },
      },
    },
  },
  plugins: [],
};
