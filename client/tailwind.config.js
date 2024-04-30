module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: '#222831',
        footer:'#76ABAE'
      },
      container: {
        center: true,
        screens: {
          '2xl': '1367px',
        },
      },
    },
  },
  plugins: [],
}
