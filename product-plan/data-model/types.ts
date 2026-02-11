/**
 * Data Model Types for Hirter Gewinnspiele
 *
 * These are the core entity interfaces. In your implementation, you'll need to:
 * - Add database-specific fields (id, created_at, updated_at, etc.)
 * - Implement proper foreign key relationships
 * - Add validation rules and constraints
 */

export type ContestStatus = 'draft' | 'active' | 'ended' | 'archived';

export type AdminRole = 'super_admin' | 'contest_manager' | 'analytics_viewer';

export type ReceiptStatus = 'pending' | 'verified' | 'rejected';

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: ContestStatus;
  rules: string;
  prizes: Prize[];
  termsAndConditions: string;
}

export interface Prize {
  id: string;
  contestId: string;
  title: string;
  description: string;
  value?: string;
  quantity: number;
}

export interface Participant {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: string;
  consent: boolean;
  consentDate?: string; // ISO date string
}

export interface Receipt {
  id: string;
  participantId: string;
  contestId: string;
  imageUrl: string;
  storeName: string;
  purchaseDate: string; // ISO date string
  totalAmount: number;
  products: string; // Comma-separated or JSON string of products
  status: ReceiptStatus;
  submittedAt: string; // ISO date string
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  isActive: boolean;
  invitedAt?: string; // ISO date string
  lastLoginAt?: string; // ISO date string
}

export interface Session {
  id: string;
  adminUserId: string;
  loginAt: string; // ISO date string
  deviceInfo?: string;
  ipAddress?: string;
  isActive: boolean;
}

export interface Winner {
  id: string;
  participantId: string;
  contestId: string;
  prizeId: string;
  selectedAt: string; // ISO date string
  notified: boolean;
  notifiedAt?: string; // ISO date string
}

/**
 * Relationships Summary:
 *
 * - AdminUser.role -> Role (enum)
 * - AdminUser -> Session[] (one-to-many)
 * - Participant <-> Contest (many-to-many via Receipt)
 * - Participant -> Receipt[] (one-to-many)
 * - Receipt.participantId -> Participant (many-to-one)
 * - Receipt.contestId -> Contest (many-to-one)
 * - Winner.participantId -> Participant (many-to-one)
 * - Winner.contestId -> Contest (many-to-one)
 * - Winner.prizeId -> Prize (many-to-one)
 * - Contest -> Prize[] (one-to-many)
 */
