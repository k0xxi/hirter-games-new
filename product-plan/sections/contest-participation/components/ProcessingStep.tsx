interface ProcessingStepProps {
  processingStage: 'reading' | 'extracting' | 'verifying'
}

/**
 * Step 3: AI processing with visible stages
 */
export function ProcessingStep({ processingStage }: ProcessingStepProps) {
  const stages = [
    {
      id: 'reading',
      label: 'Kassenbon wird gelesen',
      description: 'Bildanalyse läuft...',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: 'extracting',
      label: 'Daten werden extrahiert',
      description: 'Produkte und Details werden erkannt...',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'verifying',
      label: 'Daten werden verifiziert',
      description: 'Produkte werden geprüft...',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  const getCurrentStageIndex = () => {
    return stages.findIndex((s) => s.id === processingStage)
  }

  const currentIndex = getCurrentStageIndex()
  const currentStage = stages[currentIndex]

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-fade-in">
      {/* Current stage display */}
      <div className="text-center space-y-6">
        {/* Animated icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-[#253081] to-[#253081]/80  flex items-center justify-center text-white shadow-2xl animate-pulse">
            {currentStage.icon}
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0  border-4 border-t-[#D5B376] border-r-[#D5B376]/30 border-b-[#D5B376]/10 border-l-[#D5B376]/50 animate-spin" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            {currentStage.label}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400">
            {currentStage.description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-stone-200 dark:bg-stone-800  overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#253081] to-[#D5B376] transition-all duration-1000 ease-out animate-pulse"
              style={{ width: `${((currentIndex + 1) / stages.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            {currentIndex + 1} von {stages.length}
          </p>
        </div>
      </div>

      {/* Stage list */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div
              key={stage.id}
              className={`
                flex items-center gap-4 p-4  transition-all duration-500
                ${isCurrent ? 'bg-[#D5B376]/10 border-2 border-[#D5B376]' : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800'}
              `}
            >
              {/* Status icon */}
              <div
                className={`
                  flex-shrink-0 w-12 h-12  flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-[#D5B376] text-white animate-pulse' : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600'}
                `}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : isCurrent ? (
                  <div className="w-3 h-3 bg-white  animate-ping" />
                ) : (
                  <div className="w-3 h-3 bg-current " />
                )}
              </div>

              {/* Stage info */}
              <div className="flex-1">
                <p
                  className={`
                    font-semibold transition-colors
                    ${isCurrent ? 'text-stone-900 dark:text-stone-100' : isPending ? 'text-stone-400 dark:text-stone-600' : 'text-stone-700 dark:text-stone-300'}
                  `}
                >
                  {stage.label}
                </p>
                <p
                  className={`
                    text-sm transition-colors
                    ${isCurrent ? 'text-stone-600 dark:text-stone-400' : 'text-stone-400 dark:text-stone-600'}
                  `}
                >
                  {stage.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Processing message */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800  p-6 text-center">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          Dies dauert normalerweise nur wenige Sekunden. Bitte schließen Sie diese Seite nicht.
        </p>
      </div>
    </div>
  )
}
