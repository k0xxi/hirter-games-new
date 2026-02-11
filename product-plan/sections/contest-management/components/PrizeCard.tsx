import type { Prize } from '../types'
import { Trophy } from 'lucide-react'

interface PrizeCardProps {
  prize: Prize
  index: number
}

export function PrizeCard({ prize, index }: PrizeCardProps) {
  return (
    <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
      <div className="flex items-start gap-4">
        {/* Prize number/icon */}
        <div
          className="w-12 h-12 flex items-center justify-center border-2 flex-shrink-0"
          style={{ borderColor: '#D5B376', color: '#D5B376' }}
        >
          <Trophy className="w-6 h-6" />
        </div>

        {/* Prize details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h4 className="font-bold text-stone-900 dark:text-stone-100">
              {prize.name}
            </h4>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-stone-900 dark:text-stone-100">
                {prize.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500">
                {prize.quantity}× verfügbar
              </div>
            </div>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {prize.description}
          </p>
        </div>
      </div>
    </div>
  )
}
