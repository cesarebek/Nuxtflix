<template>
  <main>
    <p v-if="$fetchState.pending">Loading data...</p>
    <div v-for="movie in data.results" :key="movie.id">
      {{ movie.title }}
    </div>
  </main>
</template>

<script>
import { search } from "@/api";
export default {
  data() {
    return {
      results: []
    };
  },
  async fetch() {}
};
</script>
