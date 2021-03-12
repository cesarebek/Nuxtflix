<template>
  <main class="min-h-screen bg-netflixBg">
    <div v-if="$fetchState.pending" class="container mx-auto animate-pulse">
      <div class="flex pt-10 pb-5 text-lg">
        <div class="bg-gray-500 rounded-lg flex-shrink-0 mr-5 text-transparent">
          Take a look at titles related at:
        </div>
        <div class="bg-gray-500 text-transparent rounded-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio dolorum
          explicabo totam, provident quod eligendi
        </div>
      </div>
      <div class=" grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          class="bg-gray-700 rounded-md overflow-hidden relative"
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
    </div>

    <!-- Searched List -->
    <div v-else class="container mx-auto ">
      <div class="hidden sm:block">
        <div class="flex pt-10 pb-5 text-lg">
          <p class="text-gray-500 flex-shrink-0 mr-5">
            Take a look at titles related at:
          </p>
          <div class="flex flex-wrap">
            <p
              class="text-gray-300 font-medium cursor-pointer mx-2 hover:text-red-600"
              v-for="keyword in keywords.slice(0, 10)"
              @click="setSuggestionId(keyword.id)"
              :key="keyword.id"
            >
              {{ keyword.name }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div
          @click="showDetails(file.media_type, file.id)"
          class="rounded-md overflow-hidden relative bg-gray-800 mx-5"
          v-for="file in data"
          :key="file.id"
        >
          <img
            class="cursor-pointer w-full"
            :src="coverUrl(file.poster_path, file.profile_path)"
            alt="cover"
          />
        </div>
        <Trigger @triggerIntersected="loadMore" />
      </div>
    </div>
  </main>
</template>

<script>
import { multipleSearch, queryKeywordBySearch, titlesByKeyword } from "@/api";
import fallImage from "@/assets/images/cover-not-found.png";
import loading from "@/assets/images/loading.png";

export default {
  data() {
    return {
      data: [],
      keywords: [],
      query: null,
      suggestionId: null,
      page: 1,
      pages: null
    };
  },
  created() {
    this.query = this.$route.query.q;
  },
  async fetch() {
    try {
      this.page = 1;
      const titlesResponse = await this.$axios.$get(
        multipleSearch(this.query, this.page++)
      );
      const keysResponse = await this.$axios.$get(
        queryKeywordBySearch(this.query)
      );
      this.data = titlesResponse.results;
      this.pages = titlesResponse.total_pages;
      this.keywords = keysResponse.results;
    } catch (e) {
      console.log(e);
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.q !== this.query) {
        this.query = to.query.q;
        return this.$fetch();
      } else if (to.query.suggestionId) {
        return this.searchByKeyword();
      }
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
    },
    //Set the query for suggetionId
    setSuggestionId(id) {
      this.page = 1;
      this.$router.push({
        path: "/browse",
        query: { q: this.query, suggestionId: id }
      });
      this.suggestionId = id;
    },
    //Load Title by Keyword
    async searchByKeyword() {
      const response = await this.$axios.$get(
        titlesByKeyword("movie", this.suggestionId, this.page)
      );
      this.data = response.results;
      this.pages = response.total_pages;
    },
    //Load Next Page
    async loadMore() {
      //Check for CurrentPage based on TotalPages
      if (this.page < this.pages) {
        //Fetching titles by user's query OR keyword
        if (this.suggestionId) {
          const nextPage = await this.$axios.$get(
            titlesByKeyword("movie", this.suggestionId, this.page++)
          );
          return (this.data = [...this.data, ...nextPage.results]);
        } else {
          const nextPage = await this.$axios.$get(
            multipleSearch(this.query, this.page++)
          );
          return (this.data = [...this.data, ...nextPage.results]);
        }
      } else {
        console.log("end pages");
        return;
      }
    }
  }
};
</script>
