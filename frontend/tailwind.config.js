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
      },
      screens: {
        'xs-max-h': {'raw': '(max-height: 639px)'},
        'xs-h': {'raw': '(min-height: 640px)'},
        '2xs-h': {'raw': '(min-height: 667px)'},
        'sm-h': {'raw': '(min-height: 740px)'},
        'md-h': {'raw': '(min-height: 780px)'},
      },
    },
  },
  // need for applying styles to custom checkbox (without this plugin, applied styles (f.e., on checkbox), dont work)
  plugins: [require("@tailwindcss/forms")],
  prefix: "tw-",
  darkMode: "class",
}

