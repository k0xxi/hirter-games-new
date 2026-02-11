import type { ContestDetailsProps } from '@/../product/sections/contest-management/types'
import { StatusBadge } from './StatusBadge'
import { PrizeCard } from './PrizeCard'
import {
  ArrowLeft,
  Edit2,
  Copy,
  Save,
  Trash2,
  Calendar,
  Users,
  Receipt,
  Clock,
  FileText,
  Award
} from 'lucide-react'

// Design Tokens: Primary #253081, Secondary #D5B376, Neutral stone
// Typography: Apercu Pro
// No rounded corners

export function ContestDetails({
  contest,
  onEdit,
  onDelete,
  onDuplicate,
  onSaveAsTemplate,
  onBack,
}: ContestDetailsProps) {
  // Format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Calculate total prize value
  const totalPrizeValue = contest.prizes.reduce(
    (sum, prize) => sum + (prize.value * prize.quantity),
    0
  )

  return (
    <div className="w-full">
      {/* Header with back button and actions */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Übersicht
        </button>

        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              {contest.title}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={contest.status} />
              {contest.isTemplate && (
                <span className="inline-block px-3 py-1 text-xs font-medium border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-900">
                  {contest.templateCategory === 'system' ? 'System-Vorlage' : 'Eigene Vorlage'}
                </span>
              )}
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-lg">
              {contest.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onEdit}
              className="px-4 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#253081' }}
            >
              <Edit2 className="w-4 h-4" />
              Bearbeiten
            </button>
            <button
              onClick={onDuplicate}
              className="px-4 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Duplizieren
            </button>
            {!contest.isTemplate && (
              <button
                onClick={onSaveAsTemplate}
                className="px-4 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Als Vorlage
              </button>
            )}
            <button
              onClick={onDelete}
              className="px-4 py-3 bg-white dark:bg-stone-900 border border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Löschen
            </button>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Zeitraum
            </span>
          </div>
          <div className="text-sm text-stone-900 dark:text-stone-100">
            <div>{formatDate(contest.startDate)}</div>
            <div className="text-stone-500 dark:text-stone-500">bis</div>
            <div>{formatDate(contest.endDate)}</div>
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Teilnehmer
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {contest.participantCount.toLocaleString('de-DE')}
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="w-5 h-5" style={{ color: '#253081' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Kassenbons
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {contest.receiptCount.toLocaleString('de-DE')}
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5" style={{ color: '#D5B376' }} />
            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Gesamtwert
            </span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#D5B376' }}>
            {totalPrizeValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Main info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rules section */}
          <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5" style={{ color: '#253081' }} />
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Teilnahmeregeln
              </h2>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
              {contest.rules}
            </p>
          </div>

          {/* Prizes section */}
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <Award className="w-5 h-5" style={{ color: '#D5B376' }} />
              Preise ({contest.prizes.length})
            </h2>
            <div className="space-y-3">
              {contest.prizes.map((prize, index) => (
                <PrizeCard key={index} prize={prize} index={index} />
              ))}
            </div>
          </div>

          {/* Terms section */}
          <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
              Teilnahmebedingungen
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-wrap">
              {contest.terms}
            </p>
          </div>
        </div>

        {/* Right column - Metadata */}
        <div className="space-y-6">
          {/* Metadata card */}
          <div className="border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
              Metadaten
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Contest ID</div>
                <div className="text-sm font-mono text-stone-900 dark:text-stone-100">
                  {contest.id}
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Erstellt am</div>
                <div className="text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatDateTime(contest.createdAt)}
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mb-1">Zuletzt bearbeitet</div>
                <div className="text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatDateTime(contest.updatedAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Prize summary card */}
          <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
              Preis-Übersicht
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-sm text-stone-600 dark:text-stone-400">Anzahl Preise</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {contest.prizes.length}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-sm text-stone-600 dark:text-stone-400">Gesamtmenge</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {contest.prizes.reduce((sum, p) => sum + p.quantity, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">Gesamtwert</span>
                <span className="font-bold" style={{ color: '#D5B376' }}>
                  {totalPrizeValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          {contest.participantCount > 0 && (
            <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
                Aktivität
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Bons pro Teilnehmer</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {(contest.receiptCount / contest.participantCount).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Chance pro Teilnehmer</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {((contest.prizes.reduce((sum, p) => sum + p.quantity, 0) / contest.participantCount) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
