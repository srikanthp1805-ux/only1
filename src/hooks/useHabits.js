import { useState, useCallback } from 'react'
import { getHabits, saveHabits, getCompletions, saveCompletions, todayKey } from '../utils/storage'

export function useHabits() {
  const [habits, setHabits] = useState(() => getHabits())
  const [completions, setCompletions] = useState(() => getCompletions())

  const addHabit = useCallback((habit) => {
    const newHabit = { ...habit, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    const updated = [...habits, newHabit]
    setHabits(updated)
    saveHabits(updated)
    return newHabit
  }, [habits])

  const deleteHabit = useCallback((id) => {
    const updated = habits.filter(h => h.id !== id)
    setHabits(updated)
    saveHabits(updated)
    const updatedC = completions.filter(c => c.habitId !== id)
    setCompletions(updatedC)
    saveCompletions(updatedC)
  }, [habits, completions])

  const toggleToday = useCallback((habitId) => {
    const today = todayKey()
    const exists = completions.find(c => c.habitId === habitId && c.date === today)
    let updated
    if (exists) {
      updated = completions.filter(c => !(c.habitId === habitId && c.date === today))
    } else {
      updated = [...completions, { habitId, date: today, completedAt: new Date().toISOString() }]
    }
    setCompletions(updated)
    saveCompletions(updated)
    return !exists
  }, [completions])

  return { habits, completions, addHabit, deleteHabit, toggleToday }
}
