import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

// Datos mock basados en tu schema - temporal hasta conectar con el backend
const mockData = {
  classrooms: [
    {
      id: '1',
      name: '10mo Grado - Matemáticas',
      students: [
        { id: 's1', full_name: 'Ana Martínez', risk_score: 0, last_emotion: 'POSITIVO' },
        { id: 's2', full_name: 'Luis Hernández', risk_score: 2, last_emotion: 'NEUTRAL' },
        { id: 's3', full_name: 'Elena Torres', risk_score: 1, last_emotion: 'POSITIVO' },
        { id: 's4', full_name: 'Carlos López', risk_score: 0, last_emotion: 'POSITIVO' },
        { id: 's5', full_name: 'María Rodríguez', risk_score: 3, last_emotion: 'NEGATIVO' }
      ]
    },
    {
      id: '2', 
      name: '9no Grado - Ciencias',
      students: [
        { id: 's6', full_name: 'Juan Pérez', risk_score: 0, last_emotion: 'POSITIVO' },
        { id: 's7', full_name: 'Sofia García', risk_score: 1, last_emotion: 'NEUTRAL' }
      ]
    }
  ],
  recentActivities: [
    {
      id: 'a1',
      title: 'Introducción a Álgebra',
      classroom: '10mo Grado - Matemáticas',
      date: '2024-01-15',
      engagement: 85,
      completion: 90
    },
    {
      id: 'a2',
      title: 'Ecuaciones Lineales',
      classroom: '10mo Grado - Matemáticas', 
      date: '2024-01-14',
      engagement: 78,
      completion: 85
    },
    {
      id: 'a3',
      title: 'Células y Organismos',
      classroom: '9no Grado - Ciencias',
      date: '2024-01-13',
      engagement: 92,
      completion: 88
    }
  ],
  emotionStats: {
    POSITIVO: 65,
    NEUTRAL: 25,
    NEGATIVO: 10
  },
  overallStats: {
    totalStudents: 7,
    totalClassrooms: 2,
    activeActivities: 5,
    avgEngagement: 82
  }
}

export default function DashboardDocente() {
  const { user } = useAuth()
  const [data, setData] = useState(mockData)
  const [loading, setLoading] = useState(false)

  // Simular carga de datos
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getRiskColor = (score) => {
    if (score === 0) return 'text-emerald-600'
    if (score <= 2) return 'text-amber-600'
    return 'text-red-600'
  }

  const getRiskBgColor = (score) => {
    if (score === 0) return 'bg-emerald-100 border-emerald-200'
    if (score <= 2) return 'bg-amber-100 border-amber-200'
    return 'bg-red-100 border-red-200'
  }

  const getEmotionIcon = (emotion) => {
    switch(emotion) {
      case 'POSITIVO': return '😊'
      case 'NEUTRAL': return '😐'
      case 'NEGATIVO': return '😢'
      default: return '😐'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-200 rounded-full animate-spin mx-auto mb-4 border-t-cyan-500"></div>
          <p className="text-slate-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header de Bienvenida - Más suave */}
        <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 rounded-2xl shadow-sm border border-cyan-200 p-8">        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              ¡Bienvenido, {user?.full_name?.split(' ')[0]}! 👨‍🏫
            </h1>
            <p className="text-slate-600">
              Resumen general de tus aulas y actividades
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-slate-800">{data.overallStats.totalClassrooms} Aulas</div>
            <div className="text-slate-500">{data.overallStats.totalStudents} Estudiantes</div>
          </div>
        </div>
      </div>

      {/* Estadísticas Principales - Colores suaves */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Estudiantes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Estudiantes</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{data.overallStats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center border border-cyan-100">
              <span className="text-xl text-cyan-600">👨‍🎓</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              En riesgo: <span className="text-red-600 font-medium">
                {data.classrooms.flatMap(c => c.students).filter(s => s.risk_score > 0).length}
              </span>
            </p>
          </div>
        </div>

        {/* Total Aulas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Aulas Activas</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{data.overallStats.totalClassrooms}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
              <span className="text-xl text-emerald-600">🏫</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              Actividades: <span className="text-cyan-600 font-medium">{data.overallStats.activeActivities}</span>
            </p>
          </div>
        </div>

        {/* Engagement Promedio */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Engagement</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{data.overallStats.avgEngagement}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
              <span className="text-xl text-blue-600">📈</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${data.overallStats.avgEngagement}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Estado Emocional */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Estado Emocional</p>
              <p className="text-xl font-bold text-slate-800 mt-1">Positivo</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
              <span className="text-xl text-purple-600">😊</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-sm">{data.emotionStats.POSITIVO}% positivo</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribución Emocional */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Distribución Emocional
          </h2>
          <div className="space-y-4">
            {Object.entries(data.emotionStats).map(([emotion, percentage]) => (
              <div key={emotion} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getEmotionIcon(emotion)}</span>
                  <span className="text-slate-700 capitalize font-medium">{emotion.toLowerCase()}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        emotion === 'POSITIVO' ? 'bg-emerald-500' :
                        emotion === 'NEUTRAL' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-slate-800 font-semibold w-12 text-right">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividades Recientes */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <span className="mr-2">🎯</span>
            Actividades Recientes
          </h2>
          <div className="space-y-4">
            {data.recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-cyan-200 transition-all duration-200">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{activity.title}</h3>
                  <p className="text-slate-600 text-sm">{activity.classroom}</p>
                  <p className="text-slate-500 text-xs mt-1">{activity.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-cyan-600 font-bold text-lg">{activity.engagement}%</div>
                  <div className="text-slate-500 text-sm">engagement</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Aulas y Estudiantes */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <span className="mr-2">🏫</span>
          Mis Aulas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.classrooms.map(classroom => (
            <div key={classroom.id} className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{classroom.name}</h3>
              <div className="space-y-3">
                {classroom.students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-3">
                      <span className={`text-lg ${getRiskColor(student.risk_score)}`}>
                        {getEmotionIcon(student.last_emotion)}
                      </span>
                      <span className="text-slate-700 font-medium">{student.full_name}</span>
                    </div>
                    {student.risk_score > 0 && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBgColor(student.risk_score)} ${getRiskColor(student.risk_score)}`}>
                        Riesgo: {student.risk_score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <span className="text-slate-500 text-sm font-medium">
                  {classroom.students.length} estudiantes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}