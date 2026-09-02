<script setup lang="ts">
import type { Habit } from '../../types/habit'

defineProps<{
  habits: Habit[]
}>()

const emit = defineEmits<{
  delete: [id: string]
  edit: [id: string]
  add: []
}>()

defineModel<{
  isHabitFormOpen: boolean
}>()
</script>

<template>
  <section class="habits-card">
    <div class="habits-header">
      <h2>Today's habits</h2>

      <button type="button" class="add-habit-button" @click="emit('add')">+ Add habit</button>
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

        <div class="habit-actions">
          <button type="button" @click="emit('delete', habit.id)">Delete</button>

          <button type="button" @click="emit('edit', habit.id)">Edit</button>

          <button type="button">Complete</button>
        </div>
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
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  background: white;
  box-shadow: 0 2px 8px rgb(0 0 0 / 4%);
}

.habits-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.habits-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.add-habit-button {
  border: none;
  background: none;
  color: #555;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.add-habit-button:hover {
  color: #111;
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
  gap: 0.9rem;
}

.habit-color {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 50%;
}

.habit h3 {
  margin: 0;
  font-size: 1rem;
}

.habit p {
  margin: 0.25rem 0 0;
  color: #777;
  font-size: 0.9rem;
}

.habit-actions {
  display: flex;
  gap: 0.5rem;
}

.habit-actions button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #ddd;
  border-radius: 7px;
  background: white;
  color: #444;
  font-size: 0.85rem;
  cursor: pointer;
}

.habit-actions button:hover {
  background: #f5f5f5;
}

.empty-state {
  margin: 0;
  padding: 3rem 1rem;
  text-align: center;
  color: #777;
}
</style>
