import data from '@/../product/sections/user-management/data.json'
import { AdminDetail } from './components/AdminDetail'

export default function AdminDetailPreview() {
  // Use first admin user for preview
  const adminUser = data.adminUsers[0]
  // Get sessions for this admin
  const sessions = data.sessions.filter(s => s.adminUserId === adminUser.id)

  return (
    <AdminDetail
      adminUser={adminUser}
      sessions={sessions}
      onSave={(admin) => console.log('Save admin:', admin)}
      onCancel={() => console.log('Cancel edit')}
      onTerminateSession={(sessionId) => console.log('Terminate session:', sessionId)}
    />
  )
}
