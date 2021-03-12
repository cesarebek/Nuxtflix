<template>
  <section>
    <h1 class="text-2xl font-semibold text-white mb-3">Acting</h1>
    <div class="rounded-xl overflow-hidden shadow-lg">
      <table class="table-auto cursor-default w-full ">
        <tbody class="text-gray-800">
          <tr
            class="border-b border-gray-800 w-full bg-gray-400"
            v-for="credit in credits"
            :key="credit.id"
          >
            <td class="p-3">
              {{ credit.release_date || credit.first_air_date || "-" }}
            </td>
            <td class="px-3">&#8226;</td>
            <td
              @click="showDetails(credit.media_type, credit.id)"
              class="font-bold p-3 cursor-pointer"
            >
              {{ credit.title || credit.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    credits: Array,
    required: true
  },
  methods: {
    showDetails(media, id) {
      const type = media === "movie" ? "movies" : "series";
      this.$router.push({ path: `/${type}/${id}`, query: { type: media } });
    },
    yearRelease(date) {
      return date.splice("-")[0];
    }
  }
};
</script>
