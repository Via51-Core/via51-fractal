import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        via51: {
          abisal: '#020617',
          energia: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
} satisfies Config