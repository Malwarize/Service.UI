module.exports = {
  content: [
    "./*.{html,js}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}"
],
  theme: {
    extend: {
      colors : {
        'primary-purple': '#564C93',
        'primary-gray' : '#D9D9D9',
        'deep-gray' :'#686868',
        'second-purple':'#675bb0'
      },
    },

  },
  plugins: [],
}
