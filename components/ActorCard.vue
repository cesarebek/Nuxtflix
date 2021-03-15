<template>
  <div
    @click="showDetails"
    class="flex justify-center w-1/2 sm:w-1/3 shadow-md md:w-1/4 lg:w-1/6 relative flex-shrink-0 overflow-hidden rounded-md my-3 cursor-pointer"
  >
    <img class="h-auto" :src="coverPath" alt="cover" />
    <div class="absolute bottom-0">
      <p class="text-shadow-xl uppercase text-center">{{ name }}</p>
    </div>
  </div>
</template>

<script>
import fallImg from "@/assets/images/avatar.png";
export default {
  props: {
    path: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    coverPath() {
      return this.path
        ? `https://image.tmdb.org/t/p/w500${this.path}`
        : fallImg;
    }
  },
  methods: {
    showDetails() {
      this.$router.push(`/actors/${this.id}`);
    }
  }
};
</script>
