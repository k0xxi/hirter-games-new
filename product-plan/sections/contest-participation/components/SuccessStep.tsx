import type { Contest } from '../types'

interface SuccessStepProps {
  confirmationNumber: string
  contest: Contest
  onNewEntry?: () => void
}

/**
 * Step 5: Success confirmation
 */
export function SuccessStep({ confirmationNumber, contest, onNewEntry }: SuccessStepProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in text-center">
      {/* Celebration icon */}
      <div className="relative inline-block">
        <div className="w-32 h-32 bg-gradient-to-br from-[#D5B376] to-[#D5B376]/80  flex items-center justify-center shadow-2xl animate-bounce-slow">
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {/* Confetti effect */}
        <div className="absolute -inset-8 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3  animate-confetti"
              style={{
                backgroundColor: i % 2 === 0 ? '#D5B376' : '#253081',
                left: `${50 + Math.sin(i * Math.PI / 4) * 40}%`,
                top: `${50 + Math.cos(i * Math.PI / 4) * 40}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Success message */}
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#253081] dark:text-[#D5B376]">
          Vielen Dank!
        </h2>

        <p className="text-xl text-stone-600 dark:text-stone-400">
          Ihre Teilnahme wurde erfolgreich eingereicht
        </p>
      </div>

      {/* Confirmation number */}
      <div className="bg-white dark:bg-stone-900  p-8 border-2 border-[#D5B376] shadow-xl">
        <p className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
          Bestätigungsnummer
        </p>
        <p className="text-3xl font-bold text-[#253081] dark:text-[#D5B376] font-mono">
          {confirmationNumber}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-4">
          Bitte bewahren Sie diese Nummer für Ihre Unterlagen auf
        </p>
      </div>

      {/* Prize reminder */}
      <div className="bg-gradient-to-br from-[#253081]/5 to-[#D5B376]/5 dark:from-[#253081]/20 dark:to-[#D5B376]/20  p-8 border border-[#D5B376]/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D5B376] to-[#D5B376]/80  flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
              Viel Glück!
            </h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Die Gewinner werden nach Ende des Gewinnspiels am{' '}
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {new Date(contest.endDate).toLocaleDateString('de-AT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>{' '}
              ausgelost und per E-Mail benachrichtigt.
            </p>
          </div>
        </div>
      </div>

      {/* What's next */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800  p-6">
        <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Wussten Sie schon?
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Sie können mit jedem neuen Kassenbon erneut teilnehmen und Ihre Gewinnchancen erhöhen!
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={onNewEntry}
          className="px-8 py-4 bg-gradient-to-r from-[#253081] to-[#253081]/90 hover:from-[#253081]/90 hover:to-[#253081] text-white  font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Weitere Teilnahme einreichen
        </button>
      </div>
    </div>
  )
}
