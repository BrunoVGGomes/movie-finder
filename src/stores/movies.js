import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])
  const genres = ref([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const hasMovies = computed(() => movies.value.length > 0)
  const getGenreById = computed(() => (id) => genres.value.find((genre) => genre.id === id))

  async function fetchGenres() {
    try {
      const response = await axios.get(`${API_BASE_URL}/3/genre/movie/list`, {
        params: {
          api_key: API_KEY,
        },
      })
      genres.value = response.data.genres
    } catch (err) {
      console.error('Error fetching genres:', err)
      error.value = 'Failed to fetch genres'
    }
  }

  async function fetchMovies(filters) {
    loading.value = true
    error.value = null

    try {
      const params = {
        api_key: API_KEY,
        page: currentPage.value,
        with_genres: filters.selectedGenres.join(','),
        per_page: filters.itemsPerPage,
      }

      if (filters.yearFilter) {
        params.primary_release_year = filters.yearFilter
      }

      if (filters.ratingFilter) {
        params['vote_average.gte'] = filters.ratingFilter
      }

      const response = await axios.get(`${API_BASE_URL}/3/discover/movie`, { params })
      movies.value = response.data.results
      totalPages.value = response.data.total_pages
    } catch (err) {
      console.error('Error fetching movies:', err)
      error.value = 'Failed to fetch movies'
    } finally {
      loading.value = false
    }
  }

  function setPage(page) {
    currentPage.value = page
  }

  return {
    // State
    movies,
    genres,
    currentPage,
    totalPages,
    loading,
    error,

    // Getters
    hasMovies,
    getGenreById,

    // Actions
    fetchGenres,
    fetchMovies,
    setPage,
  }
})
