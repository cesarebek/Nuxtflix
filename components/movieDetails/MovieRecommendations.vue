<template>
  <main class="container mx-auto">
    <section
      class="mx-3 md:mx-0 space-x-3 flex py-2 scrollbar-thin overflow-x-scroll scrollbar-thumb-gray-400 scrollbar-track-netflixBg dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
    >
      <p v-if="$fetchState.pending"></p>
      <div
        v-else
        v-for="movie in movies.results.slice(0, 10)"
        @click="showDetails(movie.id)"
        :key="movie.id"
        class="w-1/2 sm:w-1/3 md:w-1/4 flex flex-col shadow-md flex-shrink-0 overflow-hidden cursor-pointer rounded-lg"
      >
        <img
          class="w-full"
          :src="
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : fallImage
          "
          alt="cover"
        />

        <div
          class="py-2 px-1 flex flex-auto justify-between text-gray-200 bg-gray-900"
        >
          <p class="text-shadow-md text-xs  font-medium">
            {{ movie.title }}
          </p>
          <p class="text-shadow-md text-xs font-light ml-2">
            {{ movie.vote_average * 10 }}%
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { movieReccomendations } from "@/api";
import noCover from "@/assets/images/no-cover.png";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movies: [],
      fallImage: noCover
    };
  },
  async fetch() {
    try {
      this.movies = await this.$axios.$get(movieReccomendations(this.id));
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    showDetails(id) {
      this.$router.push(`/${id}`);
    }
  }
};
</script>
