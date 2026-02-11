// =============================================================================
// Component Props
// =============================================================================

export interface LoginProps {
  /** Called when user submits login credentials */
  onLogin?: (email: string, password: string) => void
  /** Called when user clicks "Forgot password" */
  onForgotPassword?: () => void
}

export interface PasswordResetRequestProps {
  /** Called when user submits their email for password reset */
  onSubmit?: (email: string) => void
  /** Called when user cancels */
  onCancel?: () => void
}

export interface PasswordResetConfirmProps {
  /** Called when user sets their new password */
  onSubmit?: (password: string) => void
  /** Called when user cancels */
  onCancel?: () => void
}
