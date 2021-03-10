<template>
  <main class="min-h-screen bg-netflixBg">
    <div
      class="container z-10 mx-auto grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      v-if="$fetchState.pending"
    >
      <div
        class="bg-gray-700 animate-pulse rounded-md overflow-hidden relative"
        v-for="i in 20"
        :key="i"
      >
        <img :src="loadingImg" alt="loading" />
        <div
          class="h-10 w-full absolute bottom-0"
          style="background-color: rgba(0, 0, 0, 0.5)"
        >
          <div class="m-2 w-3/4 bg-gray-600"></div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="container mx-auto grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <div
        @click="showDetails(file.media_type, file.id)"
        class="rounded-md overflow-hidden relative bg-gray-800 h-full w-full"
        v-for="file in data.results"
        :key="file.id"
      >
        <img
          class="cursor-pointer"
          :src="coverUrl(file.poster_path, file.profile_path)"
          alt="cover"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { multipleSearch } from "@/api";
import fallImage from "@/assets/images/cover-not-found.png";
import loading from "@/assets/images/loading.png";

export default {
  data() {
    return {
      data: [],
      query: null
    };
  },
  created() {
    this.query = this.$route.query.q;
  },
  async fetch() {
    try {
      this.data = await this.$axios.$get(multipleSearch(this.query));
    } catch (e) {
      error;
    }
  },
  watch: {
    $route(to, from) {
      this.query = to.query.q;
      this.$fetch();
    }
  },
  computed: {
    loadingImg() {
      return loading;
    }
  },
  methods: {
    coverUrl(posterPath, profilePath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      } else if (profilePath) {
        return `https://image.tmdb.org/t/p/w500${profilePath}`;
      } else {
        return fallImage;
      }
    },
    showDetails(media, id) {
      //Query details for Movie
      if (media === "movie") {
        this.$router.push({ path: `/movies/${id}`, query: { type: "movie" } });
        //Query details for TV-Show
      } else if (media === "tv") {
        this.$router.push({ path: `/series/${id}`, query: { type: "tv" } });
        //Query details for Actor
      } else if (media === "person") {
        this.$router.push(`/actors/${id}`);
      }
    }
  }
};
</script>
