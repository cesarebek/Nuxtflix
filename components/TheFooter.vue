<template>
  <div class="bg-netflixBg">
    <footer class="container mx-auto">
      <div class="flex flex-col items-center">
        <!-- Logo -->
        <img class="w-1/3 m-3" src="@/assets/images/logo.png" alt="logo" />
        <!-- Credits -->
        <p class="text-gray-500 font-medium my-2 flex items-center">
          Developed by Cezary Bek
        </p>
        <!-- Social -->
        <ul class="flex space-x-3 text-gray-500 text-sm">
          <li v-for="social in socials" :key="social.id">
            <a class="hover:underline" :href="social.link" target="_blank">{{
              social.name
            }}</a>
          </li>
        </ul>

        <p class="text-gray-500 font-medium my-2 flex items-center">
          Powered by Nuxt JS
          <span
            ><img
              class="w-4 ml-2"
              src="@/assets/images/nuxt-white.svg"
              alt="nuxt-logo"
          /></span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        {
          id: 0,
          name: "Instagram",
          link: "https://www.instagram.com/cesare_bek/"
        },
        {
          id: 1,
          name: "Facebook",
          link: "https://www.facebook.com/cesare.bich"
        },
        {
          id: 2,
          name: "Linkedin",
          link: "https://www.linkedin.com/in/cezary-bek-b28766173/"
        },
        {
          id: 3,
          name: "Start2Impact",
          link: "https://talent.start2impact.it/profile/cesare-bek"
        }
      ]
    };
  }
};
</script>
