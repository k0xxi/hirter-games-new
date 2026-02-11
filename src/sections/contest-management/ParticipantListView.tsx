import data from '@/../product/sections/contest-management/data.json'
import { ParticipantList } from './components/ParticipantList'

export default function ParticipantListView() {
  // Get the first active contest with participants for preview
  const contest = data.contests.find(c => c.id === 'contest-001') || data.contests[0]

  // Filter participants for this contest
  const participants = data.participants.filter(p => p.contestId === contest.id)

  // Filter consents for these participants
  const participantIds = participants.map(p => p.id)
  const consents = data.consents.filter(c => participantIds.includes(c.participantId))

  return (
    <ParticipantList
      contest={contest}
      participants={participants}
      consents={consents}
      onViewDetails={(id) => console.log('View participant details:', id)}
      onBack={() => console.log('Back to contest details')}
      onExport={() => console.log('Export participant data')}
    />
  )
}
