import data from '@/../product/sections/analytics-insights/data.json'
import contestData from '@/../product/sections/contest-management/data.json'
import { WinnerSelection } from './components/WinnerSelection'

export default function WinnerSelectionView() {
  // Use the first active contest (contest-001)
  const contest = contestData.contests.find((c) => c.id === 'contest-001')

  if (!contest) {
    return <div>Contest not found</div>
  }

  // Convert contest prizes to Prize[] format with IDs
  const prizes = contest.prizes.map((prize, index) => ({
    id: `prize-${index + 1}`,
    name: prize.name,
    description: prize.description,
    quantity: prize.quantity,
    value: prize.value,
  }))

  return (
    <WinnerSelection
      contestId={contest.id}
      contestTitle={contest.title}
      eligibleParticipants={data.participants}
      existingWinners={data.winners}
      prizes={prizes}
      onGenerateWinners={(prizeId, quantity) =>
        console.log('Generate winners for prize:', prizeId, 'quantity:', quantity)
      }
      onConfirmWinners={(winners) => console.log('Confirm winners:', winners)}
      onCancel={() => console.log('Cancel winner selection')}
    />
  )
}
