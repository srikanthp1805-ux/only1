import { useState } from 'react'
import WeekGrid from './WeekGrid'
import { getStreak, isCompletedToday, streakLabel, motivationalMessage } from '../utils/streaks'

export default function HabitCard({ habit, completions, onToggle, onDelete }) {
  const [showMsg, setShowMsg] = useState(false)
  const done = isCompletedToday(habit.id, completions)
  const streak = getStreak(habit.id, completions)

  function handleToggle() {
    const justCompleted = onToggle(habit.id)
    if (justCompleted) {
      setShowMsg(true)
      setTimeout(() => setShowMsg(false), 2500)
    }
  }

  return (
    <div
      className="relative rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all overflow-hidden"
      style={{ borderLeft: `5px solid ${habit.color}` }}
    >
      {showMsg && (
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl bg-white/90 dark:bg-gray-900/90 animate-fade-in">
          <div className="text-center px-4">
            <div className="text-4xl mb-1">🎉</div>
            <p className="font-bold text-gray-800 dark:text-white text-sm">{motivationalMessage(streak)}</p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="text-2xl w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: habit.color + '22' }}
          >
            {habit.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight truncate">{habit.name}</h3>
            {habit.description && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{habit.description}</p>
            )}
            <p className="text-xs font-semibold mt-1" style={{ color: habit.color }}>
              {streakLabel(streak)}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-all active:scale-95
            ${done
              ? 'text-gray-800 shadow-md scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-200'
            }`}
          style={done ? { background: habit.color } : {}}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          {done ? '✓' : '○'}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <WeekGrid habitId={habit.id} completions={completions} />
        <button
          onClick={() => onDelete(habit.id)}
          className="text-gray-300 dark:text-gray-700 hover:text-red-400 text-lg ml-2 transition-colors"
          aria-label="Delete habit"
        >
          ×
        </button>
      </div>
    </div>
  )
}
