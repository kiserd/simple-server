/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-background': '#18191A',
        'custom-purple-primary': '#BB86FC',
        'custom-purple-secondary': '#3700b3',
        'custom-green-primary': '#03DAC6',
        'custom-error': '#CF6679',
        'custom-card': '#242526',
        'custom-hover': '#3A3B3C',
        'custom-text-primary': '#E4E6EB',
        'custom-text-secondary': '#B0B3B8'
      }
    },
  },
  plugins: [],
}
