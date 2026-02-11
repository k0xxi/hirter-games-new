import data from '@/../product/sections/contest-management/data.json'
import { ParticipantDetails } from './components/ParticipantDetails'

export default function ParticipantDetailsView() {
  // Get the first participant for preview
  const participant = data.participants[0]

  // Get the contest for this participant
  const contest = data.contests.find(c => c.id === participant.contestId) || data.contests[0]

  // Get receipts for this participant
  const receipts = data.receipts.filter(r => r.participantId === participant.id)

  // Get consents for this participant
  const consents = data.consents.filter(c => c.participantId === participant.id)

  return (
    <ParticipantDetails
      participant={participant}
      contest={contest}
      receipts={receipts}
      consents={consents}
      onViewReceipt={(id) => console.log('View receipt:', id)}
      onBack={() => console.log('Back to participant list')}
      onContact={() => console.log('Contact participant')}
    />
  )
}
