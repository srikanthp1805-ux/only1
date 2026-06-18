import { useState } from 'react'

const ICONS = [
  { emoji: '🏃', label: 'Running' },
  { emoji: '🧘', label: 'Yoga' },
  { emoji: '📚', label: 'Reading' },
  { emoji: '🧘‍♂️', label: 'Meditation' },
  { emoji: '💧', label: 'Water' },
  { emoji: '😴', label: 'Sleep' },
  { emoji: '💪', label: 'Strength' },
  { emoji: '🚴', label: 'Cycling' },
  { emoji: '🤸', label: 'Stretching' },
  { emoji: '🚶', label: 'Walking' },
  { emoji: '🥗', label: 'Nutrition' },
  { emoji: '🏠', label: 'Chores' },
  { emoji: '✍️', label: 'Journaling' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '🌿', label: 'Mindfulness' },
  { emoji: '🎯', label: 'Focus' },
]

const COLORS = [
  '#4469ff',
  '#8fec3c',
  '#f9d157',
  '#ff5d88',
  '#62d4eb',
  '#ffc06a',
]

const FREQS = ['Daily', '3x / week', '5x / week']

export default function AddHabitModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('Daily')
  const [icon, setIcon] = useState(ICONS[0].emoji)
  const [color, setColor] = useState(COLORS[0])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), description: description.trim(), frequency, icon, color })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 sm:pb-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Habit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Habit Name *</label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. 30-min run"
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-base font-medium outline-none focus:border-[#4469ff] bg-white dark:bg-gray-800 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Description</label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="optional note"
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-base outline-none focus:border-[#4469ff] bg-white dark:bg-gray-800 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Frequency</label>
            <div className="flex gap-2">
              {FREQS.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all
                    ${frequency === f
                      ? 'border-[#4469ff] bg-[#4469ff] text-white'
                      : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#4469ff]'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Icon</label>
            <div className="grid grid-cols-8 gap-1.5">
              {ICONS.map(({ emoji }) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-full aspect-square rounded-xl text-xl flex items-center justify-center transition-all
                    ${icon === emoji ? 'bg-[#4469ff] scale-110 shadow-md' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Color</label>
            <div className="flex gap-3">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full transition-all ${color === c ? 'scale-125 shadow-lg ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ background: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-2xl font-bold text-base text-white transition-all active:scale-95 disabled:opacity-40"
            style={{ background: color }}
          >
            Add Habit ✦
          </button>
        </form>
      </div>
    </div>
  )
}
