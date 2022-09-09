const plugin = require('tailwindcss/plugin')

const { theme } = require('app/design/tailwind/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: ['nativewind/tailwind/css'],
  important: 'html',
  theme: {
    ...theme,
  },
}
