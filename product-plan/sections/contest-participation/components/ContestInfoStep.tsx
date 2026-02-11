import type { Contest, Receipt } from '../types'

interface ContestInfoStepProps {
  contest: Contest
  previousReceipts?: Receipt[]
  onStart: () => void
}

/**
 * First step: Display contest information and entry point
 */
export function ContestInfoStep({ contest, previousReceipts, onStart }: ContestInfoStepProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('de-AT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  // Count successful entries
  const successfulEntries = previousReceipts?.filter((r) => r.status === 'submitted').length || 0

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in">
      {/* Hero section */}
      <div className="text-center space-y-6">
        <div className="inline-block px-4 py-2 bg-[#D5B376]/10 border border-[#D5B376]/30 ">
          <span className="text-sm font-semibold text-[#D5B376] uppercase tracking-wide">
            {formatDate(contest.startDate)} - {formatDate(contest.endDate)}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253081] dark:text-[#D5B376] leading-tight">
          {contest.title}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
          {contest.description}
        </p>

        {successfulEntries > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 ">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-green-900 dark:text-green-300">
              {successfulEntries} {successfulEntries === 1 ? 'Teilnahme' : 'Teilnahmen'} eingereicht
            </span>
          </div>
        )}
      </div>

      {/* Prize section */}
      <div className="bg-gradient-to-br from-[#253081] to-[#253081]/90 dark:from-[#253081] dark:to-[#1a2159]  p-8 sm:p-10 text-white shadow-2xl border border-[#D5B376]/20">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-[#D5B376]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold">Zu gewinnen</h2>
        </div>
        <div className="whitespace-pre-line text-lg leading-relaxed opacity-95">
          {contest.prize}
        </div>
      </div>

      {/* Two-column layout for rules and requirements */}
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        {/* Rules */}
        <div className="bg-white dark:bg-stone-900  p-6 sm:p-8 shadow-sm border border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-[#253081] dark:text-[#D5B376]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Teilnahmebedingungen
          </h3>
          <ul className="space-y-3">
            {contest.rules.map((rule, index) => (
              <li key={index} className="flex gap-3 text-stone-600 dark:text-stone-400">
                <span className="flex-shrink-0 w-5 h-5  bg-[#253081]/10 dark:bg-[#D5B376]/10 flex items-center justify-center text-xs font-semibold text-[#253081] dark:text-[#D5B376]">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Receipt requirements */}
        <div className="bg-white dark:bg-stone-900  p-6 sm:p-8 shadow-sm border border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-[#253081] dark:text-[#D5B376]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Kassenbon-Anforderungen
          </h3>
          <ul className="space-y-3">
            {contest.receiptRequirements.map((req, index) => (
              <li key={index} className="flex gap-3 text-stone-600 dark:text-stone-400">
                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Qualifying products */}
      <div className="bg-gradient-to-br from-stone-50 to-stone-100/50 dark:from-stone-900/50 dark:to-stone-800/30  p-6 sm:p-8 border border-stone-200 dark:border-stone-800">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
          Teilnahmeberechtigte Produkte
        </h3>
        <div className="flex flex-wrap gap-2">
          {contest.qualifyingProducts.map((product, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300  text-sm font-medium border border-stone-200 dark:border-stone-700 shadow-sm"
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onStart}
          className="group relative px-10 py-5 bg-gradient-to-r from-[#253081] to-[#253081]/90 hover:from-[#253081]/90 hover:to-[#253081] text-white  font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-100"
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Jetzt teilnehmen
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0  bg-[#D5B376] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  )
}
