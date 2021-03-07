<template>
  <div class="bg-netflixBg">
    <div
      class="bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${backgroundCover})`
      }"
    >
      <div class="bg-gradient-to-r from-detailsGrad1 to-detailsGrad2">
        <section
          class="container mx-auto flex flex-col sm:flex-row items-center py-4"
        >
          <div
            class="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl overflow-hidden shadow-2xl"
          >
            <img class="w-full" :src="coverUrl" alt="cover" />
          </div>
          <div class="px-5 text-white text-shadow-lg">
            <h1 class="text-3xl font-extrabold">
              {{ details.title }}
              <span class="font-normal text-gray-400">({{ release }})</span>
            </h1>
            <!-- Additional movie info -->
            <div class="flex items-center text-sm text-gray-400 space-x-2">
              <ul class="flex space-x-3">
                <li class="" v-for="genre in details.genres" :key="genre.id">
                  {{ genre.name }}
                </li>
              </ul>
              <p class="text-xl">&#8226;</p>
              <p>{{ details.runtime }}m</p>
            </div>
            <!-- User Tools -->
            <div class="flex items-center space-x-5 my-4">
              <div
                class="h-16 w-16 bg-green-900 rounded-full flex justify-center items-center"
              >
                <p class="flex items-start text-lg font-bold">
                  {{ details.vote_average * 10 }}
                  <span class="text-xs font-normal">%</span>
                </p>
              </div>
              <div class="flex space-x-4">
                <button
                  v-for="userTool in userTools"
                  :key="userTool.id"
                  class="rounded-full h-10 w-10 bg-gray-800"
                >
                  <fa :icon="userTool.icon" />
                </button>
              </div>
            </div>
            <div>
              <h2 class="text-xl md:text-2xl font-bold ">Overview</h2>
              <p class="text-sm md:text-base">{{ details.overview }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <VideoSection v-if="videos.results" :videos="videos" />
  </div>
</template>

<script>
import { movieDetails, movieVideos } from "~/api";
import VideoSection from "@/components/detailsPage/videoSection";
export default {
  components: { VideoSection },
  data() {
    return {
      userTools: [
        { id: 0, icon: "list" },
        { id: 0, icon: "heart" },
        { id: 0, icon: "bookmark" },
        { id: 0, icon: "heart" }
      ]
    };
  },
  async asyncData({ $axios, params }) {
    try {
      console.log(params.movie);
      const details = await $axios.$get(movieDetails(params.movie));
      const videos = await $axios.$get(movieVideos(params.movie));
      return { details, videos };
    } catch (e) {}
  },
  computed: {
    coverUrl() {
      return `https://image.tmdb.org/t/p/w500${this.details.poster_path}`;
    },
    backgroundCover() {
      return `https://image.tmdb.org/t/p/original${this.details.backdrop_path}`;
    },
    release() {
      return this.details.release_date.split("-")[0];
    }
  }
};
</script>
