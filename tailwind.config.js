/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gray-100': 'rgb(240, 238, 237)',
        'gray-200': 'rgb(240, 240, 240)',
        'white': 'rgb(255, 255, 255)',
        'red-100': 'rgb(255, 51, 51)',
        'red-10': 'rgba(255, 51, 51, 0.1)',
        'red-hover': 'rgb(224, 117, 117)',
        'red-200': 'rgb(219, 68, 68)',
        'black-100': 'rgb(0, 0, 0)',
        'black-10': 'rgba(0, 0, 0, 0.1)',
        'black-40': 'rgba(0, 0, 0, 0.4)',
        'black-60': 'rgba(0, 0, 0, 0.6)',
        'yellow': 'rgb(255, 198, 51)',
        'green-100': 'rgb(1, 171, 49)',
        'blue-100': '#299fff',
        'photocolor':'#f2f0f1',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      boxShadow: {
        default: '0 0 10px rgba(0, 0, 0, 0.2)',
        hover: '0 0 10px rgba(0, 0, 0, 0.5)',
      },
      transitionProperty: {
        'default': 'all',
      },
      transitionTimingFunction: {
        'default': 'ease',
      },
      transitionDuration: {
        '300': '300ms',
      },
      spacing: {
        'container-lg': '80%',
        'container-md': '85%',
        'container-sm': '90%',
      },
    dark:{
      background: "black",
      text:"white"
    },
    light:{
      background: "white",
      text:"black"
    }

    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Safari and Chrome */
        },
      });
    },
  ],
}

