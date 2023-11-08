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
        'smoke': "#EAEAEA",
        "primary": '#27c265',
        "primary-dark": "#4e6e52",
      }
    },
  },
  plugins: [],
}