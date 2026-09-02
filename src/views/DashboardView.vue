<script setup lang="ts">
import { ref } from 'vue'

// --------------------------------------------------
// Components
// --------------------------------------------------

import HabitCalendar from '../components/dashboard/HabitCalendar.vue'
import HabitForm from '../components/dashboard/HabitForm.vue'
import TodayHabits from '../components/dashboard/TodayHabits.vue'

// --------------------------------------------------
// Services
// --------------------------------------------------

import { createHabit, deleteHabit, getHabits, updateHabit } from '../services/habitService.ts'

import {
  createHabitCompletion,
  deleteHabitCompletion,
  getHabitCompletions,
} from '../services/habitCompletionService.ts'

// --------------------------------------------------
// Types
// --------------------------------------------------

import type { Habit } from '../types/habit'
import type { HabitCompletion } from '../types/habitCompletion.ts'
import type { HabitInput } from '../types/habitInput'

// --------------------------------------------------
// State
// --------------------------------------------------

// Habits currently stored in localStorage.
const habits = ref<Habit[]>(getHabits())

// Controls whether the "Create habit" form is visible.
const isHabitFormOpen = ref(false)

// The habit currently being edited.
const editedHabit = ref<Habit | null>(null)

// Date selected in the calendar.
// null means that no specific date was selected,
// so completions should use today's date.
const selectedDate = ref<string | null>(null)

// All habit completions currently stored in localStorage.
const completions = ref<HabitCompletion[]>(getHabitCompletions())

// --------------------------------------------------
// Habit Actions
// --------------------------------------------------

// Create a new habit and add it to the reactive habit list.
const handleCreateHabit = (input: HabitInput) => {
  if (!input) {
    return
  }

  const newHabit = createHabit(input)

  habits.value.push(newHabit)

  isHabitFormOpen.value = false
}

// Delete a habit and remove it from the reactive list.
const handleDeleteHabit = (id: string) => {
  if (!id) {
    return
  }

  deleteHabit(id)

  habits.value = habits.value.filter((habit) => habit.id !== id)
}

// Find the habit being edited and store it in editedHabit.
const handleEditHabit = (id: string) => {
  const habit = habits.value.find((habit) => habit.id === id)

  if (!habit) {
    return
  }

  editedHabit.value = habit
}

// Update the currently edited habit and update the
// corresponding habit in the reactive list.
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

// --------------------------------------------------
// Completion Logic
// --------------------------------------------------

// Check whether a habit has been completed for the
// currently selected date (or today if no date is selected).
const isHabitCompleted = (habitId: string) => {
  const today = new Date().toISOString().slice(0, 10)
  const targetDate = selectedDate.value ?? today

  return completions.value.some(
    (completion) => completion.habitId === habitId && completion.date === targetDate,
  )
}

// Add a completion for the selected date.
// If no date is selected, today's date is used.
const handleCompleteHabit = (id: string) => {
  const today = new Date().toISOString().slice(0, 10)
  const targetDate = selectedDate.value ?? today

  const completion = createHabitCompletion(id, targetDate)

  completions.value.push(completion)
}

// Remove a completion.
const handleUncompleteHabit = (id: string) => {
  const today = new Date().toISOString().slice(0, 10)
  const targetDate = selectedDate.value ?? today

  const completion = completions.value.find(
    (completion) => completion.habitId === id && completion.date === targetDate,
  )

  if (!completion) {
    return
  }

  deleteHabitCompletion(completion.id)

  completions.value = completions.value.filter((item) => item.id !== completion.id)
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
      :selected-date="selectedDate"
      @add="isHabitFormOpen = true"
      @delete="handleDeleteHabit"
      @edit="handleEditHabit"
      @complete="handleCompleteHabit"
      :is-habit-completed="isHabitCompleted"
      @uncomplete="handleUncompleteHabit"
    />

    <HabitCalendar
      :habits="habits"
      :completions="completions"
      :selected-date="selectedDate"
      @select-date="selectedDate = $event"
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

.completion-error {
  max-width: 900px;
  margin: 1rem auto;
  color: #b91c1c;
}
</style>
