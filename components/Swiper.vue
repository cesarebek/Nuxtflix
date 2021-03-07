<template>
  <vueper-slides :bullets="false" :autoplay="true">
    <vueper-slide
      class="vueperslide__title"
      v-for="movie in popularMovies"
      :key="movie.id"
      :title="movie.title"
      :image="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
    />
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import { mapGetters } from "vuex";

export default {
  components: { VueperSlides, VueperSlide },
  computed: {
    ...mapGetters("movies", ["popularMovies"])
  }
};
</script>

<style lang="postcss" scoped>
.vueperslide__title {
  @apply text-white text-5xl font-semibold text-shadow-xl;
}
</style>
