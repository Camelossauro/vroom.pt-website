import { 
  Users
} from 'lucide-react';
import { mockDrivers } from '../data';

export default function DriverEcosystem() {
  const driver = mockDrivers[0];

  return (
    <section id="drivers" className="py-12 sm:py-20 bg-[#0F1115] relative border-b border-[#262B37]">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-10 sm:mb-16 items-center">
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full mb-4">
              <span className="flex h-2 w-2 relative">
                <span className=" absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              <span className="text-xs font-bold text-brand-blue uppercase font-montserrat">Verificação de Pilotos</span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-1 mb-6">
              A Área Oficial de Pilotos
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-6">
              O automobilismo nacional de elite exige qualidade e fiabilidade. No Vroom.pt, não existem registos autónomos ou perfis criados sem verificação. Cada piloto é analisado e adicionado <strong className="font-semibold text-white">manualmente pela nossa equipa</strong> para assegurar palmarés autênticos e perfis certificados.
            </p>

            
            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">
                Verificação e Estrutura
              </span>
              <p className="text-xs text-slate-400 font-light">
                Cada piloto é analisado e adicionado manualmente pela nossa equipa para assegurar palmarés autênticos e perfis certificados na aplicação móvel oficial Vroom.pt.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Immersive interactive Pilot card view */}
            <div className="bg-[#1D212B] border border-[#262B37] rounded-xl shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 relative text-left">
              {/* Profile Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#171A21] rounded-full -z-0 border-l border-b border-[#262B37]/30" />

              {/* Photo & Basic details */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-44 flex-shrink-0 relative z-10">
                <div className="relative mb-4">
                  <img 
                    src="/assets/images/regenerated_image_1784641841305.jpg" 
                    alt={driver.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-brand-blue shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 bg-brand-blue text-white p-1 rounded-full text-[10px] font-bold font-mono">
                    ✓
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-lg text-white leading-tight">
                  {driver.name}
                </h3>
                <span className="text-xs text-slate-400 font-medium mt-1 leading-tight">Jaguar TCS Racing</span>

                <div className="bg-[#171A21] border border-[#262B37] px-3 py-1 rounded-xl text-[10px] font-mono font-bold text-slate-300 mt-3">
                  NÚMERO {driver.compNumber}
                </div>

                <div className="w-full mt-4 py-2 bg-[#0F1115] border border-[#262B37] text-slate-400 text-[10px] text-center rounded-xl font-semibold uppercase tracking-wider font-mono">
                  Verificado Oficialmente
                </div>
              </div>

              {/* Comprehensive Biography and Palmares */}
              <div className="flex-1 flex flex-col justify-between relative z-10 border-t md:border-t-0 md:border-l border-[#262B37] pt-6 md:pt-0 md:pl-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold font-mono text-brand-blue uppercase">
                      Palmarés Oficial
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-5 italic">
                    "{driver.bio}"
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#262B37]">
                    <p className="text-slate-400 text-[10px] font-medium mb-3 uppercase tracking-wider font-mono">
                      Saber mais na aplicação
                    </p>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#171A21] hover:bg-brand-blue text-white text-[10px] font-bold py-2 rounded-lg border border-[#262B37] transition-all">
                        App Store
                      </button>
                      <button className="flex-1 bg-[#171A21] hover:bg-brand-blue text-white text-[10px] font-bold py-2 rounded-lg border border-[#262B37] transition-all">
                        Google Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
