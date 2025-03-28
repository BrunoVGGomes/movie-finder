import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: () => import(/* webpackChunkName: "movies-view" */ '@/views/MoviesView.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () =>
        import(/* webpackChunkName: "movie-details-view" */ '@/views/MovieDetailsView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import(/* webpackChunkName: "favorites-view" */ '@/views/FavoritesView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about-view" */ '@/views/AboutView.vue'),
    },
  ],
})

export default router
