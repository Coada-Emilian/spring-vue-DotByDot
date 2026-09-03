<script setup lang="ts">
import Sidebar from './components/layout/AppSidebar.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar />

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>
