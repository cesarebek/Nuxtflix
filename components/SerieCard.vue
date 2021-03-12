<template>
  <div
    @click="showDetails"
    class="h-48 flex-shrink-0 overflow-hidden rounded-md my-2 cursor-pointer transform duration-300 ease-out hover:scale-110"
  >
    <img class="h-full" :src="coverPath" alt="cover" />
  </div>
</template>

<script>
import fallImage from "@/assets/images/cover-not-found.png";
export default {
  props: {
    path: {
      required: true
    },
    id: {
      required: true
    }
  },
  computed: {
    coverPath() {
      return this.path
        ? `https://image.tmdb.org/t/p/w500${this.path}`
        : fallImage;
    }
  },
  methods: {
    showDetails() {
      this.$router.push({
        path: `/series/${this.id}`,
        query: { type: "tv" }
      });
    }
  }
};
</script>
