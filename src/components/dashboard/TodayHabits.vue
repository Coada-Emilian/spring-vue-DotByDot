<script setup lang="ts">
import type { Habit } from '../../types/habit'

// --------------------------------------------------
// Props
// --------------------------------------------------

// Data and functions received from the parent component.
defineProps<{
  habits: Habit[]
  isHabitCompleted: (habitId: string) => boolean
}>()

// --------------------------------------------------
// Events
// --------------------------------------------------

// Events sent back to the parent when the user
// performs an action on a habit.
const emit = defineEmits<{
  delete: [id: string]
  edit: [id: string]
  add: []
  complete: [id: string]
  uncomplete: [id: string]
}>()
</script>

<template>
  <section class="card habits-card">
    <div class="habits-header">
      <h2>Today's habits</h2>

      <button type="button" class="add-habit-button" @click="emit('add')">+ Add habit</button>
    </div>

    <div v-if="habits.length" class="habit-list">
      <article v-for="habit in habits" :key="habit.id" class="habit">
        <div class="habit-info">
          <span class="habit-color" :style="{ backgroundColor: habit.color }"></span>

          <div class="habit-container">
            <div class="habit-name">
              <h3>{{ habit.name }}</h3>

              <span v-if="isHabitCompleted(habit.id)" class="completion-check"> ✓ </span>
            </div>

            <p>{{ habit.description }}</p>
          </div>
        </div>

        <div class="habit-actions">
          <button type="button" @click="emit('delete', habit.id)">Delete</button>

          <button type="button" @click="emit('edit', habit.id)">Edit</button>

          <button
            type="button"
            @click="
              isHabitCompleted(habit.id) ? emit('uncomplete', habit.id) : emit('complete', habit.id)
            "
          >
            {{ isHabitCompleted(habit.id) ? 'Uncompleted' : 'Completed' }}
          </button>
        </div>
      </article>
    </div>

    <p v-else class="empty-state">No habits yet. Create your first one.</p>
  </section>
</template>

<style scoped>
.habits-card {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 1.5rem;
}

.habits-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.habits-header h2 {
  margin: 0;
  color: var(--color-navy);
  font-size: 1.25rem;
  font-weight: 700;
}

.add-habit-button {
  border: none;
  background: none;
  color: var(--color-blue);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.add-habit-button:hover {
  color: var(--color-navy);
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
  border-bottom: 1px solid var(--color-border);
}

.habit:last-child {
  border-bottom: none;
}

.habit-info {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.habit-color {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 50%;
}

.habit-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.habit-name {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.habit h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 650;
}

.habit p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.habit-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.empty-state {
  margin: 0;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--color-text-muted);
}

.completion-check {
  font-weight: bold;
}

.habit-actions button {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.habit-actions button:hover {
  background: var(--color-background);
  color: var(--color-text);
}

/* Delete */
.habit-actions button:first-child:hover {
  border-color: #fca5a5;
  background: #fef2f2;
  color: #b91c1c;
}

/* Completed */
.habit-actions button:last-child {
  border-color: var(--color-navy);
  background: var(--color-navy);
  color: white;
  font-weight: 600;
}

.habit-actions button:last-child:hover {
  background: var(--color-navy-light);
  border-color: var(--color-navy-light);
}

@media (max-width: 600px) {
  .habits-card {
    padding: 1rem;
  }

  .habits-header {
    margin-bottom: 0.5rem;
  }

  .habit {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .habit-info {
    width: 100%;
  }

  .habit-actions {
    justify-content: flex-end;
    width: 100%;
  }

  .habit-actions button {
    min-height: 40px;
    padding: 0.5rem 0.75rem;
  }
}
</style>
