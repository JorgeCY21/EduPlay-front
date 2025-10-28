import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PasswordInput from './PasswordInput'
import { validateRegister, validatePassword, mapRoleToSchema } from '../../utils/validation'

export default function Register({ onToggleAuth }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    rol: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()

  const passwordValidation = validatePassword(formData.password)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formErrors = validateRegister(formData)
    setErrors(formErrors)
    
    if (Object.keys(formErrors).length > 0) return

    setIsLoading(true)
    setErrors({})

    try {
      // Construir datos para el schema con el rol mapeado
      const userData = {
        full_name: formData.full_name,
        email: formData.email,
        // Mapear el rol del formulario al valor del schema
        role: mapRoleToSchema(formData.rol),
        password: formData.password
      }
      
      const result = await register(userData)
      
      if (!result.success) {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      setErrors({ submit: 'Error inesperado. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Generar partículas flotantes
  const renderFloatingParticles = () => {
    const particles = []
    const colors = ['#7C0902', '#B30C03', '#CE0D03', '#FB190D', '#FD655E']
    
    for (let i = 0; i < 35; i++) {
      const size = Math.random() * 5 + 1
      const color = colors[Math.floor(Math.random() * colors.length)]
      const duration = Math.random() * 8 + 4
      const delay = Math.random() * 7
      const opacity = Math.random() > 0.7 ? 0.7 : Math.random() > 0.4 ? 0.5 : 0.3
      
      particles.push(
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            opacity: opacity,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      )
    }
    return particles
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0504] via-[#2a0705] to-[#3a0906] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos de fondo futuristas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas animadas */}
        {renderFloatingParticles()}
        
        {/* Partículas principales más grandes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#FD655E] rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#FB190D] rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-[#CE0D03] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#B30C03] rounded-full animate-pulse opacity-90"></div>
        <div className="absolute top-3/4 left-1/5 w-4 h-4 bg-[#7C0902] rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-[#FB190D] rounded-full animate-pulse opacity-75"></div>
        <div className="absolute top-1/5 right-1/5 w-3 h-3 bg-[#CE0D03] rounded-full animate-pulse opacity-65"></div>
        <div className="absolute bottom-1/5 left-1/4 w-4 h-4 bg-[#B30C03] rounded-full animate-pulse opacity-85"></div>
        
        {/* Líneas de conexión */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FD655E] to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7C0902] to-transparent opacity-40"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FB190D] to-transparent opacity-30"></div>
        
        {/* Efectos de brillo */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-[#FD655E] rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#7C0902] rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#FB190D] rounded-full blur-2xl opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Grid de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,25,13,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,25,13,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_30%,transparent_100%)]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Tarjeta de registro - COLOR CLARO TIPO BEIGE/BLANCO */}
        <div className="bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] backdrop-blur-xl rounded-3xl shadow-2xl border border-[#FB190D]/30 p-8 relative overflow-hidden">
          {/* Efecto de brillo sutil */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FD655E]/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#7C0902]/20 rounded-full blur-xl"></div>
          
          {/* Efecto de borde luminoso sutil */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FD655E]/5 to-[#7C0902]/5 opacity-50"></div>
          
          {/* Header con icono IA */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FD655E] to-[#7C0902] rounded-2xl mb-4 shadow-lg shadow-[#FB190D]/40">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FD655E] to-[#7C0902] bg-clip-text text-transparent mb-2">
              Unirse a EduPlay
            </h1>
            <p className="text-gray-600 text-sm">
              Crea tu cuenta inteligente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre Completo */}
            <div className="group">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#FB190D] transition-colors">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Nombre Completo</span>
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full bg-white/80 border-2 ${
                    errors.full_name 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-gray-300 focus:border-[#FD655E]'
                  } rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD655E]/20 transition-all duration-300`}
                  placeholder="Tu nombre completo"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD655E]/5 to-[#7C0902]/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              {errors.full_name && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.full_name}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#FB190D] transition-colors">
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
                  className={`w-full bg-white/80 border-2 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-gray-300 focus:border-[#FD655E]'
                  } rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD655E]/20 transition-all duration-300`}
                  placeholder="tu.correo@escuela.edu"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD655E]/5 to-[#7C0902]/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Rol */}
            <div className="group">
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#FB190D] transition-colors">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Rol en la Plataforma</span>
                </div>
              </label>
              <div className="relative">
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className={`w-full bg-white/80 border-2 ${
                    errors.rol 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-gray-300 focus:border-[#FD655E]'
                  } rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FD655E]/20 transition-all duration-300 appearance-none`}
                >
                  <option value="" className="bg-white text-gray-800">Selecciona tu rol</option>
                  <option value="docente" className="bg-white text-gray-800">👨‍🏫 Docente</option>
                  <option value="estudiante" className="bg-white text-gray-800">👨‍🎓 Estudiante</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD655E]/5 to-[#7C0902]/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              {errors.rol && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.rol}</span>
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#FB190D] transition-colors">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Contraseña Segura</span>
                </div>
              </label>
              <PasswordInput
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña segura"
                showRequirements={true}
                validation={passwordValidation}
                name="password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#FB190D] transition-colors">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Confirmar Contraseña</span>
                </div>
              </label>
              <PasswordInput
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* Error de submit */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-red-600 text-sm flex items-center space-x-2">
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
              className="w-full bg-gradient-to-r from-[#CE0D03] to-[#7C0902] hover:from-[#FB190D] hover:to-[#B30C03] disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-[#FB190D]/40 relative overflow-hidden group border border-[#FB190D]/30"
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creando cuenta inteligente...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Activar Cuenta IA</span>
                </div>
              )}
            </button>
          </form>

          {/* Enlace a login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya eres parte de EduPlay?{' '}
              <button
                onClick={onToggleAuth}
                className="text-[#FD655E] hover:text-[#FB190D] font-medium transition-colors duration-200 hover:underline"
              >
                Acceder a tu cuenta
              </button>
            </p>
          </div>

          {/* Footer con info IA */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-[#FD655E] rounded-full animate-pulse"></div>
                <span>Encriptación Avanzada</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-[#FB190D] rounded-full animate-pulse"></div>
                <span>Seguridad IA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos para la animación de flotación */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-25px) translateX(20px) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-15px) translateX(-15px) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(10px) rotate(270deg);
            opacity: 0.9;
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}