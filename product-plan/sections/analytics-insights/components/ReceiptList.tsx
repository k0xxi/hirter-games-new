import type { ReceiptListProps, ReceiptFilters } from '../types'
import { ReceiptRow } from './ReceiptRow'
import { ContestSelector } from './ContestSelector'
import { Search, Filter, Download, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

// Design Tokens: Primary #253081, Secondary #D5B376, Neutral stone
// Typography: Apercu Pro
// No rounded corners

export function ReceiptList({
  receipts,
  onView,
  onVerify,
  onReject,
  onSearch,
  onFilter,
}: ReceiptListProps) {
  // Mock contests for the selector (in real app, this would come from props)
  const mockContests = [
    { id: 'contest-001', title: 'Hirter Sommer Grillen 2026', status: 'active' as const },
    { id: 'contest-004', title: 'Hirter Oktoberfest Special 2026', status: 'active' as const }
  ]
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ReceiptFilters>({
    status: 'all',
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleFilterChange = (newFilters: Partial<ReceiptFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilter?.(updatedFilters)
  }

  // Calculate stats
  const totalReceipts = receipts.length
  const verifiedCount = receipts.filter((r) => r.status === 'verified').length
  const pendingCount = receipts.filter((r) => r.status === 'pending').length
  const rejectedCount = receipts.filter((r) => r.status === 'rejected').length

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            </button>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Receipt-Verwaltung
            </h1>
          </div>
          <p className="text-stone-600 dark:text-stone-400 ml-14">
            Eingereichte Kassenbons für den gewählten Contest durchsuchen, filtern und verifizieren
          </p>
        </div>

        {/* Contest Selector */}
        <div className="ml-14">
          <ContestSelector
            contests={mockContests}
            selectedContestId="contest-001"
            onSelect={(contestId) => console.log('Filter by contest:', contestId)}
          />
        </div>

        {/* Stats Bar */}
        <div className="ml-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-4">
          <div className="text-sm text-stone-600 dark:text-stone-400 mb-1">Gesamt</div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{totalReceipts}</div>
        </div>
        <div className="border border-[#253081] bg-[#253081]/5 dark:bg-[#253081]/10 p-4">
          <div className="text-sm text-stone-600 dark:text-stone-400 mb-1">Verifiziert</div>
          <div className="text-2xl font-bold" style={{ color: '#253081' }}>{verifiedCount}</div>
        </div>
        <div className="border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <div className="text-sm text-stone-600 dark:text-stone-400 mb-1">Ausstehend</div>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{pendingCount}</div>
        </div>
        <div className="border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
          <div className="text-sm text-stone-600 dark:text-stone-400 mb-1">Abgelehnt</div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-400">{rejectedCount}</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="ml-14 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Nach Store, Betrag oder Produkten suchen..."
            className="w-full pl-12 pr-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>

        {/* Export Button */}
        <button
          className="px-6 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export
        </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
        <div className="ml-14 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
            Filter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Status
              </label>
              <select
                value={filters.status || 'all'}
                onChange={(e) => handleFilterChange({ status: e.target.value as any })}
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081]"
              >
                <option value="all">Alle</option>
                <option value="verified">Verifiziert</option>
                <option value="pending">Ausstehend</option>
                <option value="rejected">Abgelehnt</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Von Datum
              </label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleFilterChange({ dateFrom: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081]"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Bis Datum
              </label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => handleFilterChange({ dateTo: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081]"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => {
                setFilters({ status: 'all' })
                onFilter?.({ status: 'all' })
              }}
              className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>
        )}

        {/* Receipt Table */}
        <div className="ml-14 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                Store & Ort
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                Kaufdatum
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                Betrag
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                OCR
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <ReceiptRow
                key={receipt.id}
                receipt={receipt}
                onView={() => onView?.(receipt.id)}
                onVerify={() => onVerify?.(receipt.id)}
                onReject={() => onReject?.(receipt.id)}
              />
            ))}
          </tbody>
        </table>
        </div>

        {/* Footer Stats */}
        {receipts.length > 0 && (
        <div className="ml-14 text-sm text-stone-600 dark:text-stone-400">
          Zeige <span className="font-medium text-stone-900 dark:text-stone-100">{receipts.length}</span> Receipts für den gewählten Contest
        </div>
        )}
      </div>
    </div>
  )
}
