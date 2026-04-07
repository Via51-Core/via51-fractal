/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'v51-cobalt': '#0047ff', // Color oficial del sistema
      },
      aspectRatio: {
        'mobile': '9/16',
      },
    },
  },
  plugins: [],
}