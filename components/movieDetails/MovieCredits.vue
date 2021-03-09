<template>
  <main class="container mx-auto">
    <section
      class="mx-3 md:mx-0 space-x-3 flex py-2 scrollbar-thin overflow-x-scroll scrollbar-thumb-gray-400 scrollbar-track-netflixBg dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
    >
      <p v-if="$fetchState.pending"></p>
      <!-- Actors -->
      <div
        v-else
        v-for="actor in credits.cast"
        :key="actor.id"
        class="w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/10 flex flex-col shadow-md flex-shrink-0 overflow-hidden rounded-md cursor-pointer"
      >
        <img
          class="w-full overflow-hidden"
          :src="
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : fallImage
          "
          alt="cover"
        />

        <div class="bg-gray-900 px-1 py-2 flex flex-col flex-auto">
          <p class="text-shadow-md text-sm font-medium text-white">
            {{ actor.name }}
          </p>
          <p class="text-shadow-md text-xs font-light text-gray-200">
            {{ actor.character }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { movieCredits } from "@/api";
import avatar from "@/assets/images/avatar.png";
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      credits: [],
      fallImage: avatar
    };
  },
  async fetch() {
    try {
      this.credits = await this.$axios.$get(movieCredits(this.id));
    } catch (e) {
      console.log(e);
    }
  },
  computed: {}
};
</script>
