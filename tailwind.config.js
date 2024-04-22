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
        "primary" : {
          600: "#4caf50",
          700: "#3d8d40",
          800: "#2e6f2f",
          900: "#1f5120"
        },
        "dark" : {
          50: "#f5f5f5",
          600: "#2c282e",
          900: "#221d21"
        }
      }
    },
  },
  plugins: [],
}