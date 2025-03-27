import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ThePagination from './ThePagination.vue'

describe('ThePagination', () => {
  const createWrapper = (props = {}) => {
    return mount(ThePagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        loading: false,
        ...props
      }
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('[data-testid="pagination"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="page-1"]').text()).toBe('1')
  })

  it('disables previous button on first page', () => {
    const wrapper = createWrapper({ currentPage: 1 })
    const prevButton = wrapper.find('[data-testid="prev-button"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = createWrapper({ currentPage: 10, totalPages: 10 })
    const nextButton = wrapper.find('[data-testid="next-button"]')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits page-change event when clicking page numbers', async () => {
    const wrapper = createWrapper({ currentPage: 1 })
    const pageTwo = wrapper.find('[data-testid="page-2"]')
    await pageTwo.trigger('click')
    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })

  it('shows correct page range', () => {
    const wrapper = createWrapper({ currentPage: 5, totalPages: 10 })
    expect(wrapper.find('[data-testid="first-page"]').text()).toBe('1')
    expect(wrapper.find('[data-testid="page-4"]').text()).toBe('4')
    expect(wrapper.find('[data-testid="page-5"]').text()).toBe('5')
    expect(wrapper.find('[data-testid="page-6"]').text()).toBe('6')
    expect(wrapper.find('[data-testid="last-page"]').text()).toBe('10')
  })

  it('disables all buttons when loading', () => {
    const wrapper = createWrapper({ loading: true })
    const buttons = wrapper.findAll('button')
    buttons.forEach(button => {
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  it('shows first and last page buttons when on middle page', () => {
    const wrapper = createWrapper({ currentPage: 5, totalPages: 10 })
    expect(wrapper.find('[data-testid="first-page"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="last-page"]').exists()).toBe(true)
  })

  it('hides first page button when on page 1 or 2', () => {
    const wrapper = createWrapper({ currentPage: 2 })
    expect(wrapper.find('[data-testid="first-page"]').exists()).toBe(false)
  })

  it('hides last page button when on last or second-to-last page', () => {
    const wrapper = createWrapper({ currentPage: 9, totalPages: 10 })
    expect(wrapper.find('[data-testid="last-page"]').exists()).toBe(false)
  })
})
