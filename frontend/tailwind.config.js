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
        'md-h': {'raw': '(max-height: 768px)'}
      },
    },
  },
  // need for applying styles to custom checkbox (without this plugin, applied styles (f.e., on checkbox), dont work)
  plugins: [require("@tailwindcss/forms")],
  prefix: "tw-",
  darkMode: "class",
}

