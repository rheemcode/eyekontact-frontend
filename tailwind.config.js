const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      transparent: "#fff0",
      white: "#fff",
      blue: "#04e1f2",
      yellow: "#f9ad13",
      red: "#c30d14",
      dark: "#050505",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#111",
      gray: "#8492a6",
      "gray-light": "#edf2f9",
    },
    fontFamily: {
      sans: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
      body: ['"Montserrat"', '"Open Sans"'],
    },
    extend: {},
  },
  // plugins: [ require('@tailwindcss/forms')],
};
