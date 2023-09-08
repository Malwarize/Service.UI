module.exports = {
  content: [
    "./*.{html,js}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}"
],
  theme: {
    extend: {
      colors : {
        'primary-purple': '#a50ae6',
        'primary-gray' : '#edeaea',
        'deep-gray' :'#686868',
        'second-purple':'#7b05a5'
      },
    },

  },
  plugins: [],
}
