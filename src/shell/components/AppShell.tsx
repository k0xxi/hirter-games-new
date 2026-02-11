import AdminShell from './admin/AdminShell'
import PublicShell from './public/PublicShell'
import { Trophy, Globe, FileText, Building2, Shield, LogIn } from 'lucide-react'

/**
 * Wrapper component that renders the appropriate shell based on section type
 * This is used when viewing section screen designs to show them in context
 */
interface AppShellWrapperProps {
  children: React.ReactNode
  shellType?: 'admin' | 'public'
}

export default function AppShellWrapper({ children, shellType = 'admin' }: AppShellWrapperProps) {
  // Render public shell for customer-facing sections
  if (shellType === 'public') {
    const navigationGroups = [
      {
        type: 'main' as const,
        items: [
          { label: 'Contest Teilnahme', href: '/contest', icon: <Trophy /> },
          { label: 'Hirter Bier Website', href: 'https://hirterbier.at', icon: <Globe />, external: true },
        ],
      },
      {
        type: 'legal' as const,
        items: [
          { label: 'Teilnahmebedingungen / AGB', href: '/terms', icon: <FileText /> },
          { label: 'Impressum', href: '/imprint', icon: <Building2 /> },
          { label: 'Datenschutz', href: '/privacy', icon: <Shield /> },
        ],
      },
      {
        type: 'action' as const,
        items: [
          { label: 'Admin Login', href: '/login', icon: <LogIn /> },
        ],
      },
    ]

    const footer = (
      <div className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4" style={{ color: '#253081' }}>
                Hirter Gewinnspiele
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Ihre Chance auf tolle Gewinne mit jedem Einkauf.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-stone-900 dark:text-stone-100">Links</h4>
              <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <li><a href="#" className="hover:text-stone-900 dark:hover:text-stone-100">Teilnahmebedingungen</a></li>
                <li><a href="#" className="hover:text-stone-900 dark:hover:text-stone-100">Datenschutz</a></li>
                <li><a href="#" className="hover:text-stone-900 dark:hover:text-stone-100">Impressum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-stone-900 dark:text-stone-100">Kontakt</h4>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Hirter Brauerei<br />
                info@hirterbier.at
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500 dark:text-stone-400">
            © 2026 Hirter Brauerei. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    )

    return (
      <PublicShell
        navigationGroups={navigationGroups}
        footer={footer}
        onNavigate={(href) => console.log('Navigate to:', href)}
      >
        {children}
      </PublicShell>
    )
  }

  // Render admin shell for admin sections
  const navigationItems = [
    {
      label: 'Contest Management',
      href: '/admin/contests',
      icon: <div className="w-5 h-5" />, // Placeholder for icon
      isActive: false,
    },
    {
      label: 'Analytics & Insights',
      href: '/admin/analytics',
      icon: <div className="w-5 h-5" />, // Placeholder for icon
      isActive: false,
    },
  ]

  const user = {
    name: 'Admin User',
    email: 'admin@hirter.at',
  }

  return (
    <AdminShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      {children}
    </AdminShell>
  )
}
