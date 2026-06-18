import { useState } from 'react'
import { getProfile, saveProfile } from '../utils/storage'

export default function Header({ darkMode, onToggleDark }) {
  const [profile, setProfile] = useState(() => getProfile())
  const [editing, setEditing] = useState(!profile.name)
  const [input, setInput] = useState(profile.name)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  function saveName(e) {
    e.preventDefault()
    if (!input.trim()) return
    const updated = { ...profile, name: input.trim() }
    saveProfile(updated)
    setProfile(updated)
    setEditing(false)
  }

  return (
    <header className="flex items-center justify-between px-5 pt-6 pb-4">
      <div>
        {editing ? (
          <form onSubmit={saveName} className="flex gap-2 items-center">
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Your name"
              className="border-2 border-[#4469ff] rounded-xl px-3 py-1.5 text-base font-semibold outline-none bg-white dark:bg-gray-900 dark:text-white w-40"
            />
            <button type="submit" className="bg-[#4469ff] text-white rounded-xl px-3 py-1.5 font-semibold text-sm">
              Save
            </button>
          </form>
        ) : (
          <button onClick={() => setEditing(true)} className="text-left group">
            <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">{greeting},</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#4469ff] transition-colors">
              {profile.name} ✏️
            </p>
          </button>
        )}
      </div>

      <button
        onClick={onToggleDark}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl shadow-sm"
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
