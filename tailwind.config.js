/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        lightGray: "#DFE3FA",
        grey: "#888EB0",
        skyBlue: "#7E88C3",
        red: "#EC5757",
        light: "#F8F8FB",
        black: "#0C0E16",
        purple: "#7C5DFA",
        darkBlue: "#1E2139",
        lightBlue: "#373B53",
        navyBlue: "#252945",
      },

      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideLeft: "slideLeft 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
