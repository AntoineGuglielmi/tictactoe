/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    // "./layouts/**/*.vue",
    // "./pages/**/*.vue",
    // "./plugins/**/*.{js,ts}",
    // "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: 'Nunito, sans'
      },
      boxShadow: {
        cell: '0 0 0.4rem 0 rgba(0,0,0,0.1)',
        container: '0 0 1.5rem 0 rgba(0,0,0,0.075)'
      }
    },
  },
  plugins: [],
}
