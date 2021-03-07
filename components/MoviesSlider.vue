<template>
  <section
    class="flex py-1 px-2 mb-16 scrollbar-thin overflow-x-scroll space-x-2 scrollbar-thumb-gray-400 scrollbar-track-netflixBg dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
  >
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :path="movie.poster_path"
      :id="movie.id"
    />
  </section>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
};
</script>
