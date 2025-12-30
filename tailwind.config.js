/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    light: '#fcf6ba',
                    DEFAULT: '#bf953f',
                    dark: '#b38728',
                    // Richer complex gradients handled via backgroundImage
                }
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728)',
                'shiny-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            },
            animation: {
                'shine': 'shine 3s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-glow': 'pulseGlow 2s infinite',
            },
            keyframes: {
                shine: {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(250, 204, 21, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(250, 204, 21, 0.6)' },
                }
            }
        },
    },
    plugins: [],
}
