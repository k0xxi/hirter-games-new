import type { ParticipantDetailsProps } from '../types'
import { ReceiptStatusBadge } from './ReceiptStatusBadge'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Receipt,
  Trophy,
  TrendingUp,
  Store,
  Euro,
  Eye,
} from 'lucide-react'

// Design Tokens: Primary #253081, Secondary #D5B376, Neutral stone
// Typography: Apercu Pro
// No rounded corners

export function ParticipantDetails({
  participant,
  receipts,
  wins,
  onViewReceipt,
  onBack,
}: ParticipantDetailsProps) {
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calculate stats
  const totalSpent = receipts.reduce((sum, r) => sum + r.totalAmount, 0)
  const averageReceipt = receipts.length > 0 ? totalSpent / receipts.length : 0
  const verifiedReceipts = receipts.filter((r) => r.status === 'verified').length
  const totalPrizesValue = wins.reduce((sum, w) => sum + w.prizeValue, 0)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Übersicht
        </button>

        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 flex items-center justify-center border-2"
                style={{ borderColor: '#253081' }}
              >
                <User className="w-10 h-10" style={{ color: '#253081' }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  {participant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {participant.email}
                  </div>
                  {participant.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {participant.phone}
                    </div>
                  )}
                  {participant.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {participant.address}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Receipts
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {participant.totalReceipts}
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
            {verifiedReceipts} verifiziert
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Contests
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {participant.totalContests}
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
            {wins.length} Gewinne
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Euro className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Gesamt
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {totalSpent.toFixed(2)} €
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
            Ø {averageReceipt.toFixed(2)} €
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Letzte Aktivität
            </span>
          </div>
          <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
            {formatDate(participant.lastActivityAt)}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Receipts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prizes Won */}
          {wins.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
                <Trophy className="w-5 h-5" style={{ color: '#D5B376' }} />
                Gewonnene Preise ({wins.length})
              </h2>
              <div className="space-y-3">
                {wins.map((win) => (
                  <div
                    key={win.id}
                    className="border border-[#D5B376] bg-[#D5B376]/5 dark:bg-[#D5B376]/10 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                          {win.prizeName}
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">
                          Ausgewählt am {formatDate(win.selectionDate)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: '#D5B376' }}>
                          {win.prizeValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                          {win.notificationStatus === 'confirmed' && '✓ Bestätigt'}
                          {win.notificationStatus === 'sent' && 'Benachrichtigt'}
                          {win.notificationStatus === 'pending' && 'Ausstehend'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400">Gesamtwert der Gewinne</span>
                    <span className="font-bold" style={{ color: '#D5B376' }}>
                      {totalPrizesValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Receipts List */}
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <Receipt className="w-5 h-5" style={{ color: '#253081' }} />
              Eingereichte Receipts ({receipts.length})
            </h2>
            <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
              <div className="divide-y divide-stone-200 dark:divide-stone-800">
                {receipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="p-6 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Store className="w-4 h-4 text-stone-400 dark:text-stone-600 flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-stone-900 dark:text-stone-100 mb-1">
                            {receipt.storeName}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-500">
                            {receipt.storeLocation}
                          </div>
                        </div>
                      </div>
                      <ReceiptStatusBadge status={receipt.status} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Kaufdatum</div>
                        <div className="font-medium text-stone-900 dark:text-stone-100">
                          {formatDate(receipt.purchaseDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Betrag</div>
                        <div className="font-medium text-stone-900 dark:text-stone-100">
                          {receipt.totalAmount.toFixed(2)} €
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Eingereicht</div>
                        <div className="text-stone-600 dark:text-stone-400">
                          {formatDateTime(receipt.submittedAt)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">OCR</div>
                        <div className="text-stone-600 dark:text-stone-400">
                          {receipt.ocrConfidence}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
                      <div className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1">
                        {receipt.products}
                      </div>
                      <button
                        onClick={() => onViewReceipt?.(receipt.id)}
                        className="px-4 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </div>

                    {receipt.status === 'rejected' && receipt.rejectionReason && (
                      <div className="mt-3 p-3 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 text-sm text-red-700 dark:text-red-400">
                        <span className="font-medium">Ablehnungsgrund:</span> {receipt.rejectionReason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Metadata */}
        <div className="space-y-6">
          {/* Account Info */}
          <div className="border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
              Account-Informationen
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Teilnehmer-ID</div>
                <div className="text-sm font-mono text-stone-900 dark:text-stone-100">
                  {participant.id}
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Registriert am</div>
                <div className="text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDateTime(participant.registeredAt)}
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Letzte Aktivität</div>
                <div className="text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDateTime(participant.lastActivityAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
              Aktivitäts-Übersicht
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-sm text-stone-600 dark:text-stone-400">Receipts eingereicht</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {participant.totalReceipts}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-sm text-stone-600 dark:text-stone-400">Verifizierte Receipts</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {verifiedReceipts}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-sm text-stone-600 dark:text-stone-400">Contests teilgenommen</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {participant.totalContests}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-sm text-stone-600 dark:text-stone-400">Preise gewonnen</span>
                <span className="font-medium" style={{ color: '#D5B376' }}>
                  {wins.length}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">Gesamt ausgegeben</span>
                <span className="font-bold" style={{ color: '#253081' }}>
                  {totalSpent.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
