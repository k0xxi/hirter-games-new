import { PasswordChange } from './components/PasswordChange'

export default function PasswordChangePreview() {
  return (
    <PasswordChange
      onChange={(currentPassword, newPassword) =>
        console.log('Change password:', currentPassword.replace(/./g, '*'), '->', newPassword.replace(/./g, '*'))
      }
      onCancel={() => console.log('Password change cancelled')}
    />
  )
}
