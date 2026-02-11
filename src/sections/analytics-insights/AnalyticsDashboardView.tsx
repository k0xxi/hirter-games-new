import data from '@/../product/sections/analytics-insights/data.json'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'

export default function AnalyticsDashboardView() {
  return (
    <AnalyticsDashboard
      metrics={data.dashboardMetrics}
      onViewReceipts={() => console.log('View receipts')}
      onViewParticipants={() => console.log('View participants')}
      onSelectWinners={() => console.log('Select winners')}
      onFilterByContest={(contestId) => console.log('Filter by contest:', contestId)}
    />
  )
}
