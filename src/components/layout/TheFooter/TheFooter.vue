<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="py-3 mt-5 bg-secondary-custom">
    <div class="container text-center">
      <p class="mb-0">{{ currentYear }} MovieFinder. Powered by TMDB</p>
    </div>
  </footer>
</template>

<style scoped>
p {
  font-size: 0.9rem;
  color: #888;
}
</style>
