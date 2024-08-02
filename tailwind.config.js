/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        medieval: ['MedievalSharp', 'cursive'],
      },


      keyframes: {
        brightPulse: {
          '0%, 100%': {
            boxShadow: '0 0 5px 2px rgba(147, 51, 234, 0.7), 0 0 10px 4px rgba(147, 51, 234, 0.5), 0 0 15px 6px rgba(147, 51, 234, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 15px 5px rgba(187, 91, 254, 0.9), 0 0 30px 10px rgba(187, 91, 254, 0.7), 0 0 45px 15px rgba(187, 91, 254, 0.5)'
          },
        }
      },
      animation: {
        brightPulse: 'brightPulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

