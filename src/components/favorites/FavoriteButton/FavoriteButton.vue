<script setup>
import { useFavoritesStore } from '@/stores/favorites/favorites'
import { computed } from 'vue'

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
})

const favoritesStore = useFavoritesStore()

const handleClick = (event) => {
  event.preventDefault()
  favoritesStore.toggleFavorite(props.movieId)
}

const isFavorite = computed(() => favoritesStore.isFavorite(props.movieId))
</script>

<template>
  <button :class="[{ 'is-favorite': isFavorite }, 'favorite-button']" @click="handleClick">
    <span :class="['star', `start-${size}`]">⭐</span>
  </button>
</template>

<style lang="scss" scoped>
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
  opacity: 0.5;

  &:hover {
    transform: scale(1.1);
  }

  &.is-favorite {
    opacity: 1;
  }

  .star {
    font-size: 1.5rem;

    &.start-small {
      font-size: 1rem;
    }

    &.start-medium {
      font-size: 1.5rem;
    }

    &.start-large {
      font-size: 2rem;
    }
  }
}
</style>
