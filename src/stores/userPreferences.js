import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  const filters = ref({
    selectedGenres: [],
    yearFilter: '',
    ratingFilter: '',
    itemsPerPage: 10
  })

  const theme = ref('dark')

  function updateFilters(newFilters) {
    filters.value = {
      ...filters.value,
      ...newFilters
    }
  }

  function setTheme(newTheme) {
    theme.value = newTheme
  }

  function resetFilters() {
    filters.value = {
      selectedGenres: [],
      yearFilter: '',
      ratingFilter: '',
      itemsPerPage: 10
    }
  }

  return {
    filters,
    theme,
    updateFilters,
    setTheme,
    resetFilters
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-preferences',
        storage: localStorage,
        paths: ['filters', 'theme']
      }
    ]
  }
})
