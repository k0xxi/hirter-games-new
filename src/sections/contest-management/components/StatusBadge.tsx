// Status badge component for contest statuses
// Using Hirter colors: Primary #253081, Secondary #D5B376, Neutral stone

interface StatusBadgeProps {
  status: 'draft' | 'active' | 'ended' | 'archived'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    draft: {
      label: 'Entwurf',
      styles: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700',
    },
    active: {
      label: 'Aktiv',
      styles: 'border-[#253081] dark:border-[#253081] text-[#253081] dark:text-white bg-[#253081]/5 dark:bg-[#253081]/20',
    },
    ended: {
      label: 'Beendet',
      styles: 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700',
    },
    archived: {
      label: 'Archiviert',
      styles: 'bg-stone-50 dark:bg-stone-900 text-stone-400 dark:text-stone-500 border-stone-200 dark:border-stone-800',
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium border ${config.styles}`}
    >
      {config.label}
    </span>
  )
}
