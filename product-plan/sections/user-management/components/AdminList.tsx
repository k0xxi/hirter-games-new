import { useState, useMemo } from 'react'
import type { AdminListProps, AdminUser } from '../types'
import { Search, UserPlus, Eye, Edit, Ban, Trash2, Crown, Briefcase, Circle } from 'lucide-react'

/**
 * Admin List component - Data-dense dashboard for managing admin users
 * Design: Refined, professional with craft touches
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function AdminList({
 adminUsers,
 onView,
 onEdit,
 onDeactivate,
 onDelete,
 onInvite,
}: AdminListProps) {
 const [searchQuery, setSearchQuery] = useState('')

 // Filter admins based on search query
 const filteredAdmins = useMemo(() => {
  if (!searchQuery.trim()) return adminUsers

  const query = searchQuery.toLowerCase()
  return adminUsers.filter(
   (admin) =>
    admin.name.toLowerCase().includes(query) ||
    admin.email.toLowerCase().includes(query) ||
    admin.role.toLowerCase().includes(query) ||
    admin.status.toLowerCase().includes(query)
  )
 }, [adminUsers, searchQuery])

 // Format date
 const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Nie'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-AT', {
   day: '2-digit',
   month: 'short',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
  }).format(date)
 }

 return (
  <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 lg:p-8">
   <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="mb-8">
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
       <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tight">
        Admin-Benutzer
       </h1>
       <p className="text-stone-600 dark:text-stone-400">
        {adminUsers.length} {adminUsers.length === 1 ? 'Benutzer' : 'Benutzer'} · {filteredAdmins.length} angezeigt
       </p>
      </div>

      {/* Invite button */}
      <button
       onClick={() => onInvite?.()}
       className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
       style={{
        background: `linear-gradient(135deg, #253081 0%, #1a2357 100%)`,
       }}
      >
       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
       <UserPlus className="w-5 h-5 relative z-10" />
       <span className="relative z-10">Admin einladen</span>
      </button>
     </div>

     {/* Search bar */}
     <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
      <input
       type="text"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       placeholder="Suche nach Name, E-Mail, Rolle oder Status..."
       className="w-full pl-12 pr-4 py-3.5 border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-[#253081] dark:focus:border-[#D5B376] focus:outline-none focus:ring-4 focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10 transition-all duration-200"
      />
     </div>
    </div>

    {/* Admin list - Desktop table view */}
    <div className="hidden lg:block bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800 overflow-hidden">
     <div className="overflow-x-auto">
      <table className="w-full">
       <thead>
        <tr className="border-b border-stone-200 dark:border-stone-800"
          style={{ background: 'linear-gradient(to bottom, rgba(37, 48, 129, 0.02), transparent)' }}>
         <th className="text-left px-6 py-4 text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          Benutzer
         </th>
         <th className="text-left px-6 py-4 text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          Rolle
         </th>
         <th className="text-left px-6 py-4 text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          Status
         </th>
         <th className="text-left px-6 py-4 text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          Letzter Login
         </th>
         <th className="text-right px-6 py-4 text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          Aktionen
         </th>
        </tr>
       </thead>
       <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
        {filteredAdmins.length === 0 ? (
         <tr>
          <td colSpan={5} className="px-6 py-12 text-center">
           <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
             <Search className="w-8 h-8 text-stone-400 dark:text-stone-600" />
            </div>
            <p className="text-stone-500 dark:text-stone-400 font-medium">
             Keine Benutzer gefunden
            </p>
            <p className="text-sm text-stone-400 dark:text-stone-500">
             Versuche einen anderen Suchbegriff
            </p>
           </div>
          </td>
         </tr>
        ) : (
         filteredAdmins.map((admin, index) => (
          <tr
           key={admin.id}
           className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors duration-150"
           style={{ animationDelay: `${index * 30}ms` }}
          >
           <td className="px-6 py-4">
            <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white text-sm"
                style={{ background: `linear-gradient(135deg, #253081 0%, #1a2357 100%)` }}>
              {admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
             </div>
             <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
               {admin.name}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
               {admin.email}
              </p>
             </div>
            </div>
           </td>
           <td className="px-6 py-4">
            <RoleBadge role={admin.role} />
           </td>
           <td className="px-6 py-4">
            <StatusBadge status={admin.status} />
           </td>
           <td className="px-6 py-4">
            <span className="text-sm text-stone-600 dark:text-stone-400">
             {formatDate(admin.lastLogin)}
            </span>
           </td>
           <td className="px-6 py-4">
            <div className="flex items-center justify-end gap-1">
             <ActionButton
              icon={<Eye className="w-4 h-4" />}
              label="Ansehen"
              onClick={() => onView?.(admin.id)}
             />
             <ActionButton
              icon={<Edit className="w-4 h-4" />}
              label="Bearbeiten"
              onClick={() => onEdit?.(admin.id)}
             />
             {admin.status === 'active' && (
              <ActionButton
               icon={<Ban className="w-4 h-4" />}
               label="Deaktivieren"
               onClick={() => onDeactivate?.(admin.id)}
               variant="warning"
              />
             )}
             <ActionButton
              icon={<Trash2 className="w-4 h-4" />}
              label="Löschen"
              onClick={() => onDelete?.(admin.id)}
              variant="danger"
             />
            </div>
           </td>
          </tr>
         ))
        )}
       </tbody>
      </table>
     </div>
    </div>

    {/* Admin list - Mobile card view */}
    <div className="lg:hidden space-y-4">
     {filteredAdmins.length === 0 ? (
      <div className="bg-white dark:bg-stone-900 shadow-xl p-12 text-center border-2 border-stone-200 dark:border-stone-800">
       <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
         <Search className="w-8 h-8 text-stone-400 dark:text-stone-600" />
        </div>
        <p className="text-stone-500 dark:text-stone-400 font-medium">
         Keine Benutzer gefunden
        </p>
        <p className="text-sm text-stone-400 dark:text-stone-500">
         Versuche einen anderen Suchbegriff
        </p>
       </div>
      </div>
     ) : (
      filteredAdmins.map((admin) => (
       <div
        key={admin.id}
        className="bg-white dark:bg-stone-900 shadow-xl border-2 border-stone-200 dark:border-stone-800 p-6 hover:shadow-2xl transition-all duration-200"
       >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
         <div className="w-12 h-12 rounded-full font-bold flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, #253081 0%, #1a2357 100%)` }}>
          {admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
         </div>
         <div className="flex-1 min-w-0">
          <p className="font-bold text-stone-900 dark:text-stone-100 truncate">
           {admin.name}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 truncate">
           {admin.email}
          </p>
         </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
         <RoleBadge role={admin.role} />
         <StatusBadge status={admin.status} />
        </div>

        {/* Last login */}
        <div className="mb-4 pb-4 border-b border-stone-100 dark:border-stone-800">
         <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Letzter Login</p>
         <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
          {formatDate(admin.lastLogin)}
         </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
         <button
          onClick={() => onView?.(admin.id)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-stone-200 dark:border-stone-700 hover:border-[#253081] dark:hover:border-[#D5B376] text-stone-700 dark:text-stone-300 hover:text-[#253081] dark:hover:text-[#D5B376] font-medium transition-all"
         >
          <Eye className="w-4 h-4" />
          <span className="text-sm">Ansehen</span>
         </button>
         <button
          onClick={() => onEdit?.(admin.id)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-stone-200 dark:border-stone-700 hover:border-[#253081] dark:hover:border-[#D5B376] text-stone-700 dark:text-stone-300 hover:text-[#253081] dark:hover:text-[#D5B376] font-medium transition-all"
         >
          <Edit className="w-4 h-4" />
          <span className="text-sm">Bearbeiten</span>
         </button>
         {admin.status === 'active' && (
          <button
           onClick={() => onDeactivate?.(admin.id)}
           className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-600 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium transition-all"
          >
           <Ban className="w-4 h-4" />
           <span className="text-sm">Deaktivieren</span>
          </button>
         )}
         <button
          onClick={() => onDelete?.(admin.id)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-red-200 dark:border-red-900 hover:border-red-500 dark:hover:border-red-700 text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium transition-all"
         >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Löschen</span>
         </button>
        </div>
       </div>
      ))
     )}
    </div>
   </div>
  </div>
 )
}

// Sub-components

function RoleBadge({ role }: { role: string }) {
 const isSuperAdmin = role === 'super-admin'

 return (
  <span
   className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
    isSuperAdmin
     ? 'bg-gradient-to-r from-[#253081] to-[#1a2357] text-white'
     : 'bg-[#D5B376]/10 text-[#D5B376] dark:bg-[#D5B376]/20 border-2 border-[#D5B376]/30'
   }`}
  >
   {isSuperAdmin ? <Crown className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
   {isSuperAdmin ? 'Super Admin' : 'Contest Manager'}
  </span>
 )
}

function StatusBadge({ status }: { status: string }) {
 const config = {
  active: {
   label: 'Aktiv',
   color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
   dotColor: 'bg-emerald-500',
  },
  inactive: {
   label: 'Inaktiv',
   color: 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700',
   dotColor: 'bg-stone-400',
  },
  invited: {
   label: 'Eingeladen',
   color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
   dotColor: 'bg-blue-500',
  },
 }[status] || config.inactive

 return (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.color}`}>
   <Circle className={`w-2 h-2 ${config.dotColor} rounded-full`} fill="currentColor" />
   {config.label}
  </span>
 )
}

interface ActionButtonProps {
 icon: React.ReactNode
 label: string
 onClick: () => void
 variant?: 'default' | 'warning' | 'danger'
}

function ActionButton({ icon, label, onClick, variant = 'default' }: ActionButtonProps) {
 const colorClasses = {
  default: 'text-stone-600 dark:text-stone-400 hover:text-[#253081] dark:hover:text-[#D5B376] hover:bg-stone-100 dark:hover:bg-stone-800',
  warning: 'text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20',
  danger: 'text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
 }[variant]

 return (
  <button
   onClick={onClick}
   className={`p-2 transition-all duration-150 ${colorClasses}`}
   title={label}
   aria-label={label}
  >
   {icon}
  </button>
 )
}
