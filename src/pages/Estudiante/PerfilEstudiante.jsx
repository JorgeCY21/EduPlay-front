import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

// 👇 Añade esto al inicio del archivo, justo después de los imports
const Role = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER'
}
// Datos mock del estudiante corregidos según interfaces
const mockStudentProfile = {
  id: 's1',
  nickname: 'Anita',
  age: 15,
  grade: 10,
  risk_score: 0,
  user_id: 'u1',
  classroom_id: 'c1',
  user: {
    id: 'u1',
    full_name: 'Ana Martínez Silva',
    email: 'ana.student@escuela.edu',
    password: 'hashed_password',
    role: Role.STUDENT,
    createdAt: new Date('2023-08-15')
  },
  classroom: {
    id: 'c1',
    name: '10mo Grado - Matemáticas',
    students: [],
    enrollments: []
  },
  interactions: []
}

const mockTeacher = {
  id: 't1',
  specialty: 'Matemáticas',
  assignedGrade: 10,
  user_id: 'u2',
  user: {
    id: 'u2',
    full_name: 'María García López',
    email: 'maria.teacher@escuela.edu',
    password: 'hashed_password',
    role: Role.TEACHER,
    createdAt: new Date('2022-01-15')
  },
  enrollments: []
}

export default function PerfilEstudiante() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockStudentProfile)
  const [teacher, setTeacher] = useState(mockTeacher)
  const [loading, setLoading] = useState(false)

  // Simular carga de datos
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simular guardado de datos
    setTimeout(() => {
      setIsEditing(false)
      setLoading(false)
      console.log('Datos actualizados:', formData)
    }, 1500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('user.')) {
      const userField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [userField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handlePreferenceChange = (key, value) => {
    // Para preferencias, asumimos que se guardarían en el usuario
    setFormData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [key]: value
      }
    }))
  }

  // Calcular tiempo en la plataforma
  const getTimeOnPlatform = () => {
    const joinDate = new Date(formData.user.createdAt)
    const today = new Date()
    const months = (today.getFullYear() - joinDate.getFullYear()) * 12 + 
                  (today.getMonth() - joinDate.getMonth())
    return Math.max(1, months)
  }

  const getRiskLevel = (score) => {
    if (score === 0) return { text: 'Bajo', color: 'text-green-600', bg: 'bg-green-100' }
    if (score <= 2) return { text: 'Medio', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { text: 'Alto', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const riskInfo = getRiskLevel(formData.risk_score)

  if (loading && !isEditing) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FB190D]/20 rounded-full animate-spin mx-auto mb-4 border-t-[#FB190D]"></div>
          <p className="text-gray-600 text-lg">Cargando tu perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header del Perfil */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-[#2B0B0B] to-[#3E0A08] rounded-2xl shadow-2xl border border-white/10 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/30 text-4xl">
                👩‍🎓
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#FB190D] to-[#7C0902] rounded-full flex items-center justify-center border-2 border-white text-white text-sm">
                {formData.grade}°
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{formData.user.full_name}</h1>
              <p className="text-white/90 text-lg">
                {formData.nickname && `"${formData.nickname}" • `}Estudiante de {formData.classroom.name}
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                  👨‍🏫 {teacher.user.full_name}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                  📚 {getTimeOnPlatform()} meses aprendiendo
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              isEditing 
                ? 'bg-white text-[#FB190D] hover:bg-white/90' 
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
              <span className="w-2 h-6 bg-[#7C0902] rounded-full mr-3"></span>
              Información Personal
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    name="user.full_name"
                    value={formData.user.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FB190D] focus:ring-2 focus:ring-[#FB190D]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apodo
                  </label>
                  <input 
                    type="text" 
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Tu apodo en clase"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FB190D] focus:ring-2 focus:ring-[#FB190D]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    name="user.email"
                    value={formData.user.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FB190D] focus:ring-2 focus:ring-[#FB190D]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Edad
                  </label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                    min="5"
                    max="18"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FB190D] focus:ring-2 focus:ring-[#FB190D]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grado
                  </label>
                  <select 
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FB190D] focus:ring-2 focus:ring-[#FB190D]/20 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <option key={grade} value={grade}>{grade}° Grado</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nivel de Riesgo
                  </label>
                  <div className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 ${riskInfo.bg} ${riskInfo.color} font-semibold`}>
                    {riskInfo.text} ({formData.risk_score} puntos)
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4 pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-[#FB190D] text-white rounded-xl font-bold hover:bg-[#CE0D03] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 rounded-full animate-spin border-t-white"></div>
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Guardar Cambios</span>
                      </>
                    )}
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

          {/* Preferencias */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-6 bg-[#CE0D03] rounded-full mr-3"></span>
              Preferencias
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">Notificaciones</p>
                  <p className="text-gray-600 text-sm">Recibir recordatorios de actividades</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={true}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#FB190D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FB190D]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">Efectos de Sonido</p>
                  <p className="text-gray-600 text-sm">Sonidos en actividades y logros</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={true}
                    onChange={(e) => handlePreferenceChange('soundEffects', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#FB190D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FB190D]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Estadísticas y Info */}
        <div className="space-y-6">
          {/* Tarjeta de Estado */}
          <div className="bg-gradient-to-br from-[#7C0902] to-[#FB190D] rounded-2xl shadow-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Mi Estado
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/90">Nivel de Riesgo</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${riskInfo.bg} ${riskInfo.color}`}>
                  {riskInfo.text}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Actividades Completadas</span>
                <span className="font-bold text-xl">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Puntaje Promedio</span>
                <span className="font-bold text-xl">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Tiempo en Plataforma</span>
                <span className="font-bold text-xl">{getTimeOnPlatform()}m</span>
              </div>
            </div>
          </div>

          {/* Información del Aula */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏫</span>
              Mi Aula
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#f8f4f0] to-white rounded-xl border border-[#FB190D]/20">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C0902] to-[#FB190D] rounded-lg flex items-center justify-center text-white">
                  👨‍🏫
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Profesor</p>
                  <p className="text-gray-600 text-xs">{teacher.user.full_name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#f8f4f0] to-white rounded-xl border border-[#FB190D]/20">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C0902] to-[#FB190D] rounded-lg flex items-center justify-center text-white">
                  🎓
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Aula</p>
                  <p className="text-gray-600 text-xs">{formData.classroom.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#f8f4f0] to-white rounded-xl border border-[#FB190D]/20">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C0902] to-[#FB190D] rounded-lg flex items-center justify-center text-white">
                  📚
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Especialidad</p>
                  <p className="text-gray-600 text-xs">{teacher.specialty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la Cuenta */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🔐</span>
              Cuenta
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rol</span>
                <span className="font-medium text-[#FB190D]">{formData.user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Miembro desde</span>
                <span className="font-medium">
                  {new Date(formData.user.createdAt).toLocaleDateString('es-ES')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado</span>
                <span className="font-medium text-green-600">Activo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID Estudiante</span>
                <span className="font-medium text-gray-800">{formData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID Usuario</span>
                <span className="font-medium text-gray-800">{formData.user.id}</span>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Acciones
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-colors">
                🔄 Cambiar Contraseña
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-colors">
                📱 Descargar Certificados
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-red-600 font-medium transition-colors">
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}