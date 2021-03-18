<template>
  <div class="bg-netflixBg">
    <MainBanner
      :details="details"
      @open-trailer="openTrailer = !openTrailer"
      :videos="videos"
    />
    <main class="divide-y px-5">
      <client-only>
        <section class="container mx-auto py-10">
          <p class="text-3xl text-white font-bold mb-3">Cast</p>
          <ContentCredits :type="type" :id="id" />
        </section>

        <section class="container mx-auto py-10">
          <p class="text-3xl text-white font-bold mb-3">You may also like...</p>
          <ContentRecommendations :type="type" :id="id" />
        </section>
      </client-only>
    </main>
  </div>
</template>

<script>
import { movieDetails, movieVideos } from "~/api";
import ContentCredits from "@/components/contentDetails/ContentCredits";
import ContentRecommendations from "~/components/contentDetails/ContentRecommendations.vue";
import GenericInfo from "~/components/contentDetails/MovieInfo.vue";
import MainBanner from "~/components/contentDetails/MainBanner.vue";

export default {
  components: {
    ContentCredits,
    ContentRecommendations,
    GenericInfo,
    MainBanner
  },
  data() {
    return {
      openTrailer: false
    };
  },
  async asyncData({ $axios, route, error }) {
    try {
      const id = route.params.serie;
      const type = route.query.type;
      const details = await $axios.$get(movieDetails(type, id));
      const videos = await $axios.$get(movieVideos(type, id));
      return { details, videos };
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
      return this.$route.params.serie;
    },
    type() {
      return this.$route.query.type;
    }
  }
};
</script>
