<template>
  <div
    class="h-screen flex flex-col justify-between bg-netflixBg"
    :style="{
      backgroundImage: `url(${backgroundCover})`
    }"
  >
    <div class="min-h-screen"></div>
    <TheFooter />
  </div>
</template>
<script>
import loginBg from "@/assets/images/login-bg.jpg";
export default {
  computed: {
    backgroundCover() {
      return loginBg;
    }
  }
};
</script>
