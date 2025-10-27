export default function PerfilEstudiante() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6">Mi Perfil</h2>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="font-semibold">Ana García</h3>
          <p className="text-gray-600">Estudiante - 1er Año</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              defaultValue="ana.garcia"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              defaultValue="ana@escuela.edu"
            />
          </div>
          
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}