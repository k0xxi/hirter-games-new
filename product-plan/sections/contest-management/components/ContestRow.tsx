import type { Contest } from '../types'
import { StatusBadge } from './StatusBadge'
import { Calendar, Users, Receipt, MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface ContestRowProps {
  contest: Contest
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
  onSaveAsTemplate?: () => void
}

export function ContestRow({
  contest,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onSaveAsTemplate,
}: ContestRowProps) {
  const [showMenu, setShowMenu] = useState(false)

  // Format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <tr
      className="border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors cursor-pointer"
      onClick={onView}
    >
      {/* Title & Status */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="font-medium text-stone-900 dark:text-stone-100">{contest.title}</div>
          <StatusBadge status={contest.status} />
        </div>
      </td>

      {/* Date Range */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <div className="flex flex-col">
            <span>{formatDate(contest.startDate)}</span>
            <span className="text-xs text-stone-500 dark:text-stone-500">bis {formatDate(contest.endDate)}</span>
          </div>
        </div>
      </td>

      {/* Participants */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
          <Users className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{contest.participantCount.toLocaleString('de-DE')}</span>
        </div>
      </td>

      {/* Receipts */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
          <Receipt className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{contest.receiptCount.toLocaleString('de-DE')}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            aria-label="Aktionen"
          >
            <MoreVertical className="w-5 h-5 text-stone-600 dark:text-stone-400" />
          </button>

          {showMenu && (
            <>
              {/* Backdrop to close menu */}
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                }}
              />

              {/* Dropdown menu */}
              <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onView?.()
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  Ansehen
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onEdit?.()
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onDuplicate?.()
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  Duplizieren
                </button>
                {!contest.isTemplate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(false)
                      onSaveAsTemplate?.()
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Als Vorlage speichern
                  </button>
                )}
                <div className="border-t border-stone-200 dark:border-stone-800" />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onDelete?.()
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
