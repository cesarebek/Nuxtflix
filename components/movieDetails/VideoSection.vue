<template>
  <div
    class="z-20 fixed inset-0 overflow-hidden flex justify-center items-center"
    style="background: rgba(0, 0, 0, 0.7);"
  >
    <section
      class="h-screen w-screen flex flex-col justify-center items-center x"
    >
      <div
        class="bg-netflixBg w-3/4 p-4 rounded-t-lg flex items-center justify-end "
      >
        <div class="">
          <svg
            @click="closeModal"
            class="h-6 hover:bg-gray-700 rounded-md text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <iframe
        class="w-3/4 h-3/4"
        :src="`https://www.youtube.com/embed/${keyClip}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    videos: {
      type: Object,
      required: true
    }
  },
  computed: {
    keyClip() {
      return this.videos.results[0].key;
    }
  },
  methods: {
    closeModal() {
      this.$emit("close-movie");
    }
  }
};
</script>
