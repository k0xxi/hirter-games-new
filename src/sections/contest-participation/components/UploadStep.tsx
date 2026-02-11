import { useRef, useState } from 'react'

interface UploadStepProps {
  onUpload?: (file: File) => void
  onCancel?: () => void
}

/**
 * Step 2: Upload receipt photo
 */
export function UploadStep({ onUpload, onCancel }: UploadStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onUpload?.(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#253081] to-[#253081]/80  shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Kassenbon fotografieren
        </h2>

        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
          Machen Sie ein Foto von Ihrem Kassenbon oder laden Sie ein vorhandenes Bild hoch
        </p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed  p-12 sm:p-16 transition-all duration-300 cursor-pointer
          ${
            isDragging
              ? 'border-[#D5B376] bg-[#D5B376]/5 scale-105'
              : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-[#253081] dark:hover:border-[#D5B376] hover:bg-stone-50 dark:hover:bg-stone-800/50'
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-6 text-center">
          {/* Icon */}
          <div className="relative">
            <div className="w-20 h-20  bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center">
              <svg className="w-10 h-10 text-stone-400 dark:text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {/* Decorative pulse */}
            <div className="absolute inset-0  bg-[#253081]/20 dark:bg-[#D5B376]/20 animate-ping" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Ziehen Sie Ihr Foto hierher
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              oder klicken Sie, um eine Datei auszuwählen
            </p>
          </div>

          {/* Format info */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded">JPG</span>
            <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded">PNG</span>
            <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded">PDF</span>
          </div>
        </div>
      </div>

      {/* Mobile camera button */}
      <div className="sm:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation()
            fileInputRef.current?.click()
          }}
          className="w-full py-5 bg-gradient-to-r from-[#253081] to-[#253081]/90 hover:from-[#253081]/90 hover:to-[#253081] text-white  font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Kamera öffnen
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800  p-6">
        <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Tipps für ein gutes Foto
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Stellen Sie sicher, dass der gesamte Kassenbon sichtbar ist
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Fotografieren Sie bei guter Beleuchtung ohne Schatten
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Halten Sie die Kamera gerade und vermeiden Sie Unschärfe
          </li>
        </ul>
      </div>

      {/* Cancel button */}
      <div className="flex justify-center">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </div>
  )
}
