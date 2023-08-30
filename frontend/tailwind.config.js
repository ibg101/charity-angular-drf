/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'primary': '#845EC2',
        'secondary': '#D65DB1',
      }
    },
  },
  // need for applying styles to custom checkbox (without this plugin styles, applied, f.e. on checkbox, dont work)
  plugins: [require("@tailwindcss/forms")],
  prefix: "tw-",
  darkMode: "class",
}

