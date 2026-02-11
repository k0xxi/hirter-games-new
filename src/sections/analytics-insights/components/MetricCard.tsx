import type { ComponentType } from 'react'

interface MetricCardProps {
  label: string
  value: string | number
  subtitle?: string
  icon?: ComponentType<{ className?: string }>
  trend?: {
    value: number
    label: string
  }
  variant?: 'default' | 'primary' | 'secondary'
}

export function MetricCard({ label, value, subtitle, icon: Icon, trend, variant = 'default' }: MetricCardProps) {
  const variantStyles = {
    default: 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700',
    primary: 'bg-[#253081]/5 dark:bg-[#253081]/20 border-[#253081]/20 dark:border-[#253081]/40',
    secondary: 'bg-[#D5B376]/5 dark:bg-[#D5B376]/20 border-[#D5B376]/20 dark:border-[#D5B376]/40'
  }

  const iconColors = {
    default: 'text-stone-400 dark:text-stone-500',
    primary: 'text-[#253081] dark:text-[#253081]/80',
    secondary: 'text-[#D5B376] dark:text-[#D5B376]/80'
  }

  return (
    <div className={`border ${variantStyles[variant]} p-6 transition-all hover:shadow-lg hover:shadow-stone-900/5 dark:hover:shadow-stone-950/20`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium">
          {label}
        </span>
        {Icon && (
          <Icon className={`w-5 h-5 ${iconColors[variant]}`} />
        )}
      </div>

      <div className="space-y-2">
        <div className="text-4xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
          {typeof value === 'number' ? value.toLocaleString('de-AT') : value}
        </div>

        {subtitle && (
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {subtitle}
          </p>
        )}

        {trend && (
          <div className="flex items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
            <span className={`text-sm font-medium ${trend.value >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
