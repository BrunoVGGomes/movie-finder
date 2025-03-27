import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const useMovieDetailsStore = defineStore('movieDetails', () => {
  const movie = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchMovieDetails(id) {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`${API_BASE_URL}/3/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'credits,videos,similar'
        }
      })
      movie.value = response.data
    } catch (err) {
      console.error('Error fetching movie details:', err)
      error.value = 'Failed to fetch movie details'
    } finally {
      loading.value = false
    }
  }

  function clearMovie() {
    movie.value = null
    error.value = null
  }

  return {
    movie,
    loading,
    error,
    fetchMovieDetails,
    clearMovie
  }
})
