<template>
  <div
    @click="showDetails"
    class="h-48 flex-shrink-0 overflow-hidden rounded-md my-2 cursor-pointer transform duration-300 ease-out hover:scale-110"
  >
    <img class="h-full" :src="coverPath" alt="cover" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    id: {
      required: true
    }
  },
  computed: {
    coverPath() {
      return `https://image.tmdb.org/t/p/w500${this.path}`;
    }
  },
  methods: {
    showDetails() {
      this.$router.push(`/${this.id}`);
    }
  }
};
</script>
