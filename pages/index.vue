<template>
  <div class="bg-netflixBg">
    <Swiper />
    <main class="text-white font-semibold text-lg mt-12">
      <section class="container mx-auto ">
        <h1>Popular Movies</h1>
        <slider>
          <MovieCard
            v-for="movie in popularMovies"
            :key="movie.id"
            :path="movie.poster_path"
            :id="movie.id"
          />
        </slider>
      </section>
      <section class="container mx-auto">
        <h1>Most Rated Movies</h1>
        <slider>
          <MovieCard
            v-for="movie in topRatedMovies"
            :key="movie.id"
            :path="movie.poster_path"
            :id="movie.id"
          />
        </slider>
      </section>
      <section class="container mx-auto ">
        <h1>Upcoming Movies</h1>
        <slider>
          <MovieCard
            v-for="movie in upcomingMovies"
            :key="movie.id"
            :path="movie.poster_path"
            :id="movie.id"
          />
        </slider>
      </section>
      <section class="container mx-auto ">
        <h1>Playing in Theater</h1>
        <slider>
          <MovieCard
            v-for="movie in nowPlayingMovies"
            :key="movie.id"
            :path="movie.poster_path"
            :id="movie.id"
          />
        </slider>
      </section>
      <section class="container mx-auto pb-12">
        <h1>Gli attori del momento</h1>
        <slider>
          <ActorCard
            v-for="actor in popularActors"
            :key="actor.id"
            :path="actor.profile_path"
            :name="actor.name"
            :id="actor.id"
          />
        </slider>
      </section>
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
      "topRatedMovies",
      "upcomingMovies",
      "nowPlayingMovies"
    ]),
    ...mapGetters("actors", ["popularActors"])
  }
};
</script>
