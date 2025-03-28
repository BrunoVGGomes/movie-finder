<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import { useUserPreferencesStore } from '@/stores/userPreferences'
import MoviesFilters from '@/components/movies/MoviesFilters/MoviesFilters.vue'
import LoadingSpinner from '@/components/layout/LoadingSpinner/LoadingSpinner.vue'
import ThePagination from '@/components/layout/ThePagination/ThePagination.vue'
import { useRouter } from 'vue-router'
import MovieCardGrid from '@/components/movies/MovieCardGrid/MovieCardGrid.vue'

const moviesStore = useMoviesStore()
const userPreferencesStore = useUserPreferencesStore()
const router = useRouter()
const moviesGrid = ref(null)

const { movies, genres, currentPage, totalPages, loading } = storeToRefs(moviesStore)
const { filters } = storeToRefs(userPreferencesStore)

onMounted(async () => {
  await moviesStore.fetchGenres()
  await moviesStore.fetchMovies(filters.value)
})

const handlePageChange = async (page) => {
  moviesStore.setPage(page)
  loading.value = true
  await moviesStore.fetchMovies(filters.value)
  loading.value = false

  const firstMovie = moviesGrid.value?.firstElementChild

  if (firstMovie) {
    const headerOffset = 100
    const elementPosition = firstMovie.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const handleFiltersUpdate = async (newFilters) => {
  moviesStore.setPage(1)
  await moviesStore.fetchMovies(newFilters)
}
</script>

<template>
  <div class="movies-container">
    <MoviesFilters
      v-model="filters"
      :genres="genres"
      @update:modelValue="handleFiltersUpdate"
      class="mt-3"
    />

    <LoadingSpinner v-if="loading" size="medium" text="Loading movies..." />

    <div v-else ref="moviesGrid" class="movies-grid">
      <MovieCardGrid :movies="movies" :loading="loading" class="col" />
    </div>

    <ThePagination
      v-if="!loading && movies.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :loading="loading"
      @page-change="handlePageChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #42b883;
  background: white;
  color: #42b883;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}
</style>
