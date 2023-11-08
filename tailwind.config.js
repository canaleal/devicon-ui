/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smoke': "#F7F7F7",
        "primary": '#0B6E4F',
        "primary-dark": "#4e6e52",
      }
    },
  },
  plugins: [],
}