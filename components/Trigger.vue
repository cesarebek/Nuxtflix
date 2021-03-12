<template>
  <span ref="trigger"></span>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        root: null,
        threshold: "0"
      })
    }
  },
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      this.handleIntesect(entries[0]);
    }, this.options);

    this.observer.observe(this.$refs.trigger);
  },
  methods: {
    handleIntesect(entry) {
      if (entry.isIntersecting) this.$emit("triggerIntersected");
    }
  },
  beforeDestroy() {
    this.observer.disconnect();
  }
};
</script>
