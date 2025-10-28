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
                ? 'bg-cyan-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            📊 Estadísticas
          </button>
          <button 
            onClick={() => setVistaActual('crear-sesion')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'crear-sesion' 
                ? 'bg-cyan-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            🎯 Crear Sesión
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'perfil' 
                ? 'bg-cyan-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
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
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={() => setVistaActual('actividades')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'actividades' 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            📚 Actividades
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              vistaActual === 'perfil' 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            👤 Perfil
          </button>
        </nav>
      )
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y información del usuario */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">EP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  EduPlay
                </h1>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                  {getDisplayRole()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Navegación y usuario */}
          <div className="flex items-center space-x-6">
            {renderNavegacion()}
            
            {/* Información del usuario y logout */}
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-4 ml-4">
              <div className="text-right">
                <span className="text-sm text-slate-800 font-medium block">
                  {getDisplayName()}
                </span>
                <span className="text-xs text-slate-500 block">
                  {user.email}
                </span>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-all duration-300 hover:border-red-300"
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