<template>
  <div class="bg-netflixBg">
    <main class="container mx-auto h-screen flex">
      <div class="w-1/5 h-full bg-detailsGrad2"></div>
      <div class="w-4/5 h-full bg-gray-600 px-2 flex flex-wrap">
        <SerieCard
          v-for="title in titles"
          :key="title.id"
          :path="title.poster_path"
          :id="title.id"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { popularTitles } from "@/api";

export default {
  async asyncData({ route, $axios }) {
    const query = route.query.pref;
    // if else data fetch based on query
    const response = await $axios.$get(popularTitles(movie));
    const titles = response.results;
    return { titles };
  }
};
</script>
