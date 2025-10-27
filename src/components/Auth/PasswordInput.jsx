import { useState } from 'react'

export default function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "Contraseña",
  showRequirements = false,
  validation = null,
  name = "password" // Asegurar que tenga un valor por defecto
}) {
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e) // Pasar el evento completo para que handleChange pueda leer el name
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name} // ¡IMPORTANTE! Pasar el name al input
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="input-field pr-10 w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {showRequirements && validation && (
        <div className="text-sm space-y-1">
          <p className="font-medium text-gray-700">La contraseña debe contener:</p>
          <ul className="text-xs space-y-1">
            <li className={`flex items-center ${validation.requirements.hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
              <svg className={`h-4 w-4 mr-1 ${validation.requirements.hasMinLength ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {validation.requirements.hasMinLength ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
              Mínimo 8 caracteres
            </li>
            <li className={`flex items-center ${validation.requirements.hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
              <svg className={`h-4 w-4 mr-1 ${validation.requirements.hasUpperCase ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {validation.requirements.hasUpperCase ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
              Una letra mayúscula
            </li>
            <li className={`flex items-center ${validation.requirements.hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
              <svg className={`h-4 w-4 mr-1 ${validation.requirements.hasLowerCase ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {validation.requirements.hasLowerCase ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
              Una letra minúscula
            </li>
            <li className={`flex items-center ${validation.requirements.hasNumbers ? 'text-green-600' : 'text-red-600'}`}>
              <svg className={`h-4 w-4 mr-1 ${validation.requirements.hasNumbers ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {validation.requirements.hasNumbers ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
              Un número
            </li>
            <li className={`flex items-center ${validation.requirements.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
              <svg className={`h-4 w-4 mr-1 ${validation.requirements.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {validation.requirements.hasSpecialChar ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
              Un carácter especial (!@#$%^&* etc.)
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}