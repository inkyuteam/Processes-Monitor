/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        oddBgChange: 'oddBgChange 2s ease-in-out',
        evenBgChange: 'evenBgChange 2s ease-in-out',
      },
      keyframes: {
        oddBgChange: {
          '0%': { backgroundColor: '#221E2A' },
          '10%': { backgroundColor: '#336699' },
          '100%': { backgroundColor: '#221E2A' },
        },
        evenBgChange: {
          '0%': { backgroundColor: 'transparent' },
          '10%': { backgroundColor: '#336699' },
          '100%': { backgroundColor: 'transparent' },
        }
      },
      colors: {
        oddColor: "#221E2A",
        hoverColor: "#2F2D36",
        headerColor: "#2F2D36",
      }
    },
  },
  plugins: [],
}

