<template>
  <div
    class="bg-cover bg-center bg-no-repeat"
    :style="{
      backgroundImage: `url(${backgroundCover})`
    }"
  >
    <VideoSection
      @close-movie="openTrailer = !openTrailer"
      v-if="openTrailer"
      :videos="videos"
    />
    <div class="bg-gradient-to-r from-detailsGrad1 to-detailsGrad2">
      <section
        class="container mx-auto flex flex-col sm:flex-row items-center py-4"
      >
        <div
          class="w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl"
        >
          <img class="w-full" :src="coverUrl" alt="cover" />
        </div>
        <div class="px-5 text-white text-shadow-lg">
          <h1 class="text-3xl font-extrabold">
            {{ authorName }}
            <span v-if="details.release_date" class="font-normal text-gray-400"
              >({{ release }})</span
            >
          </h1>

          <!-- Additional movie info -->
          <div class="flex items-center text-sm text-gray-400 space-x-2">
            <ul class="flex space-x-3">
              <li
                class="cursor-pointer"
                @click="searchByGenre(genre.id, genre.name)"
                v-for="genre in details.genres"
                :key="genre.id"
              >
                {{ genre.name }}
              </li>
            </ul>
            <p class="text-xl">&#8226;</p>
            <p>{{ titleRuntime }}m</p>
          </div>

          <!-- User Interactivity -->
          <UserTools
            :id="details.id"
            :vote_average="details.vote_average"
            @open-trailer="openTrailer = !openTrailer"
          />

          <!-- Content Overview -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold ">Overview</h2>
            <p class="text-sm md:text-base">{{ details.overview }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import UserTools from "@/components/contentDetails/UserTools";
import VideoSection from "@/components/contentDetails/VideoSection";
import _ from "lodash";

export default {
  components: { UserTools, VideoSection },
  props: {
    details: {
      type: Object,
      required: true
    },
    videos: {
      type: Object
    }
  },
  data() {
    return {
      openTrailer: false
    };
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
    authorName() {
      return _.get(this.details, "title" || "name", "Name not Available");
    },
    titleRuntime() {
      return _.get(this.details, "runtime" || "episode_run_time[0]", "0");
    }
  },
  methods: {
    searchByGenre(id, name) {
      if (this.$route.query.type === "movie") {
        return this.$router.push({
          path: `/movies/genre/${id}`,
          query: { name: name }
        });
      }
      return this.$router.push({
        path: `/series/genre/${id}`,
        query: { name: name }
      });
    }
  }
};
</script>
