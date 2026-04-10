import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'v51-bg': '#000000',
                'v51-text': '#FFFFFF',
                'v51-gamma': '#00FF41',
            },
        },
    },
    plugins: [],
} satisfies Config