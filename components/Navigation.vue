<template>
  <div class="bg-gradient-to-b from-netflixNavGrd1 to-netflixNavGrd2">
    <header
      class="flex justify-between items-center py-5 container mx-auto h-18"
    >
      <div class="flex space-x-10">
        <img class="h-6" src="@/assets/images/netflix.svg" alt="logo" />
        <nav>
          <ul class="flex space-x-5 ">
            <NuxtLink
              tag="li"
              class="text-white text-sm transform duration-500 hover:text-gray-400 cursor-pointer"
              v-for="nav in navs"
              :key="nav.id"
              :to="nav.slug"
            >
              {{ nav.name }}
            </NuxtLink>
          </ul>
        </nav>
      </div>
      <div class="flex items-center">
        <div class="relative cursor-pointer">
          <input
            v-if="searchOpen"
            v-model="boxInput"
            type="text"
            class="w-full h-8 bg-gray-900 border border-white focus:outline-none text-white text-sm pl-8 py-2 rounded"
            placeholder="Titoli, Persone, Generi"
          />
          <svg
            @click="searchOpen = !searchOpen"
            :class="{ absoluteSearch: searchOpen }"
            class="w-8 text-white p-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { id: 0, name: "Home", slug: "/" },
        { id: 1, name: "Serie TV", slug: "/series" },
        { id: 2, name: "Film", slug: "/films" },
        { id: 3, name: "Nuovi e Popolari", slug: "/lastest" }
      ],
      searchOpen: false,
      boxInput: ""
    };
  }
};
</script>

<style scoped>
.nuxt-link-exact-active {
  font-weight: 600;
}

.absoluteSearch {
  position: absolute;
  top: 0px;
  height: 100%;
}
</style>
