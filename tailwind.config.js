/** @type {import('tailwindcss').Config} */
module.exports = {
  // future: {
  //   hoverOnlyWhenSupported: true,
  // },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        maindark: "#171717",
        dark: "#212121",
        darker: "#111111",
        semidark: "#2C2C2C",
        grey: "#9C9C9C",
        offwhite: "#F2F2F2",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
