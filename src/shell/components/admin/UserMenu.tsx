import { ChevronDown, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface User {
  name: string
  email?: string
  avatarUrl?: string
}

interface UserMenuProps {
  user: User
  onLogout?: () => void
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2  hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        {/* Avatar */}
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8  object-cover"
          />
        ) : (
          <div
            className="w-8 h-8  flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor: '#253081' }}
          >
            {initials}
          </div>
        )}

        {/* Name */}
        <div className="text-left hidden lg:block">
          <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
            {user.name}
          </div>
          {user.email && (
            <div className="text-xs text-stone-500 dark:text-stone-400">
              {user.email}
            </div>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-stone-500 dark:text-stone-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900  shadow-lg border border-stone-200 dark:border-stone-800 py-2 z-50">
          {/* User Info (visible on smaller screens) */}
          <div className="lg:hidden px-4 py-3 border-b border-stone-200 dark:border-stone-800">
            <div className="font-medium text-stone-900 dark:text-stone-100">
              {user.name}
            </div>
            {user.email && (
              <div className="text-sm text-stone-500 dark:text-stone-400">
                {user.email}
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              onLogout?.()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
