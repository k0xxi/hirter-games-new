import type { ContestManagementProps } from '../types'
import { ContestRow } from './ContestRow'
import { Plus, FileText, Sparkles } from 'lucide-react'
import { useState } from 'react'

// Design Tokens: Primary #253081, Secondary #D5B376, Neutral stone
// Typography: Apercu Pro
// No rounded corners

export function ContestList({
  contests,
  templates = [],
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onSaveAsTemplate,
  onUseTemplate,
  onCreate,
}: ContestManagementProps) {
  const [showTemplateMenu, setShowTemplateMenu] = useState(false)

  // Separate templates by category
  const systemTemplates = templates.filter((t) => t.templateCategory === 'system')
  const customTemplates = templates.filter((t) => t.templateCategory === 'custom')

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Contest Management
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Verwalten Sie Ihre Gewinnspiele und erstellen Sie neue Contests
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Create from Template button */}
          {templates.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="px-5 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Aus Vorlage erstellen
              </button>

              {showTemplateMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowTemplateMenu(false)}
                  />

                  {/* Template dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl z-20 max-h-96 overflow-y-auto">
                    {/* System Templates */}
                    {systemTemplates.length > 0 && (
                      <div>
                        <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" style={{ color: '#D5B376' }} />
                            <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                              System-Vorlagen
                            </span>
                          </div>
                        </div>
                        {systemTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => {
                              setShowTemplateMenu(false)
                              onUseTemplate?.(template.id)
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors border-b border-stone-100 dark:border-stone-800/50"
                          >
                            <div className="font-medium text-stone-900 dark:text-stone-100 text-sm mb-1">
                              {template.templateName || template.title}
                            </div>
                            <div className="text-xs text-stone-500 dark:text-stone-500 line-clamp-2">
                              {template.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Custom Templates */}
                    {customTemplates.length > 0 && (
                      <div>
                        <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                          <span className="text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                            Eigene Vorlagen
                          </span>
                        </div>
                        {customTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => {
                              setShowTemplateMenu(false)
                              onUseTemplate?.(template.id)
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors border-b border-stone-100 dark:border-stone-800/50"
                          >
                            <div className="font-medium text-stone-900 dark:text-stone-100 text-sm mb-1">
                              {template.templateName || template.title}
                            </div>
                            <div className="text-xs text-stone-500 dark:text-stone-500 line-clamp-2">
                              {template.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Create New button */}
          <button
            onClick={onCreate}
            className="px-5 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] transition-colors flex items-center gap-2"
            style={{ backgroundColor: '#253081' }}
          >
            <Plus className="w-5 h-5" />
            Neuer Contest
          </button>
        </div>
      </div>

      {/* Empty State */}
      {contests.length === 0 ? (
        <div className="border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900">
              <FileText className="w-8 h-8 text-stone-400 dark:text-stone-600" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
              Noch keine Contests
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Erstellen Sie Ihren ersten Contest oder verwenden Sie eine Vorlage für den schnellen Start.
            </p>
            <button
              onClick={onCreate}
              className="px-6 py-3 font-medium text-white border border-[#253081] hover:bg-[#1a2360] transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: '#253081' }}
            >
              <Plus className="w-5 h-5" />
              Ersten Contest erstellen
            </button>
          </div>
        </div>
      ) : (
        /* Contest Table */
        <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                  Contest & Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                  Zeitraum
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                  Teilnehmer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                  Kassenbons
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <ContestRow
                  key={contest.id}
                  contest={contest}
                  onView={() => onView?.(contest.id)}
                  onEdit={() => onEdit?.(contest.id)}
                  onDelete={() => onDelete?.(contest.id)}
                  onDuplicate={() => onDuplicate?.(contest.id)}
                  onSaveAsTemplate={() => onSaveAsTemplate?.(contest.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Footer */}
      {contests.length > 0 && (
        <div className="mt-6 flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
          <div>
            Gesamt: <span className="font-medium text-stone-900 dark:text-stone-100">{contests.length}</span> Contests
          </div>
          <div className="flex items-center gap-6">
            <div>
              Aktiv: <span className="font-medium" style={{ color: '#253081' }}>
                {contests.filter((c) => c.status === 'active').length}
              </span>
            </div>
            <div>
              Entwurf: <span className="font-medium text-stone-700 dark:text-stone-300">
                {contests.filter((c) => c.status === 'draft').length}
              </span>
            </div>
            <div>
              Beendet: <span className="font-medium text-stone-500 dark:text-stone-400">
                {contests.filter((c) => c.status === 'ended').length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
