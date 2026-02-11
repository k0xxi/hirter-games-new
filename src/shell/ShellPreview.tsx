import { useState } from 'react'
import PublicShellPreview from './PublicShellPreview'
import AdminShellPreview from './AdminShellPreview'

export default function ShellPreview() {
  const [activeShell, setActiveShell] = useState<'public' | 'admin'>('public')

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Shell Selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-stone-900  shadow-lg border border-stone-200 dark:border-stone-800 p-1 flex gap-1">
        <button
          onClick={() => setActiveShell('public')}
          className={`px-6 py-2  text-sm font-medium transition-colors ${
            activeShell === 'public'
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Public Shell
        </button>
        <button
          onClick={() => setActiveShell('admin')}
          className={`px-6 py-2  text-sm font-medium transition-colors ${
            activeShell === 'admin'
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Admin Shell
        </button>
      </div>

      {/* Shell Preview */}
      <div className="pt-4">
        {activeShell === 'public' ? <PublicShellPreview /> : <AdminShellPreview />}
      </div>
    </div>
  )
}
