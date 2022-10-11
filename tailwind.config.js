const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      transparent: "#fff0",
      white: "#fff",
      e_blue: "#04e1f2",
      e_yellow: "#f9ad13",
      e_red: "#c30d14",
      e_dark: "#050505",
      e_orange: "#ff7849",
      e_green: "#13ce66",
      
    },
    fontFamily: {
      sans: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
      body: ['"Montserrat"', '"Open Sans"'],
    },
    extend: {},
  },
  // plugins: [ require('@tailwindcss/forms')],
};
