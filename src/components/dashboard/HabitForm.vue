<script setup lang="ts">
import { ref } from 'vue'

import type { Habit } from '../../types/habit'
import type { HabitInput } from '../../types/habitInput'

const emit = defineEmits<{
  close: []
  submit: [HabitInput]
}>()

const props = defineProps<{
  habit?: Habit
}>()

const name = ref(props.habit?.name ?? '')
const description = ref(props.habit?.description ?? '')
const color = ref(props.habit?.color ?? '#6366f1')

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
  background: rgb(0 0 0 / 40%);
}

.modal {
  width: min(90%, 450px);
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  margin: 0;
}

.close-button {
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

input[type='text'] {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input[type='color'] {
  width: 50px;
  height: 35px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
