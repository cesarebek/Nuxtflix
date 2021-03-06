module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    "./components/**/*.{vue,js}",

    "./layouts/**/*.vue",

    "./pages/**/*.vue",

    "./plugins/**/*.{js,ts}",

    "./nuxt.config.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        netflixBg: "#141414",
        netflixNavGrd1: "#060606",
        netflixNavGrd2: "#131313"
      },
      minHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%"
      },
      scale: {
        "120": "1.2"
      }
    }
  },
  variants: { scrollbar: ["rounded"] },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-textshadow")]
};
