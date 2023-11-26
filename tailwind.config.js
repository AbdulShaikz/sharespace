/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveDiagonal: {
          '0%': {
            transform: 'translate(-100%, -100%)',
          },
          '100%': {
            transform: 'translate(100%, 100%)',
          },
        },
      },
    },
  },
  plugins: [],
}