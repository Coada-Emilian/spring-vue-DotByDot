<script setup lang="ts">
import { ref } from 'vue'

import HabitForm from '../components/dashboard/HabitForm.vue'
import TodayHabits from '../components/dashboard/TodayHabits.vue'

import { createHabit, deleteHabit, getHabits } from '../services/habitService.ts'
import type { Habit } from '../types/habit'
import type { HabitInput } from '../types/habitInput'

const habits = ref<Habit[]>(getHabits())
const isHabitFormOpen = ref(false)

const handleCreateHabit = (input: HabitInput) => {
  const newHabit = createHabit(input)

  habits.value.push(newHabit)

  isHabitFormOpen.value = false
}

const handleDeleteHabit = (id: string) => {
  deleteHabit(id)

  habits.value = habits.value.filter((habit) => habit.id !== id)
}
</script>

<template>
  <main class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>Good morning, Emil!</h1>
        <p>One day at a time.</p>
      </div>

      <button type="button" @click="isHabitFormOpen = true">+ New Habit</button>
    </header>

    <TodayHabits :habits="habits" @delete="handleDeleteHabit" />

    <HabitForm
      v-if="isHabitFormOpen"
      @close="isHabitFormOpen = false"
      @submit="handleCreateHabit"
    />
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
