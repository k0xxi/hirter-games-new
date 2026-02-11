import { Users, Receipt, Trophy, TrendingUp, Calendar, BarChart3 } from 'lucide-react'
import type { AnalyticsDashboardProps } from '../types'
import { ContestSelector } from './ContestSelector'
import { MetricCard } from './MetricCard'
import { ReceiptTrendChart } from './ReceiptTrendChart'
import { TopStoresChart } from './TopStoresChart'

export function AnalyticsDashboard({
  metrics,
  onViewReceipts,
  onViewParticipants,
  onSelectWinners,
  onFilterByContest
}: AnalyticsDashboardProps) {
  // Mock contests for the selector (in real app, this would come from props)
  const mockContests = [
    { id: 'contest-001', title: 'Hirter Sommer Grillen 2026', status: 'active' as const },
    { id: 'contest-004', title: 'Hirter Oktoberfest Special 2026', status: 'active' as const }
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Contest Selector */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Analytics & Insights
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Analysieren Sie Contest-Daten, Teilnehmerverhalten und Receipt-Informationen
          </p>
        </div>

        <ContestSelector
          contests={mockContests}
          selectedContestId="contest-001"
          onSelect={onFilterByContest}
        />

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Teilnehmer Gesamt"
            value={metrics.totalParticipants}
            subtitle={`${metrics.participantsThisWeek} neue diese Woche`}
            icon={Users}
            variant="primary"
          />
          <MetricCard
            label="Kassenbons Gesamt"
            value={metrics.totalReceipts}
            subtitle={`${metrics.receiptsToday} heute eingereicht`}
            icon={Receipt}
            variant="secondary"
          />
          <MetricCard
            label="Gewinner"
            value={metrics.totalWinners}
            subtitle="Über alle Contests"
            icon={Trophy}
          />
          <MetricCard
            label="Ø Receipts pro Teilnehmer"
            value={metrics.averageReceiptsPerParticipant.toFixed(2)}
            subtitle="Durchschnittliche Teilnahme"
            icon={TrendingUp}
          />
        </div>

        {/* Weekly Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            label="Receipts diese Woche"
            value={metrics.receiptsThisWeek}
            icon={Calendar}
          />
          <MetricCard
            label="Aktive Contests"
            value={metrics.activeContests}
            icon={BarChart3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Receipt Trend Chart */}
          <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                Receipt-Trend
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Letzte 8 Tage
              </p>
            </div>
            <ReceiptTrendChart data={metrics.receiptTrend} />
          </div>

          {/* Top Stores Chart */}
          <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                Top 5 Stores
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Nach Anzahl eingereichten Receipts
              </p>
            </div>
            <TopStoresChart stores={metrics.topStores} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={onViewReceipts}
            className="px-6 py-3 bg-[#253081] hover:bg-[#253081]/90 dark:bg-[#253081]/90 dark:hover:bg-[#253081] text-white font-semibold transition-colors"
          >
            Alle Receipts anzeigen
          </button>
          <button
            onClick={onViewParticipants}
            className="px-6 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-[#253081] dark:hover:border-[#D5B376] text-stone-900 dark:text-stone-100 font-semibold transition-colors"
          >
            Teilnehmer verwalten
          </button>
          <button
            onClick={onSelectWinners}
            className="px-6 py-3 bg-[#D5B376] hover:bg-[#D5B376]/90 dark:bg-[#D5B376]/90 dark:hover:bg-[#D5B376] text-white font-semibold transition-colors"
          >
            Gewinner auswählen
          </button>
        </div>
      </div>
    </div>
  )
}
