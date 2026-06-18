import { dateKey } from './storage'

export function getStreak(habitId, completions) {
  const dates = completions
    .filter(c => c.habitId === habitId)
    .map(c => c.date)
    .sort()
    .reverse()

  if (!dates.length) return 0

  let streak = 0
  const today = new Date()

  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = dateKey(d)
    if (dates.includes(key)) {
      streak++
    } else if (i > 0) {
      break
    }
  }

  return streak
}

export function isCompletedToday(habitId, completions) {
  const today = new Date().toISOString().slice(0, 10)
  return completions.some(c => c.habitId === habitId && c.date === today)
}

export function getWeekCompletions(habitId, completions) {
  const week = []
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = dateKey(d)
    week.push({
      date: key,
      label: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
      done: completions.some(c => c.habitId === habitId && c.date === key),
      isToday: key === today.toISOString().slice(0, 10),
    })
  }
  return week
}

export function streakLabel(n) {
  if (n === 0) return 'Start today!'
  if (n === 1) return '1 day streak 🔥'
  if (n >= 100) return `${n} days 🏆`
  if (n >= 30) return `${n} days 🌟`
  if (n >= 21) return `${n} days 💪`
  if (n >= 7) return `${n} days 🔥`
  return `${n} day streak 🔥`
}

export function motivationalMessage(streak) {
  if (streak === 0) return "Every expert was once a beginner. Start today!"
  if (streak === 1) return "One day done. That's how legends begin."
  if (streak === 7) return "One full week! You're building something real."
  if (streak === 21) return "21 days — this is officially a habit now!"
  if (streak === 30) return "30 days strong. You are unstoppable."
  if (streak === 100) return "100 DAYS. You are an absolute legend! 🏆"
  const msgs = [
    "Keep showing up. It adds up.",
    "Consistency beats perfection every time.",
    "You showed up again. That's everything.",
    "Small steps, big life.",
    "Progress, not perfection.",
  ]
  return msgs[streak % msgs.length]
}
