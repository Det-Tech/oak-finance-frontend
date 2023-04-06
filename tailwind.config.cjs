/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}","src/page/leanding.jsx"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'background': '#030416',
      'cu-green': '#28CE8A',
      'cu-gray': '#2C2D42',
      'radian-purple': {
        100: '#E3D9FF',
        200: '#181C2A',
      }
    }
  },
  plugins: [],
}