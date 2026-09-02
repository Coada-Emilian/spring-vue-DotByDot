<script setup lang="ts">
import { ref } from 'vue'

import TodayHabits from '../components/dashboard/TodayHabits.vue'

import { getHabits } from '../services/habitService.ts'
import type { Habit } from '../types/habit'

const habits = ref<Habit[]>(getHabits())
</script>

<template>
  <main class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>Good morning, Emil!</h1>
        <p>One day at a time.</p>
      </div>

      <button type="button">+ New Habit</button>
    </header>

    <TodayHabits :habits="habits" />
  </main>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto 2rem;
}
</style>
