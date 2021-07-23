<template>
  <div class="bg-netflixBg overflow-hidden">
    <main class="flex flex-col ">
      <GenresSelector
        :genres="genres.genres"
        :title="'TV Shows'"
        @genres-selected="filterByGenre"
      />

      <Swiper :titles="popular.results" />

      <!-- Titles Slider -->
      <section class="container mx-auto mt-5 px-2">
        <slider>
          <template v-slot:title>
            <h1>Now Trending</h1>
          </template>
          <SerieCard
            v-for="serie in popular.results"
            :key="serie.id"
            :path="serie.poster_path"
            :id="serie.id"
          />
        </slider>
        <slider>
          <template v-slot:title>
            <h1>Airing Today</h1>
          </template>
          <SerieCard
            v-for="serie in airingToday.results"
            :key="serie.id"
            :path="serie.poster_path"
            :id="serie.id"
          />
        </slider>
        <slider>
          <template v-slot:title>
            <h1>Top Rated</h1>
          </template>
          <SerieCard
            v-for="serie in topRated.results"
            :key="serie.id"
            :path="serie.poster_path"
            :id="serie.id"
          />
        </slider>
      </section>
    </main>
  </div>
</template>

<script>
import {
  popularTitles,
  airingSeries,
  topRatedTitles,
  titlesGenres
} from "@/api";
import Slider from "@/components/slot_components/Slider";
import GenresSelector from "~/components/movie_tv_page/GenresSelector.vue";

export default {
  components: { Slider, GenresSelector },
  async asyncData({ $axios, error }) {
    try {
      const responses = await Promise.all([
        $axios.$get(popularTitles("tv")),
        $axios.$get(airingSeries()),
        $axios.$get(topRatedTitles("tv")),
        $axios.$get(titlesGenres("tv"))
      ]);
      return {
        popular: responses[0],
        airingToday: responses[1],
        topRated: responses[2],
        genres: responses[3]
      };
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
  methods: {
    filterByGenre(genre) {
      this.$router.push({
        path: `/series/genre/${genre.id}`,
        query: { name: genre.name }
      });
      console.log(genre.id);
    }
  }
};
</script>
