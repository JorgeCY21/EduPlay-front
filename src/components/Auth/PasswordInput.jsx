import { useState } from 'react'

export default function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "Contraseña",
  showRequirements = false,
  validation = null,
  name = "password"
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <div className="relative group">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-700/50 border-2 border-slate-600/50 focus:border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-200"
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>

      {showRequirements && validation && (
        <div className="text-sm space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="font-medium text-cyan-300">Requisitos de seguridad:</p>
          <ul className="text-xs space-y-1">
            <li className={`flex items-center ${validation.requirements.hasMinLength ? 'text-emerald-400' : 'text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasMinLength ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
              Mínimo 8 caracteres
            </li>
            <li className={`flex items-center ${validation.requirements.hasUpperCase ? 'text-emerald-400' : 'text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasUpperCase ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
              Una letra mayúscula
            </li>
            <li className={`flex items-center ${validation.requirements.hasLowerCase ? 'text-emerald-400' : 'text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasLowerCase ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
              Una letra minúscula
            </li>
            <li className={`flex items-center ${validation.requirements.hasNumbers ? 'text-emerald-400' : 'text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasNumbers ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
              Un número
            </li>
            <li className={`flex items-center ${validation.requirements.hasSpecialChar ? 'text-emerald-400' : 'text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasSpecialChar ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
              Un carácter especial
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}