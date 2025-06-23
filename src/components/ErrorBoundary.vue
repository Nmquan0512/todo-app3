<template>
  <div>
    <slot v-if="!hasError" />
    <div v-else>Something went wrong. Please try again.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasError: false,
    };
  },
  errorCaptured(err) {
    this.hasError = true;
    console.error("Captured in ErrorBoundary:", err);
    return false;
  },
};
</script>
