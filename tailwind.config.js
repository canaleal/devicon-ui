/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        smoke: {
          100: '#fffdff',
          200: '#e0e0e0',
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

          700: '#1a24c2',
          800: '#22289f',
        },
        rose: '#ff6189',
        orange: '#fc9867',
        yellow: '#ffd866',
        cyan: '#77dce8',
        green: '#a9dc77'
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
