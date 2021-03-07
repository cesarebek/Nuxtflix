<template>
  <section
    class="flex px-2 scrollbar-thin overflow-x-scroll space-x-2 scrollbar-thumb-gray-400 scrollbar-track-netflixBg dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
  >
    <ActorCard
      v-for="actor in actors"
      :key="actor.id"
      :path="actor.profile_path"
      :name="actor.name"
    />
  </section>
</template>

<script>
export default {
  props: {
    actors: {
      type: Array,
      required: true
    }
  }
};
</script>
