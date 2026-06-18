import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HabitCard from './components/HabitCard'
import AddHabitModal from './components/AddHabitModal'
import { useHabits } from './hooks/useHabits'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('only1_dark')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [showAdd, setShowAdd] = useState(false)
  const { habits, completions, addHabit, deleteHabit, toggleToday } = useHabits()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('only1_dark', darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col">
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />

        <main className="flex-1 px-5 pb-28">
          {habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center px-6">
              <div className="text-7xl mb-5">🌱</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Pick your one habit</h2>
              <p className="text-gray-400 dark:text-gray-500 text-base leading-relaxed mb-8">
                Focus on just one thing.<br />Small and consistent beats big and sporadic.
              </p>
              <button
                onClick={() => setShowAdd(true)}
                className="bg-[#4469ff] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg active:scale-95 transition-all hover:bg-[#3355ee]"
              >
                + Start my habit
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Today · {new Date().toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
                </h2>
                <span className="text-xs font-semibold text-[#4469ff] bg-[#4469ff]/10 px-2.5 py-1 rounded-full">
                  {habits.filter(h => completions.some(c => c.habitId === h.id && c.date === new Date().toISOString().slice(0, 10))).length}/{habits.length} done
                </span>
              </div>

              <div className="space-y-3">
                {habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    completions={completions}
                    onToggle={toggleToday}
                    onDelete={deleteHabit}
                  />
                ))}
              </div>
            </>
          )}
        </main>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg px-5 pb-6 pt-3 bg-gradient-to-t from-gray-50 dark:from-gray-950 via-gray-50/90 dark:via-gray-950/90 to-transparent">
          {habits.length > 0 && (
            <button
              onClick={() => setShowAdd(true)}
              className="w-full py-4 bg-[#4469ff] text-white font-bold rounded-2xl text-base shadow-xl active:scale-95 transition-all hover:bg-[#3355ee]"
            >
              + New Habit
            </button>
          )}
        </div>
      </div>

      {showAdd && (
        <AddHabitModal
          onAdd={addHabit}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}
