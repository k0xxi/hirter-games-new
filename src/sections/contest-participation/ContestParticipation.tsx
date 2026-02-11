import data from '@/../product/sections/contest-participation/data.json'
import { ContestParticipationWizard } from './components/ContestParticipationWizard'

/**
 * Preview wrapper for Contest Participation section
 * This renders the wizard with sample data for Design OS
 */
export default function ContestParticipationPreview() {
  // Use the receipt in "review" state by default to show the most interesting UI
  // You can change this to show different states:
  // - receipts[0] for "processing" state
  // - receipts[1] for "review" state (default)
  // - receipts[2] for "submitted" state
  // - receipts[3], [4], [5] for various error states
  const currentReceipt = data.receipts[1] as any

  // Get all previous receipts except the current one
  const previousReceipts = data.receipts.filter((r) => r.id !== currentReceipt.id) as any[]

  return (
    <ContestParticipationWizard
      contest={data.contest as any}
      currentReceipt={currentReceipt}
      previousReceipts={previousReceipts}
      onUploadReceipt={(file) => console.log('Upload receipt:', file.name)}
      onEditStoreDetails={(receiptId, details) =>
        console.log('Edit store details:', receiptId, details)
      }
      onAddProduct={(receiptId, product) => console.log('Add product:', receiptId, product)}
      onEditProduct={(receiptId, productId, updates) =>
        console.log('Edit product:', receiptId, productId, updates)
      }
      onRemoveProduct={(receiptId, productId) =>
        console.log('Remove product:', receiptId, productId)
      }
      onSubmitReceipt={(receiptId) => console.log('Submit receipt:', receiptId)}
      onRetry={(receiptId) => console.log('Retry:', receiptId)}
      onCancel={() => console.log('Cancel')}
    />
  )
}
