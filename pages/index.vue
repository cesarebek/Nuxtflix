<template>
  <div class="bg-netflixBg">
    <Swiper :titles="popularMovies" />
    <main
      class="container mx-auto text-white font-semibold text-lg mt-12 px-2 bg-netflixBg"
    >
      <!-- Slider 1 ~ Popular Movies -->

      <slider>
        <template #title>
          <h1>Popular Movies</h1>
        </template>
        <MovieCard
          v-for="movie in popularMovies"
          :key="movie.id"
          :path="movie.poster_path"
          :id="movie.id"
        />
      </slider>

      <!-- Slider 2 ~ Popular Tv Shows -->

      <slider>
        <template v-slot:title>
          <h1>Popular Tv Shows</h1>
        </template>
        <SerieCard
          v-for="serie in popularSeries"
          :key="serie.id"
          :path="serie.poster_path"
          :id="serie.id"
        />
      </slider>

      <!-- Slider 3 ~ Popular Actors -->

      <slider>
        <template v-slot:title>
          <h1>Actors of the moment</h1>
        </template>
        <ActorCard
          v-for="actor in popularActors"
          :key="actor.id"
          :path="actor.profile_path"
          :name="actor.name"
          :id="actor.id"
        />
      </slider>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Slider from "@/components/slot_components/Slider";

export default {
  components: { Slider },
  computed: {
    ...mapGetters("movies", [
      "popularMovies",
      "popularSeries",
      "upcomingMovies",
      "nowPlayingMovies"
    ]),
    ...mapGetters("actors", ["popularActors"])
  }
};
</script>
