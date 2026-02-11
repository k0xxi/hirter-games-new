import { useState } from 'react'
import type { LoginProps } from '../types'
import { Eye, EyeOff, LogIn } from 'lucide-react'

/**
 * Login component for admin authentication
 * Design: Sharp, angular design matching Hirter CI - no rounded corners
 * Colors: Hirter primary (#253081) and secondary (#D5B376)
 * Typography: Apercu Pro
 */
export function Login({ onLogin, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    onLogin?.(email, password)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
      {/* Background texture - subtle grain */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* Decorative accent - top right */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 dark:opacity-10">
        <div className="w-full h-full" style={{ background: `radial-gradient(circle at center, #D5B376 0%, transparent 70%)` }} />
      </div>

      {/* Main login card */}
      <div className="relative w-full max-w-md">
        {/* Card - sharp edges, Hirter CI */}
        <div className="bg-white dark:bg-stone-900 shadow-2xl shadow-stone-900/10 dark:shadow-black/40 border-2 border-stone-200 dark:border-stone-800 overflow-hidden">
          {/* Header with brand accent */}
          <div className="relative px-8 pt-12 pb-8 border-b-2 border-stone-100 dark:border-stone-800"
               style={{
                 background: `linear-gradient(135deg, #253081 0%, #1a2357 100%)`,
               }}>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm mb-6 border-2 border-white/20">
                <LogIn className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Admin Login
              </h1>
              <p className="text-white/70 text-sm">
                Hirter Gewinnspiele Dashboard
              </p>
            </div>
            {/* Decorative grain overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
            />
          </div>

          {/* Form content */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hirter.at"
                  required
                  className="w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-[#253081] dark:focus:border-[#D5B376] focus:outline-none focus:ring-4 focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10 transition-all duration-200"
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Passwort
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-[#253081] dark:focus:border-[#D5B376] focus:outline-none focus:ring-4 focus:ring-[#253081]/10 dark:focus:ring-[#D5B376]/10 transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
                    aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot password link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onForgotPassword?.()}
                  className="text-sm font-bold text-[#253081] dark:text-[#D5B376] hover:underline focus:outline-none focus:underline transition-all"
                >
                  Passwort vergessen?
                </button>
              </div>

              {/* Submit button - sharp edges */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full px-6 py-4 font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group border-2 border-[#253081]"
                style={{
                  background: `linear-gradient(135deg, #253081 0%, #1a2357 100%)`,
                }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" />
                      Anmelden...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Anmelden
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="px-8 py-6 bg-stone-50 dark:bg-stone-800/50 border-t-2 border-stone-100 dark:border-stone-800">
            <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
              Nur für autorisierte Mitarbeiter · Hirter Brauerei
            </p>
          </div>
        </div>

        {/* Decorative accent bottom - gold, sharp */}
        <div className="absolute -bottom-8 -left-8 w-32 h-32 blur-3xl opacity-20"
             style={{ background: '#D5B376' }}
        />
      </div>
    </div>
  )
}
