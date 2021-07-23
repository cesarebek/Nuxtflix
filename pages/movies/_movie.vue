<template>
  <div class="bg-netflixBg">
    <MainBanner
      :details="details"
      @open-trailer="openTrailer = !openTrailer"
      :videos="videos"
    />
    <main class="divide-y px-5">
      <section class="container mx-auto py-10">
        <p class="text-3xl text-white font-bold mb-3">Cast</p>
        <ContentCredits :type="type" :id="id" />
      </section>

      <section class="container mx-auto py-10">
        <p class="text-3xl text-white font-bold mb-3">You may also like...</p>
        <ContentRecommendations :type="type" :id="id" />
      </section>
    </main>
  </div>
</template>

<script>
import { movieDetails, movieVideos } from "~/api";
import ContentCredits from "@/components/contentDetails/ContentCredits";
import ContentRecommendations from "~/components/contentDetails/ContentRecommendations.vue";
import MovieInfo from "~/components/contentDetails/MovieInfo.vue";
import MainBanner from "~/components/contentDetails/MainBanner.vue";

export default {
  components: {
    ContentCredits,
    ContentRecommendations,
    MovieInfo,
    MainBanner
  },
  data() {
    return {
      openTrailer: false
    };
  },
  async asyncData({ $axios, route, error }) {
    try {
      const id = route.params.movie;
      const type = route.query.type;
      const responses = await Promise.all([
        $axios.$get(movieDetails(type, id)),
        $axios.$get(movieVideos(type, id))
      ]);
      return { details: responses[0], videos: responses[1] };
    } catch (e) {
      if (e.response) {
        return error({ code: e.response.status, message: e.message });
      } else {
        return error({
          code: 500,
          message: "Check your internet connection and/or refresh the page"
        });
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.movie;
    },
    type() {
      return this.$route.query.type;
    }
  }
};
</script>
