import type { HabitCompletion } from '../types/habitCompletion'

const COMPLETIONS_STORAGE_KEY = 'completions'

export const getHabitCompletions = (): HabitCompletion[] => {
  const completions = localStorage.getItem(COMPLETIONS_STORAGE_KEY)

  return completions ? JSON.parse(completions) : []
}

export const createHabitCompletion = (habitId: string, date: string): HabitCompletion => {
  const completions = getHabitCompletions()

  const id = crypto.randomUUID()

  const newCompletion: HabitCompletion = { id, habitId, date }

  completions.push(newCompletion)

  localStorage.setItem(COMPLETIONS_STORAGE_KEY, JSON.stringify(completions))

  return newCompletion
}

export const deleteHabitCompletion = (id: string): void => {
  const completions = getHabitCompletions()

  const updatedCompletions = completions.filter((completion) => completion.id !== id)

  localStorage.setItem(COMPLETIONS_STORAGE_KEY, JSON.stringify(updatedCompletions))
}

export const deleteHabitCompletions = (habitId: string): void => {
  const completions = getHabitCompletions()

  const updatedCompletions = completions.filter((completion) => completion.habitId !== habitId)

  localStorage.setItem(COMPLETIONS_STORAGE_KEY, JSON.stringify(updatedCompletions))
}
