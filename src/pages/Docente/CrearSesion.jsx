import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getEnrollment } from '../../services/enrollement.services'
import { createActivity } from '../../services/activity.services';
import { createActividadesAI } from '../../services/ai.services';

const colorPalette = [
  'from-[#5D0B0B] to-[#7A1C1C]',
  'from-[#7A1C1C] to-[#952626]',
  'from-[#952626] to-[#B03030]',
  'from-[#B03030] to-[#CB3A3A]',
  'from-[#CB3A3A] to-[#E14444]',
  'from-[#7B1113] to-[#A8191C]',
  'from-[#9E1A1A] to-[#C62828]',
  'from-[#8B0000] to-[#A52A2A]',
  'from-[#A52A2A] to-[#C04C4C]',
  'from-[#6E0D0D] to-[#8F1E1E]'
];

let usedColors = [];
let colorIndex = 0;

function getUniqueColor() {
  if (usedColors.length >= colorPalette.length) {
    usedColors = []; // reinicia si ya se usaron todos
    colorIndex = 0;
  }

  const color = colorPalette[colorIndex];
  usedColors.push(color);
  colorIndex++;

  return color;
}

export default function CrearSesion() {
  const { user } = useAuth()
  const [paso, setPaso] = useState('seleccionar-curso')
  const [loading, setLoading] = useState(true)
  const [cursos, setCursos] = useState()
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null)
  const [configuracion, setConfiguracion] = useState({
    titulo: '',
    descripcion: '',
    introduccion: true,
    actividades: [
      { id: 1, tipo: 'flashcards', nombre: 'Tarjetas de Memoria', activa: true, config: { cantidad: 10, tema: '' } },
      { id: 2, tipo: 'memory', nombre: 'Juego de Memoria', activa: true, config: { pares: 8, tema: '' } },
      { id: 3, tipo: 'quiz', nombre: 'Evaluación Rápida', activa: false, config: { preguntas: 5, tema: '' } },
      { id: 4, tipo: 'relations', nombre: 'Relacionar Conceptos', activa: true, config: { items: 6, tema: '' } }
    ],
    repaso: true,
    evaluacion: true,
    tiempoEstimado: 45,
    dificultad: 'media'
  })
  const [activity_id, setActivity_id] = useState(null)

  const [materiales, setMateriales] = useState([])
  const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', url: '', tipo: 'video' })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const data = await getEnrollment(user.teacher.id);

      const cursosConColores = data.map(dt => ({

        id: dt.id,
        nombre: dt.course.name,
        estudiantes: dt.totalStudents,
        grado: dt.grades[0],
        descripcion: 'Sin descripción disponible',
        color: getUniqueColor()
      }))

      setCursos(cursosConColores)

      setLoading(false)
    }

    fetchData();
  }, [user?.teacher?.id])


  const tiposActividad = {
    flashcards: { icon: '📚', color: 'bg-[#f8f4f0] text-[#5D0B0B] border border-[#5D0B0B]/20' },
    memory: { icon: '🧠', color: 'bg-[#f8f4f0] text-[#7A1C1C] border border-[#7A1C1C]/20' },
    quiz: { icon: '📝', color: 'bg-[#f8f4f0] text-[#952626] border border-[#952626]/20' },
    relations: { icon: '🔗', color: 'bg-[#f8f4f0] text-[#B03030] border border-[#B03030]/20' }
  }

  const agregarMaterial = () => {
    if (nuevoMaterial.titulo && nuevoMaterial.url) {
      setMateriales([...materiales, { ...nuevoMaterial, id: Date.now() }])
      setNuevoMaterial({ titulo: '', url: '', tipo: 'video' })
    }
  }

  const eliminarMaterial = (id) => {
    setMateriales(materiales.filter(m => m.id !== id))
  }

  const agregarActividad = async () => {
    /* const nuevaActividad = {
      id: Date.now(),
      tipo: 'flashcards',
      nombre: 'Nueva Actividad',
      activa: true,
      config: { cantidad: 10, tema: '' }
    }
    setConfiguracion({
      ...configuracion,
      actividades: [...configuracion.actividades, nuevaActividad]
    }) */

    const data = await createActividadesAI(activity_id, {
      topic: configuracion.titulo,
      context: configuracion.descripcion,
      minItems: 3
    })

    console.log(data);
  }

  const eliminarActividad = (id) => {
    setConfiguracion({
      ...configuracion,
      actividades: configuracion.actividades.filter(a => a.id !== id)
    })
  }

  const generarConIA = (actividadIndex) => {
    const actividades = [...configuracion.actividades]
    actividades[actividadIndex].config.tema = `Tema generado para ${actividades[actividadIndex].nombre}`

    setConfiguracion({
      ...configuracion,
      actividades
    })

    alert(`¡Contenido generado para ${actividades[actividadIndex].nombre}!`)
  }

  const crearSesion = () => {
    console.log('Creando sesión:', {
      curso: cursoSeleccionado,
      configuracion,
      materiales
    })
    alert('¡Sesión creada exitosamente!')
  }

  const handleGuardar = async () => {
    const data = await createActivity({
      title: configuracion.titulo,
      description: configuracion.descripcion,
      enrollment_id: cursoSeleccionado.id,
      hasIntroduction: configuracion.introduccion,
    })
    setActivity_id(data.id);
    console.log(data);
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  // Paso 1: Seleccionar Curso
  if (paso === 'seleccionar-curso') {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Nueva Sesión</h1>
          <p className="text-gray-600">Selecciona el curso para tu sesión educativa</p>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {cursos.map(curso => (
            <div
              key={curso.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
              onClick={() => {
                setCursoSeleccionado(curso)
                setPaso('personalizar-sesion')
              }}
            >
              {/* Header con gradiente guinda */}
              <div className={`bg-gradient-to-r ${curso.color} p-6 text-white`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{curso.nombre}</h3>
                    <p className="text-white/90 text-sm">{curso.descripcion}</p>
                  </div>
                  <div className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                    Grado {curso.grado}
                  </div>
                </div>
              </div>

              {/* Contenido del curso */}
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      👨‍🎓 {curso.estudiantes} estudiantes
                    </span>
                    <span className="flex items-center">
                      📚 12 actividades
                    </span>
                  </div>
                </div>

                {/* Progress bar con color guinda */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progreso promedio</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#952626] to-[#CB3A3A] h-2 rounded-full transition-all duration-500"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Última sesión: Hoy</span>
                  <div className="text-2xl text-[#B03030] group-hover:translate-x-1 transition-transform">→</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#5D0B0B]">4</div>
            <div className="text-sm text-gray-600">Cursos activos</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#7A1C1C]">95</div>
            <div className="text-sm text-gray-600">Estudiantes totales</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#952626]">48</div>
            <div className="text-sm text-gray-600">Sesiones creadas</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#B03030]">92%</div>
            <div className="text-sm text-gray-600">Engagement promedio</div>
          </div>
        </div>
      </div>
    )
  }

  // Paso 2: Personalizar Sesión
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header con breadcrumbs */}
      <div className="flex items-center justify-between">
        <div>
          <nav className="flex space-x-2 text-sm text-gray-500 mb-2">
            <button
              onClick={() => setPaso('seleccionar-curso')}
              className="hover:text-[#B03030] transition-colors"
            >
              Cursos
            </button>
            <span>→</span>
            <span className="text-[#5D0B0B] font-medium">{cursoSeleccionado.nombre}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">Personalizar Sesión</h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Tiempo estimado</div>
          <div className="text-lg font-bold text-[#B03030]">{configuracion.tiempoEstimado} min</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información básica */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de la Sesión</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la sesión
                </label>
                <input
                  type="text"
                  value={configuracion.titulo}
                  onChange={(e) =>
                    setConfiguracion({ ...configuracion, titulo: e.target.value })
                  }
                  placeholder="Ej: Introducción a las Fracciones"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B03030] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={configuracion.descripcion}
                  onChange={(e) =>
                    setConfiguracion({ ...configuracion, descripcion: e.target.value })
                  }
                  placeholder="Describe los objetivos de aprendizaje..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B03030] focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Botón de Guardar */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleGuardar}
                className="px-6 py-3 bg-gradient-to-r from-[#B03030] to-[#CB3A3A] text-white font-semibold rounded-xl shadow-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                Guardar cambios
              </button>
            </div>
          </div>

          {/* Configuración de Actividades */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Actividades de Aprendizaje</h3>
              <button
                onClick={agregarActividad}
                className="bg-[#B03030] text-white px-4 py-2 rounded-xl hover:bg-[#952626] transition-colors flex items-center space-x-2"
              >
                <span>+</span>
                <span>Agregar Actividad</span>
              </button>
            </div>

            <div className="space-y-4">
              {configuracion.actividades.map((actividad, index) => (
                <div key={actividad.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#B03030]/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${tiposActividad[actividad.tipo].color}`}>
                        {tiposActividad[actividad.tipo].icon} {actividad.nombre}
                      </span>
                      <button
                        onClick={() => eliminarActividad(actividad.id)}
                        className="text-[#952626] hover:text-[#5D0B0B] transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={actividad.activa}
                        onChange={(e) => {
                          const nuevasActividades = [...configuracion.actividades]
                          nuevasActividades[index].activa = e.target.checked
                          setConfiguracion({ ...configuracion, actividades: nuevasActividades })
                        }}
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-[#B03030]/30 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B03030]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={actividad.nombre}
                        onChange={(e) => {
                          const nuevasActividades = [...configuracion.actividades]
                          nuevasActividades[index].nombre = e.target.value
                          setConfiguracion({ ...configuracion, actividades: nuevasActividades })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B03030] focus:border-transparent"
                        placeholder="Nombre de la actividad"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => generarConIA(index)}
                        className="flex-1 bg-gradient-to-r from-[#952626] to-[#B03030] text-white px-3 py-2 rounded-lg hover:from-[#7A1C1C] hover:to-[#952626] transition-all duration-200 text-sm"
                      >
                        🧠 Generar con IA
                      </button>
                    </div>
                  </div>

                  {actividad.config.tema && (
                    <div className="mt-3 p-3 bg-[#f8f4f0] rounded-lg border border-[#B03030]/20">
                      <div className="text-sm text-[#5D0B0B]">
                        <strong>Tema generado:</strong> {actividad.config.tema}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Materiales Adicionales */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Materiales de Apoyo</h3>

            <div className="space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Título del material"
                  value={nuevoMaterial.titulo}
                  onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, titulo: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B03030] focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="URL del recurso"
                  value={nuevoMaterial.url}
                  onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, url: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B03030] focus:border-transparent"
                />
                <select
                  value={nuevoMaterial.tipo}
                  onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, tipo: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B03030] focus:border-transparent"
                >
                  <option value="video">🎥 Video</option>
                  <option value="document">📄 Documento</option>
                  <option value="link">🔗 Enlace</option>
                  <option value="image">🖼️ Imagen</option>
                </select>
              </div>
              <button
                onClick={agregarMaterial}
                className="bg-[#B03030] text-white px-4 py-2 rounded-lg hover:bg-[#952626] transition-colors w-full"
              >
                + Agregar Material
              </button>
            </div>

            <div className="space-y-2">
              {materiales.map(material => (
                <div key={material.id} className="flex items-center justify-between p-3 bg-[#f8f4f0] rounded-lg border border-[#B03030]/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {material.tipo === 'video' ? '🎥' :
                        material.tipo === 'document' ? '📄' :
                          material.tipo === 'image' ? '🖼️' : '🔗'}
                    </span>
                    <div>
                      <div className="font-medium text-gray-800">{material.titulo}</div>
                      <div className="text-sm text-gray-600 truncate max-w-xs">{material.url}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarMaterial(material.id)}
                    className="text-[#952626] hover:text-[#5D0B0B] transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Resumen de configuración */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración</h3>

            <div className="space-y-4">
              {/* Tiempo estimado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo estimado (min)</label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={configuracion.tiempoEstimado}
                  onChange={(e) => setConfiguracion({ ...configuracion, tiempoEstimado: parseInt(e.target.value) })}
                  className="w-full accent-[#B03030]"
                />
                <div className="text-center text-lg font-bold text-[#B03030] mt-2">
                  {configuracion.tiempoEstimado} minutos
                </div>
              </div>

              {/* Dificultad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de dificultad</label>
                <select
                  value={configuracion.dificultad}
                  onChange={(e) => setConfiguracion({ ...configuracion, dificultad: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B03030] focus:border-transparent"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              {/* Secciones adicionales */}
              <div className="space-y-3">
                {[
                  { key: 'introduccion', label: 'Introducción', icon: '🎯' },
                  { key: 'repaso', label: 'Sesión de repaso', icon: '🔄' },
                  { key: 'evaluacion', label: 'Evaluación final', icon: '📊' }
                ].map(seccion => (
                  <div key={seccion.key} className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span>{seccion.icon}</span>
                      <span>{seccion.label}</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={configuracion[seccion.key]}
                        onChange={(e) => setConfiguracion({
                          ...configuracion,
                          [seccion.key]: e.target.checked
                        })}
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-[#B03030]/30 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B03030]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vista previa rápida */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vista Previa</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Actividades activas:</span>
                <span className="font-medium text-[#B03030]">
                  {configuracion.actividades.filter(a => a.activa).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Materiales:</span>
                <span className="font-medium text-[#952626]">{materiales.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estudiantes:</span>
                <span className="font-medium text-[#7A1C1C]">{cursoSeleccionado.estudiantes}</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={() => setPaso('seleccionar-curso')}
              className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
            >
              ← Volver a Cursos
            </button>
            <button
              onClick={crearSesion}
              className="w-full bg-gradient-to-r from-[#7A1C1C] to-[#B03030] text-white px-6 py-3 rounded-xl hover:from-[#5D0B0B] hover:to-[#7A1C1C] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              🚀 Crear Sesión Educativa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}