<template>
  <!-- Genres Selector -->
  <div
    class="container mx-auto  flex items-center h-10 p-1 mb-5 space-x-3 px-2"
  >
    <h1 class="font-extrabold text-white text-2xl md:text-4xl">{{ title }}</h1>
    <div class="relative z-10">
      <button
        @click="genresOpen = !genresOpen"
        class="bg-black border border-white text-white py-1 text-sm px-3"
      >
        Genres
      </button>
      <div
        v-if="genresOpen"
        class="absolute -bottom-0 left-0 w-screen overflow-hidden"
      >
        <div
          class="bg-netflixNavGrd1 w-1/2 md:w-1/2 lg:w-1/3 grid grid-cols-2 sm:grid-cols-3 p-2 gap-1"
        >
          <p
            @click="selectGenre({ id: genre.id, name: genre.name })"
            v-for="genre in genres"
            :key="genre.id"
            class="text-white hover:underline text-sm cursor-pointer mr-1"
          >
            {{ genre.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    genres: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      genresOpen: false
    };
  },
  methods: {
    selectGenre(genre) {
      this.$emit("genres-selected", { id: genre.id, name: genre.name });
      this.genresOpen = false;
    }
  }
};
</script>
