// =============================================================================
// Data Types
// =============================================================================

export interface Receipt {
  id: string
  participantId: string
  contestId: string
  storeName: string
  storeLocation: string
  purchaseDate: string
  totalAmount: number
  products: string
  imageUrl: string
  status: 'pending' | 'verified' | 'rejected'
  submittedAt: string
  verifiedAt: string | null
  ocrConfidence: number
  rejectionReason?: string
}

export interface Participant {
  id: string
  email: string
  name: string
  phone: string | null
  address: string | null
  registeredAt: string
  totalReceipts: number
  totalContests: number
  lastActivityAt: string
}

export interface Winner {
  id: string
  participantId: string
  contestId: string
  prizeId: string
  prizeName: string
  prizeValue: number
  selectionDate: string
  selectionMethod: 'random' | 'manual'
  notificationStatus: 'pending' | 'sent' | 'confirmed'
  notifiedAt: string | null
  confirmedAt: string | null
}

export interface TopStore {
  name: string
  count: number
}

export interface ReceiptTrendData {
  date: string
  count: number
}

export interface DashboardMetrics {
  totalParticipants: number
  totalReceipts: number
  activeContests: number
  totalWinners: number
  receiptsToday: number
  receiptsThisWeek: number
  participantsThisWeek: number
  averageReceiptsPerParticipant: number
  topStores: TopStore[]
  receiptTrend: ReceiptTrendData[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface AnalyticsDashboardProps {
  /** Dashboard metrics and statistics */
  metrics: DashboardMetrics
  /** Called when user wants to view detailed receipts */
  onViewReceipts?: () => void
  /** Called when user wants to view detailed participants */
  onViewParticipants?: () => void
  /** Called when user wants to start winner selection */
  onSelectWinners?: () => void
  /** Called when user wants to filter by contest */
  onFilterByContest?: (contestId: string) => void
}

export interface ReceiptListProps {
  /** The list of receipts to display */
  receipts: Receipt[]
  /** Called when user wants to view a receipt's details */
  onView?: (id: string) => void
  /** Called when user wants to verify a receipt */
  onVerify?: (id: string) => void
  /** Called when user wants to reject a receipt */
  onReject?: (id: string) => void
  /** Called when user searches receipts */
  onSearch?: (query: string) => void
  /** Called when user filters receipts */
  onFilter?: (filters: ReceiptFilters) => void
}

export interface ReceiptFilters {
  status?: 'pending' | 'verified' | 'rejected' | 'all'
  contestId?: string
  storeName?: string
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface ParticipantDetailsProps {
  /** The participant to display */
  participant: Participant
  /** Receipts submitted by this participant */
  receipts: Receipt[]
  /** Prizes won by this participant */
  wins: Winner[]
  /** Called when user wants to view a receipt */
  onViewReceipt?: (receiptId: string) => void
  /** Called when user wants to go back to the list */
  onBack?: () => void
}

export interface WinnerSelectionProps {
  /** Contest ID to select winners for */
  contestId: string
  /** Contest title */
  contestTitle: string
  /** List of eligible participants */
  eligibleParticipants: Participant[]
  /** Already selected winners */
  existingWinners: Winner[]
  /** Prizes available for this contest */
  prizes: Prize[]
  /** Called when user generates random winner suggestions */
  onGenerateWinners?: (prizeId: string, quantity: number) => void
  /** Called when user confirms selected winners */
  onConfirmWinners?: (winners: WinnerSelection[]) => void
  /** Called when user cancels winner selection */
  onCancel?: () => void
}

export interface Prize {
  id: string
  name: string
  description: string
  quantity: number
  value: number
}

export interface WinnerSelection {
  participantId: string
  prizeId: string
  selectionMethod: 'random' | 'manual'
}
