import type { ParticipantListProps } from '@/../product/sections/contest-management/types'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

export function ParticipantList({
  contest,
  participants,
  consents,
  onViewDetails,
  onBack,
  onExport
}: ParticipantListProps) {
  // Group consents by participant for efficient lookup
  const consentsByParticipant = consents.reduce((acc, consent) => {
    if (!acc[consent.participantId]) {
      acc[consent.participantId] = []
    }
    acc[consent.participantId].push(consent)
    return acc
  }, {} as Record<string, typeof consents>)

  // Calculate consent summary for each participant
  const getConsentSummary = (participantId: string) => {
    const participantConsents = consentsByParticipant[participantId] || []
    const total = participantConsents.length
    const given = participantConsents.filter(c => c.consentGiven).length
    return { given, total }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück zu Contest
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {contest.title}
              </h1>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                {participants.length} {participants.length === 1 ? 'Teilnehmer' : 'Teilnehmer'}
              </p>
            </div>
            <button
              onClick={onExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-stone-300 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              style={{ minHeight: '44px' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportieren
            </button>
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {participants.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 dark:bg-stone-800 mb-4">
              <svg className="w-8 h-8 text-stone-400 dark:text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">
              Keine Teilnehmer
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Für dieses Gewinnspiel gibt es noch keine Teilnehmer.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800">
                <thead className="bg-stone-50 dark:bg-stone-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      E-Mail
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Ort
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Teilnahmen
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Consent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Datum
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Aktionen</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-stone-900 divide-y divide-stone-200 dark:divide-stone-800">
                  {participants.map((participant) => {
                    const consentSummary = getConsentSummary(participant.id)
                    const allConsentsGiven = consentSummary.given === consentSummary.total && consentSummary.total > 0

                    return (
                      <tr
                        key={participant.id}
                        className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                        onClick={() => onViewDetails?.(participant.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                            {participant.firstName} {participant.lastName}
                          </div>
                          {participant.phone && (
                            <div className="text-sm text-stone-500 dark:text-stone-400">
                              {participant.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-stone-600 dark:text-stone-400">
                            {participant.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-stone-600 dark:text-stone-400">
                            {participant.address.city}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-500">
                            {participant.address.postalCode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                            {participant.entryCount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium ${
                            allConsentsGiven
                              ? 'bg-[#D5B376]/10 text-[#D5B376] dark:bg-[#D5B376]/20'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}>
                            {allConsentsGiven ? (
                              <>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Vollständig
                              </>
                            ) : (
                              <>{consentSummary.given}/{consentSummary.total}</>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 dark:text-stone-400">
                          {formatDistanceToNow(new Date(participant.submittedAt), {
                            addSuffix: true,
                            locale: de
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onViewDetails?.(participant.id)
                            }}
                            className="text-[#253081] dark:text-[#D5B376] hover:underline font-medium"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-stone-200 dark:divide-stone-800">
              {participants.map((participant) => {
                const consentSummary = getConsentSummary(participant.id)
                const allConsentsGiven = consentSummary.given === consentSummary.total && consentSummary.total > 0

                return (
                  <div
                    key={participant.id}
                    onClick={() => onViewDetails?.(participant.id)}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                    style={{ minHeight: '44px' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
                          {participant.firstName} {participant.lastName}
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 truncate">
                          {participant.email}
                        </p>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium ${
                        allConsentsGiven
                          ? 'bg-[#D5B376]/10 text-[#D5B376] dark:bg-[#D5B376]/20'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}>
                        {allConsentsGiven ? (
                          <>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Consent
                          </>
                        ) : (
                          <>{consentSummary.given}/{consentSummary.total}</>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
                      <span>{participant.address.city}</span>
                      <span>·</span>
                      <span>{participant.entryCount} Teilnahmen</span>
                      <span>·</span>
                      <span>
                        {formatDistanceToNow(new Date(participant.submittedAt), {
                          addSuffix: true,
                          locale: de
                        })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
