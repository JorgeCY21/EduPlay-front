import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import DashboardDocente from './pages/Docente/DashboardDocente'
import DashboardEstudiante from './pages/Estudiante/DashboardEstudiante'
import CrearSesion from './pages/Docente/CrearSesion'
import PerfilDocente from './pages/Docente/PerfilDocente'
import PerfilEstudiante from './pages/Estudiante/PerfilEstudiante'

function App() {
  const { user, loading, logout } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [vistaActual, setVistaActual] = useState('dashboard')

  // Mostrar loading mientras verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario, mostrar autenticación (por defecto Login)
  if (!user) {
    return isLogin ? 
      <Login onToggleAuth={() => setIsLogin(false)} /> : 
      <Register onToggleAuth={() => setIsLogin(true)} />
  }

  // Renderizar vistas según el rol del usuario
  const renderVista = () => {
    if (user.role === 'TEACHER') {
      switch(vistaActual) {
        case 'dashboard':
          return <DashboardDocente />
        case 'crear-sesion':
          return <CrearSesion />
        case 'perfil':
          return <PerfilDocente />
        default:
          return <DashboardDocente />
      }
    } else {
      // Vistas para estudiante
      switch(vistaActual) {
        case 'dashboard':
          return <DashboardEstudiante />
        case 'perfil':
          return <PerfilEstudiante />
        case 'actividades':
          return <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Mis Actividades</h2>
            <p>Vista de actividades del estudiante</p>
          </div>
        default:
          return <DashboardEstudiante />
      }
    }
  }

  // Navegación según el rol
  const renderNavegacion = () => {
    if (user.role === 'TEACHER') {
      return (
        <nav className="flex space-x-4">
          <button 
            onClick={() => setVistaActual('dashboard')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              vistaActual === 'dashboard' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Estadísticas
          </button>
          <button 
            onClick={() => setVistaActual('crear-sesion')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              vistaActual === 'crear-sesion' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Crear Sesión
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              vistaActual === 'perfil' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Perfil
          </button>
        </nav>
      )
    } else {
      return (
        <nav className="flex space-x-4">
          <button 
            onClick={() => setVistaActual('dashboard')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              vistaActual === 'dashboard' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Inicio
          </button>
          <button 
            onClick={() => setVistaActual('actividades')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              vistaActual === 'actividades' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Actividades
          </button>
          <button 
            onClick={() => setVistaActual('perfil')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              vistaActual === 'perfil' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Perfil
          </button>
        </nav>
      )
    }
  }

  // Obtener nombre para mostrar
  const getDisplayName = () => {
    if (user.full_name) {
      return user.full_name;
    }
    // Fallback para compatibilidad con datos antiguos
    return user.nombres && user.apellidos 
      ? `${user.nombres} ${user.apellidos}`
      : user.email;
  }

  // Obtener rol para mostrar
  const getDisplayRole = () => {
    if (user.role === 'TEACHER') return '👨‍🏫 Docente';
    if (user.role === 'STUDENT') return '👨‍🎓 Estudiante';
    if (user.role === 'ADMIN') return '👨‍💼 Administrador';
    // Fallback para compatibilidad
    return user.rol === 'docente' ? '👨‍🏫 Docente' : '👨‍🎓 Estudiante';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Asistente Educativo</h1>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {getDisplayRole()}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {renderNavegacion()}
              
              {/* Información del usuario y logout */}
              <div className="flex items-center space-x-3 border-l pl-4 ml-4">
                <span className="text-sm text-gray-700">
                  {getDisplayName()}
                </span>
                <button 
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderVista()}
      </main>
    </div>
  )
}

export default App