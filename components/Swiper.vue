<template>
  <vueper-slides :bullets="false" :autoplay="true">
    <vueper-slide
      class="vueperslide__title"
      v-for="title in titles"
      :key="title.id"
      :title="title.title || title.name"
      :image="`https://image.tmdb.org/t/p/original${title.backdrop_path}`"
    />
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";

export default {
  components: { VueperSlides, VueperSlide },
  props: {
    titles: { type: Array, required: true }
  }
};
</script>

<style lang="postcss" scoped>
.vueperslide__title {
  @apply text-white text-2xl  font-semibold text-shadow-xl;
}
</style>
