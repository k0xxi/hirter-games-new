import { useState } from 'react'
import type { Receipt, Contest, Product } from '@/../product/sections/contest-participation/types'

interface ReviewStepProps {
  receipt: Receipt
  contest: Contest
  onEditStoreDetails?: (details: { storeName: string; purchaseDate: string; total: number }) => void
  onAddProduct?: (product: Omit<Product, 'id'>) => void
  onEditProduct?: (productId: string, updates: Partial<Product>) => void
  onRemoveProduct?: (productId: string) => void
  onSubmit?: () => void
  onCancel?: () => void
}

/**
 * Step 4: Review and edit extracted data
 */
export function ReviewStep({
  receipt,
  contest,
  onEditStoreDetails,
  onAddProduct,
  onEditProduct,
  onRemoveProduct,
  onSubmit,
  onCancel,
}: ReviewStepProps) {
  const [isEditingStore, setIsEditingStore] = useState(false)
  const [storeDetails, setStoreDetails] = useState({
    storeName: receipt.storeName || '',
    purchaseDate: receipt.purchaseDate || '',
    total: receipt.total || 0,
  })

  const handleSaveStoreDetails = () => {
    onEditStoreDetails?.(storeDetails)
    setIsEditingStore(false)
  }

  const handleCancelEditStore = () => {
    setStoreDetails({
      storeName: receipt.storeName || '',
      purchaseDate: receipt.purchaseDate || '',
      total: receipt.total || 0,
    })
    setIsEditingStore(false)
  }

  const qualifyingCount = receipt.products?.filter((p) => p.qualifies).length || 0
  const hasQualifyingProducts = qualifyingCount > 0

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#253081] to-[#253081]/80  shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Daten überprüfen
        </h2>

        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
          Bitte überprüfen Sie die erkannten Daten und korrigieren Sie diese bei Bedarf
        </p>
      </div>

      {/* Store details card */}
      <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Geschäft & Kaufdatum
          </h3>
          {!isEditingStore ? (
            <button
              onClick={() => setIsEditingStore(true)}
              className="px-4 py-2 text-sm font-medium text-[#253081] dark:text-[#D5B376] hover:bg-[#253081]/5 dark:hover:bg-[#D5B376]/10  transition-colors"
            >
              Bearbeiten
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancelEditStore}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800  transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveStoreDetails}
                className="px-4 py-2 text-sm font-medium text-white bg-[#253081] hover:bg-[#253081]/90  transition-colors"
              >
                Speichern
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          {isEditingStore ? (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Geschäftsname
                </label>
                <input
                  type="text"
                  value={storeDetails.storeName}
                  onChange={(e) => setStoreDetails({ ...storeDetails, storeName: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700  focus:ring-2 focus:ring-[#253081] dark:focus:ring-[#D5B376] focus:border-transparent text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Kaufdatum
                </label>
                <input
                  type="date"
                  value={storeDetails.purchaseDate}
                  onChange={(e) => setStoreDetails({ ...storeDetails, purchaseDate: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700  focus:ring-2 focus:ring-[#253081] dark:focus:ring-[#D5B376] focus:border-transparent text-stone-900 dark:text-stone-100"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Gesamtbetrag (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={storeDetails.total}
                  onChange={(e) => setStoreDetails({ ...storeDetails, total: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700  focus:ring-2 focus:ring-[#253081] dark:focus:ring-[#D5B376] focus:border-transparent text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Geschäftsname</p>
                <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {receipt.storeName}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Kaufdatum</p>
                <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {receipt.purchaseDate}
                </p>
              </div>
              <div className="sm:col-span-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Gesamtbetrag</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  €{receipt.total?.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white dark:bg-stone-900  border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Produkte auf dem Kassenbon
            </h3>
            {hasQualifyingProducts ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 ">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-green-900 dark:text-green-300">
                  {qualifyingCount} {qualifyingCount === 1 ? 'teilnahmeberechtigtes Produkt' : 'teilnahmeberechtigte Produkte'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 ">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-red-900 dark:text-red-300">
                  Keine teilnahmeberechtigten Produkte
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 dark:bg-stone-800/30 border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Produkt
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Menge
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Preis
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {receipt.products?.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-900 dark:text-stone-100">
                      {product.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center text-stone-600 dark:text-stone-400">
                    {product.quantity}×
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-stone-900 dark:text-stone-100">
                    €{product.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.qualifies ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 text-xs font-medium  border border-green-200 dark:border-green-800">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Teilnahmeberechtigt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-medium  border border-stone-200 dark:border-stone-700">
                        Nicht berechtigt
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onRemoveProduct?.(product.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      title="Produkt entfernen"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning if no qualifying products */}
      {!hasQualifyingProducts && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800  p-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-bold text-red-900 dark:text-red-300 mb-2">
                Keine teilnahmeberechtigten Produkte gefunden
              </h4>
              <p className="text-sm text-red-800 dark:text-red-400">
                Dieser Kassenbon enthält keine Hirter Bier-Produkte und kann nicht eingereicht werden.
                Bitte laden Sie einen anderen Kassenbon hoch oder korrigieren Sie die Produktliste.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={onCancel}
          className="w-full sm:w-auto px-6 py-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors"
        >
          Abbrechen
        </button>

        <button
          onClick={onSubmit}
          disabled={!hasQualifyingProducts}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#253081] to-[#253081]/90 hover:from-[#253081]/90 hover:to-[#253081] text-white  font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-xl flex items-center justify-center gap-2"
        >
          Teilnahme bestätigen
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
