import type { ParticipantDetailsProps } from '../types'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export function ParticipantDetails({
  participant,
  contest,
  receipts,
  consents,
  onViewReceipt,
  onBack,
  onContact
}: ParticipantDetailsProps) {
  // Group consents by type for organized display
  const consentsByType = consents.reduce((acc, consent) => {
    acc[consent.consentType] = consent
    return acc
  }, {} as Record<string, typeof consents[0]>)

  const consentLabels: Record<string, string> = {
    participation: 'Teilnahme am Gewinnspiel',
    marketing: 'Marketing & Newsletter',
    data_storage: 'Datenspeicherung'
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück zur Teilnehmer-Liste
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {participant.firstName} {participant.lastName}
              </h1>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Teilnehmer an {contest.title}
              </p>
            </div>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white dark:text-stone-900"
              style={{
                backgroundColor: '#253081',
                minHeight: '44px'
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kontaktieren
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Contact Info & Consents */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
              <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
                Kontaktdaten
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">E-Mail</dt>
                  <dd className="text-sm text-stone-900 dark:text-stone-100">{participant.email}</dd>
                </div>
                {participant.phone && (
                  <div>
                    <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">Telefon</dt>
                    <dd className="text-sm text-stone-900 dark:text-stone-100">{participant.phone}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">Adresse</dt>
                  <dd className="text-sm text-stone-900 dark:text-stone-100">
                    {participant.address.street}<br />
                    {participant.address.postalCode} {participant.address.city}<br />
                    {participant.address.country}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Participation Stats */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
              <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
                Teilnahme-Statistik
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">Anzahl Teilnahmen</dt>
                  <dd className="text-2xl font-bold text-stone-900 dark:text-stone-100">{participant.entryCount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">Hochgeladene Belege</dt>
                  <dd className="text-2xl font-bold text-stone-900 dark:text-stone-100">{receipts.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">Erste Teilnahme</dt>
                  <dd className="text-sm text-stone-900 dark:text-stone-100">
                    {format(new Date(participant.submittedAt), 'dd. MMMM yyyy, HH:mm', { locale: de })}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Consent Status */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
              <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
                Einwilligungen
              </h2>
              <div className="space-y-3">
                {Object.entries(consentsByType).map(([type, consent]) => (
                  <div key={consent.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {consent.consentGiven ? (
                        <div className="w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#D5B376' }}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        consent.consentGiven
                          ? 'text-stone-900 dark:text-stone-100'
                          : 'text-stone-500 dark:text-stone-400'
                      }`}>
                        {consentLabels[type] || type}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {format(new Date(consent.consentTimestamp), 'dd.MM.yyyy, HH:mm', { locale: de })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {consents.length > 0 && consents[0].ipAddress && (
                <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    IP-Adresse: {consents[0].ipAddress}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Receipts */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800">
                <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  Hochgeladene Belege ({receipts.length})
                </h2>
              </div>

              {receipts.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 dark:bg-stone-800 mb-4">
                    <svg className="w-8 h-8 text-stone-400 dark:text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Keine Belege hochgeladen
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-stone-200 dark:divide-stone-800">
                  {receipts.map((receipt) => (
                    <div key={receipt.id} className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base font-medium text-stone-900 dark:text-stone-100">
                              {receipt.extractedData.storeName}
                            </h3>
                            <div className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
                              receipt.status === 'verified'
                                ? 'bg-[#D5B376]/10 text-[#D5B376] dark:bg-[#D5B376]/20'
                                : receipt.status === 'pending'
                                ? 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            }`}>
                              {receipt.status === 'verified' ? 'Verifiziert' : receipt.status === 'pending' ? 'Ausstehend' : 'Abgelehnt'}
                            </div>
                          </div>
                          <p className="text-sm text-stone-600 dark:text-stone-400">
                            {receipt.extractedData.storeAddress}
                          </p>
                        </div>
                        <button
                          onClick={() => onViewReceipt?.(receipt.id)}
                          className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 border border-stone-300 dark:border-stone-700 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                          style={{ minHeight: '44px' }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Beleg ansehen
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Kaufdatum</p>
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                            {format(new Date(receipt.extractedData.purchaseDate), 'dd.MM.yyyy', { locale: de })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Gesamtbetrag</p>
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                            €{receipt.extractedData.total.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Hochgeladen</p>
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                            {format(new Date(receipt.uploadedAt), 'dd.MM.yyyy', { locale: de })}
                          </p>
                        </div>
                        {receipt.verifiedAt && (
                          <div>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Verifiziert</p>
                            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                              {format(new Date(receipt.verifiedAt), 'dd.MM.yyyy', { locale: de })}
                            </p>
                          </div>
                        )}
                      </div>

                      {receipt.extractedData.products.length > 0 && (
                        <div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">Produkte</p>
                          <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 divide-y divide-stone-200 dark:divide-stone-700">
                            {receipt.extractedData.products.map((product, idx) => (
                              <div key={idx} className="px-3 py-2 flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-stone-900 dark:text-stone-100 truncate">
                                    {product.name}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0">
                                  <span className="text-sm text-stone-600 dark:text-stone-400">
                                    {product.quantity}×
                                  </span>
                                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100 min-w-[4rem] text-right">
                                    €{product.price.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
