import type { WinnerSelectionProps, WinnerSelection as WinnerSelectionType } from '../types'
import { WinnerCard } from './WinnerCard'
import { Trophy, AlertCircle, Sparkles, Check, X, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

// Design Tokens: Primary #253081, Secondary #D5B376, Neutral stone
// Typography: Apercu Pro
// No rounded corners

export function WinnerSelection({
  contestId,
  contestTitle,
  eligibleParticipants,
  existingWinners,
  prizes,
  onGenerateWinners,
  onConfirmWinners,
  onCancel,
}: WinnerSelectionProps) {
  const [selectedPrizeId, setSelectedPrizeId] = useState<string | null>(null)
  const [generatedWinners, setGeneratedWinners] = useState<Map<string, string[]>>(new Map())
  const [step, setStep] = useState<'select' | 'review' | 'confirm'>('select')

  const selectedPrize = prizes.find((p) => p.id === selectedPrizeId)

  // Simulate random winner generation
  const handleGenerate = (prizeId: string, quantity: number) => {
    // Get random participants
    const shuffled = [...eligibleParticipants].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, quantity).map((p) => p.id)

    setGeneratedWinners((prev) => {
      const newMap = new Map(prev)
      newMap.set(prizeId, selected)
      return newMap
    })

    onGenerateWinners?.(prizeId, quantity)
  }

  const handleRegenerateOne = (prizeId: string, oldParticipantId: string) => {
    const currentWinners = generatedWinners.get(prizeId) || []
    const availableParticipants = eligibleParticipants.filter(
      (p) => !currentWinners.includes(p.id)
    )

    if (availableParticipants.length > 0) {
      const newWinner = availableParticipants[Math.floor(Math.random() * availableParticipants.length)]
      const updatedWinners = currentWinners.map((id) =>
        id === oldParticipantId ? newWinner.id : id
      )

      setGeneratedWinners((prev) => {
        const newMap = new Map(prev)
        newMap.set(prizeId, updatedWinners)
        return newMap
      })
    }
  }

  const handleConfirm = () => {
    const winnerSelections: WinnerSelectionType[] = []

    generatedWinners.forEach((participantIds, prizeId) => {
      participantIds.forEach((participantId) => {
        winnerSelections.push({
          participantId,
          prizeId,
          selectionMethod: 'random',
        })
      })
    })

    onConfirmWinners?.(winnerSelections)
  }

  const getTotalWinnersGenerated = () => {
    let total = 0
    generatedWinners.forEach((winners) => {
      total += winners.length
    })
    return total
  }

  const getTotalWinnersNeeded = () => {
    return prizes.reduce((sum, prize) => sum + prize.quantity, 0)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
          </button>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Gewinner-Auswahl
          </h1>
        </div>
        <p className="text-stone-600 dark:text-stone-400 ml-14">
          {contestTitle}
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-8 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-stone-600 dark:text-stone-400 flex-shrink-0 mt-1" />
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100 mb-2">
              Hybrid Gewinner-Auswahl
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Das System generiert zufällige Gewinner-Vorschläge basierend auf allen berechtigten Teilnehmern.
              Sie können jeden Vorschlag überprüfen und bei Bedarf neu generieren, bevor Sie die Auswahl bestätigen.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-stone-500 dark:text-stone-500">Berechtigte Teilnehmer</div>
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  {eligibleParticipants.length}
                </div>
              </div>
              <div>
                <div className="text-stone-500 dark:text-stone-500">Zu vergebende Preise</div>
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  {getTotalWinnersNeeded()}
                </div>
              </div>
              <div>
                <div className="text-stone-500 dark:text-stone-500">Bereits ausgewählt</div>
                <div className="font-bold" style={{ color: '#D5B376' }}>
                  {getTotalWinnersGenerated()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {step === 'select' && (
        <>
          {/* Prize Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Preise & Gewinner-Generierung
            </h2>
            <div className="space-y-4">
              {prizes.map((prize) => {
                const hasGenerated = generatedWinners.has(prize.id)
                const winnerIds = generatedWinners.get(prize.id) || []

                return (
                  <div
                    key={prize.id}
                    className={`border p-6 transition-colors ${
                      hasGenerated
                        ? 'border-[#253081] bg-[#253081]/5 dark:bg-[#253081]/10'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Trophy className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#D5B376' }} />
                        <div>
                          <div className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                            {prize.name}
                          </div>
                          <div className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                            {prize.description}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-stone-600 dark:text-stone-400">
                              Anzahl: <span className="font-medium text-stone-900 dark:text-stone-100">{prize.quantity}×</span>
                            </span>
                            <span className="text-stone-600 dark:text-stone-400">
                              Wert: <span className="font-medium" style={{ color: '#D5B376' }}>
                                {prize.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleGenerate(prize.id, prize.quantity)}
                        disabled={hasGenerated}
                        className={`px-6 py-3 font-medium border transition-colors flex items-center gap-2 ${
                          hasGenerated
                            ? 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-600 cursor-not-allowed'
                            : 'bg-[#253081] border-[#253081] text-white hover:bg-[#1a2360]'
                        }`}
                      >
                        <Sparkles className="w-5 h-5" />
                        {hasGenerated ? 'Generiert' : 'Gewinner generieren'}
                      </button>
                    </div>

                    {/* Generated Winners */}
                    {hasGenerated && (
                      <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800">
                        <div className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
                          Generierte Gewinner ({winnerIds.length})
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {winnerIds.map((participantId) => {
                            const participant = eligibleParticipants.find((p) => p.id === participantId)
                            if (!participant) return null

                            return (
                              <WinnerCard
                                key={participantId}
                                participant={participant}
                                prizeName={prize.name}
                                prizeValue={prize.value}
                                onRegenerate={() => handleRegenerateOne(prize.id, participantId)}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          {getTotalWinnersGenerated() > 0 && (
            <div className="flex items-center justify-between">
              <button
                onClick={onCancel}
                className="px-6 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={() => setStep('confirm')}
                disabled={getTotalWinnersGenerated() !== getTotalWinnersNeeded()}
                className="px-6 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#253081' }}
              >
                <Check className="w-5 h-5" />
                Auswahl bestätigen ({getTotalWinnersGenerated()}/{getTotalWinnersNeeded()})
              </button>
            </div>
          )}
        </>
      )}

      {step === 'confirm' && (
        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-8">
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border-2"
              style={{ borderColor: '#D5B376' }}
            >
              <Trophy className="w-8 h-8" style={{ color: '#D5B376' }} />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Gewinner-Auswahl bestätigen
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Sie sind dabei, {getTotalWinnersGenerated()} Gewinner für "{contestTitle}" zu bestätigen.
            </p>
          </div>

          <div className="border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-6 mb-8">
            <div className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400 mb-4">
              Zusammenfassung
            </div>
            <div className="space-y-3">
              {prizes.map((prize) => {
                const winnerIds = generatedWinners.get(prize.id) || []
                if (winnerIds.length === 0) return null

                return (
                  <div key={prize.id} className="flex items-center justify-between text-sm">
                    <span className="text-stone-900 dark:text-stone-100">{prize.name}</span>
                    <span className="font-medium" style={{ color: '#D5B376' }}>
                      {winnerIds.length} Gewinner
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 dark:text-amber-100">
                <div className="font-bold mb-1">Wichtiger Hinweis</div>
                Nach der Bestätigung werden die Gewinner automatisch benachrichtigt. Dieser Vorgang kann nicht rückgängig gemacht werden.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setStep('select')}
              className="px-6 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Zurück zur Auswahl
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#253081' }}
            >
              <Check className="w-5 h-5" />
              Gewinner bestätigen & benachrichtigen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
