/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        v51: {
          gold: '#D4AF37',
          copper: '#B87333',
        }
      }
    },
  },
  plugins: [],
}