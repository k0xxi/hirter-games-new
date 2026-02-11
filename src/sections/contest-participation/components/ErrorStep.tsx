interface ErrorStepProps {
  errorType: 'invalid_image' | 'non_qualifying' | 'duplicate'
  errorMessage: string
  onRetry?: () => void
  onCancel?: () => void
}

/**
 * Error step: Display error and allow retry
 */
export function ErrorStep({ errorType, errorMessage, onRetry, onCancel }: ErrorStepProps) {
  const errorConfig = {
    invalid_image: {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Bild nicht lesbar',
      tips: [
        'Sorgen Sie für gute Beleuchtung ohne Schatten',
        'Halten Sie die Kamera ruhig und fokussiert',
        'Stellen Sie sicher, dass der gesamte Kassenbon im Bild ist',
        'Vermeiden Sie Reflexionen oder Blendungen',
      ],
    },
    non_qualifying: {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Keine berechtigten Produkte',
      tips: [
        'Der Kassenbon muss mindestens ein Hirter Bier-Produkt enthalten',
        'Überprüfen Sie die Liste der teilnahmeberechtigten Produkte',
        'Laden Sie einen Kassenbon mit Hirter Produkten hoch',
      ],
    },
    duplicate: {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Bereits eingereicht',
      tips: [
        'Dieser Kassenbon wurde bereits für das Gewinnspiel verwendet',
        'Pro Kassenbon ist nur eine Teilnahme möglich',
        'Sie können mit einem anderen Kassenbon erneut teilnehmen',
      ],
    },
  }

  const config = errorConfig[errorType]

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Error icon */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-950/30  text-red-600 dark:text-red-400 mb-6">
          {config.icon}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          {config.title}
        </h2>

        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
          {errorMessage}
        </p>
      </div>

      {/* Error details card */}
      <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800  p-8">
        <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Was Sie tun können
        </h3>
        <ul className="space-y-3">
          {config.tips.map((tip, index) => (
            <li key={index} className="flex gap-3 text-red-900 dark:text-red-300">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onCancel}
          className="w-full sm:w-auto px-6 py-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors"
        >
          Abbrechen
        </button>

        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#253081] to-[#253081]/90 hover:from-[#253081]/90 hover:to-[#253081] text-white  font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Erneut versuchen
        </button>
      </div>
    </div>
  )
}
