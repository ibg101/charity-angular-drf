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
  plugins: [],
  prefix: "tw-",
  darkMode: "class",
}

