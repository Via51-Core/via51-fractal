import type { Config } from 'tailwindcss'

export default {
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                v51: {
                    hub: '#0047ff', // Cobalt Agnóstico
                    fondo: '#020617'
                }
            }
        },
    },
    plugins: [],
} satisfies Config