<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const navbarCollapse = ref(null)
const isMenuOpen = ref(false)

const closeMenu = () => {
  if (isMenuOpen.value) {
    navbarCollapse.value?.classList.remove('show')
    isMenuOpen.value = false
  }
}

const toggleMenu = (event) => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    navbarCollapse.value?.classList.add('show')
  } else {
    navbarCollapse.value?.classList.remove('show')
  }
  event.stopPropagation()
}

const handleClick = (event) => {
  if (
    !navbarCollapse.value?.contains(event.target) &&
    !event.target.classList.contains('navbar-toggler') &&
    !event.target.classList.contains('navbar-toggler-icon')
  ) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container py-2">
      <RouterLink to="/" class="navbar-brand"> <strong>Movie</strong>Finder </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="navbarNav"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div ref="navbarCollapse" class="collapse navbar-collapse" id="navbarNav" @click.stop>
        <div class="navbar-nav ms-auto">
          <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: $route.name === 'movies' }"
            @click="closeMenu"
          >
            Movies
          </RouterLink>
          <RouterLink
            to="/favorites"
            class="nav-link"
            :class="{ active: $route.name === 'favorites' }"
            @click="closeMenu"
          >
            Favorites
          </RouterLink>
          <RouterLink to="/about" class="nav-link" active-class="active" @click="closeMenu"
            >About</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@use '@/assets/base.scss';

.navbar {
  background-color: var(--header-bk-color);
  color: var(--navbar-color);

  .navbar-brand {
    color: var(--header-brand-color);

    &:hover {
      color: var(--header-brand-color);
    }
  }

  .navbar-nav .nav-link {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    color: var(--header-color);
    // color: var(--navbar-link-color);

    &.hover,
    &.active {
      color: var(--navbar-hover-color);
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  .navbar-toggler-icon {
    width: 1.5em;
    height: 1.5em;
    background-color: var(--navbar-toggler-bk-color);
    border-radius: 5px;
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    right: 1rem;
    background-color: var(--secondary-color);
    padding: 1rem;
    margin-top: 0.5rem;
    border-radius: 8px;
    width: auto;
    min-width: 200px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .navbar-nav {
    text-align: right;
  }

  .nav-link {
    padding: 0.75rem !important;
    margin: 0.25rem 0 !important;
    white-space: nowrap;

    &.router-link-active {
      color: red;
    }
  }
}
</style>
