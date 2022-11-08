/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn .15s',
        'slide-in': 'slideIn .15s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.5 },
        },
        slideIn: {
          '0%': { transform: 'translate(-18rem)' },
          '100%': { transform: 'translate(0)' },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
