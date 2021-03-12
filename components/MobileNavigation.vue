<template>
  <section class="md:hidden">
    <div @click="toggle" class="p-1 rounded-full">
      <fa icon="bars" class="text-white w-8 cursor-pointer" />
    </div>
    <div
      v-if="menuOpen"
      class="w-screen h-screen flex justify-center fixed inset-x-0 inset-y-0 z-20"
      style="background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px);"
    >
      <nav
        class="flex flex-col items-center justify-center space-y-4"
        @click="toggle"
      >
        <NuxtLink
          class="text-white text-xl font-light transform duration-500 hover:text-gray-400 cursor-pointer"
          v-for="nav in navs"
          :key="nav.id"
          :to="nav.slug"
        >
          {{ nav.name }}
        </NuxtLink>
        <NuxtLink
          to="/auth"
          v-if="!isLogged"
          class="bg-red-600 text-white px-5 py-1 rounded-sm cursor-pointer"
        >
          Login
        </NuxtLink>
        <div
          @click="toggle"
          class="w-10 h-10 z-10 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer absolute"
          style="bottom: 2rem"
        >
          <fa icon="times" class="text-netflixBg" />
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "Vuex";
export default {
  props: {
    navs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    ...mapGetters("authentication", ["isLogged"])
  },
  methods: {
    toggle() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>
