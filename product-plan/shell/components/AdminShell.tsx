import { useState } from 'react'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import UserMenu from './UserMenu'

interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
}

interface User {
  name: string
  email?: string
  avatarUrl?: string
}

interface AdminShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: User
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export default function AdminShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Desktop: Sidebar */}
      <div className="hidden md:block">
        <Sidebar navigationItems={navigationItems} onNavigate={onNavigate} />
      </div>

      {/* Mobile: Bottom Navigation */}
      <div className="md:hidden">
        <BottomNav
          navigationItems={navigationItems}
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </div>

      {/* Main Content Area */}
      <div className="md:pl-72 pb-20 md:pb-0 transition-all duration-300">
        {/* Top Bar with User Menu (Desktop) */}
        <div className="hidden md:block sticky top-0 z-30 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
          <div className="flex items-center justify-end px-6 py-4">
            {user && <UserMenu user={user} onLogout={onLogout} />}
          </div>
        </div>

        {/* Content */}
        <main className="p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}
