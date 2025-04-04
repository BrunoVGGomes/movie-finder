<script setup>
import { ref, onMounted } from 'vue'
import { useFavoritesStore } from '@/stores/favorites/favorites'
import { useMovieDetailsStore } from '@/stores/movieDetails'
import MovieCardGrid from '@/components/movies/MovieCardGrid/MovieCardGrid.vue'

const favoritesStore = useFavoritesStore()
const movieDetailsStore = useMovieDetailsStore()
const loading = ref(false)
const favoriteMovies = ref([])

const fetchFavoriteMovies = async () => {
  loading.value = true
  try {
    const promises = favoritesStore.favoriteMovies.map(async (id) => {
      await movieDetailsStore.fetchMovieDetails(id)
      return movieDetailsStore.movie
    })
    favoriteMovies.value = await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching favorite movies:', error)
  }
  loading.value = false
}

onMounted(fetchFavoriteMovies)
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">My Favorite Movies</h1>

    <MovieCardGrid :movies="favoriteMovies" :loading="loading" class="col" />
    <div v-if="!loading && favoriteMovies.length === 0" class="text-center py-5">
      <h2 class="lead">You haven't added any movies to your favorites yet.</h2>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  transition: transform 0.2s ease;
  text-decoration: none;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  color: #aaa;
}
</style>
