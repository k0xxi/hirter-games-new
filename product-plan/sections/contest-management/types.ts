// =============================================================================
// Data Types
// =============================================================================

export interface Prize {
  name: string
  description: string
  quantity: number
  value: number
}

export interface Contest {
  id: string
  title: string
  status: 'draft' | 'active' | 'ended' | 'archived'
  startDate: string
  endDate: string
  description: string
  rules: string
  prizes: Prize[]
  terms: string
  participantCount: number
  receiptCount: number
  createdAt: string
  updatedAt: string
  isTemplate: boolean
  templateCategory?: 'system' | 'custom'
  templateName?: string
}

export interface Address {
  street: string
  city: string
  postalCode: string
  country: string
}

export interface Participant {
  id: string
  contestId: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  address: Address
  submittedAt: string
  entryCount: number
  consentGiven: boolean
  consentTimestamp: string
}

export interface Product {
  name: string
  quantity: number
  price: number
}

export interface ExtractedData {
  storeName: string
  storeAddress: string
  purchaseDate: string
  total: number
  products: Product[]
}

export interface Receipt {
  id: string
  participantId: string
  contestId: string
  imageUrl: string
  uploadedAt: string
  status: 'pending' | 'verified' | 'rejected'
  extractedData: ExtractedData
  verifiedAt: string | null
}

export interface Consent {
  id: string
  participantId: string
  contestId: string
  consentType: 'participation' | 'marketing' | 'data_storage'
  consentText: string
  consentGiven: boolean
  consentTimestamp: string
  ipAddress: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ContestManagementProps {
  /** The list of contests to display (excludes templates) */
  contests: Contest[]
  /** The list of available templates (system and custom) */
  templates?: Contest[]
  /** Called when user wants to view a contest's details */
  onView?: (id: string) => void
  /** Called when user wants to edit a contest */
  onEdit?: (id: string) => void
  /** Called when user wants to delete a contest */
  onDelete?: (id: string) => void
  /** Called when user wants to duplicate a contest */
  onDuplicate?: (id: string) => void
  /** Called when user wants to save a contest as a template */
  onSaveAsTemplate?: (id: string) => void
  /** Called when user wants to create a new contest from a template */
  onUseTemplate?: (templateId: string) => void
  /** Called when user wants to create a new contest from scratch */
  onCreate?: () => void
  /** Called when user wants to view participants for a contest */
  onViewParticipants?: (contestId: string) => void
}

export interface ContestWizardProps {
  /** Initial data if editing or using a template */
  initialData?: Partial<Contest>
  /** Current step in the wizard (0-indexed) */
  currentStep: number
  /** Called when user completes the wizard */
  onComplete?: (contest: Omit<Contest, 'id' | 'createdAt' | 'updatedAt'>) => void
  /** Called when user cancels the wizard */
  onCancel?: () => void
  /** Called when user navigates to a different step */
  onStepChange?: (step: number) => void
}

export interface ContestDetailsProps {
  /** The contest to display */
  contest: Contest
  /** Called when user wants to edit the contest */
  onEdit?: () => void
  /** Called when user wants to delete the contest */
  onDelete?: () => void
  /** Called when user wants to duplicate the contest */
  onDuplicate?: () => void
  /** Called when user wants to save as template */
  onSaveAsTemplate?: () => void
  /** Called when user wants to go back to the list */
  onBack?: () => void
  /** Called when user wants to view participants */
  onViewParticipants?: () => void
}

export interface ParticipantListProps {
  /** The contest these participants belong to */
  contest: Contest
  /** The list of participants to display */
  participants: Participant[]
  /** The list of consents for filtering/display */
  consents: Consent[]
  /** Called when user wants to view a participant's details */
  onViewDetails?: (participantId: string) => void
  /** Called when user wants to go back to contest details */
  onBack?: () => void
  /** Called when user wants to export participant data */
  onExport?: () => void
}

export interface ParticipantDetailsProps {
  /** The participant to display */
  participant: Participant
  /** The contest this participant belongs to */
  contest: Contest
  /** The receipts uploaded by this participant */
  receipts: Receipt[]
  /** The consents given by this participant */
  consents: Consent[]
  /** Called when user wants to view a receipt image */
  onViewReceipt?: (receiptId: string) => void
  /** Called when user wants to go back to participant list */
  onBack?: () => void
  /** Called when user wants to contact the participant */
  onContact?: () => void
}
