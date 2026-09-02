import type { Habit } from '../types/habit'
import type { HabitInput } from '../types/habitInput'

const HABITS_STORAGE_KEY = 'habits'

export const getHabits = (): Habit[] => {
  const habits = localStorage.getItem(HABITS_STORAGE_KEY)
  return habits ? JSON.parse(habits) : []
}

export const createHabit = (inputData: HabitInput): Habit => {
  const { name, description, color } = inputData

  const newHabit: Habit = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    description,
    color,
  }

  const habits = getHabits()
  habits.push(newHabit)
  localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits))

  return newHabit
}

export const deleteHabit = (id: string): void => {
  const habits = getHabits()
  const updatedHabits = habits.filter((habit) => habit.id !== id)
  localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits))
}
