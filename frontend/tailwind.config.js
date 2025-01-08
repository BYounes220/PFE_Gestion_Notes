/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "src/components/Evaluations.jsx",
    "src//components/App.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}