import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from './favorites'

describe('Favorites Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty favorites', () => {
    const store = useFavoritesStore()
    expect(store.favoriteMovies).toEqual([])
  })

  it('can add a movie to favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(1)
    expect(store.favoriteMovies).toContain(1)
  })

  it('can remove a movie from favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(1)
    store.toggleFavorite(1)
    expect(store.favoriteMovies).not.toContain(1)
  })

  it('correctly checks if a movie is favorite', () => {
    const store = useFavoritesStore()
    expect(store.isFavorite(1)).toBe(false)
    store.toggleFavorite(1)
    expect(store.isFavorite(1)).toBe(true)
  })
})
