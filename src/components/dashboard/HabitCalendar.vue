<script setup lang="ts">
import { computed, ref } from 'vue'

// --------------------------------------------------
// Props & Events
// --------------------------------------------------

const props = defineProps<{
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
</script>

<template>
  <section class="calendar">
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
        {{ day }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.calendar {
  max-width: 900px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  background: white;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.calendar-header h2 {
  margin: 0;
}

.calendar-header button {
  border: 1px solid #ddd;
  border-radius: 7px;
  background: white;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
}

.weekday-header,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekday-header {
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: #777;
}

.calendar-day {
  min-height: 70px;
  border: 1px solid #eee;
  background: white;
  cursor: pointer;
}

.calendar-day:disabled {
  background: #fafafa;
  cursor: default;
}

.calendar-day.selected {
  border: 2px solid #333;
}
</style>
