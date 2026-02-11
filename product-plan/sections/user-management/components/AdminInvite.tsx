import { useState } from 'react'
import type { AdminInviteProps, AdminRole } from '../types'
import { UserPlus, Mail, User, Crown, Briefcase, X, Send } from 'lucide-react'

/**
 * Admin Invite component - Form for inviting new admin users
 * Design: Clean, professional form with Hirter branding
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function AdminInvite({ onInvite, onCancel }: AdminInviteProps) {
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [role, setRole] = useState<AdminRole>('contest-manager')
 const [isLoading, setIsLoading] = useState(false)
 const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

 const validateForm = () => {
  const newErrors: { name?: string; email?: string } = {}

  if (!name.trim()) {
   newErrors.name = 'Name ist erforderlich'
  }

  if (!email.trim()) {
   newErrors.email = 'E-Mail ist erforderlich'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   newErrors.email = 'Ungültige E-Mail-Adresse'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsLoading(true)
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  onInvite?.({ name, email, role })
  setIsLoading(false)
 }

 return (
  <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 lg:p-8">
   <div className="max-w-2xl mx-auto">
    {/* Header */}
    <div className="mb-8">
     <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 flex items-center justify-center"
         style={{ background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)' }}>
       <UserPlus className="w-6 h-6 text-white" />
      </div>
      <div>
       <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
        Admin einladen
       </h1>
       <p className="text-stone-600 dark:text-stone-400 mt-1">
        Neuen Benutzer zum Admin-Dashboard hinzufügen
       </p>
      </div>
     </div>
    </div>

    {/* Form card */}
    <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800">
     <form onSubmit={handleSubmit} className="p-6 sm:p-8">
      <div className="space-y-6">
       {/* Name field */}
       <div className="space-y-2">
        <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
         <User className="w-4 h-4 text-stone-500 dark:text-stone-400" />
         Name
        </label>
        <input
         id="name"
         type="text"
         value={name}
         onChange={(e) => {
          setName(e.target.value)
          if (errors.name) setErrors({ ...errors, name: undefined })
         }}
         placeholder="z.B. Thomas Müller"
         className={`w-full px-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 ${
          errors.name
           ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
           : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
         }`}
        />
        {errors.name && (
         <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          {errors.name}
         </p>
        )}
       </div>

       {/* Email field */}
       <div className="space-y-2">
        <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
         <Mail className="w-4 h-4 text-stone-500 dark:text-stone-400" />
         E-Mail-Adresse
        </label>
        <input
         id="email"
         type="email"
         value={email}
         onChange={(e) => {
          setEmail(e.target.value)
          if (errors.email) setErrors({ ...errors, email: undefined })
         }}
         placeholder="thomas.mueller@hirter.at"
         className={`w-full px-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 ${
          errors.email
           ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
           : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
         }`}
        />
        {errors.email && (
         <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          {errors.email}
         </p>
        )}
       </div>

       {/* Role selection */}
       <div className="space-y-3">
        <label className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
         Rolle
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
         <RoleOption
          id="contest-manager"
          value="contest-manager"
          label="Contest Manager"
          description="Kann Contests erstellen und verwalten"
          icon={<Briefcase className="w-5 h-5" />}
          selected={role === 'contest-manager'}
          onSelect={() => setRole('contest-manager')}
         />
         <RoleOption
          id="super-admin"
          value="super-admin"
          label="Super Admin"
          description="Voller Zugriff auf alle Funktionen"
          icon={<Crown className="w-5 h-5" />}
          selected={role === 'super-admin'}
          onSelect={() => setRole('super-admin')}
         />
        </div>
       </div>

       {/* Info box */}
       <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-100 dark:border-blue-900/30 p-4">
        <p className="text-sm text-blue-900 dark:text-blue-300">
         <strong className="font-semibold">Info:</strong> Der eingeladene Benutzer erhält eine E-Mail mit einem Link zum Setzen des Passworts.
        </p>
       </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
       <button
        type="button"
        onClick={() => onCancel?.()}
        className="flex-1 sm:flex-none px-6 py-3 font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-200 flex items-center justify-center gap-2"
       >
        <X className="w-5 h-5" />
        Abbrechen
       </button>
       <button
        type="submit"
        disabled={isLoading}
        className="flex-1 sm:flex-auto px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
        style={{
         background: `linear-gradient(135deg, #253081 0%, #1a2357 100%)`,
        }}
       >
        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <span className="relative flex items-center justify-center gap-2">
         {isLoading ? (
          <>
           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
           Einladung wird gesendet...
          </>
         ) : (
          <>
           <Send className="w-5 h-5" />
           Einladung senden
          </>
         )}
        </span>
       </button>
      </div>
     </form>
    </div>

    {/* Additional info */}
    <div className="mt-6 p-4 bg-stone-100 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800">
     <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2 text-sm">
      Was passiert nach dem Einladen?
     </h3>
     <ul className="space-y-1 text-sm text-stone-600 dark:text-stone-400">
      <li className="flex items-start gap-2">
       <span className="text-[#253081] dark:text-[#D5B376] font-bold">1.</span>
       <span>Der neue Admin erhält eine E-Mail-Einladung</span>
      </li>
      <li className="flex items-start gap-2">
       <span className="text-[#253081] dark:text-[#D5B376] font-bold">2.</span>
       <span>Über den Link in der E-Mail kann das Passwort gesetzt werden</span>
      </li>
      <li className="flex items-start gap-2">
       <span className="text-[#253081] dark:text-[#D5B376] font-bold">3.</span>
       <span>Nach dem Setzen des Passworts kann sich der Admin anmelden</span>
      </li>
     </ul>
    </div>
   </div>
  </div>
 )
}

// Sub-component

interface RoleOptionProps {
 id: string
 value: string
 label: string
 description: string
 icon: React.ReactNode
 selected: boolean
 onSelect: () => void
}

function RoleOption({ id, label, description, icon, selected, onSelect }: RoleOptionProps) {
 return (
  <label
   htmlFor={id}
   className={`relative flex items-start gap-3 p-4 border-2 cursor-pointer transition-all duration-200 ${
    selected
     ? 'border-[#253081] dark:border-[#D5B376] bg-[#253081]/5 dark:bg-[#D5B376]/5'
     : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 bg-white dark:bg-stone-800'
   }`}
  >
   <input
    type="radio"
    id={id}
    name="role"
    checked={selected}
    onChange={onSelect}
    className="sr-only"
   />
   <div className={`mt-0.5 flex-shrink-0 ${selected ? 'text-[#253081] dark:text-[#D5B376]' : 'text-stone-400 dark:text-stone-500'}`}>
    {icon}
   </div>
   <div className="flex-1 min-w-0">
    <p className={`font-bold mb-0.5 ${selected ? 'text-[#253081] dark:text-[#D5B376]' : 'text-stone-900 dark:text-stone-100'}`}>
     {label}
    </p>
    <p className="text-sm text-stone-600 dark:text-stone-400">
     {description}
    </p>
   </div>
   {selected && (
    <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
       style={{ background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)' }}>
     <div className="w-2 h-2 bg-white rounded-full" />
    </div>
   )}
  </label>
 )
}
