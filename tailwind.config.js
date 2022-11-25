/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mina-orange-light' : '#F59603',
        'mina-blue-dark' : '#06373B',
        'mina-blue-light' : '#58797C',
      },
      fontFamily: {
        'comfortaa': ['Comfortaa', 'cursive']
      }
    },
  },
  plugins: [],
}
