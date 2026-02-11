interface WizardProgressProps {
  currentStep: number
  totalSteps: number
}

/**
 * Visual progress indicator for the wizard
 */
export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const steps = [
    { number: 1, label: 'Info' },
    { number: 2, label: 'Upload' },
    { number: 3, label: 'Verarbeitung' },
    { number: 4, label: 'Prüfen' },
    { number: 5, label: 'Fertig' },
  ]

  return (
    <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 flex items-center justify-center text-sm font-semibold transition-all duration-300
                    ${
                      step.number < currentStep
                        ? 'bg-[#253081] text-white'
                        : step.number === currentStep
                        ? 'bg-[#D5B376] text-white ring-4 ring-[#D5B376]/20'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600'
                    }
                  `}
                >
                  {step.number < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium hidden sm:block
                    ${
                      step.number <= currentStep
                        ? 'text-stone-900 dark:text-stone-100'
                        : 'text-stone-400 dark:text-stone-600'
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 sm:mx-4">
                  <div
                    className={`
                      h-full transition-all duration-500
                      ${
                        step.number < currentStep
                          ? 'bg-[#253081]'
                          : 'bg-stone-200 dark:bg-stone-800'
                      }
                    `}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
