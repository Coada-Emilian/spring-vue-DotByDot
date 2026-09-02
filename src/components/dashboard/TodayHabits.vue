<script setup lang="ts">
import type { Habit } from '../../types/habit'

defineProps<{
  habits: Habit[]
}>()
</script>

<template>
  <section class="habits-card">
    <div class="habits-header">
      <h2>Today's habits</h2>

      <button type="button" class="add-habit-button">+ Add habit</button>
    </div>

    <div v-if="habits.length" class="habit-list">
      <article v-for="habit in habits" :key="habit.id" class="habit">
        <div class="habit-info">
          <span class="habit-color" :style="{ backgroundColor: habit.color }" />

          <div>
            <h3>{{ habit.name }}</h3>
            <p>{{ habit.description }}</p>
          </div>
        </div>

        <button type="button" class="complete-button">Complete</button>
      </article>
    </div>

    <p v-else class="empty-state">No habits yet. Create your first one.</p>
  </section>
</template>

<style scoped>
.habits-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
}

.habits-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.habits-header h2 {
  margin: 0;
}

.add-habit-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.habit-list {
  display: flex;
  flex-direction: column;
}

.habit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.habit:last-child {
  border-bottom: none;
}

.habit-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.habit-color {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 50%;
}

.habit h3 {
  margin: 0;
}

.habit p {
  margin: 0.25rem 0 0;
  color: #666;
}

.complete-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

.empty-state {
  margin: 0;
  padding: 2rem 0;
  text-align: center;
  color: #666;
}
</style>
