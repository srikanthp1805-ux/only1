import { useState } from 'react'

const ICONS = [
  { emoji: '🏃', color: '#FF85B3' },
  { emoji: '⚡', color: '#F5D860' },
  { emoji: '👤', color: '#72C5FF' },
  { emoji: '💼', color: '#4e55d0' },
  { emoji: '🍳', color: '#FFB870' },
  { emoji: '🌸', color: '#AAEF65' },
  { emoji: '👟', color: '#72C5FF' },
  { emoji: '📚', color: '#FF85B3' },
  { emoji: '🧘', color: '#FFB870' },
  { emoji: '💧', color: '#72C5FF' },
  { emoji: '😴', color: '#C9BAFF' },
  { emoji: '💪', color: '#AAEF65' },
  { emoji: '🚴', color: '#F5D860' },
  { emoji: '🎵', color: '#FF85B3' },
  { emoji: '💡', color: '#F5D860' },
  { emoji: '🏠', color: '#72C5FF' },
  { emoji: '✍️', color: '#FFB870' },
  { emoji: '🎯', color: '#FF85B3' },
  { emoji: '🥗', color: '#AAEF65' },
  { emoji: '🌿', color: '#AAEF65' },
]

const CARD_COLORS = [
  { color: '#F5D860', label: 'Yellow' },
  { color: '#FF85B3', label: 'Pink' },
  { color: '#72C5FF', label: 'Blue' },
  { color: '#AAEF65', label: 'Green' },
  { color: '#FFB870', label: 'Peach' },
  { color: '#C9BAFF', label: 'Lavender' },
]

const FREQS = ['Daily', '3x / week', '5x / week']

export default function AddHabitModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('Daily')
  const [icon, setIcon] = useState(ICONS[0].emoji)
  const [color, setColor] = useState(CARD_COLORS[0].color)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), description: description.trim(), frequency, icon, color })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-t-[2rem] shadow-2xl animate-fade-up max-h-[92vh] overflow-y-auto">
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="px-6 pb-10 pt-3">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onClose} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-light">
              ×
            </button>
            <h2 className="text-lg font-bold text-gray-900">Let's start a new habit</h2>
            <div className="w-9" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name</label>
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Type habit name"
                className="w-full border-2 border-[#4e55d0] rounded-2xl px-4 py-3 text-base font-semibold outline-none bg-white placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
              <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe a habit"
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-base outline-none focus:border-[#4e55d0] bg-gray-50 placeholder:text-gray-300 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Intervals</label>
              <div className="flex gap-2">
                {FREQS.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-all
                      ${frequency === f
                        ? 'border-[#4e55d0] bg-[#4e55d0] text-white'
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {ICONS.map(({ emoji, color: iconBg }) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all
                      ${icon === emoji ? 'scale-110 shadow-lg ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-105'}`}
                    style={{ background: iconBg }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Card Color</label>
              <div className="flex gap-3">
                {CARD_COLORS.map(({ color: c, label }) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`flex-1 h-10 rounded-2xl transition-all ${color === c ? 'scale-110 shadow-md ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-105'}`}
                    style={{ background: c }}
                    aria-label={label}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl font-bold text-base text-white bg-gray-900 transition-all active:scale-95 disabled:opacity-30 mt-2"
            >
              Add Habit ✦
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
