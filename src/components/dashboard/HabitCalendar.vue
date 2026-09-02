<script setup lang="ts">
import { computed, ref } from 'vue'

const currentDate = ref(new Date())

const currentMonth = computed(() => {
  return currentDate.value.getMonth()
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const monthName = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
})

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  const day = new Date(currentYear.value, currentMonth.value, 1).getDay()

  return day === 0 ? 6 : day - 1
})

const calendarDays = computed(() => {
  const days: (number | null)[] = []

  // Empty cells before the first day of the month
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push(null)
  }

  // Actual days
  for (let day = 1; day <= daysInMonth.value; day++) {
    days.push(day)
  }

  return days
})

const goToPreviousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

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
        class="calendar-day"
        :disabled="day === null"
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
</style>
