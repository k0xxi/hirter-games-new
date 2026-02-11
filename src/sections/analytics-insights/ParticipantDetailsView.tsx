import data from '@/../product/sections/analytics-insights/data.json'
import { ParticipantDetails } from './components/ParticipantDetails'

export default function ParticipantDetailsView() {
  // Show the first participant with their receipts and wins
  const participant = data.participants[0]
  const participantReceipts = data.receipts.filter((r) => r.participantId === participant.id)
  const participantWins = data.winners.filter((w) => w.participantId === participant.id)

  return (
    <ParticipantDetails
      participant={participant}
      receipts={participantReceipts}
      wins={participantWins}
      onViewReceipt={(receiptId) => console.log('View receipt:', receiptId)}
      onBack={() => console.log('Back to list')}
    />
  )
}
