import { User as UserIcon } from 'lucide-react'
import { useState } from 'react'

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

interface BottomNavProps {
  navigationItems: NavigationItem[]
  user?: User
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export default function BottomNav({
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: BottomNavProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <>
      {/* User Menu Overlay (Mobile) */}
      {showUserMenu && (
        <>
          <div
            className="fixed inset-0 bg-stone-900/50 z-40"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="fixed bottom-20 left-4 right-4 z-50 bg-white dark:bg-stone-900  shadow-xl border border-stone-200 dark:border-stone-800 p-4">
            {user && (
              <>
                <div className="mb-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    {user.name}
                  </div>
                  {user.email && (
                    <div className="text-sm text-stone-500 dark:text-stone-400">
                      {user.email}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    onLogout?.()
                    setShowUserMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left  hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-around px-4 py-3">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onNavigate?.(item.href)}
              className={`flex flex-col items-center gap-1 px-4 py-2  transition-colors min-w-0 ${
                item.isActive
                  ? 'text-white'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
              style={
                item.isActive
                  ? { backgroundColor: '#253081' }
                  : undefined
              }
            >
              <span className="w-6 h-6 flex-shrink-0">{item.icon}</span>
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          ))}

          {/* User Profile Button */}
          <button
            onClick={() => setShowUserMenu(true)}
            className="flex flex-col items-center gap-1 px-4 py-2  transition-colors text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </>
  )
}
