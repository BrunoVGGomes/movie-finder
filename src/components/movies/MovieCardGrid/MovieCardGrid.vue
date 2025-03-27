<script setup>
import LoadingSpinner from '@/components/layout/LoadingSpinner/LoadingSpinner.vue'

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <LoadingSpinner v-if="loading" size="medium" text="Loading movies..." />
  <div v-else ref="moviesGrid" class="movies-grid">
    <router-link
      v-for="movie in movies"
      :key="movie.id"
      :to="{ name: 'movie-details', params: { id: movie.id } }"
      class="movie-card card-box text-decoration-none"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="movie-poster"
      />
      <div class="movie-info">
        <h3>{{ movie.title }}</h3>
        <h3>
          <span class="badge bg-secondary me-3">{{
            new Date(movie.release_date).getFullYear()
          }}</span>
          <span class="badge bg-secondary">⭐ {{ movie.vote_average.toFixed(1) }}</span>
        </h3>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.movie-card {
  &:hover {
    transform: translateY(-5px);
  }

  .movie-poster {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
  }

  .movie-info {
    padding: 1rem;

    h3 {
      font-size: 1rem;
      margin: 0 0 0.5rem;
    }

    .movie-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-color-light);
    }
  }
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .movie-info h3 {
    font-size: 1rem;
  }
}
</style>
