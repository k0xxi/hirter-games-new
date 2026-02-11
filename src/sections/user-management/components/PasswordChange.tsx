import { useState } from 'react'
import type { PasswordChangeProps } from '@/../product/sections/user-management/types'
import { Lock, Eye, EyeOff, Save, X, Check, AlertCircle, Shield } from 'lucide-react'

/**
 * Password Change component - Form for logged-in admins to change their password
 * Design: Clean, security-focused form with password strength indicator
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function PasswordChange({ onChange, onCancel }: PasswordChangeProps) {
 const [currentPassword, setCurrentPassword] = useState('')
 const [newPassword, setNewPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [showCurrentPassword, setShowCurrentPassword] = useState(false)
 const [showNewPassword, setShowNewPassword] = useState(false)
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const [isLoading, setIsLoading] = useState(false)
 const [errors, setErrors] = useState<{
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
 }>({})

 // Password strength calculation
 const getPasswordStrength = (password: string) => {
  if (!password) return { score: 0, label: '', color: '' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  const strength = {
   0: { label: 'Sehr schwach', color: 'bg-red-500' },
   1: { label: 'Schwach', color: 'bg-red-500' },
   2: { label: 'Mittel', color: 'bg-amber-500' },
   3: { label: 'Gut', color: 'bg-lime-500' },
   4: { label: 'Sehr gut', color: 'bg-emerald-500' },
   5: { label: 'Ausgezeichnet', color: 'bg-emerald-600' },
  }[Math.min(score, 5)] || { label: '', color: '' }

  return { score, ...strength }
 }

 const passwordStrength = getPasswordStrength(newPassword)

 const validateForm = () => {
  const newErrors: typeof errors = {}

  if (!currentPassword) {
   newErrors.currentPassword = 'Aktuelles Passwort ist erforderlich'
  }

  if (!newPassword) {
   newErrors.newPassword = 'Neues Passwort ist erforderlich'
  } else if (newPassword.length < 8) {
   newErrors.newPassword = 'Passwort muss mindestens 8 Zeichen lang sein'
  } else if (newPassword === currentPassword) {
   newErrors.newPassword = 'Neues Passwort muss sich vom aktuellen unterscheiden'
  }

  if (!confirmPassword) {
   newErrors.confirmPassword = 'Passwort-Bestätigung ist erforderlich'
  } else if (confirmPassword !== newPassword) {
   newErrors.confirmPassword = 'Passwörter stimmen nicht überein'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsLoading(true)
  await new Promise(resolve => setTimeout(resolve, 1000))
  onChange?.(currentPassword, newPassword)
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
       <Shield className="w-6 h-6 text-white" />
      </div>
      <div>
       <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
        Passwort ändern
       </h1>
       <p className="text-stone-600 dark:text-stone-400 mt-1">
        Ändern Sie Ihr Passwort für mehr Sicherheit
       </p>
      </div>
     </div>
    </div>

    {/* Form card */}
    <div className="bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/20 border-2 border-stone-200 dark:border-stone-800">
     <form onSubmit={handleSubmit} className="p-6 sm:p-8">
      <div className="space-y-6">
       {/* Security info */}
       <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-100 dark:border-blue-900/30 p-4">
        <p className="text-sm text-blue-900 dark:text-blue-300 flex items-start gap-2">
         <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
         <span>
          Aus Sicherheitsgründen benötigen Sie Ihr aktuelles Passwort, um ein neues Passwort zu setzen.
         </span>
        </p>
       </div>

       {/* Current password field */}
       <div className="space-y-2">
        <label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
         <Lock className="w-4 h-4 text-stone-500 dark:text-stone-400" />
         Aktuelles Passwort
        </label>
        <div className="relative">
         <input
          id="currentPassword"
          type={showCurrentPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => {
           setCurrentPassword(e.target.value)
           if (errors.currentPassword) setErrors({ ...errors, currentPassword: undefined })
          }}
          placeholder="••••••••"
          className={`w-full px-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 pr-12 ${
           errors.currentPassword
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
            : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
          }`}
         />
         <button
          type="button"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
          aria-label={showCurrentPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
         >
          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
         </button>
        </div>
        {errors.currentPassword && (
         <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.currentPassword}
         </p>
        )}
       </div>

       {/* Divider */}
       <div className="relative">
        <div className="absolute inset-0 flex items-center">
         <div className="w-full border-t border-stone-200 dark:border-stone-800" />
        </div>
        <div className="relative flex justify-center text-sm">
         <span className="px-4 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 font-medium">
          Neues Passwort
         </span>
        </div>
       </div>

       {/* New password field */}
       <div className="space-y-2">
        <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
         <Lock className="w-4 h-4 text-stone-500 dark:text-stone-400" />
         Neues Passwort
        </label>
        <div className="relative">
         <input
          id="newPassword"
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => {
           setNewPassword(e.target.value)
           if (errors.newPassword) setErrors({ ...errors, newPassword: undefined })
          }}
          placeholder="••••••••"
          className={`w-full px-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 pr-12 ${
           errors.newPassword
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
            : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
          }`}
         />
         <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
          aria-label={showNewPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
         >
          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
         </button>
        </div>
        {errors.newPassword && (
         <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.newPassword}
         </p>
        )}

        {/* Password strength indicator */}
        {newPassword && !errors.newPassword && (
         <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
           <span className="text-stone-600 dark:text-stone-400">Passwortstärke:</span>
           <span className={`font-semibold ${
            passwordStrength.score <= 2 ? 'text-red-600 dark:text-red-400' :
            passwordStrength.score <= 3 ? 'text-amber-600 dark:text-amber-400' :
            'text-emerald-600 dark:text-emerald-400'
           }`}>
            {passwordStrength.label}
           </span>
          </div>
          <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
           <div
            className={`h-full transition-all duration-500 ${passwordStrength.color}`}
            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
           />
          </div>
          <div className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
           <PasswordRequirement met={newPassword.length >= 8} text="Mindestens 8 Zeichen" />
           <PasswordRequirement met={/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)} text="Klein- und Großbuchstaben" />
           <PasswordRequirement met={/\d/.test(newPassword)} text="Mindestens eine Zahl" />
           <PasswordRequirement met={/[^a-zA-Z0-9]/.test(newPassword)} text="Mindestens ein Sonderzeichen" />
          </div>
         </div>
        )}
       </div>

       {/* Confirm password field */}
       <div className="space-y-2">
        <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
         <Lock className="w-4 h-4 text-stone-500 dark:text-stone-400" />
         Passwort bestätigen
        </label>
        <div className="relative">
         <input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
           setConfirmPassword(e.target.value)
           if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
          }}
          placeholder="••••••••"
          className={`w-full px-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 pr-12 ${
           errors.confirmPassword
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
            : confirmPassword && confirmPassword === newPassword
            ? 'border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-emerald-500/10'
            : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
          }`}
         />
         <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
          aria-label={showConfirmPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
         >
          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
         </button>
        </div>
        {errors.confirmPassword && (
         <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.confirmPassword}
         </p>
        )}
        {!errors.confirmPassword && confirmPassword && confirmPassword === newPassword && (
         <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Check className="w-4 h-4" />
          Passwörter stimmen überein
         </p>
        )}
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative flex items-center justify-center gap-2">
         {isLoading ? (
          <>
           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
           Passwort wird geändert...
          </>
         ) : (
          <>
           <Save className="w-5 h-5" />
           Passwort ändern
          </>
         )}
        </span>
       </button>
      </div>
     </form>
    </div>

    {/* Security tips */}
    <div className="mt-6 p-6 bg-stone-100 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800">
     <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3 text-sm flex items-center gap-2">
      <Shield className="w-4 h-4" />
      Tipps für ein sicheres Passwort
     </h3>
     <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
      <li className="flex items-start gap-2">
       <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
       <span>Verwenden Sie eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen</span>
      </li>
      <li className="flex items-start gap-2">
       <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
       <span>Mindestens 12 Zeichen für maximale Sicherheit</span>
      </li>
      <li className="flex items-start gap-2">
       <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
       <span>Verwenden Sie keine persönlichen Informationen oder gängige Wörter</span>
      </li>
      <li className="flex items-start gap-2">
       <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
       <span>Nutzen Sie für jeden Account ein eigenes, einzigartiges Passwort</span>
      </li>
     </ul>
    </div>
   </div>
  </div>
 )
}

// Sub-component

interface PasswordRequirementProps {
 met: boolean
 text: string
}

function PasswordRequirement({ met, text }: PasswordRequirementProps) {
 return (
  <div className="flex items-center gap-1.5">
   {met ? (
    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
   ) : (
    <div className="w-3.5 h-3.5 rounded-full border-2 border-stone-300 dark:border-stone-600 flex-shrink-0" />
   )}
   <span className={met ? 'text-emerald-600 dark:text-emerald-400' : ''}>{text}</span>
  </div>
 )
}
