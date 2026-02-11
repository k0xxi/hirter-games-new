import { PublicShell } from './components'
import { Trophy, Globe, FileText, Building2, Shield, LogIn } from 'lucide-react'

export default function PublicShellPreview() {
  // Apply product fonts (Apercu Pro)
  const fontStyle = {
    fontFamily: "'Apercu Pro', system-ui, sans-serif",
  }

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

  // Hero section
  const hero = (
    <div className="relative bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800 py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 transition-all duration-300" style={{ color: '#253081' }}>
          Willkommen bei Hirter Gewinnspiele
        </h1>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-8 transition-colors duration-200">
          Lade deinen Kassenbon hoch und nimm an unseren exklusiven Gewinnspielen teil.
          Keine Registrierung erforderlich!
        </p>
        <button
          className="px-8 py-4  text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          style={{ backgroundColor: '#253081' }}
        >
          Jetzt teilnehmen
        </button>
      </div>
    </div>
  )

  // Footer section
  const footer = (
    <div className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 transition-colors duration-200" style={{ color: '#253081' }}>
              Hirter Gewinnspiele
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Ihre Chance auf tolle Gewinne mit jedem Einkauf.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-stone-900 dark:text-stone-100">Links</h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><a href="#" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200">Teilnahmebedingungen</a></li>
              <li><a href="#" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200">Datenschutz</a></li>
              <li><a href="#" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200">Impressum</a></li>
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
    <div style={fontStyle}>
      <PublicShell
        navigationGroups={navigationGroups}
        hero={hero}
        footer={footer}
        onNavigate={(href) => console.log('Navigate to:', href)}
      >
        <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800 p-8 transition-all duration-200 hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-stone-900 dark:text-stone-100">
            So funktioniert's
          </h2>
          <ol className="space-y-4 text-stone-700 dark:text-stone-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6  flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#253081' }}>
                1
              </span>
              <span>Kaufe Hirter Bier und behalte den Kassenbon</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6  flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#253081' }}>
                2
              </span>
              <span>Fotografiere deinen Kassenbon mit dem Smartphone</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6  flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#253081' }}>
                3
              </span>
              <span>Lade den Bon hoch - unsere KI verifiziert automatisch</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6  flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#253081' }}>
                4
              </span>
              <span>Fertig! Du nimmst automatisch teil</span>
            </li>
          </ol>
        </div>

        <div className="mt-12 p-6  transition-all duration-200 hover:shadow-lg hover:scale-[1.02]" style={{ backgroundColor: '#D5B376' }}>
          <h3 className="text-xl font-bold mb-2 transition-colors duration-200" style={{ color: '#253081' }}>
            Aktuelle Gewinnspiele
          </h3>
          <p className="text-stone-800">
            Derzeit läuft unser Hauptgewinnspiel mit attraktiven Preisen.
            Jetzt mitmachen und gewinnen!
          </p>
        </div>
      </div>
      </PublicShell>
    </div>
  )
}
