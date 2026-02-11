import { AdminInvite } from './components/AdminInvite'

export default function AdminInvitePreview() {
  return (
    <AdminInvite
      onInvite={(data) => console.log('Invite admin:', data)}
      onCancel={() => console.log('Invite cancelled')}
    />
  )
}
