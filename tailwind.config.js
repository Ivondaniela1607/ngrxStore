 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js}"],
  plugins: [],
}


const config = {
  darkMode: "class",
  content: ["./src/**/*.{html,scss,ts}", "./node_modules/flowbite/**/*.js"],
  options: {
    safelist: ["active"],
  },
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-primary)",
        secondary: "var(--theme-secondary)",
        warn: "var(--theme-warn)",
      },
      keyframes: {
        'fade-zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'reveal-text': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-zoom-in': 'fade-zoom-in 0.8s ease-out forwards',
        'reveal-text': 'reveal-text 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}


module.exports = config;