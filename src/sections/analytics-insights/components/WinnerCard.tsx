import type { Participant } from '@/../product/sections/analytics-insights/types'
import { User, Mail, Receipt, RefreshCw } from 'lucide-react'

interface WinnerCardProps {
  participant: Participant
  prizeName: string
  prizeValue: number
  onRegenerate?: () => void
}

export function WinnerCard({ participant, prizeName, prizeValue, onRegenerate }: WinnerCardProps) {
  return (
    <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 flex items-center justify-center border"
            style={{ borderColor: '#D5B376', backgroundColor: '#D5B376' }}
          >
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100">{participant.name}</div>
            <div className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-2">
              <Mail className="w-3 h-3" />
              {participant.email}
            </div>
          </div>
        </div>
        <button
          onClick={onRegenerate}
          className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="Anderen Gewinner generieren"
        >
          <RefreshCw className="w-4 h-4 text-stone-600 dark:text-stone-400" />
        </button>
      </div>

      <div className="border-t border-stone-200 dark:border-stone-800 pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Preis</div>
            <div className="font-medium text-stone-900 dark:text-stone-100">{prizeName}</div>
          </div>
          <div>
            <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Wert</div>
            <div className="font-medium" style={{ color: '#D5B376' }}>
              {prizeValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Receipts eingereicht</div>
            <div className="font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              {participant.totalReceipts}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Contests</div>
            <div className="font-medium text-stone-900 dark:text-stone-100">
              {participant.totalContests}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
