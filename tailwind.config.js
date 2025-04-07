/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#42b983',
        'primary-hover': '#3aa876',
        danger: '#ff4444',
        'danger-hover': '#cc0000'
      }
    }
  },
  plugins: []
}
