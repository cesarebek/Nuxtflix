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
        netflixNavGrd2: "#131313",
        detailsGrad1: "rgba(14, 14, 14, 0.95)",
        detailsGrad2: "rgba(111, 106, 111, 0.64)",
        red: {
          600: "#E50914"
        },
        gray700: "#333333"
      },
      minHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%"
      },
      height: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        750: "750px",
        235: "235px"
      },
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
        500: "500px",
        235: "235px"
      },
      scale: {
        "120": "1.2"
      }
    }
  },
  variants: { scrollbar: ["rounded"] },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-textshadow"),
    require("@tailwindcss/forms")
  ]
};
