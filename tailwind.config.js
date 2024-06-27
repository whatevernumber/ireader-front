/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        trebuchetms: ["Trebuchet MS", "sans-serif"],
      }
    },
  },
  plugins: [
      require('daisyui'),
  ],
  daisyui: {
    themes: ['fantasy', 'nord'],
  },
}

