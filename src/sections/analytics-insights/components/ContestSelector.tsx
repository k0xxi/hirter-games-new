import { ChevronDown } from 'lucide-react'

interface Contest {
  id: string
  title: string
  status: 'active' | 'upcoming' | 'ended'
}

interface ContestSelectorProps {
  contests: Contest[]
  selectedContestId: string
  onSelect?: (contestId: string) => void
}

export function ContestSelector({ contests, selectedContestId, onSelect }: ContestSelectorProps) {
  const selectedContest = contests.find(c => c.id === selectedContestId)

  const statusColors = {
    active: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    upcoming: 'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    ended: 'bg-stone-500/10 text-stone-700 dark:bg-stone-500/20 dark:text-stone-400'
  }

  const statusLabels = {
    active: 'Aktiv',
    upcoming: 'Bevorstehend',
    ended: 'Beendet'
  }

  return (
    <div className="relative">
      <button
        onClick={() => onSelect?.(selectedContestId)}
        className="w-full min-h-[60px] px-6 py-4 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-[#253081] dark:hover:border-[#D5B376] transition-colors flex items-center justify-between group"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
            Ausgewählter Contest
          </span>
          {selectedContest && (
            <>
              <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {selectedContest.title}
              </span>
              <span className={`text-xs px-2 py-0.5 ${statusColors[selectedContest.status]}`}>
                {statusLabels[selectedContest.status]}
              </span>
            </>
          )}
        </div>
        <ChevronDown className="w-5 h-5 text-stone-400 group-hover:text-[#253081] dark:group-hover:text-[#D5B376] transition-colors" />
      </button>
    </div>
  )
}
