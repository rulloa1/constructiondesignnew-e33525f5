/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                concrete: {
                    50: '#f7f7f7',
                    100: '#e1e1e1',
                    200: '#cfcfcf',
                    300: '#b1b1b1',
                    400: '#919191',
                    500: '#717171',
                    600: '#515151',
                    700: '#313131',
                    800: '#1a1a1a',
                    900: '#0a0a0a',
                },
                aura: {
                    black: '#000000',
                    white: '#ffffff',
                    accent: '#717171',
                }
            },
            fontFamily: {
                brutalist: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
