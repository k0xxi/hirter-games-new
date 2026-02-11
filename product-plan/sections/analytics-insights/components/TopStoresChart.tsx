import type { TopStore } from '../types'

interface TopStoresChartProps {
  stores: TopStore[]
}

export function TopStoresChart({ stores }: TopStoresChartProps) {
  if (stores.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-stone-400 dark:text-stone-500">
        Keine Store-Daten verfügbar
      </div>
    )
  }

  const maxCount = Math.max(...stores.map(s => s.count))

  return (
    <div className="space-y-4">
      {stores.map((store, index) => {
        const percentage = (store.count / maxCount) * 100
        const colors = [
          'bg-[#253081] dark:bg-[#253081]/80',
          'bg-[#D5B376] dark:bg-[#D5B376]/80',
          'bg-stone-600 dark:bg-stone-500',
          'bg-stone-500 dark:bg-stone-400',
          'bg-stone-400 dark:bg-stone-300'
        ]
        const color = colors[index] || colors[colors.length - 1]

        return (
          <div key={store.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-900 dark:text-stone-100 w-6 text-right tabular-nums">
                  {index + 1}.
                </span>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {store.name}
                </span>
              </div>
              <span className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                {store.count.toLocaleString('de-AT')}
              </span>
            </div>
            <div className="relative h-8 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 overflow-hidden">
              <div
                className={`h-full ${color} transition-all duration-500 flex items-center justify-end px-3`}
                style={{ width: `${percentage}%` }}
              >
                <span className="text-xs font-bold text-white mix-blend-difference">
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
