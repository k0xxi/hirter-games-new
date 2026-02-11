// =============================================================================
// Data Types
// =============================================================================

export interface Contest {
  id: string
  title: string
  description: string
  prize: string
  startDate: string
  endDate: string
  status: 'active' | 'upcoming' | 'ended'
  rules: string[]
  receiptRequirements: string[]
  qualifyingProducts: string[]
}

export interface Product {
  id: string
  name: string
  quantity: number
  pricePerUnit: number
  totalPrice: number
  qualifies: boolean
}

export interface Receipt {
  id: string
  contestId: string
  status: 'uploading' | 'processing' | 'review' | 'submitted' | 'error'
  processingStage?: 'reading' | 'extracting' | 'verifying'
  storeName?: string
  purchaseDate?: string
  total?: number
  uploadedAt: string
  submittedAt?: string
  imageUrl: string
  products?: Product[]
  errorType?: 'invalid_image' | 'non_qualifying' | 'duplicate'
  errorMessage?: string
  confirmationNumber?: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ContestParticipationProps {
  /** The contest being entered */
  contest: Contest
  /** The current receipt being processed (if any) */
  currentReceipt?: Receipt
  /** Previous receipts submitted by this user */
  previousReceipts?: Receipt[]
  /** Called when user uploads a receipt image */
  onUploadReceipt?: (file: File) => void
  /** Called when user edits store details during review */
  onEditStoreDetails?: (receiptId: string, details: { storeName: string; purchaseDate: string; total: number }) => void
  /** Called when user adds a product during review */
  onAddProduct?: (receiptId: string, product: Omit<Product, 'id'>) => void
  /** Called when user edits a product during review */
  onEditProduct?: (receiptId: string, productId: string, updates: Partial<Product>) => void
  /** Called when user removes a product during review */
  onRemoveProduct?: (receiptId: string, productId: string) => void
  /** Called when user submits the verified receipt */
  onSubmitReceipt?: (receiptId: string) => void
  /** Called when user wants to retry after an error */
  onRetry?: (receiptId: string) => void
  /** Called when user cancels the current upload/review */
  onCancel?: () => void
}
