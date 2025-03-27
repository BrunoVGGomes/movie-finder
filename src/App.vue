<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter/TheFooter.vue'
</script>

<template>
  <div class="app-wrapper">
    <TheHeader />
    <main>
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
