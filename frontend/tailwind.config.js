/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md: "10rem",
      },
    },
    // colors: {
    //   blue: '#003049',
    //   gold: '#f2cc8f',
    //   green: '#81b29a',
    //   rose: '#e07a5f',
    //   offWhite: '#f4f1de',
    // },
  },
  plugins: [],
};
