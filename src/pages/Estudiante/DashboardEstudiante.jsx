import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

// Datos mock para actividades
const mockActivitiesData = {
  availableActivities: [
    {
      id: 'act1',
      title: 'Geometría Básica',
      type: 'quiz',
      subject: 'Matemáticas',
      description: 'Aprende sobre figuras geométricas y sus propiedades fundamentales',
      estimatedDuration: '50 min',
      difficulty: 'medium',
      points: 100,
      teacher: 'María García López',
      dueDate: '2024-01-20',
      tags: ['geometría', 'figuras', 'ángulos'],
      previewImage: '📐',
      status: 'available'
    },
    {
      id: 'act2',
      title: 'Sistema Solar',
      type: 'relations',
      subject: 'Ciencias',
      description: 'Conoce los planetas y sus características en nuestro sistema solar',
      estimatedDuration: '40 min',
      difficulty: 'easy',
      points: 80,
      teacher: 'Carlos Rodríguez',
      dueDate: '2024-01-22',
      tags: ['astronomía', 'planetas', 'espacio'],
      previewImage: '🪐',
      status: 'available'
    },
    {
      id: 'act3',
      title: 'Gramática Avanzada',
      type: 'flashcards',
      subject: 'Lenguaje',
      description: 'Domina las reglas gramaticales más complejas del español',
      estimatedDuration: '35 min',
      difficulty: 'hard',
      points: 120,
      teacher: 'Laura Martínez',
      dueDate: '2024-01-25',
      tags: ['gramática', 'verbos', 'sintaxis'],
      previewImage: '📖',
      status: 'available'
    },
    {
      id: 'act4',
      title: 'Ecosistemas del Mundo',
      type: 'memory',
      subject: 'Ciencias',
      description: 'Memoriza y relaciona los diferentes ecosistemas del planeta',
      estimatedDuration: '45 min',
      difficulty: 'medium',
      points: 90,
      teacher: 'Carlos Rodríguez',
      dueDate: '2024-01-28',
      tags: ['ecología', 'biomas', 'naturaleza'],
      previewImage: '🌍',
      status: 'available'
    }
  ],
  completedActivities: [
    {
      id: 'comp1',
      title: 'Introducción a Álgebra',
      type: 'quiz',
      subject: 'Matemáticas',
      completionDate: '2024-01-15',
      score: 95,
      timeSpent: '42 min',
      emotion: 'POSITIVO',
      teacherFeedback: 'Excelente trabajo en los ejercicios de ecuaciones',
      pointsEarned: 100
    },
    {
      id: 'comp2',
      title: 'Ecuaciones Lineales',
      type: 'flashcards',
      subject: 'Matemáticas',
      completionDate: '2024-01-14',
      score: 88,
      timeSpent: '28 min',
      emotion: 'NEUTRAL',
      teacherFeedback: 'Buen progreso, practica más las fórmulas',
      pointsEarned: 80
    },
    {
      id: 'comp3',
      title: 'Células y Organismos',
      type: 'memory',
      subject: 'Ciencias',
      completionDate: '2024-01-13',
      score: 92,
      timeSpent: '55 min',
      emotion: 'POSITIVO',
      teacherFeedback: 'Dominaste perfectamente los conceptos de biología celular',
      pointsEarned: 90
    }
  ],
  inProgressActivities: [
    {
      id: 'progress1',
      title: 'Fracciones y Decimales',
      type: 'quiz',
      subject: 'Matemáticas',
      progress: 65,
      timeSpent: '25 min',
      lastActivity: '2024-01-16 14:30'
    }
  ]
}

