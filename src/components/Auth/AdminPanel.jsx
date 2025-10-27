import { useState } from 'react'
import { getMockUsers } from '../../data/mockUsers'

export default function AdminPanel() {
  const [usuarios] = useState(getMockUsers())

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            👥 Panel de Administración (Temporal)
          </h1>
          <p className="text-gray-600 mb-6">
            Esta es una vista temporal para ver los usuarios mock. Solo visible en desarrollo.
          </p>

          <div className="grid gap-4">
            {usuarios.map(usuario => (
              <div key={usuario.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {usuario.nombres} {usuario.apellidos}
                    </h3>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                      usuario.rol === 'docente' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {usuario.rol}
                    </span>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    ID: {usuario.id}
                  </div>
                </div>
                {usuario.especialidad && (
                  <p className="text-sm mt-2">
                    <strong>Especialidad:</strong> {usuario.especialidad}
                  </p>
                )}
                {usuario.grado && (
                  <p className="text-sm mt-1">
                    <strong>Grado:</strong> {usuario.grado}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Credenciales de prueba:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Docente:</strong> maria.docente@escuela.edu / Docente123!</p>
              <p><strong>Estudiante:</strong> ana.estudiante@escuela.edu / Estudiante123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}