import { useState } from 'react'
import type { PasswordResetConfirmProps } from '../types'
import { Lock, Eye, EyeOff, Check, AlertCircle, Shield, CheckCircle } from 'lucide-react'

/**
 * Password Reset Confirm component - Form for setting new password after reset link
 * Design: Clean, security-focused with password strength indicator
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function PasswordResetConfirm({ onSubmit, onCancel }: PasswordResetConfirmProps) {
 const [password, setPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [showPassword, setShowPassword] = useState(false)
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const [isLoading, setIsLoading] = useState(false)
 const [isSubmitted, setIsSubmitted] = useState(false)
 const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})

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

 const passwordStrength = getPasswordStrength(password)

 const validateForm = () => {
  const newErrors: typeof errors = {}

  if (!password) {
   newErrors.password = 'Passwort ist erforderlich'
  } else if (password.length < 8) {
   newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein'
  }

  if (!confirmPassword) {
   newErrors.confirmPassword = 'Passwort-Bestätigung ist erforderlich'
  } else if (confirmPassword !== password) {
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
  onSubmit?.(password)
  setIsLoading(false)
  setIsSubmitted(true)
 }

 if (isSubmitted) {
  return (
   <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
    {/* Background texture */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
       style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
    />

    <div className="relative w-full max-w-md">
     <div className="bg-white dark:bg-stone-900 shadow-2xl shadow-stone-900/10 dark:shadow-black/40 border-2 border-stone-200 dark:border-stone-800 overflow-hidden">
      {/* Success header */}
      <div className="relative px-8 pt-12 pb-8 text-center"
         style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
       <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6 border-2 border-white/30">
        <CheckCircle className="w-8 h-8 text-white" />
       </div>
       <h1 className="text-2xl font-bold text-white mb-2">
        Passwort zurückgesetzt!
       </h1>
       <p className="text-white/90 text-sm">
        Ihr neues Passwort wurde erfolgreich gespeichert
       </p>
      </div>

      <div className="p-8">
       <p className="text-stone-700 dark:text-stone-300 mb-6 text-center">
        Sie können sich jetzt mit Ihrem neuen Passwort anmelden.
       </p>

       <button
        onClick={() => onCancel?.()}
        className="w-full px-6 py-3 font-bold transition-all duration-200 flex items-center justify-center gap-2"
        style={{
         background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)',
         color: 'white',
        }}
       >
        Zum Login
       </button>
      </div>
     </div>
    </div>
   </div>
  )
 }

 return (
  <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
   {/* Background texture */}
   <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
   />

   {/* Decorative accents */}
   <div className="absolute top-0 right-0 w-96 h-96 opacity-5 dark:opacity-10">
    <div className="w-full h-full" style={{ background: `radial-gradient(circle at center, #D5B376 0%, transparent 70%)` }} />
   </div>

   <div className="relative w-full max-w-md">
    <div className="bg-white dark:bg-stone-900 shadow-2xl shadow-stone-900/10 dark:shadow-black/40 border-2 border-stone-200 dark:border-stone-800 overflow-hidden">
     {/* Header */}
     <div className="relative px-8 pt-12 pb-8 border-b border-stone-100 dark:border-stone-800"
        style={{ background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)' }}>
      <div className="relative z-10">
       <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm mb-6 border-2 border-white/20">
        <Shield className="w-7 h-7 text-white" />
       </div>
       <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Neues Passwort setzen
       </h1>
       <p className="text-white/70 text-sm">
        Wählen Sie ein sicheres Passwort
       </p>
      </div>
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
         style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />
     </div>

     <div className="px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
       {/* New password field */}
       <div className="space-y-2">
        <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
         <Lock className="w-4 h-4 text-stone-500 dark:text-stone-400" />
         Neues Passwort
        </label>
        <div className="relative">
         <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
           setPassword(e.target.value)
           if (errors.password) setErrors({ ...errors, password: undefined })
          }}
          placeholder="••••••••"
          className={`w-full px-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 pr-12 ${
           errors.password
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
            : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
          }`}
         />
         <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
         >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
         </button>
        </div>
        {errors.password && (
         <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.password}
         </p>
        )}

        {/* Password strength indicator */}
        {password && !errors.password && (
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
           <PasswordRequirement met={password.length >= 8} text="Mindestens 8 Zeichen" />
           <PasswordRequirement met={/[a-z]/.test(password) && /[A-Z]/.test(password)} text="Klein- und Großbuchstaben" />
           <PasswordRequirement met={/\d/.test(password)} text="Mindestens eine Zahl" />
           <PasswordRequirement met={/[^a-zA-Z0-9]/.test(password)} text="Mindestens ein Sonderzeichen" />
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
            : confirmPassword && confirmPassword === password
            ? 'border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-emerald-500/10'
            : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
          }`}
         />
         <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
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
        {!errors.confirmPassword && confirmPassword && confirmPassword === password && (
         <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Check className="w-4 h-4" />
          Passwörter stimmen überein
         </p>
        )}
       </div>

       <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-4 font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        style={{ background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)' }}
       >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative flex items-center justify-center gap-2">
         {isLoading ? (
          <>
           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
           Wird gespeichert...
          </>
         ) : (
          <>
           <Check className="w-5 h-5" />
           Passwort zurücksetzen
          </>
         )}
        </span>
       </button>
      </form>
     </div>
    </div>

    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-3xl opacity-20"
       style={{ background: '#D5B376' }}
    />
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
