/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./www/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-slate": "#0f172a",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
      fontSize: {
        "30px": "30px",
      },
    },
  },
  plugins: [],
};
