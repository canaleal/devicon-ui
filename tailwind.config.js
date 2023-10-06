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
        'dark': '#141414',
        'smoke': "#f0f1f3",
        "devicon-green": '#70a47c'
      }
    },
  },
  plugins: [],
}