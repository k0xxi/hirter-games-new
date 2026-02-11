interface ReceiptStatusBadgeProps {
  status: 'pending' | 'verified' | 'rejected'
}

export function ReceiptStatusBadge({ status }: ReceiptStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Ausstehend',
      styles: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    },
    verified: {
      label: 'Verifiziert',
      styles: 'border-[#253081] dark:border-[#253081] text-[#253081] dark:text-white bg-[#253081]/5 dark:bg-[#253081]/20',
    },
    rejected: {
      label: 'Abgelehnt',
      styles: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800',
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
