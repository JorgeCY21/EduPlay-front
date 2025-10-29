import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

export default function Header({ vistaActual, setVistaActual }) {
  const { user, logout } = useAuth()

  const getDisplayName = () => {
    if (user.full_name) return user.full_name
    return user.nombres && user.apellidos
      ? `${user.nombres} ${user.apellidos}`
      : user.email
  }

  const getDisplayRole = () => {
    if (user.role === 'TEACHER') return '👨‍🏫 Docente'
    if (user.role === 'STUDENT') return '👨‍🎓 Estudiante'
    if (user.role === 'ADMIN') return '👨‍💼 Administrador'
    return user.rol === 'docente' ? '👨‍🏫 Docente' : '👨‍🎓 Estudiante'
  }

  const navItemsTeacher = [
    { id: 'dashboard', label: '📊 Estadísticas' },
    { id: 'crear-sesion', label: '🎯 Crear Sesión' },
    { id: 'perfil', label: '👤 Perfil' },
  ]

  const navItemsStudent = [
    { id: 'dashboard', label: '🏠 Inicio' },
    { id: 'perfil', label: '👤 Perfil' },
  ]

  const navItems = user.role === 'TEACHER' ? navItemsTeacher : navItemsStudent

  return (
    <header className="bg-gradient-to-r from-[#1A1A1A] via-[#2B0B0B] to-[#3E0A08] 
                       backdrop-blur-md border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-6">
          
          {/* Logo + Título */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#FB190D] via-[#D21204] to-[#7C0902]
                            rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/10">
              <span className="text-white text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                EduPlay
              </h1>
              <p className="text-sm text-white/70 font-medium">
                {getDisplayRole()}
              </p>
            </div>
          </motion.div>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setVistaActual(item.id)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                  ${
                    vistaActual === item.id
                      ? 'bg-gradient-to-r from-[#FD4A3D] to-[#CE0D03] text-white shadow-md scale-105'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Usuario y Logout */}
          <motion.div 
            className="flex items-center gap-5 border-l border-white/20 pl-5"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-right">
              <p className="text-base text-white font-semibold">{getDisplayName()}</p>
              <p className="text-xs text-white/70">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg 
                         font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              🚪 Salir
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
