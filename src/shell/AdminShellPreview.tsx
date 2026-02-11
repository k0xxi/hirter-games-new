import { BarChart3, Trophy } from 'lucide-react'
import { AdminShell } from './components'

export default function AdminShellPreview() {
  // Apply product fonts (Apercu Pro)
  const fontStyle = {
    fontFamily: "'Apercu Pro', system-ui, sans-serif",
  }

  const navigationItems = [
    {
      label: 'Contest Management',
      href: '/admin/contests',
      icon: <Trophy className="w-5 h-5" />,
      isActive: true,
    },
    {
      label: 'Analytics & Insights',
      href: '/admin/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ]

  const user = {
    name: 'Admin User',
    email: 'admin@hirter.at',
  }

  return (
    <div style={fontStyle}>
      <AdminShell
        navigationItems={navigationItems}
        user={user}
        onNavigate={(href) => console.log('Navigate to:', href)}
        onLogout={() => console.log('Logout')}
      >
        <div className="max-w-6xl">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#253081' }}>
          Contest Management
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          Verwalte aktive und abgeschlossene Gewinnspiele
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800 p-6">
            <div className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">
              Aktive Contests
            </div>
            <div className="text-3xl font-bold" style={{ color: '#253081' }}>
              3
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800 p-6">
            <div className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">
              Teilnahmen (gesamt)
            </div>
            <div className="text-3xl font-bold" style={{ color: '#253081' }}>
              1,247
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800 p-6">
            <div className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">
              Gewinner ausgewählt
            </div>
            <div className="text-3xl font-bold" style={{ color: '#D5B376' }}>
              12
            </div>
          </div>
        </div>

        {/* Active Contests List */}
        <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800">
          <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Aktive Gewinnspiele
            </h2>
          </div>

          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            <div className="px-6 py-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  Sommer Gewinnspiel 2026
                </h3>
                <span className="px-3 py-1 text-xs font-medium  bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Aktiv
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                Läuft bis: 31.08.2026 • 847 Teilnahmen
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium  text-white" style={{ backgroundColor: '#253081' }}>
                  Details
                </button>
                <button className="px-4 py-2 text-sm font-medium  border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800">
                  Bearbeiten
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  Frühlingsaction 2026
                </h3>
                <span className="px-3 py-1 text-xs font-medium  bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Aktiv
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                Läuft bis: 30.04.2026 • 289 Teilnahmen
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium  text-white" style={{ backgroundColor: '#253081' }}>
                  Details
                </button>
                <button className="px-4 py-2 text-sm font-medium  border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800">
                  Bearbeiten
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  Spezial: Jubiläum
                </h3>
                <span className="px-3 py-1 text-xs font-medium  bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Aktiv
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                Läuft bis: 15.03.2026 • 111 Teilnahmen
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium  text-white" style={{ backgroundColor: '#253081' }}>
                  Details
                </button>
                <button className="px-4 py-2 text-sm font-medium  border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800">
                  Bearbeiten
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </AdminShell>
    </div>
  )
}
