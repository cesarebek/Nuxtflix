require("dotenv").config();

export default {
  mode: "universa",
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Nuxtflix",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  loading: {
    color: "red",
    height: "2px"
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/styles/tailwind.css",
    "~/assets/styles/tooltip.css",
    "~/assets/styles/transition.css"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/cookie.js",
    "~/plugins/star-ratings.client.js",
    "~/plugins/tooltip.client.js",
    "~/plugins/lodash.js"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
    "@nuxtjs/fontawesome"
  ],

  fontawesome: {
    component: "fa",
    suffix: false,
    icons: {
      solid: [
        "faHeart",
        "faStar",
        "faBookmark",
        "faList",
        "faUser",
        "faPlay",
        "faBars",
        "faTimes"
      ],
      brands: []
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "cookie-universal-nuxt"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "https://api.themoviedb.org"
    // headers: {
    //   common: {
    //     authorization: `Bearer ${process.env.TMDB_KEY}`
    //   }
    // }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
