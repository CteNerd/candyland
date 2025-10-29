/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        candy: {
          red: '#ef4444',
          purple: '#a855f7',
          yellow: '#facc15',
          blue: '#3b82f6',
          orange: '#f97316',
          green: '#22c55e',
        }
      }
    },
  },
  plugins: [],
}
