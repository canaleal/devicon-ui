/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        smoke: {
          100: "#fffdff",
          200: "#e0e0e0",
          300: "#c1c1c1",
          400: "#a3a3a3"
        },
        dark: {
          100: "#6b6a6e",
          200: "#5a575b",
          300: "#4a484b",
          400: "#403e41",
          500: "#37353a",
          600: "#2c2a2f",
          700: "#211f22",
          800: "#19191b",
          900: "#121212",
        },
        frog: {
          600: "#ab9df2",
          700: "#9b8cf2",
          800: "#8b7bf2",
        }
      }
    }
  },
  plugins: []
}