export default function ActividadesEstudiante() {
  const { user } = useAuth()
  const [data, setData] = useState(mockActivitiesData)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('disponibles')
  const [selectedSubject, setSelectedSubject] = useState('todas')

  // Simular carga de datos
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Funciones de utilidad
  const getActivityIcon = (type) => {
    switch(type) {
      case 'quiz': return '📝'
      case 'flashcards': return '📚'
      case 'memory': return '🧠'
      case 'relations': return '🔗'
      default: return '🎯'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSubjectColor = (subject) => {
    switch(subject) {
      case 'Matemáticas': return 'from-[#7C0902] to-[#FB190D]'
      case 'Ciencias': return 'from-[#1e40af] to-[#3b82f6]'
      case 'Lenguaje': return 'from-[#059669] to-[#10b981]'
      default: return 'from-[#6b7280] to-[#9ca3af]'
    }
  }

  const getEmotionIcon = (emotion) => {
    switch(emotion) {
      case 'POSITIVO': return '😊'
      case 'NEUTRAL': return '😐'
      case 'NEGATIVO': return '😢'
      default: return '😐'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-[#7C0902]'
    if (score >= 70) return 'text-[#B30C03]'
    return 'text-[#FB190D]'
  }

  const filteredActivities = data.availableActivities.filter(activity => 
    selectedSubject === 'todas' || activity.subject === selectedSubject
  )

  const subjects = ['todas', 'Matemáticas', 'Ciencias', 'Lenguaje']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FB190D]/20 rounded-full animate-spin mx-auto mb-4 border-t-[#FB190D]"></div>
          <p className="text-gray-600 text-lg">Cargando actividades...</p>
          <p className="text-gray-400 text-sm mt-2">Preparando experiencias de aprendizaje</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header de Actividades */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-[#2B0B0B] to-[#3E0A08] rounded-2xl shadow-2xl border border-white/10 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              📚 Mis Actividades
            </h1>
            <p className="text-white/90 text-xl">
              Explora y completa tus tareas de aprendizaje
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{data.availableActivities.length}</div>
            <div className="text-white/80">Actividades Disponibles</div>
          </div>
        </div>
      </div>

      {/* Filtros y Pestañas */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Pestañas */}
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
            {[
              { id: 'disponibles', label: '🆕 Disponibles', count: data.availableActivities.length },
              { id: 'progreso', label: '⏳ En Progreso', count: data.inProgressActivities.length },
              { id: 'completadas', label: '✅ Completadas', count: data.completedActivities.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#FB190D] shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-[#FB190D] text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filtro por materia */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Filtrar por:</span>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#FB190D] focus:ring-2 focus:ring-[#FB190D]/20 transition-all duration-300"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'todas' ? 'Todas las materias' : subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contenido de las Pestañas */}
      {activeTab === 'disponibles' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group">
              {/* Header de la tarjeta */}
              <div className={`bg-gradient-to-r ${getSubjectColor(activity.subject)} rounded-t-2xl p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-4 right-4 text-4xl opacity-20">
                  {activity.previewImage}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                      {activity.subject}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty === 'easy' ? 'Fácil' : activity.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-white/90 text-sm">{activity.description}</p>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span>⏱️</span>
                      <span className="text-sm">{activity.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span>⭐</span>
                      <span className="text-sm">{activity.points} pts</span>
                    </div>
                  </div>
                  <div className="text-3xl">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Información del profesor y fecha */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>👨‍🏫 {activity.teacher}</span>
                  <span>📅 Vence: {activity.dueDate}</span>
                </div>

                {/* Botón de acción */}
                <button className="w-full bg-gradient-to-r from-[#FB190D] to-[#CE0D03] text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:from-[#CE0D03] group-hover:to-[#B30C03]">
                  🚀 Empezar Actividad
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'progreso' && (
        <div className="space-y-6">
          {data.inProgressActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-2xl flex items-center justify-center border border-[#FB190D]/20 text-2xl">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                    <p className="text-gray-600">En progreso - {activity.timeSpent} invertidos</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FB190D]">{activity.progress}%</div>
                  <div className="w-32 bg-gray-200 rounded-full h-3 mt-2">
                    <div 
                      className="bg-gradient-to-r from-[#FB190D] to-[#CE0D03] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${activity.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-[#FB190D] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#CE0D03] transition-colors">
                  Continuar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'completadas' && (
        <div className="space-y-6">
          {data.completedActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-2xl flex items-center justify-center border border-[#7C0902]/20 text-2xl">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                      <span className={`text-2xl ${getScoreColor(activity.score)}`}>
                        {getEmotionIcon(activity.emotion)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">Completado: {activity.completionDate} • Tiempo: {activity.timeSpent}</p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-800 font-semibold">👨‍🏫 Feedback del profesor:</p>
                      <p className="text-green-700 mt-1">{activity.teacherFeedback}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className={`text-3xl font-bold ${getScoreColor(activity.score)}`}>
                    {activity.score}%
                  </div>
                  <div className="text-gray-600 text-sm">Puntaje</div>
                  <div className="mt-2 px-3 py-1 bg-[#7C0902] text-white rounded-full text-sm font-bold">
                    +{activity.pointsEarned} pts
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas Rápidas */}
      <div className="bg-gradient-to-r from-[#7C0902] to-[#FB190D] rounded-2xl shadow-2xl border border-white/20 p-6 text-white">
        <h3 className="text-xl font-bold mb-6 text-center">📊 Tu Progreso en Actividades</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{data.availableActivities.length}</div>
            <div className="text-white/80">Disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{data.inProgressActivities.length}</div>
            <div className="text-white/80">En Progreso</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{data.completedActivities.length}</div>
            <div className="text-white/80">Completadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {data.completedActivities.reduce((acc, act) => acc + act.pointsEarned, 0)}
            </div>
            <div className="text-white/80">Puntos Totales</div>
          </div>
        </div>
      </div>
    </div>
  )
}