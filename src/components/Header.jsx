import { useState } from 'react'
import { getProfile, saveProfile } from '../utils/storage'

export default function Header() {
  const [profile, setProfile] = useState(() => getProfile())
  const [editing, setEditing] = useState(!profile.name)
  const [input, setInput] = useState(profile.name)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,'

  function saveName(e) {
    e.preventDefault()
    if (!input.trim()) return
    const updated = { name: input.trim() }
    saveProfile(updated)
    setProfile(updated)
    setEditing(false)
  }

  return (
    <header className="px-5 pt-6 pb-2 flex items-start justify-between">
      <div>
        {editing ? (
          <form onSubmit={saveName} className="flex gap-2 items-center mt-1">
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Your name"
              className="border-2 border-[#4e55d0] rounded-2xl px-3 py-2 text-base font-semibold outline-none w-36"
            />
            <button type="submit" className="bg-[#4e55d0] text-white rounded-2xl px-4 py-2 font-bold text-sm">
              Save
            </button>
          </form>
        ) : (
          <button onClick={() => setEditing(true)} className="text-left">
            <p className="text-sm text-gray-400 font-medium">{greeting}</p>
            <p className="text-3xl font-bold text-gray-900 leading-tight">{profile.name || 'You'} ✏️</p>
          </button>
        )}
      </div>

      <div className="flex gap-2 mt-1">
        <button className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-lg">
          🔔
        </button>
        <button className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-lg">
          ⚙️
        </button>
      </div>
    </header>
  )
}
