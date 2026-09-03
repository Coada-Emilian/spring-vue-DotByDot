<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Habit } from '../../types/habit'
import type { HabitCompletion } from '../../types/habitCompletion'

// --------------------------------------------------
// Props & Events
// --------------------------------------------------

const props = defineProps<{
  habits: Habit[]
  completions: HabitCompletion[]
  selectedDate: string | null
}>()

const emit = defineEmits<{
  'select-date': [date: string]
}>()

// --------------------------------------------------
// Calendar State
// --------------------------------------------------

// The month currently displayed by the calendar.
const currentDate = ref(new Date())

// --------------------------------------------------
// Derived Calendar Data
// --------------------------------------------------

// Get the current month (0 = January, 11 = December).
const currentMonth = computed(() => {
  return currentDate.value.getMonth()
})

// Get the current year.
const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

// Display name, for example: "September 2026".
const monthName = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
})

// Number of days in the currently displayed month.
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

// Number of empty cells needed before day 1.
// We convert JavaScript's Sunday-first numbering
// into our Monday-first calendar.
const firstDayOfMonth = computed(() => {
  const day = new Date(currentYear.value, currentMonth.value, 1).getDay()

  return day === 0 ? 6 : day - 1
})

// Build the complete calendar grid.
// null = an empty cell before the first day.
const calendarDays = computed(() => {
  const days: (number | null)[] = []

  // Empty cells before the first day of the month.
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push(null)
  }

  // Actual days of the month.
  for (let day = 1; day <= daysInMonth.value; day++) {
    days.push(day)
  }

  return days
})

// --------------------------------------------------
// Calendar Actions
// --------------------------------------------------

// Tell the parent which date the user selected.
const selectDay = (day: number | null) => {
  if (day === null) {
    return
  }

  const date = new Date(currentYear.value, currentMonth.value, day)

  emit('select-date', date.toISOString().slice(0, 10))
}

// Check whether a particular calendar day is selected.
const isSelectedDay = (day: number | null) => {
  if (day === null) {
    return false
  }

  const date = new Date(currentYear.value, currentMonth.value, day)

  return date.toISOString().slice(0, 10) === props.selectedDate
}

// Move the calendar one month backwards.
const goToPreviousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

// Move the calendar one month forwards.
const goToNextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const getCompletionsForDay = (day: number | null) => {
  if (day === null) {
    return []
  }

  const date = new Date(currentYear.value, currentMonth.value, day)

  const dateString = date.toISOString().slice(0, 10)

  return props.completions.filter((completion) => completion.date === dateString)
}

// Find the habit belonging to a completion.
// The completion only stores habitId, while the Habit
// contains the display information such as its color.
const getHabitForCompletion = (completion: HabitCompletion) => {
  return props.habits.find((habit) => habit.id === completion.habitId)
}
</script>

<template>
  <section class="card calendar">
    <header class="calendar-header">
      <button type="button" @click="goToPreviousMonth">←</button>

      <h2>{{ monthName }}</h2>

      <button type="button" @click="goToNextMonth">→</button>
    </header>

    <div class="weekday-header">
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>
    </div>

    <div class="calendar-grid">
      <button
        v-for="(day, index) in calendarDays"
        :key="index"
        type="button"
        :class="['calendar-day', { selected: isSelectedDay(day) }]"
        :disabled="day === null"
        @click="selectDay(day)"
      >
        <span>{{ day }}</span>

        <div v-if="day !== null" class="completion-dots">
          <span
            v-for="completion in getCompletionsForDay(day)"
            :key="completion.id"
            class="completion-dot"
            :style="{
              backgroundColor: getHabitForCompletion(completion)?.color,
            }"
          ></span>
        </div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.calendar {
  width: 100%;
  max-width: var(--content-width);
  margin: 2rem auto 0;
  padding: 1.5rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.calendar-header h2 {
  margin: 0;
  color: var(--color-navy);
  font-size: 1.25rem;
  font-weight: 700;
}

.calendar-header button {
  min-width: 40px;
  min-height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.calendar-header button:hover {
  border-color: var(--color-navy-light);
  background: var(--color-background);
}

.weekday-header,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.weekday-header {
  margin-bottom: 0.5rem;
  color: var(--color-navy-light);
  text-align: center;
  font-size: 0.8rem;
  font-weight: 650;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.calendar-day {
  min-height: 70px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.calendar-day:hover {
  background: var(--color-background);
}

.calendar-day:disabled {
  background: var(--color-background);
  color: var(--color-text-muted);
  cursor: default;
}

.calendar-day.selected {
  border: 2px solid var(--color-navy);
  background: #f1f5f9;
}

.completion-dots {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.4rem;
}

.completion-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
}
</style>
