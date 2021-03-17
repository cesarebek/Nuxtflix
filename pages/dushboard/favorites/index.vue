<template>
  <div class="bg-netflixBg px-2">
    <section class="container mx-auto text-white min-h-screen">
      <div class="flex space-x-2 items-baseline">
        <p class="font-semibold text-3xl">My Favorites</p>
        <p @click="queryMovies" class="hover:underline cursor-pointer">
          Movies
        </p>
        <p @click="querySeries" class="hover:underline cursor-pointer">Tv</p>
      </div>
      <!-- Loading -->
      <div v-if="$fetchState.pending">
        <div
          v-for="i in 3"
          :key="i"
          class="mt-4 h-56 bg-gray-900 rounded-md overflow-hidden"
        >
          <div class="h-full w-40 bg-gray-800 "></div>
        </div>
      </div>
      <main v-else>
        <div
          v-for="favorite in favorites.results"
          :key="favorite.id"
          class="mt-4 h-56 flex bg-gray-300 text-gray-900 overflow-hidden rounded-md"
        >
          <img
            class="h-full mr-3"
            :src="`https://image.tmdb.org/t/p/w500${favorite.poster_path}`"
            alt="cover"
          />
          <div>
            <p class="text-2xl font-semibold py-1">
              {{ favorite.title || favorite.name }}
            </p>
            <p>{{ favorite.release_date || favorite.first_air_date }}</p>
            <p class="overflow-y-auto h-1/2 text-sm">{{ favorite.overview }}</p>

            <div @click="removeFavorite(favorite.id)" class="flex items-center">
              <div
                class="rounded-full h-8 w-8 flex bg-green-600 items-center justify-center font-semibold text-white cursor-pointer"
              >
                <fa icon="times" />
              </div>
              <p class="ml-2 my-3">Remove</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { favoriteTitles, markFavorite } from "@/api";

export default {
  middleware: "auth",
  data() {
    return {
      type: null,
      favorites: []
    };
  },
  async fetch() {
    this.type = this.$route.query.type;
    try {
      this.favorites = await this.$axios.$get(
        favoriteTitles(this.userId, this.type, this.token)
      );
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    token() {
      return this.$store.getters["authentication/token"];
    },
    userId() {
      return this.$store.getters["authentication/userID"];
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.type !== this.type) {
        this.type = to.query.type;
        return this.$fetch();
      }
    }
  },
  methods: {
    queryMovies() {
      this.$router.push({
        path: "/dushboard/favorites",
        query: { type: "movies" }
      });
    },
    querySeries() {
      this.$router.push({
        path: "/dushboard/favorites",
        query: { type: "tv" }
      });
    },
    async removeFavorite(id) {
      await this.$axios.$post(markFavorite(this.userId, this.token), {
        media_type: this.type === "movies" ? "movie" : "tv",
        media_id: id,
        favorite: false
      });
      this.$fetch();
    }
  }
};
</script>
