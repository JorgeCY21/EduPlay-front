import { useState } from 'react'

export default function CrearSesion() {
  const [paso, setPaso] = useState('seleccionar-curso')
  const [cursoSeleccionado, setCursoSeleccionado] = useState('')
  const [configuracion, setConfiguracion] = useState({
    introduccion: true,
    actividades: [
      { id: 1, nombre: 'Actividad 1', activa: true },
      { id: 2, nombre: 'Actividad 2', activa: true },
      { id: 3, nombre: 'Actividad 3', activa: false }
    ],
    repaso: true,
    evaluacion: true
  })

  const cursos = ['Matemáticas 1A', 'Ciencias Naturales', 'Historia', 'Literatura']

  // Paso 1: Seleccionar Curso
  if (paso === 'seleccionar-curso') {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Seleccionar Curso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cursos.map(curso => (
            <div 
              key={curso}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => {
                setCursoSeleccionado(curso)
                setPaso('personalizar-sesion')
              }}
            >
              <h3 className="font-semibold text-lg">{curso}</h3>
              <p className="text-gray-600">25 estudiantes</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Paso 2: Personalizar Sesión
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Personalizar Sesión - {cursoSeleccionado}</h2>
        
        {/* Agregar Cards y Material */}
        <div className="mb-6 space-y-4">
          <h3 className="font-semibold">Contenido de la Sesión</h3>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Agregar Cards
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Agregar Material
            </button>
          </div>
        </div>

        {/* Configuración de Secciones */}
        <div className="space-y-4">
          <h3 className="font-semibold">Configurar Secciones</h3>
          
          {/* Introducción */}
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Introducción</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={configuracion.introduccion}
                onChange={(e) => setConfiguracion({
                  ...configuracion,
                  introduccion: e.target.checked
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Actividades */}
          {configuracion.actividades.map((actividad, index) => (
            <div key={actividad.id} className="flex items-center justify-between p-3 border rounded">
              <input 
                type="text"
                value={actividad.nombre}
                onChange={(e) => {
                  const nuevasActividades = [...configuracion.actividades]
                  nuevasActividades[index].nombre = e.target.value
                  setConfiguracion({...configuracion, actividades: nuevasActividades})
                }}
                className="border-none focus:ring-0 bg-transparent"
              />
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-800">
                  Generar con IA
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={actividad.activa}
                    onChange={(e) => {
                      const nuevasActividades = [...configuracion.actividades]
                      nuevasActividades[index].activa = e.target.checked
                      setConfiguracion({...configuracion, actividades: nuevasActividades})
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          ))}

          {/* Repaso y Evaluación */}
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Repaso</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={configuracion.repaso}
                onChange={(e) => setConfiguracion({
                  ...configuracion,
                  repaso: e.target.checked
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border rounded">
            <span>Evaluación</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={configuracion.evaluacion}
                onChange={(e) => setConfiguracion({
                  ...configuracion,
                  evaluacion: e.target.checked
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setPaso('seleccionar-curso')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Volver
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Crear Sesión
          </button>
        </div>
      </div>
    </div>
  )
}