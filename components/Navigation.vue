<template>
  <div class="bg-gradient-to-b from-netflixNavGrd1 to-netflixNavGrd2">
    <header
      class="flex justify-between items-center py-5 container mx-auto h-18 px-4 sm:px-2"
    >
      <div class="flex space-x-10 flex-shrink-0">
        <nuxt-link to="/">
          <img class="h-6 " src="@/assets/images/netflix.svg" alt="logo" />
        </nuxt-link>
        <nav class="hidden md:block">
          <ul class="flex space-x-5">
            <NuxtLink
              @click="boxInput = ''"
              class="text-white text-sm transform duration-500 hover:text-gray-400 cursor-pointer"
              v-for="nav in navs"
              :key="nav.id"
              :to="nav.slug"
            >
              {{ nav.name }}
            </NuxtLink>
          </ul>
        </nav>
      </div>
      <div class="flex items-center space-x-2">
        <div class="relative cursor-pointer">
          <input
            v-if="searchOpen"
            v-model.trim="boxInput"
            type="text"
            class="w-full h-8 bg-gray-900 border border-white focus:outline-none text-white text-sm pl-8 py-2 rounded"
            placeholder="Movies, TV Shows, Authors"
          />
          <svg
            @click="searchOpen = !searchOpen"
            :class="{ absoluteSearch: searchOpen }"
            class="w-8 text-white p-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div class="relative hidden md:block">
          <button
            v-if="isLogged"
            @click="optionOpen = !optionOpen"
            class="rounded-full w-8 h-8 bg-white flex items-center justify-center cursor-pointer "
          >
            <fa icon="user" />
          </button>
          <div
            class="origin-top-right absolute right-0 bg-netflixNavGrd1 text-white flex flex-col p-2 m-1 z-10 rounded-md"
            v-if="optionOpen && isLogged"
          >
            <ul class="text-lg">
              <NuxtLink
                class="hover:underline"
                to="/dushboard/favorites?type=movies"
                >Favorites</NuxtLink
              >
              <NuxtLink
                class="hover:underline"
                to="/dushboard/rated?type=movies"
                >Rated</NuxtLink
              >
              <NuxtLink
                class="hover:underline"
                to="/dushboard/watchlist?type=movies"
                >Watchlist</NuxtLink
              >
              <button class="hover:underline" @click="logout">Logout</button>
            </ul>
          </div>
        </div>
        <NuxtLink
          to="/auth"
          v-if="!isLogged"
          class="bg-red-600 text-white px-5 py-1 rounded-sm cursor-pointer hidden md:block"
        >
          Login
        </NuxtLink>
        <MobileNavigation :navs="navs" />
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      navs: [
        { id: 0, name: "Home", slug: "/" },
        {
          id: 1,
          name: "TV Show",
          slug: "/series",
          query: ["popular", "airing-today", "on-the-air", "top-rated"]
        },
        { id: 2, name: "Movies", slug: "/movies" },
        { id: 3, name: "Actors", slug: "/actors" }
      ],
      searchOpen: false,
      optionOpen: false,
      boxInput: ""
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("authentication/logout");
      this.$router.push("/");
    }
  },
  watch: {
    boxInput() {
      if (this.boxInput !== "") {
        this.$router.push({
          path: "/browse",
          query: { q: this.boxInput }
        });
      } else {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters("authentication", ["isLogged"])
  }
};
</script>

<style scoped>
.nuxt-link-exact-active {
  font-weight: 600;
}

.absoluteSearch {
  position: absolute;
  top: 0;
  height: 100%;
}
</style>
