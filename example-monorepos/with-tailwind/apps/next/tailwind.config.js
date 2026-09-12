/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/app/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  important: 'html',
  theme: {
    extend: {},
  },
  plugins: [],
}
