<script setup>
defineProps({
  to: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    default: '← Back',
  },
})
</script>

<template>
  <router-link :to="to" class="back-button btn-outline-default">
    {{ text }}
  </router-link>
</template>

<style lang="scss" scoped>
.back-button {
  transition: all 0.2s;

  &:hover {
    transform: translateX(-5px);
  }

  .icon {
    font-size: 1.2rem;
  }
}
</style>
