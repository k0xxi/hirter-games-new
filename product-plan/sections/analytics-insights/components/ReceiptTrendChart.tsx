import type { ReceiptTrendData } from '../types'

interface ReceiptTrendChartProps {
  data: ReceiptTrendData[]
}

export function ReceiptTrendChart({ data }: ReceiptTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-stone-400 dark:text-stone-500">
        Keine Trend-Daten verfügbar
      </div>
    )
  }

  const maxCount = Math.max(...data.map(d => d.count))
  const minCount = Math.min(...data.map(d => d.count))
  const range = maxCount - minCount || 1

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 h-64">
        {data.map((item, index) => {
          const height = ((item.count - minCount) / range) * 100
          const date = new Date(item.date)
          const dayName = date.toLocaleDateString('de-AT', { weekday: 'short' })
          const dayNum = date.getDate()

          return (
            <div key={item.date} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end h-full">
                <div className="w-full relative">
                  {/* Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-[#253081] to-[#253081]/70 dark:from-[#253081]/80 dark:to-[#253081]/50 transition-all duration-300 group-hover:from-[#D5B376] group-hover:to-[#D5B376]/70 dark:group-hover:from-[#D5B376]/80 dark:group-hover:to-[#D5B376]/60"
                    style={{ height: `${Math.max(height, 5)}%` }}
                  />
                  {/* Value label */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-stone-900 dark:text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white dark:bg-stone-800 px-2 py-1 border border-stone-200 dark:border-stone-700">
                    {item.count}
                  </div>
                </div>
              </div>
              {/* Date label */}
              <div className="text-center">
                <div className="text-xs font-medium text-stone-900 dark:text-stone-100">
                  {dayNum}
                </div>
                <div className="text-[10px] uppercase text-stone-500 dark:text-stone-400">
                  {dayName}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="w-3 h-3 bg-[#253081] dark:bg-[#253081]/80" />
        <span className="text-xs text-stone-600 dark:text-stone-400">
          Eingereichte Kassenbons pro Tag
        </span>
      </div>
    </div>
  )
}
