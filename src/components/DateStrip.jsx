export default function DateStrip({ selectedDate, onSelect }) {
  const today = new Date()
  const todayKey = today.toISOString().slice(0, 10)
  const days = []

  const dow = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - ((dow + 6) % 7))

  const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    days.push(d)
  }

  return (
    <div className="flex gap-2 px-5 mt-4 mb-2">
      {days.map((d, i) => {
        const key = d.toISOString().slice(0, 10)
        const isSelected = key === selectedDate
        const isToday = key === todayKey

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex-1 flex flex-col items-center py-3 rounded-2xl font-semibold transition-all active:scale-95
              ${isSelected
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-500 shadow-sm hover:bg-gray-50'
              }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
              {LABELS[i]}
            </span>
            <span className={`text-base font-bold mt-0.5 ${isToday && !isSelected ? 'text-[#4e55d0]' : ''}`}>
              {d.getDate()}
            </span>
          </button>
        )
      })}
    </div>
  )
}
