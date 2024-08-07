/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        smoke: {
          100: '#fcfefd',
          200: '#f4f4f4',
          300: '#c1c1c1',
          400: '#a3a3a3'
        },
        dark: {
          100: '#999999',
          200: '#595959',
          300: '#333333',
          400: '#232323',
          500: '#1a1a1a',
          600: '#2c2a2f',
          700: '#171717',
          800: '#121212',
          900: '#0f0f0f'
        },
        frog: {
          700: '#10b982',
          800: '#0D9668'
        },
        rose: '#f44336',
        orange: '#ff9800',
        yellow: '#ffc107',
        cyan: '#00bcd4',
        green: '#4caf50',
        brown: '#795548',
        purple: '#673ab7'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1600px'
      }
    }
  },
  plugins: []
}
