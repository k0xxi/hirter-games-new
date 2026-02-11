import data from '@/../product/sections/contest-management/data.json'
import { ContestDetails } from './components/ContestDetails'

export default function ContestDetailsPreview() {
  // Show the first active contest (Sommer Grillfest)
  const contest = data.contests.find((c) => c.id === 'contest-001')

  if (!contest) {
    return <div>Contest not found</div>
  }

  return (
    <ContestDetails
      contest={contest}
      onEdit={() => console.log('Edit contest')}
      onDelete={() => console.log('Delete contest')}
      onDuplicate={() => console.log('Duplicate contest')}
      onSaveAsTemplate={() => console.log('Save as template')}
      onBack={() => console.log('Back to list')}
    />
  )
}
