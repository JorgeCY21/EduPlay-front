import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function PerfilDocente() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    specialty: user?.teacher?.specialty || 'Matemáticas',
    assignedGrade: user?.teacher?.assignedGrade || 10,
    bio: 'Profesor con 10 años de experiencia en educación secundaria, apasionado por la enseñanza innovadora.',
    avatar: '👨‍🏫'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Datos guardados:', formData)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const avatars = ['👨‍🏫', '🧑‍🏫', '👨‍💼', '🧑‍💼', '😊', '🤓', '🎓', '📚']

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header del Perfil */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl shadow-lg border border-teal-100 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-teal-200 text-4xl">
                {formData.avatar}
              </div>
              {isEditing && (
                <button 
                  type="button"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm shadow-lg hover:bg-teal-600 transition-colors"
                >
                  ✏️
                </button>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{formData.full_name}</h1>
              <p className="text-teal-600 font-medium">{formData.specialty}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                  Grado {formData.assignedGrade}
                </span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                  👨‍🏫 Docente
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              isEditing 
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg' 
                : 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg'
            }`}
          >
            {isEditing ? '❌ Cancelar' : '✏️ Editar Perfil'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="w-2 h-6 bg-teal-500 rounded-full mr-3"></span>
              Información Personal
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-300 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-300 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Especialidad
                  </label>
                  <select 
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-300 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Ciencias">Ciencias</option>
                    <option value="Literatura">Literatura</option>
                    <option value="Historia">Historia</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Arte">Arte</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Grado Asignado
                  </label>
                  <select 
                    name="assignedGrade"
                    value={formData.assignedGrade}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-300 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <option key={grade} value={grade}>{grade}° Grado</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Biografía Profesional
                </label>
                <textarea 
                  rows={4}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-300 resize-none disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {isEditing && (
                <div className="flex space-x-4 pt-4">
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    💾 Guardar Cambios
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all duration-300"
                  >
                    ↩️ Descartar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar - Avatar y Estadísticas */}
        <div className="space-y-6">
          {/* Selector de Avatar */}
          {isEditing && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Seleccionar Avatar</h3>
              <div className="grid grid-cols-4 gap-3">
                {avatars.map(avatar => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                      formData.avatar === avatar 
                        ? 'bg-teal-500 text-white scale-110 shadow-lg' 
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tarjeta de Estadísticas */}
          <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-4">📈 Mi Impacto</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-cyan-100">Estudiantes</span>
                <span className="font-bold text-xl">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-100">Actividades</span>
                <span className="font-bold text-xl">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-100">Engagement</span>
                <span className="font-bold text-xl">84%</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Logros */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">🏆 Logros</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-semibold text-amber-800">Educador Destacado</p>
                  <p className="text-xs text-amber-600">+85% engagement</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-xl border border-teal-200">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold text-teal-800">Innovador IA</p>
                  <p className="text-xs text-teal-600">15 actividades creadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}