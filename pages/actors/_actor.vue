<template>
  <div class="bg-netflixBg">
    <section
      class="container mx-auto flex flex-col items-center sm:items-start sm:flex-row py-3"
    >
      <div class="flex justify-center w-full sm:w-1/4 overflow-hidden">
        <img
          class="w-1/2 sm:w-full rounded-xl"
          :src="profileImg"
          alt="avatar"
        />
      </div>
      <div class="w-3/4 sm:px-8 py-2">
        <!-- User's Info -->
        <div class="text-white mb-5">
          <h1 class="text-3xl font-bold mb-10">{{ actor.name }}</h1>

          <h2 class="text-xl font-medium mb-1">Biography</h2>
          <div v-if="!actor.biography === ''">
            <p class="italic mb-5">From Wikipedia, the free encyclopedia</p>
            <p>{{ actor.biography }}</p>
          </div>
          <div v-else>
            <p class="italic mb-5">Actor biography not available.</p>
          </div>
        </div>
        <!-- Actor's titles -->
        <h1 class="text-white text-2xl font-medium mb-3">Known For</h1>
        <div class="space-y-1 text-white text-xl font-medium mb-1">
          <div v-if="movies.cast !== 0">
            <h2>Movies</h2>
            <slider>
              <MovieCard
                v-for="movie in movies.cast"
                :key="movie.id"
                :path="movie.poster_path"
                :id="movie.id"
              />
            </slider>
          </div>
          <div v-if="movies.cast !== 0">
            <h2>Tv Shows</h2>
            <slider>
              <SerieCard
                v-for="serie in series.cast"
                :key="serie.id"
                :path="serie.poster_path"
                :id="serie.id"
              />
            </slider>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { actorDetails, actorMovies, actorSeries } from "@/api";
import Slider from "@/components/slot_components/Slider";

export default {
  components: { Slider },
  async asyncData({ $axios, route }) {
    try {
      const id = route.params.actor;
      const actor = await $axios.$get(actorDetails(id));
      const movies = await $axios.$get(actorMovies(id));
      const series = await $axios.$get(actorSeries(id));
      return { actor, movies, series };
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    profileImg() {
      return `https://image.tmdb.org/t/p/w500${this.actor.profile_path}`;
    }
  }
};
</script>
