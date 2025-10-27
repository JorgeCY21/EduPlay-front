import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PasswordInput from './PasswordInput'
import { validateEmail } from '../../utils/validation'

export default function Login({ onToggleAuth }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El correo no es válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      const result = await login(formData.email, formData.password)
      
      if (!result.success) {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      setErrors({ submit: 'Error inesperado. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos de fondo futuristas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas animadas */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-pulse opacity-50"></div>
        
        {/* Líneas de conexión IA */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>
        
        {/* Grid de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(12,74,110,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(12,74,110,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Tarjeta de login con efecto glassmorphism */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 relative overflow-hidden">
          {/* Efecto de brillo */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl"></div>
          
          {/* Header con icono IA */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              EduPlay
            </h1>
            <p className="text-slate-400 text-sm">
              Plataforma de aprendizaje inteligente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-cyan-300 mb-2 group-focus-within:text-cyan-400 transition-colors">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Correo Electrónico</span>
                </div>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 border-2 ${
                    errors.email 
                      ? 'border-red-500/50 focus:border-red-400' 
                      : 'border-slate-600/50 focus:border-cyan-400/50'
                  } rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                  placeholder="tu.correo@escuela.edu"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-cyan-300 mb-2 group-focus-within:text-cyan-400 transition-colors">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Contraseña</span>
                </div>
              </label>
              <PasswordInput
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                name="password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Error de submit */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{errors.submit}</span>
                </p>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden group"
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Acceder al Sistema</span>
                </div>
              )}
            </button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              ¿Primera vez en la plataforma?{' '}
              <button
                onClick={onToggleAuth}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline"
              >
                Crear cuenta 
              </button>
            </p>
          </div>

          {/* Footer con info IA */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span>IA Activa</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Aprendizaje Adaptativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}