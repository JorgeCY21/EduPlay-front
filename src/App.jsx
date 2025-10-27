import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import DashboardDocente from './pages/Docente/DashboardDocente'
import DashboardEstudiante from './pages/Estudiante/DashboardEstudiante'
import CrearSesion from './pages/Docente/CrearSesion'
import PerfilDocente from './pages/Docente/PerfilDocente'
import PerfilEstudiante from './pages/Estudiante/PerfilEstudiante'
import Header from './components/Layout/Header'
import Loading from './components/Layout/Loading'

function App() {
  const { user, loading, logout } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [vistaActual, setVistaActual] = useState('dashboard')

  // Mostrar loading mientras verifica la autenticación
  if (loading) {
    return <Loading />
  }

  // Si no hay usuario, mostrar autenticación
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
          return (
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                🎯 Mis Actividades
              </h2>
              <p className="text-slate-300">Vista de actividades del estudiante</p>
            </div>
          )
        default:
          return <DashboardEstudiante />
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      {/* Header con navegación */}
      <Header vistaActual={vistaActual} setVistaActual={setVistaActual} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderVista()}
      </main>
    </div>
  )
}

export default App