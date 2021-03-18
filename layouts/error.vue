<template>
  <div
    class="min-h-screen bg-netflixBg flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 "
  >
    <div class="text-white text-center">
      <p class="text-5xl font-extrabold">{{ error.code }}</p>
      <p class="text-3xl font-bold italic">Ops... Something went wrong!</p>
      <p class="text-2xl font-semibold mb-3">{{ error.message }}</p>

      <NuxtLink
        v-if="error.code !== 500"
        class="text-xl font-semibold p-2 rounded-md bg-gray-200  text-netflixBg"
        to="/"
        >Try to return Back</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: {
        code: 500,
        message: "Check your interet connection and/or reload the page."
      }
    }
  }
};
</script>
