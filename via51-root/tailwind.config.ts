import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        via51: {
          950: '#020617',
          500: '#0047ff',
        }
      }
    },
  },
  plugins: [],
} satisfies Config