import data from '@/../product/sections/user-management/data.json'
import { AdminList } from './components/AdminList'

export default function AdminListPreview() {
  return (
    <AdminList
      adminUsers={data.adminUsers}
      onView={(id) => console.log('View admin:', id)}
      onEdit={(id) => console.log('Edit admin:', id)}
      onDeactivate={(id) => console.log('Deactivate admin:', id)}
      onDelete={(id) => console.log('Delete admin:', id)}
      onInvite={() => console.log('Invite new admin')}
    />
  )
}
