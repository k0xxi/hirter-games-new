import type { ContestWizardProps, Contest, Prize } from '@/../product/sections/contest-management/types'
import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react'

// Design Tokens: Primary #253081, Secondary #D5B376, Neutral stone
// Typography: Apercu Pro
// No rounded corners

const STEPS = [
  { id: 0, title: 'Basis', description: 'Titel und Beschreibung' },
  { id: 1, title: 'Zeitraum', description: 'Start- und Enddatum' },
  { id: 2, title: 'Regeln & Preise', description: 'Teilnahmeregeln und Gewinne' },
  { id: 3, title: 'Teilnahmebedingungen', description: 'AGBs und rechtliche Hinweise' },
  { id: 4, title: 'Review', description: 'Überprüfung und Abschluss' },
]

export function ContestWizard({
  initialData = {},
  currentStep: externalStep,
  onComplete,
  onCancel,
  onStepChange,
}: ContestWizardProps) {
  const [internalStep, setInternalStep] = useState(0)
  const currentStep = externalStep ?? internalStep

  // Form state
  const [formData, setFormData] = useState<Partial<Contest>>({
    title: initialData.title || '',
    description: initialData.description || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    rules: initialData.rules || '',
    prizes: initialData.prizes || [],
    terms: initialData.terms || '',
    status: initialData.status || 'draft',
    participantCount: 0,
    receiptCount: 0,
    isTemplate: false,
  })

  const [newPrize, setNewPrize] = useState<Partial<Prize>>({
    name: '',
    description: '',
    quantity: 1,
    value: 0,
  })

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, STEPS.length - 1)
    if (onStepChange) {
      onStepChange(nextStep)
    } else {
      setInternalStep(nextStep)
    }
  }

  const handleBack = () => {
    const prevStep = Math.max(currentStep - 1, 0)
    if (onStepChange) {
      onStepChange(prevStep)
    } else {
      setInternalStep(prevStep)
    }
  }

  const handleComplete = () => {
    if (onComplete) {
      onComplete(formData as Omit<Contest, 'id' | 'createdAt' | 'updatedAt'>)
    }
  }

  const addPrize = () => {
    if (newPrize.name && newPrize.description) {
      setFormData({
        ...formData,
        prizes: [...(formData.prizes || []), newPrize as Prize],
      })
      setNewPrize({ name: '', description: '', quantity: 1, value: 0 })
    }
  }

  const removePrize = (index: number) => {
    setFormData({
      ...formData,
      prizes: formData.prizes?.filter((_, i) => i !== index) || [],
    })
  }

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.title && formData.description)
      case 1:
        return !!(formData.startDate && formData.endDate)
      case 2:
        return !!(formData.rules && formData.prizes && formData.prizes.length > 0)
      case 3:
        return !!formData.terms
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Neuer Contest
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Erstellen Sie einen neuen Contest in {STEPS.length} einfachen Schritten
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          aria-label="Abbrechen"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Step indicator */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 border-2 flex items-center justify-center font-bold transition-all ${
                      index < currentStep
                        ? 'border-[#253081] bg-[#253081] text-white'
                        : index === currentStep
                        ? 'border-[#253081] bg-white dark:bg-stone-950 text-[#253081]'
                        : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-400 dark:text-stone-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <div
                    className={`text-sm font-medium ${
                      index <= currentStep
                        ? 'text-stone-900 dark:text-stone-100'
                        : 'text-stone-500 dark:text-stone-500'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-500 hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-all ${
                    index < currentStep
                      ? 'bg-[#253081]'
                      : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                  style={{ marginTop: '-2rem' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-8 min-h-96">
        {/* Step 0: Basis */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Contest Grundinformationen
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Geben Sie den Titel und die Beschreibung Ihres Contests ein. Diese Informationen werden den Teilnehmern angezeigt.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Contest Titel *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors"
                placeholder="z.B. Sommer Grillfest Gewinnspiel 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Beschreibung *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors resize-none"
                placeholder="Kurze Beschreibung des Contests für die Teilnehmer..."
              />
            </div>
          </div>
        )}

        {/* Step 1: Zeitraum */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Contest Zeitraum
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Legen Sie den Start- und Endzeitpunkt Ihres Contests fest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Startdatum *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Enddatum *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors"
                />
              </div>
            </div>

            {formData.startDate && formData.endDate && (
              <div className="p-4 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-stone-900 dark:text-stone-100">Dauer:</span>{' '}
                  {Math.ceil(
                    (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  Tage
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Regeln & Preise */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Teilnahmeregeln & Preise
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Definieren Sie die Teilnahmeregeln und fügen Sie die zu gewinnenden Preise hinzu.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Teilnahmeregeln *
              </label>
              <textarea
                value={formData.rules}
                onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors resize-none"
                placeholder="Beschreiben Sie, wie Teilnehmer am Contest teilnehmen können..."
              />
            </div>

            <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
                Preise ({formData.prizes?.length || 0})
              </h3>

              {/* Existing prizes */}
              {formData.prizes && formData.prizes.length > 0 && (
                <div className="space-y-3 mb-6">
                  {formData.prizes.map((prize, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-stone-900 dark:text-stone-100">
                          {prize.name}
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">
                          {prize.quantity}× • {prize.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </div>
                      </div>
                      <button
                        onClick={() => removePrize(index)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new prize */}
              <div className="border border-stone-200 dark:border-stone-800 p-4 bg-white dark:bg-stone-950">
                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-4">
                  Neuen Preis hinzufügen
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={newPrize.name}
                      onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#253081]"
                      placeholder="Preis Name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={newPrize.description}
                      onChange={(e) => setNewPrize({ ...newPrize, description: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#253081]"
                      placeholder="Beschreibung"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={newPrize.quantity}
                      onChange={(e) => setNewPrize({ ...newPrize, quantity: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#253081]"
                      placeholder="Menge"
                      min="1"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={newPrize.value}
                      onChange={(e) => setNewPrize({ ...newPrize, value: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#253081]"
                      placeholder="Wert (€)"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <button
                  onClick={addPrize}
                  disabled={!newPrize.name || !newPrize.description}
                  className="w-full px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Preis hinzufügen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Teilnahmebedingungen */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Teilnahmebedingungen
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Geben Sie die rechtlichen Teilnahmebedingungen und AGBs für Ihren Contest ein.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                Teilnahmebedingungen *
              </label>
              <textarea
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#253081] transition-colors resize-none"
                placeholder="Rechtliche Bedingungen, Altersbeschränkungen, Ausschlüsse, etc..."
              />
            </div>

            <div className="p-4 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30">
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Hinweis: Stellen Sie sicher, dass Ihre Teilnahmebedingungen alle rechtlichen Anforderungen erfüllen.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Überprüfung
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Überprüfen Sie alle Angaben, bevor Sie den Contest erstellen.
              </p>
            </div>

            <div className="space-y-6">
              {/* Basis */}
              <div className="border border-stone-200 dark:border-stone-800 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-3">
                  Grundinformationen
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-stone-500 dark:text-stone-500">Titel:</span>
                    <div className="font-medium text-stone-900 dark:text-stone-100">{formData.title}</div>
                  </div>
                  <div>
                    <span className="text-sm text-stone-500 dark:text-stone-500">Beschreibung:</span>
                    <div className="text-stone-900 dark:text-stone-100">{formData.description}</div>
                  </div>
                </div>
              </div>

              {/* Zeitraum */}
              <div className="border border-stone-200 dark:border-stone-800 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-3">
                  Zeitraum
                </h3>
                <div className="flex items-center gap-4 text-stone-900 dark:text-stone-100">
                  <span>{new Date(formData.startDate || '').toLocaleDateString('de-DE')}</span>
                  <span className="text-stone-400">→</span>
                  <span>{new Date(formData.endDate || '').toLocaleDateString('de-DE')}</span>
                </div>
              </div>

              {/* Preise */}
              <div className="border border-stone-200 dark:border-stone-800 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-3">
                  Preise ({formData.prizes?.length || 0})
                </h3>
                <div className="space-y-2">
                  {formData.prizes?.map((prize, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-stone-900 dark:text-stone-100">{prize.name}</span>
                      <span className="text-stone-600 dark:text-stone-400">
                        {prize.quantity}× • {prize.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Zurück
        </button>

        <div className="text-sm text-stone-600 dark:text-stone-400">
          Schritt {currentStep + 1} von {STEPS.length}
        </div>

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!isStepComplete(currentStep)}
            className="px-6 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            style={{ backgroundColor: '#253081' }}
          >
            Weiter
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="px-6 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] transition-colors flex items-center gap-2"
            style={{ backgroundColor: '#253081' }}
          >
            <Check className="w-5 h-5" />
            Contest erstellen
          </button>
        )}
      </div>
    </div>
  )
}
