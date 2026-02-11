interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  trend?: {
    value: string
    positive: boolean
  }
  color?: 'primary' | 'secondary' | 'neutral'
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'border-[#253081] bg-[#253081]/5 dark:bg-[#253081]/10',
    secondary: 'border-[#D5B376] bg-[#D5B376]/5 dark:bg-[#D5B376]/10',
    neutral: 'border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/30',
  }

  const iconColorClasses = {
    primary: '#253081',
    secondary: '#D5B376',
    neutral: undefined,
  }

  return (
    <div className={`border p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
          {title}
        </span>
        {Icon && (
          <Icon
            className="w-5 h-5 flex-shrink-0"
            style={iconColorClasses[color] ? { color: iconColorClasses[color] } : undefined}
          />
        )}
      </div>

      <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        {typeof value === 'number' ? value.toLocaleString('de-DE') : value}
      </div>

      {subtitle && (
        <div className="text-sm text-stone-600 dark:text-stone-400">
          {subtitle}
        </div>
      )}

      {trend && (
        <div className={`text-sm font-medium mt-2 ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  )
}
