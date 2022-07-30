const plugin = require("tailwindcss/plugin")
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: ['nativewind/tailwind/css'],
  important: 'html',
  theme: {
    extend: {},
  },
}
