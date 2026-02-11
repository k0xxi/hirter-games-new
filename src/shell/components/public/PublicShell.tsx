import { useState } from 'react'
import PublicHeader from './PublicHeader'
import MobileMenu from './MobileMenu'

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

interface PublicShellProps {
  children: React.ReactNode
  logoSrc?: string
  navigationGroups: NavigationGroup[]
  hero?: React.ReactNode
  footer?: React.ReactNode
  onNavigate?: (href: string) => void
}

export default function PublicShell({
  children,
  logoSrc,
  navigationGroups,
  hero,
  footer,
  onNavigate,
}: PublicShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigate = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      onNavigate?.(href)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col">
      {/* HEADER */}
      <PublicHeader
        logoSrc={logoSrc}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationGroups={navigationGroups}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* HERO SECTION */}
      {hero && (
        <section className="pt-16 animate-fade-in">
          {hero}
        </section>
      )}

      {/* CONTENT */}
      <main className={`flex-1 ${!hero ? 'pt-16' : ''} animate-fade-in`} style={{ animationDelay: '100ms' }}>
        {children}
      </main>

      {/* FOOTER */}
      {footer && (
        <footer className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          {footer}
        </footer>
      )}
    </div>
  )
}
