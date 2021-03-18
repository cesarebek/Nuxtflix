<template>
  <div class="bg-netflixBg">
    <section
      class="container mx-auto flex flex-col items-center sm:items-start sm:flex-row py-3"
    >
      <div
        class="flex flex-col items-center w-full sm:w-1/4 overflow-hidden px-5"
      >
        <img
          class="w-1/2 sm:w-full rounded-xl"
          :src="profileImg"
          alt="avatar"
        />
        <p class="text-white font-bold text-3xl mt-3 sm:hidden">
          {{ actor.name }}
        </p>
        <PersonalInfo :actor="actor" :creditsCount="creditsCount" />
      </div>
      <div class="w-full px-5 sm:w-3/4 sm:px-8 py-2">
        <!-- User's Info -->
        <div class="text-white mb-5">
          <h1 class="text-3xl font-bold mb-10 hidden sm:block">
            {{ actor.name }}
          </h1>

          <h2 class="text-xl font-medium mb-1">Biography</h2>
          <div v-if="actor.biography !== ''">
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
        <ActingTable :credits="credits.cast" />
      </div>
    </section>
  </div>
</template>

<script>
import {
  actorDetails,
  actorMovies,
  actorSeries,
  actorCombinedCredits
} from "@/api";
import Slider from "@/components/slot_components/Slider";
import PersonalInfo from "@/components/actorDetails/PersonalInfo";
import ActingTable from "@/components/actorDetails/ActingTable";

export default {
  components: { Slider, ActingTable, PersonalInfo },
  async asyncData({ $axios, route, error }) {
    try {
      const id = route.params.actor;
      const actor = await $axios.$get(actorDetails(id));
      const movies = await $axios.$get(actorMovies(id));
      const series = await $axios.$get(actorSeries(id));
      const credits = await $axios.$get(actorCombinedCredits(id));
      return { actor, movies, series, credits };
    } catch (e) {
      if (e.response) {
        return error({ code: e.response.status, message: e.message });
      } else {
        return error({
          code: 500,
          message: "Check your internet connection and/or refresh the page"
        });
      }
    }
  },
  computed: {
    creditsCount() {
      return this.credits.cast.length;
    },
    profileImg() {
      return `https://image.tmdb.org/t/p/w500${this.actor.profile_path}`;
    }
  }
};
</script>
