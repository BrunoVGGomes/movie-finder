<script setup>
import LoadingSpinner from '@/components/layout/LoadingSpinner/LoadingSpinner.vue'
import BackButton from '@/components/layout/BackButton/BackButton.vue'
import FavoriteButton from '@/components/favorites/FavoriteButton/FavoriteButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted, onUnmounted } from 'vue'
import { useMovieDetailsStore } from '@/stores/movieDetails'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieDetailsStore()

onMounted(() => {
  movieStore.fetchMovieDetails(route.params.id)
})

onUnmounted(() => {
  movieStore.clearMovie()
})

const navigateToMovie = async (movieId) => {
  await router.push({
    name: 'movie-details',
    params: { id: movieId },
  })
  movieStore.fetchMovieDetails(movieId)
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      movieStore.fetchMovieDetails(newId)
    }
  },
)
</script>

<template>
  <LoadingSpinner v-if="movieStore.loading" size="large" text="Loading movie details..." />

  <div v-else-if="movieStore.error" class="alert alert-danger" role="alert">
    {{ movieStore.error }}
  </div>

  <div v-else-if="movieStore.movie" class="movie-details">
    <div class="d-flex justify-content-end align-items-center mb-2 container">
      <BackButton :to="{ name: 'movies' }" text="← Back to list" />
    </div>
    <div
      class="movie-header position-relative"
      :style="{
        backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.6), rgba(20, 20, 20, 0.6)), url(https://image.tmdb.org/t/p/original${movieStore.movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div class="movie-header-content container py-5">
        <div class="row align-items-center">
          <div class="col-md-4 mb-4 mb-md-0">
            <img
              :src="`https://image.tmdb.org/t/p/w500${movieStore.movie.poster_path}`"
              :alt="movieStore.movie.title"
              class="img-fluid rounded shadow-lg"
            />
          </div>
          <div class="col-md-8">
            <h1 class="display-4 mb-3 text-white">
              {{ movieStore.movie.title }}
              <FavoriteButton :movie-id="movieStore.movie.id" size="large" />
            </h1>
            <div class="meta mb-3">
              <span class="badge bg-secondary me-2">{{
                new Date(movieStore.movie.release_date).getFullYear()
              }}</span>
              <span class="badge badge-warning badge-star text-warning me-2"
                >⭐ {{ movieStore.movie.vote_average.toFixed(1) }}</span
              >
              <span class="badge bg-info"
                >{{ Math.floor(movieStore.movie.runtime / 60) }}h
                {{ movieStore.movie.runtime % 60 }}m</span
              >
            </div>
            <div class="genres mb-3">
              <span
                v-for="genre in movieStore.movie.genres"
                :key="genre.id"
                class="badge bg-primary me-2 mb-2"
              >
                {{ genre.name }}
              </span>
            </div>
            <p class="lead text-white">{{ movieStore.movie.overview }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <section v-if="movieStore.movie.credits?.cast?.length" class="mb-5">
        <h2 class="h3 mb-4">Cast</h2>
        <div class="row g-4">
          <div
            v-for="actor in movieStore.movie.credits.cast.slice(0, 6)"
            :key="actor.id"
            class="col-6 col-md-4 col-lg-2"
          >
            <div class="card-box h-100">
              <img
                :src="
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : '/placeholder-avatar.png'
                "
                :alt="actor.name"
                class="card-img-top"
              />
              <div class="card-body p-3">
                <h5 class="card-title h6 mb-1">{{ actor.name }}</h5>
                <p class="card-text small text-light">{{ actor.character }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="movieStore.movie.videos?.results?.length" class="mb-5">
        <h2 class="h3 mb-4">Videos</h2>
        <div class="row g-4">
          <div
            v-for="video in movieStore.movie.videos.results.slice(0, 2)"
            :key="video.id"
            class="col-md-6"
          >
            <div class="ratio ratio-16x9">
              <iframe
                :src="`https://www.youtube.com/embed/${video.key}`"
                class="rounded"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section v-if="movieStore.movie.similar?.results?.length" class="mb-5">
        <h2 class="h3 mb-4">Similar Movies</h2>
        <div class="row g-4">
          <div
            v-for="movie in movieStore.movie.similar.results.slice(0, 6)"
            :key="movie.id"
            class="col-6 col-md-4 col-lg-2"
          >
            <div
              @click="navigateToMovie(movie.id)"
              role="button"
              class="text-decoration-none cursor-pointer"
            >
              <div class="card-box h-100 hover-scale">
                <img
                  :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                  :alt="movie.title"
                  class="card-img-top"
                />
                <div class="card-body p-3">
                  <h5 class="card-title h6 mb-1">{{ movie.title }}</h5>
                  <p class="card-text small text-color-secondary">
                    {{ new Date(movie.release_date).getFullYear() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-header {
  min-height: 70vh;
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  }

  &-content {
    position: relative;
    z-index: 1;
  }
}

.badge-star {
  background-color: rgba(235, 202, 57, 0.2);
}

.hover-scale {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
