import type { Receipt } from '../types'
import { ReceiptStatusBadge } from './ReceiptStatusBadge'
import { Store, Calendar, Euro, MoreVertical, Eye, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

interface ReceiptRowProps {
  receipt: Receipt
  onView?: () => void
  onVerify?: () => void
  onReject?: () => void
}

export function ReceiptRow({ receipt, onView, onVerify, onReject }: ReceiptRowProps) {
  const [showMenu, setShowMenu] = useState(false)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <tr
      className="border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors cursor-pointer"
      onClick={onView}
    >
      {/* Store & Location */}
      <td className="px-6 py-4">
        <div className="flex items-start gap-3">
          <Store className="w-4 h-4 text-stone-400 dark:text-stone-600 flex-shrink-0 mt-1" />
          <div>
            <div className="font-medium text-stone-900 dark:text-stone-100">{receipt.storeName}</div>
            <div className="text-xs text-stone-500 dark:text-stone-500">{receipt.storeLocation}</div>
          </div>
        </div>
      </td>

      {/* Purchase Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>{formatDate(receipt.purchaseDate)}</span>
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-100">
          <Euro className="w-4 h-4 flex-shrink-0" />
          <span>{receipt.totalAmount.toFixed(2)}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <ReceiptStatusBadge status={receipt.status} />
      </td>

      {/* OCR Confidence */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-800">
            <div
              className="h-full transition-all"
              style={{
                width: `${receipt.ocrConfidence}%`,
                backgroundColor: receipt.ocrConfidence >= 90 ? '#10b981' : receipt.ocrConfidence >= 70 ? '#f59e0b' : '#ef4444',
              }}
            />
          </div>
          <span className="text-xs text-stone-600 dark:text-stone-400 w-10 text-right">
            {receipt.ocrConfidence}%
          </span>
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
              {/* Backdrop */}
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
                  className="w-full px-4 py-3 text-left text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Details ansehen
                </button>
                {receipt.status === 'pending' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowMenu(false)
                        onVerify?.()
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verifizieren
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowMenu(false)
                        onReject?.()
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Ablehnen
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
