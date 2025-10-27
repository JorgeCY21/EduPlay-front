export default function DashboardEstudiante() {
  const actividades = [
    { id: 1, nombre: 'Introducción a Álgebra', curso: 'Matemáticas', estado: 'completada' },
    { id: 2, nombre: 'Ecuaciones Lineales', curso: 'Matemáticas', estado: 'en-progreso' },
    { id: 3, nombre: 'Revolución Industrial', curso: 'Historia', estado: 'pendiente' }
  ]

  return (
    <div className="space-y-6">
      {/* Banner de bienvenida */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">¡Bienvenido, Ana!</h1>
        <p>Continúa con tus actividades pendientes</p>
      </div>

      {/* Actividades recientes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Tus Actividades</h2>
        <div className="space-y-3">
          {actividades.map(actividad => (
            <div key={actividad.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{actividad.nombre}</h3>
                <p className="text-sm text-gray-500">{actividad.curso}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                actividad.estado === 'completada' ? 'bg-green-100 text-green-800' :
                actividad.estado === 'en-progreso' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {actividad.estado === 'completada' ? 'Completada' :
                 actividad.estado === 'en-progreso' ? 'En Progreso' : 'Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot flotante */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <span className="text-xl">💬</span>
        </button>
      </div>
    </div>
  )
}