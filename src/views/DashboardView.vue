<script setup lang="ts">
import { ref } from 'vue'

import HabitForm from '../components/dashboard/HabitForm.vue'
import TodayHabits from '../components/dashboard/TodayHabits.vue'

import { createHabit, deleteHabit, getHabits, updateHabit } from '../services/habitService.ts'
import type { Habit } from '../types/habit'
import type { HabitInput } from '../types/habitInput'

// State management for habits, habit form and editedHabit
const habits = ref<Habit[]>(getHabits())
const isHabitFormOpen = ref(false)
const editedHabit = ref<Habit | null>(null)

// Function to handle habit creation
const handleCreateHabit = (input: HabitInput) => {
  if (!input) {
    return
  }

  const newHabit = createHabit(input)

  habits.value.push(newHabit)

  isHabitFormOpen.value = false
}

// Function to handle habit deletion
const handleDeleteHabit = (id: string) => {
  if (!id) {
    return
  }

  deleteHabit(id)

  habits.value = habits.value.filter((habit) => habit.id !== id)
}

// Function to handle habit editing
const handleEditHabit = (id: string) => {
  const habit = habits.value.find((habit) => habit.id === id)

  if (!habit) {
    return
  }

  editedHabit.value = habit
}

// Function to handle habit updating
const handleUpdateHabit = (input: HabitInput) => {
  if (!editedHabit.value) {
    return
  }

  const updatedHabit = updateHabit(editedHabit.value.id, input)

  if (!updatedHabit) {
    return
  }

  const index = habits.value.findIndex((habit) => habit.id === updatedHabit.id)

  if (index !== -1) {
    habits.value[index] = updatedHabit
  }

  editedHabit.value = null
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

    <TodayHabits
      :habits="habits"
      @add="isHabitFormOpen = true"
      @delete="handleDeleteHabit"
      @edit="handleEditHabit"
    />

    <HabitForm
      v-if="isHabitFormOpen"
      @close="isHabitFormOpen = false"
      @submit="handleCreateHabit"
    />

    <HabitForm
      v-if="editedHabit"
      :habit="editedHabit"
      @close="editedHabit = null"
      @submit="handleUpdateHabit"
    />
  </main>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 3rem 2rem;
  background: #f7f7f5;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto 2rem;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.dashboard-header p {
  margin: 0.5rem 0 0;
  color: #6b7280;
}

.dashboard-header button {
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  background: #222;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.dashboard-header button:hover {
  background: #444;
}
</style>
