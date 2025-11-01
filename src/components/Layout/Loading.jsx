export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0504] via-[#2a0705] to-[#3a0906] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos de fondo similares a login/register */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas animadas */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#FD655E] rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#FB190D] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-[#CE0D03] rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#B30C03] rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-3/4 left-1/5 w-3 h-3 bg-[#7C0902] rounded-full animate-pulse opacity-70"></div>
        
        {/* Efectos de brillo */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#FD655E] rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#7C0902] rounded-full blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Grid de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,25,13,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,25,13,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_30%,transparent_100%)]"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="relative">
          {/* Spinner exterior */}
          <div className="w-20 h-20 border-4 border-[#FB190D]/30 rounded-full animate-spin"></div>
          
          {/* Spinner interior (sentido contrario) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-[#FD655E]/50 rounded-full animate-spin animate-reverse"></div>
          
          {/* Punto central animado */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-gradient-to-r from-[#FD655E] to-[#7C0902] rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Textos */}
        <p className="mt-6 text-[#FD655E] font-medium text-lg">Cargando EduPlay...</p>
        <p className="mt-2 text-white/70 text-sm">Preparando tu experiencia inteligente</p>
        
        {/* Indicadores adicionales */}
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-[#FD655E] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-[#FB190D] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-[#CE0D03] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>

      {/* Estilos para animación reverse */}
      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  )
}