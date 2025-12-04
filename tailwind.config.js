/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xl1080: '1920px',
      },
      fontFamily: {
        sans: ['var(--font-lexend)', ...fontFamily.sans],
        display: ['var(--font-niconne)', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
