/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      serif: ["Georgia", "Times New Roman", "Times", "ui-serif", "serif"],
    },
    extend: {},
  },
  plugins: [],
}
