<script setup>
import { computed } from 'vue'
import { useUserPreferencesStore } from '@/stores/userPreferences'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
const userPreferencesStore = useUserPreferencesStore()

const filters = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    userPreferencesStore.updateFilters(value)
  },
})

const toggleGenre = (genreId) => {
  const selectedGenres = [...filters.value.selectedGenres]
  const index = selectedGenres.indexOf(genreId)

  if (index === -1) {
    selectedGenres.push(genreId)
  } else {
    selectedGenres.splice(index, 1)
  }

  filters.value = {
    ...filters.value,
    selectedGenres,
  }
}

const updateYearFilter = (year) => {
  filters.value = {
    ...filters.value,
    yearFilter: year,
  }
}

const updateRatingFilter = (rating) => {
  filters.value = {
    ...filters.value,
    ratingFilter: rating,
  }
}

// TODO: Items per page is not changing API answer. Verify API documentation for this function
const updateItemsPerPage = (items) => {
  filters.value = {
    ...filters.value,
    itemsPerPage: Number(items),
  }
}

const resetFilters = () => {
  userPreferencesStore.resetFilters()
  filters.value = userPreferencesStore.filters
}
</script>

<template>
  <div class="filters card-box">
    <div class="filters-header">
      <h3>Filters</h3>
      <button class="btn-outline-relevant" @click="resetFilters">Reset Filters</button>
    </div>

    <div class="genres">
      <h4>Genres</h4>
      <div class="genre-buttons">
        <button
          v-for="genre in genres"
          :key="genre.id"
          :class="{ active: filters.selectedGenres.includes(genre.id) }"
          @click="toggleGenre(genre.id)"
        >
          {{ genre.name }}
        </button>
      </div>
    </div>

    <div class="filter-controls">
      <div class="filter-group">
        <label>Release Year:</label>
        <input
          :value="filters.yearFilter"
          type="number"
          min="1900"
          :max="new Date().getFullYear()"
          placeholder="Filter by year"
          class="form-control"
          @input="updateYearFilter($event.target.value)"
        />
      </div>

      <div class="filter-group">
        <label>Minimum Rating:</label>
        <input
          :value="filters.ratingFilter"
          type="number"
          min="0"
          max="10"
          step="0.5"
          placeholder="Filter by rating"
          class="form-control"
          @input="updateRatingFilter($event.target.value)"
        />
      </div>

      <div class="filter-group">
        <label>Movies per page:</label>
        <select
          :value="filters.itemsPerPage"
          class="form-control"
          @change="updateItemsPerPage($event.target.value)"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters-header h3 {
  margin: 0;
  color: var(--text-color);
}

.genres h4 {
  margin: 0 0 10px 0;
  color: var(--text-color);
}

.genre-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.genre-buttons button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.genre-buttons button.active {
  background: var(--brand-color);
  color: white;
  border-color: var(--brand-color);
}

.filter-controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  color: var(--text-color);
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  .filter-controls {
    flex-direction: column;
    gap: 12px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>
