export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-emerald-500/50 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-cyan-300 font-medium">Cargando EduPlay...</p>
        <p className="mt-2 text-slate-400 text-sm">Preparando tu experiencia inteligente</p>
      </div>
    </div>
  )
}