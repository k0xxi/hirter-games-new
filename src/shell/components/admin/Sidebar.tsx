interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
}

interface SidebarProps {
  navigationItems: NavigationItem[]
  onNavigate?: (href: string) => void
}

export default function Sidebar({ navigationItems, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-stone-200 dark:border-stone-800">
          <div className="text-xl font-bold transition-colors duration-200" style={{ color: '#253081' }}>
            Hirter Admin
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navigationItems.map((item, index) => (
              <li key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <button
                  onClick={() => onNavigate?.(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3  transition-all duration-200 ${
                    item.isActive
                      ? 'text-white shadow-sm transform scale-[1.02]'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:transform hover:scale-[1.01]'
                  }`}
                  style={
                    item.isActive
                      ? { backgroundColor: '#253081' }
                      : undefined
                  }
                >
                  <span className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
