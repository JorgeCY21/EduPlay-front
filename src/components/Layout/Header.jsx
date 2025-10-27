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
        <nav className="flex space-x-2">
          <button 
            onClick={() => setVistaActual('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'dashboard' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
            }`}
          >
            📊 Estadísticas
          </button>
          <button 
            onClick={() => setVistaActual('crear-sesion')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'crear-sesion' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
            }`}
          >
            🎯 Crear Sesión
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'perfil' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
            }`}
          >
            👤 Perfil
          </button>
        </nav>
      )
    } else {
      return (
        <nav className="flex space-x-2">
          <button 
            onClick={() => setVistaActual('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'dashboard' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
            }`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={() => setVistaActual('actividades')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'actividades' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
            }`}
          >
            📚 Actividades
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'perfil' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
            }`}
          >
            👤 Perfil
          </button>
        </nav>
      )
    }
  }

  return (
    <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y información del usuario */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">EP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  EduPlay
                </h1>
                <span className="px-2 py-1 bg-slate-700/50 text-cyan-300 text-xs font-medium rounded-full border border-slate-600">
                  {getDisplayRole()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Navegación y usuario */}
          <div className="flex items-center space-x-6">
            {renderNavegacion()}
            
            {/* Información del usuario y logout */}
            <div className="flex items-center space-x-4 border-l border-slate-700 pl-4 ml-4">
              <div className="text-right">
                <span className="text-sm text-white font-medium block">
                  {getDisplayName()}
                </span>
                <span className="text-xs text-slate-400 block">
                  {user.email}
                </span>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-500/20 transition-all duration-300 hover:border-red-500/40"
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