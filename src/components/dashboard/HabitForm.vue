<script setup lang="ts">
import { ref } from 'vue'

import type { Habit } from '../../types/habit'
import type { HabitInput } from '../../types/habitInput'

// --------------------------------------------------
// Events
// --------------------------------------------------

// Events sent back to the parent when the user
// closes the form or submits the habit data.
const emit = defineEmits<{
  close: []
  submit: [HabitInput]
}>()

// --------------------------------------------------
// Props
// --------------------------------------------------

// Optional habit received from the parent.
//
// If a habit is provided, the form is being used
// to edit an existing habit.
// If no habit is provided, the form is creating
// a new habit.
const props = defineProps<{
  habit?: Habit
}>()

// --------------------------------------------------
// Form State
// --------------------------------------------------

// Initialize the form with the existing habit's
// values when editing, or default values when creating.
const name = ref(props.habit?.name ?? '')
const description = ref(props.habit?.description ?? '')
const color = ref(props.habit?.color ?? '#6366f1')

// --------------------------------------------------
// Form Actions
// --------------------------------------------------

// Send the completed form data to the parent.
const handleSubmit = () => {
  emit('submit', {
    name: name.value,
    description: description.value,
    color: color.value,
  })
}
</script>

<template>
  <div class="modal-backdrop">
    <section class="modal">
      <header class="modal-header">
        <h2>{{ props.habit ? 'Edit habit' : 'New habit' }}</h2>

        <button type="button" class="close-button" @click="emit('close')">×</button>
      </header>

      <form @submit.prevent="handleSubmit">
        <label>
          Name
          <input v-model="name" type="text" />
        </label>

        <label>
          Description
          <input v-model="description" type="text" />
        </label>

        <label>
          Color
          <input v-model="color" type="color" />
        </label>

        <div class="form-actions">
          <button type="button" @click="emit('close')">Cancel</button>

          <button type="submit">{{ props.habit ? 'Save changes' : 'Create habit' }}</button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgb(15 23 42 / 45%);
  z-index: 100;
}

.modal {
  width: min(100%, 450px);
  padding: 1.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 20px 50px rgb(15 23 42 / 18%);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  margin: 0;
  color: var(--color-navy);
  font-size: 1.25rem;
  font-weight: 700;
}

.close-button {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.close-button:hover {
  border-color: var(--color-navy-light);
  background: var(--color-background);
  color: var(--color-text);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
}

input[type='text'] {
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input[type='text']:focus {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px rgb(37 99 235 / 12%);
}

input[type='color'] {
  width: 64px;
  height: 44px;
  padding: 4px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.form-actions button {
  min-height: 40px;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.form-actions button:hover {
  background: var(--color-background);
  color: var(--color-text);
}

.form-actions button:last-child {
  border-color: var(--color-navy);
  background: var(--color-navy);
  color: white;
}

.form-actions button:last-child:hover {
  border-color: var(--color-navy-light);
  background: var(--color-navy-light);
}

@media (max-width: 500px) {
  .modal {
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
    min-height: 40px;
  }
}
</style>
