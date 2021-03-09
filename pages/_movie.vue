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
              <button
                @click="openTrailer = !openTrailer"
                class="font-bold p-1 transform duration-300 hover:scale-105"
              >
                <fa icon="play" class="mr-1" />
                Play Trailer
              </button>
            </div>
            <div>
              <h2 class="text-xl md:text-2xl font-bold ">Overview</h2>
              <p class="text-sm md:text-base">{{ details.overview }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <main class="divide-y px-5">
      <section class="container mx-auto py-10">
        <p class="text-3xl text-white font-bold mb-3">Info</p>
        <GenericInfo
          :id="id"
          :status="details.status"
          :origLang="details.original_language"
          :revenue="details.revenue"
        />
      </section>
      <section class="container mx-auto py-10">
        <p class="text-3xl text-white font-bold mb-3">Cast</p>
        <MovieCredits :id="id" />
      </section>

      <section class="container mx-auto py-10">
        <p class="text-3xl text-white font-bold mb-3">You may also like...</p>
        <MovieRecommendations :id="id" />
      </section>
    </main>
  </div>
</template>

<script>
import { movieDetails, movieVideos } from "~/api";
import VideoSection from "@/components/movieDetails/VideoSection";
import MovieCredits from "@/components/movieDetails/MovieCredits";
import MovieRecommendations from "~/components/movieDetails/MovieRecommendations.vue";
import GenericInfo from "~/components/movieDetails/GenericInfo.vue";

export default {
  components: { VideoSection, MovieCredits, MovieRecommendations, GenericInfo },
  data() {
    return {
      userTools: [
        { id: 0, icon: "list" },
        { id: 1, icon: "heart" },
        { id: 2, icon: "bookmark" },
        { id: 3, icon: "heart" }
      ],
      openTrailer: false
    };
  },
  async asyncData({ $axios, params }) {
    try {
      const id = params.movie;
      const details = await $axios.$get(movieDetails(id));
      const videos = await $axios.$get(movieVideos(id));

      return { details, videos };
    } catch (e) {
      console.log(e);
    }
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
    },
    id() {
      return this.$route.params.movie;
    }
  }
};
</script>
