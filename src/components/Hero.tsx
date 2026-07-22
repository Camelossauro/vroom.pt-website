import { Play, BellRing, Smartphone, Award, BadgeCheck, ChevronRight, UserPlus, FileText, Bell } from 'lucide-react';

interface HeroProps {
  onOpenPortal: (mode: 'login' | 'register' | 'dashboard') => void;
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onOpenPortal, onScrollToSection }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 bg-[#0F1115] overflow-hidden border-b border-[#262B37]"
    >
      {/* Premium dark grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-85" />

      {/* Subtle orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column - Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Main Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6 sm:mb-6">
              O <span className="text-brand-blue">Motorsport</span> <br className="hidden sm:block" />
              Nacional
            </h1>

            {/* Supportive Paragraph */}
            <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-8 max-w-xl">
              Unimos todo o automobilismo português numa plataforma única. 
              Calendários oficiais e mapas de troços na palma da mão. 
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
              <button
                onClick={() => onOpenPortal('register')}
                className="flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-hover transition-all text-sm sm:text-base cursor-pointer shadow-lg shadow-brand-blue/20"
              >
                <UserPlus className="w-4 h-4 text-white" />
                Registo de Organização
              </button>
              
              <button
                onClick={() => onScrollToSection('events')}
                className="flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 bg-slate-900/50 hover:bg-[#262B37] text-white border border-[#262B37] font-semibold rounded-xl transition-all text-sm sm:text-base cursor-pointer"
              >
                Explorar Provas
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Mini Trust Badges - Balanced for mobile */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 sm:pt-6 border-t border-[#262B37] w-full">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 sm:w-5 h-5 text-brand-blue" />
                <span className="text-xs sm:text-xs font-semibold text-slate-300">Oficial</span>
              </div>
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 sm:w-5 h-5 text-brand-blue" />
                <span className="text-xs sm:text-xs font-semibold text-slate-300">Tempo Real</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 sm:w-5 h-5 text-slate-400" />
                <span className="text-xs sm:text-xs font-semibold text-slate-300">Mobile First</span>
              </div>
            </div>

          </div>

          {/* Right Column - Interactive 3D Stack / Composition - Shorter on mobile */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center">
            
            {/* Main Composition Container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] h-[480px] sm:h-[520px] select-none">
              
              {/* Back: Organizer Dashboard Preview (Stripe/Linear style window) */}
              <div className="absolute top-4 left-4 right-12 bottom-20 bg-[#1D212B] rounded-[24px] border border-[#262B37] shadow-2xl overflow-hidden transition-all duration-500 group hidden sm:block">
                {/* Window header */}
                <div className="bg-[#0F1115] px-4 py-3 flex items-center justify-between border-b border-[#262B37]">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">vroomapp.pt/clube/cam</span>
                  <Award className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                {/* Window interior */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Pedido de Registo Oficial</span>
                    <span className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded-full font-mono font-bold">AGUARDA APROVAÇÃO</span>
                  </div>
                  {/* Grid of stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#171A21] p-2.5 rounded-xl border border-[#262B37]">
                      <span className="text-xs text-slate-500 block uppercase font-mono">Tipo de Entidade</span>
                      <span className="text-xs font-bold text-white font-mono">Associação / Clube</span>
                    </div>
                    <div className="bg-[#171A21] p-2.5 rounded-xl border border-[#262B37]">
                      <span className="text-xs text-slate-500 block uppercase font-mono">Status Vroom.pt</span>
                      <span className="text-xs font-bold text-brand-blue font-mono">Pendente de Verificação</span>
                    </div>
                  </div>
                  {/* Live alert simulator */}
                  <div className="bg-brand-blue/10 border border-brand-blue/30 p-2.5 rounded-xl flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-blue flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-brand-blue rounded-full " /> Fluxo de Integração
                      </span>
                      <span className="text-xs text-slate-400">Pendente</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-tight">
                      "Os clubes criam a conta no site e gerem tudo no telemóvel após aprovação da conta."
                    </p>
                  </div>
                  {/* Subscriber Chart Placeholder */}
                  <div className="h-20 bg-[#0F1115] rounded-xl border border-[#262B37] p-2 flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">Processo Anti-Spam Ativo</span>
                    <div className="flex items-end justify-between gap-1 h-10 px-2">
                      <span className="w-full bg-[#1D212B] h-3 rounded-xl" />
                      <span className="w-full bg-[#1D212B] h-5 rounded-xl" />
                      <span className="w-full bg-[#1D212B] h-4 rounded-xl" />
                      <span className="w-full bg-brand-blue/60 h-7 rounded-xl" />
                      <span className="w-full bg-brand-blue/80 h-10 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Right: Driver profile card */}
              <div className="absolute top-1/4 right-2 w-[220px] bg-[#1D212B] rounded-xl shadow-xl border border-[#262B37] p-4 transition-all duration-500 hover:shadow-2xl z-20 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/2024-05-12_Motorsport%2C_ABB_FIA_Formula_E_World_Championship%2C_Berlin_E-Prix_2024_STP_3297_by_Stepro_%28cropped%29.jpg"
                      alt="António Félix da Costa"
                      className="w-11 h-11 rounded-full object-cover border-2 border-brand-blue"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-brand-blue text-white p-0.5 rounded-full text-xs font-bold font-mono">
                      ✓
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">António Félix da Costa</span>
                    <span className="text-xs text-slate-400">Jaguar TCS Racing</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#262B37] grid grid-cols-2 gap-1 text-center">
                  <div className="bg-[#171A21] p-1.5 rounded-xl border border-[#262B37]">
                    <span className="text-xs text-slate-400 block font-mono">STATUS</span>
                    <span className="text-xs font-bold text-emerald-400">Verificado</span>
                  </div>
                  <div className="bg-[#171A21] p-1.5 rounded-xl border border-[#262B37]">
                    <span className="text-xs text-slate-400 block font-mono">NÚMERO</span>
                    <span className="text-xs font-bold text-brand-blue font-mono">#13</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-300 text-center italic bg-[#171A21] py-1 rounded-xl border border-[#262B37]/50">
                  Verificação Manual Vroom.pt
                </div>
              </div>

              {/* Front Left: iPhone Mobile App Showcase */}
              <div 
                onClick={() => onScrollToSection('app')}
                className="absolute left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 bottom-2 w-[270px] h-[450px] sm:w-[290px] sm:h-[490px] bg-slate-950 rounded-[38px] sm:rounded-[42px] p-2 sm:p-2.5 shadow-2xl border-[5px] sm:border-[6px] border-[#262B37] transition-all duration-500 z-30 overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-brand-blue/50 group"
              >
                {/* iPhone notch/island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-40 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 block ml-auto mr-2" />
                </div>
                {/* Screen container */}
                <div className="w-full h-full rounded-[30px] sm:rounded-[34px] bg-slate-950 overflow-hidden relative flex flex-col">
                   {/* Lock screen style background */}
                   <img src="https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                   <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
                   
                   <div className="relative z-10 flex flex-col h-full pt-8 px-3.5 sm:pt-10 sm:px-4">
                     <span className="text-white text-4xl sm:text-5xl font-light text-center mt-2 sm:mt-4 mb-1 tracking-tight">09:41</span>
                     <span className="text-slate-300 text-[11px] sm:text-xs text-center mb-5 sm:mb-7 font-medium">Domingo, 19 de Julho</span>
                     
                     <div className="bg-slate-900/90 backdrop-blur-2xl rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-white/10 flex gap-3 items-start w-full">
                       <img 
                         src="https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg" 
                         alt="Autódromo do Algarve" 
                         className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover shadow-md flex-shrink-0"
                       />
                       <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                               <div className="bg-brand-blue/20 p-1 rounded-md flex-shrink-0">
                                 <Bell className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-blue" />
                               </div>
                               <span className="text-white/90 text-[10px] sm:text-xs font-bold tracking-wider uppercase font-mono truncate">Vroom.pt</span>
                            </div>
                            <span className="text-white/40 text-[9px] sm:text-[10px] font-mono flex-shrink-0 ml-1">agora</span>
                         </div>
                         <h5 className="text-white font-bold text-xs sm:text-xs mb-0.5 leading-snug">O evento está a começar!</h5>
                         <p className="text-slate-300 text-[10px] sm:text-[11px] leading-relaxed">O circuito do Algarve aguarda por si. Prepare-se para a adrenalina.</p>
                       </div>
                     </div>
                   </div>

                   {/* Quick Action Button - Inside Phone */}
                   <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-full px-5">
                      <button className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white text-xs sm:text-sm font-bold py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all">
                        <Play className="w-3 h-3 fill-white" /> Explorar App
                      </button>
                   </div>
                </div>
              </div>

              {/* Removing original floating button as it's now inside the phone */}
              {/* Floating Labels / Visual cues */}
              <div className="hidden sm:block">
              </div>

            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
