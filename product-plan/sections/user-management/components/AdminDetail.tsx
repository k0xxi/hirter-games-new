import { useState } from 'react'
import type { AdminDetailProps, AdminRole, Session } from '../types'
import { User, Mail, Shield, Calendar, Monitor, MapPin, Clock, Save, X, Trash2, Crown, Briefcase, Circle } from 'lucide-react'

/**
 * Admin Detail component - View and edit admin user details with session management
 * Design: Professional data-display with inline editing capability
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function AdminDetail({ adminUser, sessions = [], onSave, onCancel, onTerminateSession }: AdminDetailProps) {
 const [isEditing, setIsEditing] = useState(false)
 const [name, setName] = useState(adminUser.name)
 const [email, setEmail] = useState(adminUser.email)
 const [role, setRole] = useState<AdminRole>(adminUser.role)
 const [isSaving, setIsSaving] = useState(false)

 const handleSave = async () => {
  setIsSaving(true)
  await new Promise(resolve => setTimeout(resolve, 800))
  onSave?.({ name, email, role })
  setIsSaving(false)
  setIsEditing(false)
 }

 const handleCancel = () => {
  setName(adminUser.name)
  setEmail(adminUser.email)
  setRole(adminUser.role)
  setIsEditing(false)
  onCancel?.()
 }

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

 const activeSessions = sessions.filter(s => s.status === 'active')
 const expiredSessions = sessions.filter(s => s.status === 'expired')

 return (
  <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 lg:p-8">
   <div className="max-w-4xl mx-auto">
    {/* Header */}
    <div className="mb-6">
     <div className="flex items-center gap-3 mb-2">
      <div className="w-12 h-12 font-bold flex items-center justify-center text-white text-lg"
         style={{ background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)' }}>
       {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
      </div>
      <div>
       <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
        {adminUser.name}
       </h1>
       <div className="flex flex-wrap items-center gap-2 mt-1">
        <StatusBadge status={adminUser.status} />
        <RoleBadge role={adminUser.role} />
       </div>
      </div>
     </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     {/* Main content - Left side */}
     <div className="lg:col-span-2 space-y-6">
      {/* Details card */}
      <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800">
       <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
         Benutzer-Details
        </h2>
        {!isEditing && (
         <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 font-medium text-sm transition-all duration-200"
          style={{ color: '#253081' }}
         >
          Bearbeiten
         </button>
        )}
       </div>

       <div className="p-6 space-y-6">
        {/* Name field */}
        <div className="space-y-2">
         <label className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400">
          <User className="w-4 h-4" />
          Name
         </label>
         {isEditing ? (
          <input
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="w-full px-4 py-2.5 border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:border-[#253081] dark:focus:border-[#D5B376] focus:outline-none focus:ring-4 focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10 transition-all"
          />
         ) : (
          <p className="text-stone-900 dark:text-stone-100 font-medium">
           {adminUser.name}
          </p>
         )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
         <label className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400">
          <Mail className="w-4 h-4" />
          E-Mail-Adresse
         </label>
         {isEditing ? (
          <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className="w-full px-4 py-2.5 border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:border-[#253081] dark:focus:border-[#D5B376] focus:outline-none focus:ring-4 focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10 transition-all"
          />
         ) : (
          <p className="text-stone-900 dark:text-stone-100 font-medium">
           {adminUser.email}
          </p>
         )}
        </div>

        {/* Role field */}
        <div className="space-y-2">
         <label className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400">
          <Shield className="w-4 h-4" />
          Rolle
         </label>
         {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
           <RoleOption
            label="Contest Manager"
            icon={<Briefcase className="w-4 h-4" />}
            selected={role === 'contest-manager'}
            onSelect={() => setRole('contest-manager')}
           />
           <RoleOption
            label="Super Admin"
            icon={<Crown className="w-4 h-4" />}
            selected={role === 'super-admin'}
            onSelect={() => setRole('super-admin')}
           />
          </div>
         ) : (
          <div>
           <RoleBadge role={adminUser.role} />
          </div>
         )}
        </div>

        {/* Action buttons (only shown when editing) */}
        {isEditing && (
         <div className="flex gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
           onClick={handleCancel}
           className="flex-1 px-4 py-2.5 font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
           <X className="w-4 h-4" />
           Abbrechen
          </button>
          <button
           onClick={handleSave}
           disabled={isSaving}
           className="flex-1 px-4 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
           style={{ background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)' }}
          >
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
           <span className="relative flex items-center justify-center gap-2">
            {isSaving ? (
             <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Speichern...
             </>
            ) : (
             <>
              <Save className="w-4 h-4" />
              Speichern
             </>
            )}
           </span>
          </button>
         </div>
        )}
       </div>
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
       <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800">
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800">
         <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          Aktive Sitzungen ({activeSessions.length})
         </h2>
        </div>
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
         {activeSessions.map((session) => (
          <SessionCard
           key={session.id}
           session={session}
           formatDate={formatDate}
           onTerminate={() => onTerminateSession?.(session.id)}
          />
         ))}
        </div>
       </div>
      )}

      {/* Expired Sessions */}
      {expiredSessions.length > 0 && (
       <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800 opacity-60">
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800">
         <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          Abgelaufene Sitzungen ({expiredSessions.length})
         </h2>
        </div>
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
         {expiredSessions.slice(0, 3).map((session) => (
          <SessionCard
           key={session.id}
           session={session}
           formatDate={formatDate}
           isExpired
          />
         ))}
        </div>
       </div>
      )}
     </div>

     {/* Sidebar - Right side */}
     <div className="space-y-6">
      {/* Metadata card */}
      <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800 p-6">
       <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">Metadata</h3>
       <div className="space-y-4">
        <div>
         <p className="text-xs text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Erstellt am
         </p>
         <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
          {formatDate(adminUser.createdAt)}
         </p>
        </div>
        <div>
         <p className="text-xs text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Letzter Login
         </p>
         <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
          {formatDate(adminUser.lastLogin)}
         </p>
        </div>
        {adminUser.invitedBy && (
         <div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">
           Eingeladen von
          </p>
          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
           Admin ID: {adminUser.invitedBy}
          </p>
         </div>
        )}
       </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800 p-6">
       <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">Schnellaktionen</h3>
       <div className="space-y-2">
        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
         Passwort zurücksetzen
        </button>
        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
         Einladung erneut senden
        </button>
        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
         Benutzer deaktivieren
        </button>
        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
         Benutzer löschen
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

// Sub-components

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
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${config.color}`}>
   <Circle className={`w-2 h-2 ${config.dotColor} rounded-full`} fill="currentColor" />
   {config.label}
  </span>
 )
}

function RoleBadge({ role }: { role: string }) {
 const isSuperAdmin = role === 'super-admin'

 return (
  <span
   className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
    isSuperAdmin
     ? 'bg-gradient-to-r from-[#253081] to-[#1a2357] text-white'
     : 'bg-[#D5B376]/10 text-[#D5B376] dark:bg-[#D5B376]/20 border-2 border-[#D5B376]/30'
   }`}
  >
   {isSuperAdmin ? <Crown className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
   {isSuperAdmin ? 'Super Admin' : 'Contest Manager'}
  </span>
 )
}

