/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif;']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131',
        'main-gray': '#505050'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(40px);',
            transform: 'translateY(40px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slide-top-sm': {
          '0%': {
            '-webkit-transform': 'translateY(6px);',
            transform: 'translateY(6px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top-sm 0.3s linear both;'

      }
    },
  },
  plugins: [],
}

