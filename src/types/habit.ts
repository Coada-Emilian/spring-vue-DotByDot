import type { HabitInput } from './habitInput'

export interface Habit extends HabitInput {
  id: string
  createdAt: string
}
