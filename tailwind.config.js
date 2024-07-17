/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E6F3F1",
          200: "#CCE5E2",
          300: "#99CBC5",
          400: "#66B1AB",
          500: "#33978B",
          600: "#007D6E",
          700: "#005E53",
          800: "#01473E",
        },

      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}

