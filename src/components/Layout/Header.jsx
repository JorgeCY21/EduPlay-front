import { useAuth } from '../../context/AuthContext'

export default function Header({ vistaActual, setVistaActual }) {
  const { user, logout } = useAuth()

  // Obtener nombre para mostrar
  const getDisplayName = () => {
    if (user.full_name) {
      return user.full_name
    }
    return user.nombres && user.apellidos 
      ? `${user.nombres} ${user.apellidos}`
      : user.email
  }

  // Obtener rol para mostrar
  const getDisplayRole = () => {
    if (user.role === 'TEACHER') return '👨‍🏫 Docente'
    if (user.role === 'STUDENT') return '👨‍🎓 Estudiante'
    if (user.role === 'ADMIN') return '👨‍💼 Administrador'
    return user.rol === 'docente' ? '👨‍🏫 Docente' : '👨‍🎓 Estudiante'
  }

  // Navegación según el rol
  const renderNavegacion = () => {
    if (user.role === 'TEACHER') {
      return (
        <nav className="flex space-x-3">
          <button 
            onClick={() => setVistaActual('dashboard')}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              vistaActual === 'dashboard' 
                ? 'bg-teal-500 text-white shadow-lg ring-4 ring-teal-200 transform scale-105' 
                : 'text-teal-100 hover:bg-teal-400 hover:text-white border-2 border-teal-300 hover:border-teal-200'
            }`}
          >
            📊 Estadísticas
          </button>
          <button 
            onClick={() => setVistaActual('crear-sesion')}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              vistaActual === 'crear-sesion' 
                ? 'bg-teal-500 text-white shadow-lg ring-4 ring-teal-200 transform scale-105' 
                : 'text-teal-100 hover:bg-teal-400 hover:text-white border-2 border-teal-300 hover:border-teal-200'
            }`}
          >
            🎯 Crear Sesión
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              vistaActual === 'perfil' 
                ? 'bg-teal-500 text-white shadow-lg ring-4 ring-teal-200 transform scale-105' 
                : 'text-teal-100 hover:bg-teal-400 hover:text-white border-2 border-teal-300 hover:border-teal-200'
            }`}
          >
            👤 Perfil
          </button>
        </nav>
      )
    } else {
      return (
        <nav className="flex space-x-3">
          <button 
            onClick={() => setVistaActual('dashboard')}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              vistaActual === 'dashboard' 
                ? 'bg-cyan-500 text-white shadow-lg ring-4 ring-cyan-200 transform scale-105' 
                : 'text-cyan-100 hover:bg-cyan-400 hover:text-white border-2 border-cyan-300 hover:border-cyan-200'
            }`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={() => setVistaActual('actividades')}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              vistaActual === 'actividades' 
                ? 'bg-cyan-500 text-white shadow-lg ring-4 ring-cyan-200 transform scale-105' 
                : 'text-cyan-100 hover:bg-cyan-400 hover:text-white border-2 border-cyan-300 hover:border-cyan-200'
            }`}
          >
            📚 Actividades
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              vistaActual === 'perfil' 
                ? 'bg-cyan-500 text-white shadow-lg ring-4 ring-cyan-200 transform scale-105' 
                : 'text-cyan-100 hover:bg-cyan-400 hover:text-white border-2 border-cyan-300 hover:border-cyan-200'
            }`}
          >
            👤 Perfil
          </button>
        </nav>
      )
    }
  }

  return (
    <header className="bg-gradient-to-r from-teal-600 to-cyan-600 border-b-4 border-teal-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y información del usuario */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/30 backdrop-blur-sm">
                <span className="text-white font-bold text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  EduPlay
                </h1>
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full border-2 border-white/30 backdrop-blur-sm shadow-md">
                  {getDisplayRole()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Navegación y usuario */}
          <div className="flex items-center space-x-6">
            {renderNavegacion()}
            
            {/* Información del usuario y logout */}
            <div className="flex items-center space-x-4 border-l-2 border-white/30 pl-4 ml-4">
              <div className="text-right">
                <span className="text-sm text-white font-bold block">
                  {getDisplayName()}
                </span>
                <span className="text-xs text-white/90 block">
                  {user.email}
                </span>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-white/30 border-2 border-white/50 transition-all duration-300 hover:border-white shadow-md hover:shadow-lg"
              >
                🚪 Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}