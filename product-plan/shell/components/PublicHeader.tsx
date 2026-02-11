import { Menu } from 'lucide-react'

interface PublicHeaderProps {
  logoSrc?: string
  onMenuClick: () => void
}

export default function PublicHeader({ logoSrc, onMenuClick }: PublicHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoSrc ? (
              <img src={logoSrc} alt="Hirter" className="h-10" />
            ) : (
              <div className="text-xl font-bold" style={{ color: '#253081' }}>
                Hirter Gewinnspiele
              </div>
            )}
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={onMenuClick}
            className="p-2  hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-stone-700 dark:text-stone-300" />
          </button>
        </div>
      </div>
    </header>
  )
}
