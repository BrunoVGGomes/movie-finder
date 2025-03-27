<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['page-change'])

const handlePageChange = (page) => {
  emit('page-change', page)
}
</script>

<template>
  <div class="pagination-wrapper" data-testid="pagination">
    <div class="pagination">
      <button
        class="btn-outline-default me-2"
        :disabled="currentPage === 1 || loading"
        @click="handlePageChange(currentPage - 1)"
        data-testid="prev-button"
      >
        Previous
      </button>

      <div class="pages">
        <button
          v-if="currentPage > 2"
          class="btn btn-outline-default page-number"
          @click="handlePageChange(1)"
          data-testid="first-page"
        >
          1
        </button>

        <span v-if="currentPage > 3" class="dots">...</span>

        <button
          v-if="currentPage > 1"
          class="btn-outline-default page-number"
          :disabled="loading"
          @click="handlePageChange(currentPage - 1)"
          :data-testid="'page-' + (currentPage - 1)"
        >
          {{ currentPage - 1 }}
        </button>

        <button
          class="btn-outline-relevant active"
          :data-testid="'page-' + currentPage"
          :disabled="loading"
        >
          {{ currentPage }}
        </button>

        <button
          v-if="currentPage < totalPages"
          class="btn-outline-default page-number"
          :disabled="loading"
          @click="handlePageChange(currentPage + 1)"
          :data-testid="'page-' + (currentPage + 1)"
        >
          {{ currentPage + 1 }}
        </button>

        <span v-if="currentPage < totalPages - 2" class="dots">...</span>

        <button
          v-if="currentPage < totalPages - 1"
          class="btn-outline-default page-number"
          :disabled="loading"
          @click="handlePageChange(totalPages)"
          data-testid="last-page"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        class="btn-outline-default ms-2"
        :disabled="currentPage === totalPages || loading"
        @click="handlePageChange(currentPage + 1)"
        data-testid="next-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;

  .pages {
    display: flex;
    gap: 0.5rem;
  }

  // button {
  //   padding: 0.5rem 1rem;
  //   border: none;
  //   border-radius: 4px;
  //   background: var(--secondary-color);
  //   color: var(--text-color);
  //   cursor: pointer;
  //   transition: all 0.2s;

  //   &:hover:not(:disabled) {
  //     background: var(--red);
  //   }

  //   &:disabled {
  //     opacity: 0.5;
  //     cursor: not-allowed;
  //   }

  //   &.active {
  //     background: var(--red);
  //   }
  // }

  .page-info {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    color: var(--text-color);
  }
}
</style>
