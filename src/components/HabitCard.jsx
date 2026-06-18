import { useState } from 'react'
import { getStreak, streakLabel, motivationalMessage } from '../utils/streaks'

export default function HabitCard({ habit, completions, selectedDate, onToggle, onDelete }) {
  const [celebrating, setCelebrating] = useState(false)

  const isCompleted = completions.some(c => c.habitId === habit.id && c.date === selectedDate)
  const streak = getStreak(habit.id, completions)
  const isToday = selectedDate === new Date().toISOString().slice(0, 10)

  function handleToggle() {
    if (!isToday) return
    const justCompleted = onToggle(habit.id)
    if (justCompleted) {
      setCelebrating(true)
      setTimeout(() => setCelebrating(false), 600)
    }
  }

  return (
    <div
      className={`relative rounded-3xl p-4 flex flex-col justify-between min-h-[160px] transition-all active:scale-95 cursor-pointer select-none ${celebrating ? 'animate-celebration' : ''}`}
      style={{ background: isCompleted ? habit.color : habit.color + 'cc' }}
      onClick={handleToggle}
    >
      {/* Long-press delete */}
      <button
        onClick={e => { e.stopPropagation(); onDelete(habit.id) }}
        className="absolute top-3 left-3 w-6 h-6 rounded-full bg-black/10 text-white/70 text-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
        aria-label="Delete"
      >
        ×
      </button>

      {/* Check button */}
      <div className="flex justify-end">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all font-bold text-sm
            ${isCompleted
              ? 'bg-gray-900 border-gray-900 text-white'
              : 'border-black/30 bg-white/30 text-transparent'
            }`}
        >
          ✓
        </div>
      </div>

      {/* Icon */}
      <div>
        <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center text-2xl mb-3">
          {habit.icon}
        </div>

        <p className="font-bold text-gray-900 text-base leading-tight">{habit.name}</p>
        {habit.description && (
          <p className="text-xs text-gray-700/70 mt-0.5 leading-snug line-clamp-2">{habit.description}</p>
        )}

        <p className="text-xs font-semibold text-gray-800/60 mt-1.5">{streakLabel(streak)}</p>
      </div>

      {/* Celebration overlay */}
      {celebrating && (
        <div className="absolute inset-0 rounded-3xl flex items-center justify-center pointer-events-none">
          <span className="text-4xl animate-pop-in">{streak >= 7 ? '🔥' : '✨'}</span>
        </div>
      )}
    </div>
  )
}
