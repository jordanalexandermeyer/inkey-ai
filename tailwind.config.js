/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      lineClamp: {
        9: '9',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
}
