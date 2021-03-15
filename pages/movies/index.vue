<template>
  <div class="bg-netflixBg">
    <main class="flex flex-col">
      <GenresSelector
        :genres="genres.genres"
        :title="'Movies'"
        @genres-selected="filterByGenre"
      />

      <Swiper :titles="popular.results" />

      <!-- Titles Slider -->
      <section class="container mx-auto mt-5 px-2">
        <client-only>
          <slider>
            <template v-slot:title>
              <h1>Now Trending</h1>
            </template>
            <MovieCard
              v-for="serie in popular.results"
              :key="serie.id"
              :path="serie.poster_path"
              :id="serie.id"
            />
          </slider>
          <slider>
            <template v-slot:title>
              <h1>Now Playing in Theatres</h1>
            </template>
            <MovieCard
              v-for="serie in nowPlaying.results"
              :key="serie.id"
              :path="serie.poster_path"
              :id="serie.id"
            />
          </slider>
          <slider>
            <template v-slot:title>
              <h1>Top Rated</h1>
            </template>
            <MovieCard
              v-for="serie in topRated.results"
              :key="serie.id"
              :path="serie.poster_path"
              :id="serie.id"
            />
          </slider>
        </client-only>
      </section>
    </main>
  </div>
</template>

<script>
import {
  popularTitles,
  nowPlayingMovies,
  topRatedTitles,
  titlesGenres
} from "@/api";
import Slider from "@/components/slot_components/Slider";
import GenresSelector from "@/components/movie_tv_page/GenresSelector";

export default {
  components: { Slider, GenresSelector },
  async asyncData({ $axios }) {
    const popular = await $axios.$get(popularTitles("movie"));
    const nowPlaying = await $axios.$get(nowPlayingMovies());
    const topRated = await $axios.$get(topRatedTitles("movie"));
    const genres = await $axios.$get(titlesGenres("movie"));
    return { popular, nowPlaying, topRated, genres };
  },
  methods: {
    filterByGenre(genre) {
      this.$router.push({
        path: `/movies/genre/${genre.id}`,
        query: { name: genre.name }
      });
      console.log(genre.id);
    }
  }
};
</script>
