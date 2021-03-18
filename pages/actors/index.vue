<template>
  <div class="bg-netflixBg">
    <main class="container mx-auto px-5 sm:px-0">
      <h1 class="text-2xl font-bold text-white mb-5">Popular Actors</h1>
      <div class="flex flex-wrap justify-between">
        <div
          v-for="actor in actors"
          :key="actor.id"
          class="mb-5"
          @click="showDetails(actor.id)"
        >
          <div
            class="w-235 h-235 bg-cover bg-center overflow-hidden rounded-t-md cursor-pointer"
          >
            <img
              :src="
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : avatar
              "
              alt="actor-image"
            />
          </div>
          <div class="bg-gray-200 w-235 p-2 rounded-b-md">
            {{ actor.name }}
          </div>
        </div>
      </div>
      <Trigger @triggerIntersected="loadMore" />
    </main>
  </div>
</template>

<script>
import { popularActors } from "@/api";
import avatar from "@/assets/images/avatar.png";

export default {
  data() {
    return {
      avatar,
      page: 1
    };
  },
  async asyncData({ $axios, error }) {
    try {
      const response = await $axios.$get(popularActors(1));
      const actors = response.results;
      const pages = response.total_pages;
      return { actors, pages };
    } catch (e) {
      error({ message: e.message });
    }
  },
  methods: {
    async loadMore() {
      //Check for CurrentPage based on TotalPages
      if (this.page < this.pages) {
        this.page++;
        try {
          const nextPage = await this.$axios.$get(popularActors(this.page));
          return (this.actors = [...this.actors, ...nextPage.results]);
        } catch (e) {
          $nuxt.error({ code: e.code, message: e.message });
        }
      } else {
        return console.log("end page");
      }
    },
    showDetails(id) {
      this.$router.push({ path: `/actors/${id}` });
    }
  }
};
</script>
