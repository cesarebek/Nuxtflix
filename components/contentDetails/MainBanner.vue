<template>
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
        <div class="w-1/2 rounded-xl overflow-hidden shadow-2xl">
          <img class="w-full" :src="coverUrl" alt="cover" />
        </div>
        <div class="px-5 text-white text-shadow-lg">
          <h1 class="text-3xl font-extrabold">
            {{ details.title || details.name }}
            <span v-if="details.release_date" class="font-normal text-gray-400"
              >({{ release }})</span
            >
          </h1>
          <!-- Additional movie info -->
          <div class="flex items-center text-sm text-gray-400 space-x-2">
            <ul class="flex space-x-3">
              <li class="" v-for="genre in details.genres" :key="genre.id">
                {{ genre.name }}
              </li>
            </ul>
            <p class="text-xl">&#8226;</p>
            <p>{{ details.runtime || details.episode_run_time[0] }}m</p>
          </div>
          <!-- User Tools -->
          <div class="flex items-center space-x-5 my-4">
            <div
              class="h-16 w-16 bg-green-900 rounded-full flex justify-center items-center flex-shrink-0"
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
              @click="$emit('open-trailer')"
              class="font-bold p-1 transform duration-300 hover:scale-105"
            >
              <fa icon="play" class="mr-1 hidden sm:inline-block" />
              Play Trailer
            </button>
          </div>
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
export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  },
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
