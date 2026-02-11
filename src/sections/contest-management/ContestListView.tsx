import data from '@/../product/sections/contest-management/data.json'
import { ContestList } from './components/ContestList'

export default function ContestListPreview() {
  // Filter out templates for the main contest list
  const contests = data.contests.filter((c) => !c.isTemplate)
  const templates = data.contests.filter((c) => c.isTemplate)

  return (
    <ContestList
      contests={contests}
      templates={templates}
      onView={(id) => console.log('View contest:', id)}
      onEdit={(id) => console.log('Edit contest:', id)}
      onDelete={(id) => console.log('Delete contest:', id)}
      onDuplicate={(id) => console.log('Duplicate contest:', id)}
      onSaveAsTemplate={(id) => console.log('Save as template:', id)}
      onUseTemplate={(templateId) => console.log('Use template:', templateId)}
      onCreate={() => console.log('Create new contest')}
    />
  )
}
