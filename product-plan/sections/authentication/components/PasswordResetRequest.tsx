import { useState } from 'react'
import type { PasswordResetRequestProps } from '../types'
import { Mail, Send, ArrowLeft, Shield, CheckCircle } from 'lucide-react'

/**
 * Password Reset Request component - Form for requesting password reset via email
 * Design: Clean, reassuring form that guides users through password recovery
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function PasswordResetRequest({ onSubmit, onCancel }: PasswordResetRequestProps) {
 const [email, setEmail] = useState('')
 const [isLoading, setIsLoading] = useState(false)
 const [isSubmitted, setIsSubmitted] = useState(false)
 const [error, setError] = useState('')

 const validateEmail = (email: string) => {
  if (!email.trim()) {
   return 'E-Mail-Adresse ist erforderlich'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   return 'Ungültige E-Mail-Adresse'
  }
  return ''
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const validationError = validateEmail(email)
  if (validationError) {
   setError(validationError)
   return
  }

  setIsLoading(true)
  await new Promise(resolve => setTimeout(resolve, 1000))
  onSubmit?.(email)
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
        E-Mail gesendet!
       </h1>
       <p className="text-white/90 text-sm">
        Überprüfen Sie Ihr Postfach
       </p>
      </div>

      <div className="p-8">
       <p className="text-stone-700 dark:text-stone-300 mb-6 text-center">
        Wir haben eine E-Mail an <strong className="text-stone-900 dark:text-stone-100">{email}</strong> gesendet mit Anweisungen zum Zurücksetzen Ihres Passworts.
       </p>

       <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-100 dark:border-blue-900/30 p-4 mb-6">
        <p className="text-sm text-blue-900 dark:text-blue-300">
         <strong className="font-semibold">Wichtig:</strong> Der Link ist 24 Stunden gültig. Falls Sie keine E-Mail erhalten, überprüfen Sie bitte Ihren Spam-Ordner.
        </p>
       </div>

       <button
        onClick={() => onCancel?.()}
        className="w-full px-6 py-3 font-bold transition-all duration-200 flex items-center justify-center gap-2"
        style={{
         background: 'linear-gradient(135deg, #253081 0%, #1a2357 100%)',
         color: 'white',
        }}
       >
        <ArrowLeft className="w-5 h-5" />
        Zurück zum Login
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
        Passwort vergessen?
       </h1>
       <p className="text-white/70 text-sm">
        Kein Problem, wir helfen Ihnen weiter
       </p>
      </div>
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
         style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />
     </div>

     <div className="px-8 py-8">
      <p className="text-stone-600 dark:text-stone-400 mb-6">
       Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
       <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
         E-Mail-Adresse
        </label>
        <div className="relative">
         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
         <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
           setEmail(e.target.value)
           if (error) setError('')
          }}
          placeholder="admin@hirter.at"
          required
          className={`w-full pl-12 pr-4 py-3 border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-4 transition-all duration-200 ${
           error
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/10'
            : 'border-stone-200 dark:border-stone-700 focus:border-[#253081] dark:focus:border-[#D5B376] focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10'
          }`}
         />
        </div>
        {error && (
         <p className="text-sm text-red-600 dark:text-red-400">
          {error}
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
           Wird gesendet...
          </>
         ) : (
          <>
           <Send className="w-5 h-5" />
           Reset-Link senden
          </>
         )}
        </span>
       </button>

       <button
        type="button"
        onClick={() => onCancel?.()}
        className="w-full text-center text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-[#253081] dark:hover:text-[#D5B376] transition-colors"
       >
        Zurück zum Login
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
