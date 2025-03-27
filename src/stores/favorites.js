import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const favoriteMovies = ref([])

    const toggleFavorite = (movieId) => {
      const index = favoriteMovies.value.indexOf(movieId)
      if (index === -1) {
        favoriteMovies.value.push(movieId)
      } else {
        favoriteMovies.value.splice(index, 1)
      }
    }

    const isFavorite = (movieId) => {
      return favoriteMovies.value.includes(movieId)
    }

    const getFavoriteMoviesData = async () => {
      loading.value = true
      error.value = null

      try {
        const data = await Promise.all(
          favoriteMovies.value.map(async (id) => {
            return await axios.get(`${API_BASE_URL}/3/movie/${id}`, {
              params: {
                api_key: API_KEY,
                append_to_response: 'credits,videos,similar',
              },
            })
          }),
        )

        return data
      } catch (err) {
        console.error('Error fetching favorite movies:', err)
        error.value = 'Failed to fetch favorite movies'
      } finally {
        loading.value = false
      }
    }

    return {
      favoriteMovies,
      toggleFavorite,
      isFavorite,
      getFavoriteMoviesData,
    }
  },
  {
    persist: true, // Mantém a persistência do estado
  },
)
