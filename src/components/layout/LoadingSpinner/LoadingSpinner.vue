<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  text: {
    type: String,
    default: 'Loading...',
  },
})
</script>

<template>
  <div class="loading-container" :class="size">
    <div class="spinner"></div>
    <div v-if="text" class="loading-text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  color: var(--text-color);
  gap: 1rem;

  &.small {
    .spinner {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }

    .loading-text {
      font-size: 0.875rem;
    }
  }

  &.medium {
    .spinner {
      width: 40px;
      height: 40px;
      border-width: 3px;
    }
  }

  &.large {
    .spinner {
      width: 64px;
      height: 64px;
      border-width: 4px;
    }

    .loading-text {
      font-size: 1.25rem;
    }
  }

  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    font-size: 1rem;
    color: var(--text-secondary);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
