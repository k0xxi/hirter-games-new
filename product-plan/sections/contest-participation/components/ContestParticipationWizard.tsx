import { useState } from 'react'
import type { ContestParticipationProps } from '../types'
import { ContestInfoStep } from './ContestInfoStep'
import { UploadStep } from './UploadStep'
import { ProcessingStep } from './ProcessingStep'
import { ReviewStep } from './ReviewStep'
import { SuccessStep } from './SuccessStep'
import { ErrorStep } from './ErrorStep'
import { WizardProgress } from './WizardProgress'

/**
 * Complete wizard for contest participation
 * Handles all steps from contest info to final confirmation
 */
export function ContestParticipationWizard({
  contest,
  currentReceipt,
  previousReceipts,
  onUploadReceipt,
  onEditStoreDetails,
  onAddProduct,
  onEditProduct,
  onRemoveProduct,
  onSubmitReceipt,
  onRetry,
  onCancel,
}: ContestParticipationProps) {
  // Determine current step based on receipt status
  const getCurrentStep = () => {
    if (!currentReceipt) return 'info'

    if (currentReceipt.status === 'error') return 'error'
    if (currentReceipt.status === 'submitted') return 'success'
    if (currentReceipt.status === 'review') return 'review'
    if (currentReceipt.status === 'processing') return 'processing'
    if (currentReceipt.status === 'uploading') return 'upload'

    return 'info'
  }

  const [step, setStep] = useState<'info' | 'upload' | 'processing' | 'review' | 'success' | 'error'>(getCurrentStep())

  const handleStartUpload = () => {
    setStep('upload')
  }

  const handleCancel = () => {
    setStep('info')
    onCancel?.()
  }

  const handleRetry = () => {
    if (currentReceipt) {
      onRetry?.(currentReceipt.id)
    }
    setStep('upload')
  }

  const handleNewEntry = () => {
    setStep('info')
  }

  // Determine step number for progress indicator
  const getStepNumber = () => {
    if (step === 'info') return 1
    if (step === 'upload') return 2
    if (step === 'processing') return 3
    if (step === 'review') return 4
    if (step === 'success' || step === 'error') return 5
    return 1
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Progress indicator - only show when past info step and not on error/success */}
      {step !== 'info' && step !== 'error' && step !== 'success' && (
        <WizardProgress currentStep={getStepNumber()} totalSteps={5} />
      )}

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {step === 'info' && (
          <ContestInfoStep
            contest={contest}
            previousReceipts={previousReceipts}
            onStart={handleStartUpload}
          />
        )}

        {step === 'upload' && (
          <UploadStep
            onUpload={onUploadReceipt}
            onCancel={handleCancel}
          />
        )}

        {step === 'processing' && currentReceipt && (
          <ProcessingStep
            processingStage={currentReceipt.processingStage || 'reading'}
          />
        )}

        {step === 'review' && currentReceipt && (
          <ReviewStep
            receipt={currentReceipt}
            contest={contest}
            onEditStoreDetails={(details) => onEditStoreDetails?.(currentReceipt.id, details)}
            onAddProduct={(product) => onAddProduct?.(currentReceipt.id, product)}
            onEditProduct={(productId, updates) => onEditProduct?.(currentReceipt.id, productId, updates)}
            onRemoveProduct={(productId) => onRemoveProduct?.(currentReceipt.id, productId)}
            onSubmit={() => onSubmitReceipt?.(currentReceipt.id)}
            onCancel={handleCancel}
          />
        )}

        {step === 'success' && currentReceipt && (
          <SuccessStep
            confirmationNumber={currentReceipt.confirmationNumber || ''}
            contest={contest}
            onNewEntry={handleNewEntry}
          />
        )}

        {step === 'error' && currentReceipt && (
          <ErrorStep
            errorType={currentReceipt.errorType || 'invalid_image'}
            errorMessage={currentReceipt.errorMessage || ''}
            onRetry={handleRetry}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
