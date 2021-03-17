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
          v-for="watchlist in myWatchlist.results"
          :key="watchlist.id"
          class="mt-4 h-56 flex bg-gray-300 text-gray-900 overflow-hidden rounded-md"
        >
          <img
            class="h-full mr-3"
            :src="`https://image.tmdb.org/t/p/w500${watchlist.poster_path}`"
            alt="cover"
          />
          <div>
            <p class="text-2xl font-semibold py-1">
              {{ watchlist.title || watchlist.name }}
            </p>
            <p>{{ watchlist.release_date || watchlist.first_air_date }}</p>
            <p class="overflow-y-auto h-1/2 text-sm">
              {{ watchlist.overview }}
            </p>

            <div
              @click="removeFromWatchlist(watchlist.id)"
              class="flex items-center"
            >
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
import { watchlist, addWatchlist } from "@/api";

export default {
  middleware: "auth",
  data() {
    return {
      type: null,
      myWatchlist: []
    };
  },
  async fetch() {
    this.type = this.$route.query.type;
    try {
      this.myWatchlist = await this.$axios.$get(
        watchlist(this.userId, this.type, this.token)
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
        path: "/dushboard/watchlist",
        query: { type: "movies" }
      });
    },
    querySeries() {
      this.$router.push({
        path: "/dushboard/watchlist",
        query: { type: "tv" }
      });
    },
    async removeFromWatchlist(id) {
      await this.$axios.$post(addWatchlist(this.userId, this.token), {
        media_type: this.type === "movies" ? "movie" : "tv",
        media_id: id,
        watchlist: false
      });
      this.$fetch();
    }
  }
};
</script>
