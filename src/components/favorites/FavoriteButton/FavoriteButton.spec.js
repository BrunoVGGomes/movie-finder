import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import FavoriteButton from './FavoriteButton.vue'
import { useFavoritesStore } from '@/stores/favorites'

describe('FavoriteButton', () => {
  const createWrapper = (movieId = 1, options = {}) => {
    return mount(FavoriteButton, {
      props: { movieId },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: options.initialState,
          }),
        ],
      },
    })
  }

  it('renders correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('.star').exists()).toBe(true)
  })

  it('toggles favorite status on click', async () => {
    const wrapper = createWrapper()
    const store = useFavoritesStore()

    await wrapper.find('button').trigger('click')
    expect(store.toggleFavorite).toHaveBeenCalledWith(1)
  })

  it('shows correct active state when movie is favorite', async () => {
    const wrapper = createWrapper(1, {
      initialState: {
        favorites: {
          favoriteMovies: [1],
        },
      },
    })

    const store = useFavoritesStore()
    store.isFavorite = vi.fn().mockReturnValue(true)

    await wrapper.vm.$nextTick()

    console.log('HTML:', wrapper.html())
    console.log('Classes:', wrapper.find('button').classes())
    console.log('Is favorite?', store.isFavorite(1))
    console.log('Store state:', store.favoriteMovies)

    expect(wrapper.find('button').classes()).toContain('is-favorite')
  })

  it('prevents default event on click', async () => {
    const wrapper = createWrapper()
    const event = { preventDefault: vi.fn() }
    await wrapper.find('button').trigger('click', event)
    expect(event.preventDefault).toHaveBeenCalled()
  })
})
