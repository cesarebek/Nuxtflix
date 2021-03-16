<template>
  <!-- User Tools -->
  <div class="flex items-center space-x-5 my-4">
    <div
      class="h-16 w-16 bg-green-900 rounded-full flex justify-center items-center flex-shrink-0"
    >
      <p class="flex items-start text-lg font-bold">
        {{ vote_average * 10 }}
        <span class="text-xs font-normal">%</span>
      </p>
    </div>
    <div class="flex space-x-4">
      <!-- ADD TO WATCHLIST -->
      <button
        @click="watchlist"
        :class="{ watchlisted: isListed }"
        class="rounded-full h-10 w-10 bg-gray-800 transform duration-200 hover:scale-110"
      >
        <fa icon="bookmark" />
      </button>

      <!-- LIKE -->
      <button
        @click="like"
        :class="{ liked: isLiked }"
        class="rounded-full h-10 w-10 bg-gray-800 transform duration-200 hover:scale-110"
      >
        <span><fa icon="heart"/></span>
      </button>

      <!-- RATE -->
      <v-popover offset="16">
        <button
          @click="rateOpen = !rateOpen"
          :class="{ rated: isRated }"
          class="rounded-full h-10 w-10 bg-gray-800 transform duration-200 hover:scale-110"
        >
          <fa icon="star" />
        </button>

        <template slot="popover">
          <StarsRatings
            v-model="rating"
            :increment="0.5"
            :show-rating="false"
            :star-size="25"
          />
        </template>
      </v-popover>
    </div>
    <button
      @click="$emit('open-trailer')"
      class="font-bold p-1 transform duration-300 hover:scale-105"
    >
      <fa icon="play" class="mr-1 hidden sm:inline-block" />
      Play Trailer
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { markFavorite, titleStates, addWatchlist, rateTitle } from "@/api";

export default {
  props: {
    vote_average: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      status: {},
      rateOpen: false,
      rating: 0
    };
  },
  async mounted() {
    const media = this.$route.query.type;
    if (this.token) {
      return (this.status = await this.$axios.$get(
        titleStates(media, this.id, this.token)
      ));
    } else {
      return (this.status = { favorite: false, watchlist: false, rate: false });
    }
  },
  computed: {
    ...mapGetters("authentication", ["userID", "token"]),
    isLiked() {
      return this.status.favorite === true;
    },
    isListed() {
      return this.status.watchlist === true;
    },
    isRated() {
      return this.status.rated === false ? false : true;
    }
  },
  watch: {
    rating() {
      this.rate();
    }
  },
  methods: {
    async like() {
      if (this.token && this.userID) {
        await this.$axios.post(markFavorite(this.userID, this.token), {
          media_type: this.$route.query.type,
          media_id: this.id,
          favorite: !this.status.favorite
        });
        return (this.status = await this.$axios.$get(
          titleStates(this.$route.query.type, this.id, this.token)
        ));
      } else if (!this.token) {
        return this.$router.push("/auth");
      }
    },
    async watchlist() {
      if (this.token && this.userID) {
        await this.$axios.post(addWatchlist(this.userID, this.token), {
          media_type: this.$route.query.type,
          media_id: this.id,
          watchlist: !this.status.watchlist
        });
        return (this.status = await this.$axios.$get(
          titleStates(this.$route.query.type, this.id, this.token)
        ));
      } else if (!this.token || !this.userID) {
        return this.$router.push("/auth");
      }
    },
    async rate() {
      if (this.token && this.userID) {
        await this.$axios.post(
          rateTitle(this.$route.query.type, this.id, this.token),
          {
            value: this.rating * 2
          }
        );
        return (this.status = await this.$axios.$get(
          titleStates(this.$route.query.type, this.id, this.token)
        ));
      } else if (!this.token || !this.userID) {
        return this.$router.push("/auth");
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.liked {
  @apply text-red-600;
}

.watchlisted {
  @apply text-green-800;
}

.rated {
  @apply text-yellow-600;
}
</style>
