/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", /* Clean White */
        secondary: "#e74c3c", /* Vibrant Red */
        tertiary: "#2c3e50", /* Dark Charcoal */
        secondaryRed: "#c0392b", /* Strong Red */
        secondaryYellow: "#f39c12", /* Golden Yellow */
        secondaryGreen: "#27ae60", /* Fresh Green */
        secondaryBlue: "#2980b9", /* Bright Blue */
        secondaryWhite: "#ecf0f1", /* Light Gray */
        gray: {
          10: "#bdc3c7", /* Light Gray */
          20: "#95a5a6", /* Grayish */
          30: "#7f8c8d", /* Neutral Gray */
          50: "#616a6b", /* Darker Gray */
          90: "#2c3e50", /* Very Dark Gray */
        },
      
      
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
      },
    },
  },
  plugins: [],
}