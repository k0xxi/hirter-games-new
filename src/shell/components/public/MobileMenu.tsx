import { X } from 'lucide-react'
import { useEffect } from 'react'

interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  external?: boolean
}

interface NavigationGroup {
  items: NavigationItem[]
  type?: 'main' | 'legal' | 'action'
}

interface MobileMenuProps {
  isOpen: boolean
  navigationGroups: NavigationGroup[]
  onClose: () => void
  onNavigate: (href: string, external?: boolean) => void
}

export default function MobileMenu({
  isOpen,
  navigationGroups,
  onClose,
  onNavigate,
}: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  let itemIndex = 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 z-50 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-stone-900 shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 transition-colors duration-200">
              Menü
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col">
            {/* Main and Legal Groups */}
            <div className="flex-1">
              {navigationGroups
                .filter((group) => group.type !== 'action')
                .map((group, groupIndex) => (
                  <div key={groupIndex}>
                    {/* Separator between groups */}
                    {groupIndex > 0 && (
                      <div className="my-4 border-t border-stone-200 dark:border-stone-800" />
                    )}

                    <ul className="space-y-1">
                      {group.items.map((item) => {
                        const currentIndex = itemIndex++
                        const isLegal = group.type === 'legal'

                        return (
                          <li
                            key={currentIndex}
                            className="animate-fade-in"
                            style={{ animationDelay: `${currentIndex * 50}ms` }}
                          >
                            <button
                              onClick={() => onNavigate(item.href, item.external)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 hover:translate-x-1 group"
                            >
                              <span
                                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                                  isLegal
                                    ? 'text-stone-400 dark:text-stone-500'
                                    : 'text-stone-600 dark:text-stone-400'
                                }`}
                              >
                                {item.icon}
                              </span>
                              <span
                                className={`transition-colors duration-200 ${
                                  isLegal
                                    ? 'text-sm text-stone-600 dark:text-stone-400 font-normal'
                                    : 'text-stone-900 dark:text-stone-100 font-medium'
                                }`}
                              >
                                {item.label}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
            </div>

            {/* Action Group (Login) - Fixed at Bottom */}
            {navigationGroups
              .filter((group) => group.type === 'action')
              .map((group, groupIndex) => (
                <div key={`action-${groupIndex}`} className="pt-6 border-t border-stone-200 dark:border-stone-800">
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const currentIndex = itemIndex++
                      return (
                        <li
                          key={currentIndex}
                          className="animate-fade-in"
                          style={{ animationDelay: `${currentIndex * 50}ms` }}
                        >
                          <button
                            onClick={() => onNavigate(item.href, item.external)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:translate-x-1 group hover:opacity-90"
                            style={{ backgroundColor: '#253081', color: 'white' }}
                          >
                            <span className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-white">
                              {item.icon}
                            </span>
                            <span className="font-bold text-white transition-colors duration-200">
                              {item.label}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
          </nav>
        </div>
      </div>
    </>
  )
}
