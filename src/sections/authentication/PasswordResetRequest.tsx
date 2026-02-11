import { PasswordResetRequest } from './components/PasswordResetRequest'

export default function PasswordResetRequestPreview() {
  return (
    <PasswordResetRequest
      onSubmit={(email) => console.log('Password reset requested for:', email)}
      onCancel={() => console.log('Password reset cancelled')}
    />
  )
}