interface RoleOptionProps {
 label: string
 icon: React.ReactNode
 selected: boolean
 onSelect: () => void
}

function RoleOption({ label, icon, selected, onSelect }: RoleOptionProps) {
 return (
  <button
   type="button"
   onClick={onSelect}
   className={`flex items-center gap-2 px-4 py-2.5 border-2 transition-all ${
    selected
     ? 'border-[#253081] dark:border-[#D5B376] bg-[#253081]/5 dark:bg-[#D5B376]/5 text-[#253081] dark:text-[#D5B376]'
     : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300'
   }`}
  >
   {icon}
   <span className="font-medium text-sm">{label}</span>
  </button>
 )
}

interface SessionCardProps {
 session: Session
 formatDate: (date: string) => string
 onTerminate?: () => void
 isExpired?: boolean
}

function SessionCard({ session, formatDate, onTerminate, isExpired }: SessionCardProps) {
 return (
  <div className="p-6">
   <div className="flex items-start justify-between gap-4">
    <div className="flex-1 min-w-0">
     <div className="flex items-center gap-2 mb-2">
      <Monitor className="w-4 h-4 text-stone-500 dark:text-stone-400 flex-shrink-0" />
      <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
       {session.deviceInfo}
      </p>
     </div>
     <div className="space-y-1 text-sm text-stone-600 dark:text-stone-400">
      <p className="flex items-center gap-1.5">
       <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
       {session.ipAddress}
      </p>
      <p className="flex items-center gap-1.5">
       <Clock className="w-3.5 h-3.5 flex-shrink-0" />
       Login: {formatDate(session.loginAt)}
      </p>
      <p className="flex items-center gap-1.5">
       <Clock className="w-3.5 h-3.5 flex-shrink-0" />
       Zuletzt aktiv: {formatDate(session.lastActiveAt)}
      </p>
     </div>
    </div>
    {!isExpired && onTerminate && (
     <button
      onClick={onTerminate}
      className="flex-shrink-0 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      title="Sitzung beenden"
     >
      <Trash2 className="w-4 h-4" />
     </button>
    )}
   </div>
  </div>
 )
}
