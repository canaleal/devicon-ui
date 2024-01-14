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
        'smoke': "#F7F7F8",
        "primary": '#0b8760',
        "primary-dark": "#09573e",
        "zinc": {

          1000: "#09090b"
        }
      }
    },
  },
  plugins: [],
}