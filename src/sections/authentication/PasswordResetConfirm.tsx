import { PasswordResetConfirm } from './components/PasswordResetConfirm'

export default function PasswordResetConfirmPreview() {
  return (
    <PasswordResetConfirm
      onSubmit={(password) => console.log('New password set:', password.replace(/./g, '*'))}
      onCancel={() => console.log('Password reset cancelled')}
    />
  )
}
