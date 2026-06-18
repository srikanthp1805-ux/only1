const HABITS_KEY = 'only1_habits'
const COMPLETIONS_KEY = 'only1_completions'
const PROFILE_KEY = 'only1_profile'

export function getHabits() {
  return JSON.parse(localStorage.getItem(HABITS_KEY) || '[]')
}

export function saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}

export function getCompletions() {
  return JSON.parse(localStorage.getItem(COMPLETIONS_KEY) || '[]')
}

export function saveCompletions(completions) {
  localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions))
}

export function getProfile() {
  return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{"name":""}')
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function dateKey(date) {
  return date.toISOString().slice(0, 10)
}
