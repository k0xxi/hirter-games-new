// =============================================================================
// Data Types
// =============================================================================

export type AdminRole = 'super-admin' | 'contest-manager'

export type AdminStatus = 'active' | 'inactive' | 'invited'

export type SessionStatus = 'active' | 'expired'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  status: AdminStatus
  lastLogin: string | null
  createdAt: string
  invitedBy: string | null
}

export interface Session {
  id: string
  adminUserId: string
  deviceInfo: string
  ipAddress: string
  loginAt: string
  lastActiveAt: string
  status: SessionStatus
}

// =============================================================================
// Component Props
// =============================================================================

export interface AdminListProps {
  /** The list of admin users to display */
  adminUsers: AdminUser[]
  /** Called when user wants to view an admin's details */
  onView?: (id: string) => void
  /** Called when user wants to edit an admin */
  onEdit?: (id: string) => void
  /** Called when user wants to deactivate an admin */
  onDeactivate?: (id: string) => void
  /** Called when user wants to delete an admin */
  onDelete?: (id: string) => void
  /** Called when user wants to invite a new admin */
  onInvite?: () => void
}

export interface AdminDetailProps {
  /** The admin user to display */
  adminUser: AdminUser
  /** Active sessions for this admin */
  sessions?: Session[]
  /** Called when user saves changes to the admin */
  onSave?: (admin: Partial<AdminUser>) => void
  /** Called when user cancels editing */
  onCancel?: () => void
  /** Called when user wants to terminate a session */
  onTerminateSession?: (sessionId: string) => void
}

export interface AdminInviteProps {
  /** Called when user submits the invitation form */
  onInvite?: (data: { name: string; email: string; role: AdminRole }) => void
  /** Called when user cancels the invitation */
  onCancel?: () => void
}

export interface PasswordChangeProps {
  /** Called when user changes their password */
  onChange?: (currentPassword: string, newPassword: string) => void
  /** Called when user cancels */
  onCancel?: () => void
}
