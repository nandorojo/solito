const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    path.join(__dirname, 'apps/expo/App.tsx'),
    path.join(__dirname, 'apps/expo/app/**/*.{js,jsx,ts,tsx}'),
    path.join(__dirname, 'packages/app/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
