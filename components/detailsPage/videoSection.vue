<template>
  <section class="container mx-auto ">
    <div class="px-5 py-4 space-y-5">
      <p class="text-3xl text-white font-extrabold mb-3">Video</p>
      <div v-for="trailer in videos.results" :key="trailer.id">
        <p class="text-gray-400 font-medium mb-2 text-lg">{{ trailer.name }}</p>
        <iframe
          class="w-full md:w-2/3"
          height="400"
          :src="`https://www.youtube.com/embed/${trailer.key}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    videos: {
      type: Array,
      required: true
    }
  }
};
</script>
