import { useState } from 'react'

export default function DashboardDocente() {
  const [estudiantes] = useState([
    { id: 1, nombre: 'Ana García', estadoEmocional: '😊', rendimiento: 85 },
    { id: 2, nombre: 'Carlos López', estadoEmocional: '😐', rendimiento: 72 },
    { id: 3, nombre: 'María Rodríguez', estadoEmocional: '😢', rendimiento: 65 }
  ])

  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null)

  return (
    <div className="space-y-6">
      {/* Última Sesión */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Última Sesión</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-blue-600">Asistencia</p>
            <p className="text-2xl font-bold">85%</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-sm text-green-600">Participación</p>
            <p className="text-2xl font-bold">78%</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <p className="text-sm text-yellow-600">Tiempo Activo</p>
            <p className="text-2xl font-bold">45min</p>
          </div>
        </div>
      </div>

      {/* Estado Emocional de la Clase */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Estado Emocional de la Clase</h2>
        <div className="flex space-x-4">
          <div className="text-center">
            <span className="text-4xl">😊</span>
            <p className="text-sm">60%</p>
          </div>
          <div className="text-center">
            <span className="text-4xl">😐</span>
            <p className="text-sm">25%</p>
          </div>
          <div className="text-center">
            <span className="text-4xl">😢</span>
            <p className="text-sm">15%</p>
          </div>
        </div>
      </div>

      {/* Lista de Estudiantes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Estudiantes</h2>
        <div className="space-y-3">
          {estudiantes.map(estudiante => (
            <div 
              key={estudiante.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setEstudianteSeleccionado(estudiante)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{estudiante.estadoEmocional}</span>
                <div>
                  <p className="font-medium">{estudiante.nombre}</p>
                  <p className="text-sm text-gray-500">Rendimiento: {estudiante.rendimiento}%</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">Ver detalles</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalles del Estudiante */}
      {estudianteSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{estudianteSeleccionado.nombre}</h3>
            <div className="space-y-3">
              <p><strong>Estado Emocional:</strong> {estudianteSeleccionado.estadoEmocional}</p>
              <p><strong>Rendimiento Académico:</strong> {estudianteSeleccionado.rendimiento}%</p>
              <p><strong>Asistencia:</strong> 90%</p>
              <p><strong>Última Actividad:</strong> Hace 2 días</p>
            </div>
            <button 
              onClick={() => setEstudianteSeleccionado(null)}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}