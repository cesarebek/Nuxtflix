<template>
  <div class="bg-netflixBg py-8 space-y-4">
    <section class="container mx-auto text-white font-semibold text-lg">
      <h1>I film del momento</h1>
      <MoviesSlider :movies="popularMovies" />
    </section>
    <section class="container mx-auto text-white font-semibold text-lg">
      <h1>I più votati</h1>
      <MoviesSlider :movies="topRatedMovies" />
    </section>
    <section class="container mx-auto text-white font-semibold text-lg">
      <h1>Prossimamente sugli schermi</h1>
      <MoviesSlider :movies="upcomingMovies" />
    </section>
    <section class="container mx-auto text-white font-semibold text-lg">
      <h1>In sala</h1>
      <MoviesSlider :movies="nowPlayingMovies" />
    </section>
    <section class="container mx-auto text-white font-semibold text-lg">
      <h1>Gli attori del momento</h1>
      <ActorsSlider :actors="popularActors" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("movies", [
      "popularMovies",
      "topRatedMovies",
      "upcomingMovies",
      "nowPlayingMovies"
    ]),
    ...mapGetters("actors", ["popularActors"])
  }
};
</script>
