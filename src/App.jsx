import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import DateStrip from './components/DateStrip'
import HabitCard from './components/HabitCard'
import AddHabitModal from './components/AddHabitModal'
import { useHabits } from './hooks/useHabits'

const TODAY = new Date().toISOString().slice(0, 10)

export default function App() {
  const [selectedDate, setSelectedDate] = useState(TODAY)
  const [showAdd, setShowAdd] = useState(false)
  const { habits, completions, addHabit, deleteHabit, toggleToday } = useHabits()

  const doneCount = habits.filter(h =>
    completions.some(c => c.habitId === h.id && c.date === selectedDate)
  ).length

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col pb-28">

        <Header />
        <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />

        {/* Progress pill */}
        {habits.length > 0 && (
          <div className="px-5 mt-4 mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {selectedDate === TODAY ? "Today's habits" : new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <span className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded-full">
              {doneCount} / {habits.length}
            </span>
          </div>
        )}

        <main className="flex-1 px-5">
          {habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-24 text-center px-4">
              <div className="text-7xl mb-4">🌱</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick your one habit</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Focus on just one thing.<br />Small and consistent beats big and sporadic.
              </p>
              <button
                onClick={() => setShowAdd(true)}
                className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg active:scale-95 transition-all"
              >
                + Start my habit
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  completions={completions}
                  selectedDate={selectedDate}
                  onToggle={toggleToday}
                  onDelete={deleteHabit}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg">
        <div className="mx-4 mb-5 bg-white rounded-3xl shadow-xl px-8 py-3 flex items-center justify-between">
          <button className="flex flex-col items-center gap-1 text-gray-900">
            <span className="text-2xl">🏠</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>

          <button
            onClick={() => setShowAdd(true)}
            className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white text-3xl shadow-lg active:scale-95 transition-all -mt-6"
          >
            +
          </button>

          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-2xl">👤</span>
            <span className="text-[10px] font-bold">Profile</span>
          </button>
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
