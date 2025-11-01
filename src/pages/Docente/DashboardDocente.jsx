import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getEnrollment } from '../../services/enrollement.services'
import { getStudentsClassroom } from '../../services/student.services'
import { s } from 'framer-motion/client'
import { getActivityComing, getActivityRecently } from '../../services/activity.services'
import { getEmotionStats, getOverallStats } from '../../services/teacher.services'

export default function DashboardDocente() {
  const { user } = useAuth()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [selectedClassroom, setSelectedClassroom] = useState(null)

  // Simular carga de datos
  useEffect(() => {
    if (!user?.teacher?.id) return;
    setLoading(true);

    const fetchEnrollment = async () => {
      try {
        const data = await getEnrollment(user.teacher.id);

        let classrooms = await Promise.all(
          data.map(async (enrollment) => {
            const studentsData = await getStudentsClassroom(enrollment.classroom.id);

            let grade = studentsData.length > 0 ? studentsData[0].grade : 1;

            const formattedStudents = studentsData.map((student) => {

              return {
                id: student.id,
                full_name: student.user.full_name,
                nickname: student.nickname,
                age: student.age,
                grade: student.grade,
                risk_score: 1,
                last_emotion: 'POSITIVO',
                progress: 85,
                user_id: student.user_id,
                classroom_id: student.classroom_id
              };
            });

            return {
              id: enrollment.classroom.id,
              name: enrollment.classroom.name,
              grade: grade,
              students: formattedStudents,
            };
          })
        );

        classrooms = Array.from(
          new Map(classrooms.map((cls) => [cls.id, cls])).values()
        );

        const recentActivities = await getActivityRecently(user.teacher.id);

        const upcomingSessions = await getActivityComing(user.teacher.id);

        const overallStats = await getOverallStats(user.teacher.id);

        const emotionStats = await getEmotionStats(user.teacher.id);

        const data_formatted = { classrooms, recentActivities, upcomingSessions, ...overallStats, ...emotionStats };

        setData(data_formatted);
        setLoading(false);

      } catch (error) {
        console.error('Error obteniendo inscripciones:', error);
      }
    };

    fetchEnrollment();
  }, [user.teacher.id]);


  // Paleta de colores consistente con el perfil - tonos rojos/marrones
  const getRiskColor = (score) => {
    if (score === 0) return 'text-[#5D0B0B]'      // Rojo oscuro
    if (score <= 2) return 'text-[#7A1C1C]'       // Rojo medio
    return 'text-[#B03030]'                       // Rojo más claro para alto riesgo
  }

  const getRiskBgColor = (score) => {
    if (score === 0) return 'bg-[#f8f4f0] border-[#5D0B0B]/20'
    if (score <= 2) return 'bg-[#f8f4f0] border-[#7A1C1C]/30'
    return 'bg-[#fef2f2] border-[#B03030]/40'
  }

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'POSITIVO': return '😊'
      case 'NEUTRAL': return '😐'
      case 'NEGATIVO': return '😢'
      default: return '😐'
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz': return '📝'
      case 'flashcards': return '📚'
      case 'memory': return '🧠'
      case 'relations': return '🔗'
      default: return '🎯'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'text-[#5D0B0B]'
    if (progress >= 70) return 'text-[#7A1C1C]'
    return 'text-[#B03030]'
  }

  const getProgressGradient = (progress) => {
    if (progress >= 90) return 'from-[#5D0B0B] to-[#7A1C1C]'
    if (progress >= 70) return 'from-[#7A1C1C] to-[#952626]'
    return 'from-[#B03030] to-[#D14343]'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#7A1C1C]/20 rounded-full animate-spin mx-auto mb-4 border-t-[#7A1C1C]"></div>
          <p className="text-gray-600 text-lg">Cargando tu dashboard...</p>
          <p className="text-gray-400 text-sm mt-2">Preparando análisis en tiempo real</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header de Bienvenida con gradiente rojo/marrón */}
      <div className="bg-gradient-to-r from-[#5D0B0B] to-[#952626] rounded-2xl shadow-lg border border-[#7A1C1C] p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido, {user?.full_name?.split(' ')[0]}! 👨‍🏫
            </h1>
            <p className="text-white/90 text-lg">
              Resumen general de tus aulas y actividades educativas
            </p>
            {user?.teacher && (
              <p className="text-white/80 text-sm mt-2">
                Especialidad: {user.teacher.specialty} • Grado asignado: {user.teacher.assignedGrade || 'Todos'}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{data.overallStats.totalClassrooms} Aulas</div>
            <div className="text-white/80">{data.overallStats.totalStudents} Estudiantes</div>
          </div>
        </div>

        {/* Mini estadísticas en header */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{data.overallStats.avgEngagement}%</div>
            <div className="text-white/80 text-sm">Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{data.overallStats.avgProgress}%</div>
            <div className="text-white/80 text-sm">Progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{data.overallStats.sessionsThisWeek}</div>
            <div className="text-white/80 text-sm">Sesiones esta semana</div>
          </div>
        </div>
      </div>

      {/* Estadísticas Principales - Tarjetas modernas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Estudiantes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Estudiantes</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{data.overallStats.totalStudents}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-xl flex items-center justify-center border border-[#7A1C1C]/20">
              <span className="text-2xl text-[#5D0B0B]">👨‍🎓</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              En riesgo: <span className="text-[#B03030] font-bold">
                {data.classrooms.flatMap(c => c.students).filter(s => s.risk_score > 0).length}
              </span>
            </p>
          </div>
        </div>

        {/* Total Aulas */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Aulas Activas</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{data.overallStats.totalClassrooms}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-xl flex items-center justify-center border border-[#952626]/20">
              <span className="text-2xl text-[#7A1C1C]">🏫</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Actividades: <span className="text-[#7A1C1C] font-bold">{data.overallStats.activeActivities}</span>
            </p>
          </div>
        </div>

        {/* Engagement Promedio */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Engagement</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{data.overallStats.avgEngagement}%</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-xl flex items-center justify-center border border-[#B03030]/20">
              <span className="text-2xl text-[#952626]">📈</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#5D0B0B] to-[#952626] h-3 rounded-full transition-all duration-1000"
                style={{ width: `${data.overallStats.avgEngagement}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Estado Emocional */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Estado Emocional</p>
              <p className="text-xl font-bold text-gray-800 mt-1">Positivo</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-xl flex items-center justify-center border border-[#5D0B0B]/20">
              <span className="text-2xl text-[#5D0B0B]">😊</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">{data.emotionStats.POSITIVO}% positivo</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Distribución Emocional */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 xl:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-6 bg-[#5D0B0B] rounded-full mr-3"></span>
            Distribución Emocional
          </h2>
          <div className="space-y-5">
            {Object.entries(data.emotionStats).map(([emotion, percentage]) => (
              <div key={emotion} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{getEmotionIcon(emotion)}</span>
                  <div>
                    <span className="text-gray-700 capitalize font-semibold block">{emotion.toLowerCase()}</span>
                    <span className="text-gray-500 text-sm">{percentage}%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${emotion === 'POSITIVO' ? 'bg-gradient-to-r from-[#5D0B0B] to-[#7A1C1C]' :
                        emotion === 'NEUTRAL' ? 'bg-gradient-to-r from-[#7A1C1C] to-[#952626]' :
                          'bg-gradient-to-r from-[#B03030] to-[#D14343]'
                        }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico circular simplificado */}
          <div className="mt-8 p-4 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-xl border border-[#7A1C1C]/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#5D0B0B] mb-2">Análisis Emocional</div>
              <div className="text-gray-600 text-sm">Basado en las últimas interacciones</div>
            </div>
          </div>
        </div>

        {/* Actividades Recientes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 xl:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-6 bg-[#7A1C1C] rounded-full mr-3"></span>
              Actividades Recientes
            </h2>
            <button className="bg-[#952626] text-white px-4 py-2 rounded-xl hover:bg-[#7A1C1C] transition-colors text-sm font-medium">
              Ver Todas →
            </button>
          </div>
          <div className="space-y-4">
            {data.recentActivities.map(activity => (
              <div key={`${activity.id}-${activity.type}`} className="flex items-center justify-between p-5 bg-gradient-to-r from-[#f8f4f0] to-white rounded-xl border border-gray-200 hover:border-[#952626]/30 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f8f4f0] to-[#f0e6e0] rounded-xl flex items-center justify-center border border-[#952626]/20">
                    <span className="text-xl">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{activity.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-gray-600 text-sm">{activity.classroom}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-600 text-sm">{activity.duration}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-600 text-sm">{activity.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#952626]">{activity.engagement}%</div>
                      <div className="text-gray-500 text-xs">engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#7A1C1C]">{activity.completion}%</div>
                      <div className="text-gray-500 text-xs">completado</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Aulas y Estudiantes */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="w-2 h-6 bg-[#952626] rounded-full mr-3"></span>
            Mis Aulas y Estudiantes
          </h2>
          <div className="text-sm text-gray-500">
            {data.overallStats.totalStudents} estudiantes en total
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.classrooms.map(classroom => (
            <div key={classroom.id} className="bg-gradient-to-br from-[#f8f4f0] to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{classroom.name}</h3>
                  <p className="text-gray-600">Grado {classroom.grade} • {classroom.students.length} estudiantes</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Progreso promedio</div>
                  <div className="text-xl font-bold text-[#7A1C1C]">
                    {Math.round(classroom.students.reduce((acc, s) => acc + s.progress, 0) / classroom.students.length)}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {classroom.students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#952626]/30 transition-all duration-200 hover:shadow-sm">
                    <div className="flex items-center space-x-4 flex-1">
                      <span className={`text-2xl ${getRiskColor(student.risk_score)}`}>
                        {getEmotionIcon(student.last_emotion)}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{student.full_name}</div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="text-xs text-gray-500">
                            {student.nickname && `"${student.nickname}" • `}Edad: {student.age}
                          </div>
                          <div className="text-xs text-gray-500">
                            Progreso: <span className={`font-bold ${getProgressColor(student.progress)}`}>{student.progress}%</span>
                          </div>
                          {student.risk_score > 0 && (
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskBgColor(student.risk_score)} ${getRiskColor(student.risk_score)}`}>
                              Riesgo: {student.risk_score}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar individual */}
                    <div className="w-20">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressGradient(student.progress)} transition-all duration-500`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximas Sesiones */}
      {data.upcomingSessions.length > 0 && (
        <div className="bg-gradient-to-r from-[#5D0B0B] to-[#952626] rounded-2xl shadow-lg border border-[#7A1C1C] p-6 text-white">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="mr-3 text-2xl">⏰</span>
            Próximas Sesiones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.upcomingSessions.map(session => (
              <div key={session.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{session.title}</h3>
                    <p className="text-white/80 text-sm">{session.classroom}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white/90 font-semibold">{session.date}</div>
                    <div className="text-white/70 text-sm">{session.time}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    {session.students} estudiantes
                  </span>
                  <button className="bg-white text-[#952626] px-3 py-1 rounded-lg text-sm font-bold hover:bg-white/90 transition-colors">
                    Preparar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>)}
    </div>
  )
}