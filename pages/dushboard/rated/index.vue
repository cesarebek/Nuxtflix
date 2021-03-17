<template>
  <div class="bg-netflixBg px-2">
    <section class="container mx-auto text-white min-h-screen">
      <div class="flex space-x-2 items-baseline">
        <p class="font-semibold text-3xl">My Ratings</p>
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
      <!-- Result -->
      <main v-else>
        <div
          v-for="rated in rated.results"
          :key="rated.id"
          class="mt-4 h-56 flex bg-gray-300 text-gray-900 overflow-hidden rounded-md"
        >
          <img
            class="h-full mr-3"
            :src="`https://image.tmdb.org/t/p/w500${rated.poster_path}`"
            alt="cover"
          />
          <div>
            <p class="text-2xl font-semibold py-1">
              {{ rated.title || rated.name }}
            </p>
            <p>{{ rated.release_date || rated.first_air_date }}</p>
            <p class="overflow-y-auto h-1/2 text-sm">{{ rated.overview }}</p>
            <div class="flex items-center space-x-4">
              <div
                class="flex items-center justify-center rounded-full h-10 w-10 bg-green-600 text-white font-bold text-lg cursor-default mb-2"
              >
                {{ rated.rating }}
              </div>
              <div @click="removeRate(rated.id)" class="flex items-center">
                <div
                  class="rounded-full h-8 w-8 flex bg-netflixBg items-center justify-center font-semibold text-white cursor-pointer mb-2"
                >
                  <fa icon="times" />
                </div>
                <p class="ml-2 my-3">Remove</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { titleRating, removeRating } from "@/api";

export default {
  middleware: "auth",
  data() {
    return {
      type: null,
      rated: []
    };
  },
  async fetch() {
    this.type = this.$route.query.type;
    try {
      this.rated = await this.$axios.$get(
        titleRating(this.userId, this.type, this.token)
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
        path: "/dushboard/rated",
        query: { type: "movies" }
      });
    },
    querySeries() {
      this.$router.push({
        path: "/dushboard/rated",
        query: { type: "tv" }
      });
    },
    async removeRate(id) {
      const type = this.type === "movies" ? "movie" : "tv";
      await this.$axios.$delete(removeRating(id, type, this.token));
      this.$fetch();
    }
  }
};
</script>
