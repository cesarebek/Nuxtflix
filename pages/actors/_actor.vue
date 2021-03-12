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
        <div class="self-start text-white space-y-2 text-sm mt-4 mb-10">
          <h1 class="text-xl text-gray-200 font-medium mb-2">
            Personal Info
          </h1>
          <div>
            <p>Known For</p>
            <p class="text-gray-500">{{ actor.known_for_department }}</p>
          </div>
          <div>
            <p>Known Credits</p>
            <p class="text-gray-500">{{ credits.cast.length }}</p>
          </div>
          <div>
            <p>Gender</p>
            <p class="text-gray-500">{{ gender }}</p>
          </div>
          <div>
            <p>Birthdate</p>
            <p class="text-gray-500">
              {{ actor.birthdate ? actor.birthdate : "-" }}
            </p>
          </div>
          <div>
            <p>Place of Birth</p>
            <p class="text-gray-500">{{ actor.place_of_birth }}</p>
          </div>
          <div>
            <p>Also Known As</p>
            <p class="text-gray-500">{{ actor.also_known_as[10] }}</p>
          </div>
        </div>
      </div>
      <div class="w-full px-5 sm:w-3/4 sm:px-8 py-2">
        <!-- User's Info -->
        <div class="text-white mb-5">
          <h1 class="text-3xl font-bold mb-10 hidden sm:visible">
            {{ actor.name }}
          </h1>

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
import ActingTable from "@/components/actorDetails/ActingTable";

export default {
  components: { Slider, ActingTable },
  async asyncData({ $axios, route }) {
    try {
      const id = route.params.actor;
      const actor = await $axios.$get(actorDetails(id));
      const movies = await $axios.$get(actorMovies(id));
      const series = await $axios.$get(actorSeries(id));
      const credits = await $axios.$get(actorCombinedCredits(id));
      return { actor, movies, series, credits };
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    profileImg() {
      return `https://image.tmdb.org/t/p/w500${this.actor.profile_path}`;
    },
    gender() {
      return this.actor.gender === 1 ? "Female" : "Male";
    }
  }
};
</script>
