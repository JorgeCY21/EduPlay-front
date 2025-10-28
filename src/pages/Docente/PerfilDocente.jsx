import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function PerfilDocente() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    specialty: user?.teacher?.specialty || '',
    assignedGrade: user?.teacher?.assignedGrade || 1
  })

  // Calcular estadísticas basadas en la BD
  const calcularEstadisticas = () => {
    if (!user?.teacher?.enrollments) return {}
    
    const enrollments = user.teacher.enrollments
    const totalStudents = enrollments.reduce((acc, enrollment) => 
      acc + (enrollment.classroom?.students?.length || 0), 0
    )
    
    const totalActivities = enrollments.reduce((acc, enrollment) => 
      acc + (enrollment.activities?.length || 0), 0
    )
    
    // Calcular engagement promedio basado en interacciones
    let totalEngagement = 0
    let interactionCount = 0
    
    enrollments.forEach(enrollment => {
      enrollment.activities?.forEach(activity => {
        activity.interactions?.forEach(interaction => {
          totalEngagement += interaction.engagement
          interactionCount++
        })
      })
    })
    
    const avgEngagement = interactionCount > 0 ? Math.round(totalEngagement / interactionCount) : 0
    
    return {
      totalStudents,
      totalActivities,
      totalClassrooms: enrollments.length,
      avgEngagement,
      totalSessions: totalActivities
    }
  }

  const stats = calcularEstadisticas()

  // Obtener logros basados en actividades creadas
  const obtenerLogros = () => {
    const achievements = []
    const totalActivities = stats.totalActivities
    
    if (totalActivities >= 10) {
      achievements.push({
        icon: '⭐',
        title: 'Creador de Contenido',
        description: `${totalActivities} actividades creadas`,
        color: 'from-[#5D0B0B] to-[#7A1C1C]'
      })
    }
    
    if (stats.avgEngagement >= 80) {
      achievements.push({
        icon: '🚀',
        title: 'Alto Engagement',
        description: `${stats.avgEngagement}% de participación`,
        color: 'from-[#7A1C1C] to-[#952626]'
      })
    }
    
    if (stats.totalStudents >= 20) {
      achievements.push({
        icon: '👥',
        title: 'Mentor de Grupo',
        description: `${stats.totalStudents} estudiantes`,
        color: 'from-[#952626] to-[#B03030]'
      })
    }
    
    return achievements
  }

  const achievements = obtenerLogros()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Aquí iría la lógica para actualizar en la BD
    console.log('Datos actualizados:', formData)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const avatars = ['👨‍🏫', '🧑‍🏫', '👨‍💼', '🧑‍💼']

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header del Perfil */}
      <div className="bg-gradient-to-r from-[#5D0B0B] to-[#952626] rounded-3xl shadow-2xl border border-[#7A1C1C] p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/30 text-4xl">
                👨‍🏫
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{formData.full_name}</h1>
              <p className="text-white/90 text-lg">
                {formData.specialty || 'Especialista en Educación'}
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                  🎓 Grado {formData.assignedGrade}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                  👨‍🏫 Docente
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              isEditing 
                ? 'bg-white text-[#952626] hover:bg-white/90' 
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
            }`}
          >
            {isEditing ? '❌ Cancelar' : '✏️ Editar Perfil'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-6 bg-[#5D0B0B] rounded-full mr-3"></span>
              Información del Docente
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#952626] focus:ring-2 focus:ring-[#952626]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#952626] focus:ring-2 focus:ring-[#952626]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Especialidad
                  </label>
                  <input 
                    type="text" 
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Ej: Matemáticas, Ciencias..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#952626] focus:ring-2 focus:ring-[#952626]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grado Asignado
                  </label>
                  <select 
                    name="assignedGrade"
                    value={formData.assignedGrade}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#952626] focus:ring-2 focus:ring-[#952626]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <option key={grade} value={grade}>{grade}° Grado</option>
                    ))}
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4 pt-4">
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#952626] text-white rounded-xl font-bold hover:bg-[#7A1C1C] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    💾 Guardar Cambios
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                  >
                    ↩️ Descartar
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Resumen de Aulas */}
          {user?.teacher?.enrollments && user.teacher.enrollments.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-6 bg-[#7A1C1C] rounded-full mr-3"></span>
                Mis Aulas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.teacher.enrollments.map((enrollment, index) => (
                  <div key={enrollment.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#952626] transition-colors">
                    <h3 className="font-bold text-gray-800 mb-2">{enrollment.classroom?.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{enrollment.course?.name}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>👨‍🎓 {enrollment.classroom?.students?.length || 0} estudiantes</span>
                      <span>🎯 {enrollment.activities?.length || 0} actividades</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Estadísticas y Logros */}
        <div className="space-y-6">
          {/* Estadísticas */}
          <div className="bg-gradient-to-br from-[#5D0B0B] to-[#952626] rounded-2xl shadow-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Mi Impacto
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/90">Estudiantes</span>
                <span className="font-bold text-xl">{stats.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Aulas</span>
                <span className="font-bold text-xl">{stats.totalClassrooms}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Actividades</span>
                <span className="font-bold text-xl">{stats.totalActivities}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Engagement</span>
                <span className="font-bold text-xl">{stats.avgEngagement}%</span>
              </div>
            </div>
          </div>

          {/* Logros */}
          {achievements.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🏆</span>
                Logros
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#f8f4f0] to-white rounded-xl border border-[#952626]/20">
                    <div className={`w-10 h-10 bg-gradient-to-br ${achievement.color} rounded-lg flex items-center justify-center text-white`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-sm">{achievement.title}</p>
                      <p className="text-gray-600 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Información de la Cuenta */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🔐</span>
              Cuenta
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rol</span>
                <span className="font-medium text-[#952626]">DOCENTE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Miembro desde</span>
                <span className="font-medium">
                  {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado</span>
                <span className="font-medium text-green-600">Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}