export default function PerfilDocente() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Editar Perfil</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue="Profesor Juan Pérez"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue="juan.perez@escuela.edu"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Especialidad</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue="Matemáticas"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Biografía</label>
          <textarea 
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue="Profesor con 10 años de experiencia en educación secundaria."
          />
        </div>
        
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}