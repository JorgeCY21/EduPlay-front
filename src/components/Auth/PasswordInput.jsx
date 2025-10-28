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
          className="w-full bg-white/80 border-2 border-gray-300 focus:border-[#FD655E] rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD655E]/20 transition-all duration-300 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#FB190D] transition-colors duration-200"
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
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD655E]/5 to-[#7C0902]/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>

      {showRequirements && validation && (
        <div className="text-sm space-y-2 p-3 bg-white/60 rounded-lg border border-gray-300 backdrop-blur-sm">
          <p className="font-medium text-[#FB190D]">Requisitos de seguridad:</p>
          <ul className="text-xs space-y-1">
            <li className={`flex items-center ${validation.requirements.hasMinLength ? 'text-[#7C0902]' : 'text-gray-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasMinLength ? 'bg-[#7C0902]' : 'bg-gray-400'}`}></div>
              Mínimo 8 caracteres
            </li>
            <li className={`flex items-center ${validation.requirements.hasUpperCase ? 'text-[#B30C03]' : 'text-gray-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasUpperCase ? 'bg-[#B30C03]' : 'bg-gray-400'}`}></div>
              Una letra mayúscula
            </li>
            <li className={`flex items-center ${validation.requirements.hasLowerCase ? 'text-[#CE0D03]' : 'text-gray-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasLowerCase ? 'bg-[#CE0D03]' : 'bg-gray-400'}`}></div>
              Una letra minúscula
            </li>
            <li className={`flex items-center ${validation.requirements.hasNumbers ? 'text-[#FB190D]' : 'text-gray-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasNumbers ? 'bg-[#FB190D]' : 'bg-gray-400'}`}></div>
              Un número
            </li>
            <li className={`flex items-center ${validation.requirements.hasSpecialChar ? 'text-[#FD655E]' : 'text-gray-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${validation.requirements.hasSpecialChar ? 'bg-[#FD655E]' : 'bg-gray-400'}`}></div>
              Un carácter especial
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}