<template>
  <div class="bg-netflixBg">
    <main class="container mx-auto px-5 sm:px-0">
      <div class="flex items-center mb-5">
        <NuxtLink to="/series" class="text-xl font-semibold text-gray-500 mr-2">
          TV Shows >
        </NuxtLink>
        <h1 class="text-white text-3xl font-bold cursor-default">
          {{ $route.query.name }}
        </h1>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        <div
          v-for="title in titles"
          :key="title.id"
          @click="showDetails(title.id)"
        >
          <div
            class="bg-cover bg-center overflow-hidden rounded-md cursor-pointer"
          >
            <img
              :src="
                title.poster_path
                  ? `https://image.tmdb.org/t/p/w500${title.poster_path}`
                  : avatar
              "
              alt="cover"
            />
          </div>
        </div>
      </div>
      <Trigger @triggerIntersected="loadMore" />
    </main>
  </div>
</template>

<script>
import { searchByGenre } from "@/api";
import avatar from "@/assets/images/avatar.png";

export default {
  data() {
    return {
      avatar,
      page: 1
    };
  },
  async asyncData({ route, $axios }) {
    const genre_id = route.params.genre;
    const response = await $axios.$get(searchByGenre("tv", 1, genre_id));
    //Data
    const pages = response.total_pages;
    const titles = response.results;
    return { titles, pages };
  },
  methods: {
    async loadMore() {
      const genre_id = this.$route.params.genre;
      //Check for CurrentPage based on TotalPages
      if (this.page < this.pages) {
        try {
          this.page++;
          const nextPage = await this.$axios.$get(
            searchByGenre("tv", this.page, genre_id)
          );
          return (this.titles = [...this.titles, ...nextPage.results]);
        } catch (e) {
          if (e.response) {
            return $nuxt.error({ code: e.response.status, message: e.message });
          } else {
            return $nuxt.error({
              code: 500,
              message: "Check your internet connection and/or refresh the page"
            });
          }
        }
      } else {
        return console.log("end page");
      }
    },
    showDetails(id) {
      this.$router.push({ path: `/series/${id}`, query: { type: "tv" } });
    }
  }
};
</script>
