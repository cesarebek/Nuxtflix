<template>
  <section class="grid grid-cols-2 sm:grid-cols-3">
    <div class="text-white">
      <p class="font-semibold text-xl mb-2">Social</p>
      <div class="flex flex-col space-y-2">
        <span
          ><a
            :href="`https://www.facebook.com/${socials.facebook_id}`"
            target="_blank"
            >Facebook</a
          ></span
        >
        <span
          ><a
            :href="`https://www.instagram.com/${socials.instagram_id}`"
            target="_blank"
            >Instagram</a
          ></span
        >
        <span
          ><a
            :href="`https://www.twitter.com/${socials.twitter_id}`"
            target="_blank"
            >Twitter</a
          ></span
        >
      </div>
    </div>
    <div>
      <div class="text-white">
        <p class="font-semibold text-xl mb-2">Statistics</p>
        <div>
          <p class="font-medium">Status</p>
          <p class="text-gray-500 text-sm">{{ status }}</p>
        </div>
        <div>
          <p class="font-medium">Original Language</p>
          <p class="text-gray-500 text-sm">{{ origLang }}</p>
        </div>
        <div>
          <p class="font-medium">Revenue</p>
          <p class="text-gray-500 text-sm">$ {{ revenue }}</p>
        </div>
      </div>
    </div>
    <div class="text-white col-span-2 sm:col-span-1">
      <p class="font-semibold text-xl mb-1">
        Keywords
      </p>
      <div class="space-y-2">
        <p
          v-for="keyword in keywords.keywords"
          @click="searchByKeyword(keyword)"
          :key="keyword.id"
          class="bg-gray-600 text-gray-200 inline-block p-1 rounded-md font-medium mr-2 "
        >
          {{ keyword.name }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { movieSocials, movieKeywords } from "@/api";
export default {
  props: {
    status: {
      type: String,
      required: true
    },
    origLang: {
      type: String,
      required: true
    },
    status: {
      Budget: String,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      socials: {},
      keywords: []
    };
  },
  async fetch() {
    this.socials = await this.$axios.$get(movieSocials(this.id));
    this.keywords = await this.$axios.$get(movieKeywords(this.id));
  },
  methods: {
    searchByKeyword(id) {
      this.$router.push(`/browse/${id}`);
    }
  }
};
</script>
