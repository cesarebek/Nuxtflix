<template>
  <div
    class="flex justify-center w-1/2 sm:w-1/3 shadow-md md:w-1/4 lg:w-1/6 relative flex-shrink-0 overflow-hidden rounded-md my-3 cursor-pointer"
  >
    <img class="h-full" :src="coverPath" alt="cover" />
    <div class="absolute bottom-0">
      <p class="text-shadow-xl uppercase text-center">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    coverPath() {
      return `https://image.tmdb.org/t/p/w500${this.path}`;
    }
  }
};
</script>
