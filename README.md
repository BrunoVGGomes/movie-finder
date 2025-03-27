# MovieFinder

## Test Project with Vue and Vite

This is a small test project using the following technologies:

- [Vue.js](https://vuejs.org/) - Progressive framework for building user interfaces.
- [Vite](https://vitejs.dev/) - Fast build tool for modern frontend projects.
- [Vuex](https://vuex.vuejs.org/) - State management library for Vue 2.
- [Pinia](https://pinia.vuejs.org/) - Official state management for Vue 3, simpler and more flexible than Vuex.

Try it in dark mode.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
