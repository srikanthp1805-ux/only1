import { getWeekCompletions } from '../utils/streaks'

export default function WeekGrid({ habitId, completions }) {
  const week = getWeekCompletions(habitId, completions)

  return (
    <div className="flex gap-1.5 items-center">
      {week.map((day) => (
        <div key={day.date} className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase">{day.label}</span>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
              ${day.done
                ? 'bg-[#8fec3c] text-gray-800 shadow-sm'
                : day.isToday
                  ? 'border-2 border-[#4469ff] text-[#4469ff]'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
          >
            {day.done ? '✓' : day.isToday ? '●' : ''}
          </div>
        </div>
      ))}
    </div>
  )
}
