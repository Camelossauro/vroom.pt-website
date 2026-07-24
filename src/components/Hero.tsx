import { Play, BellRing, Smartphone, Award, BadgeCheck, ChevronRight, UserPlus, FileText, Bell, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6 sm:mb-6"
            >
              O <span className="text-brand-blue">Motorsport</span> <br className="hidden sm:block" />
              Nacional
            </motion.h1>

            {/* Supportive Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-8 max-w-xl"
            >
              Unimos todo o automobilismo português numa plataforma única. 
              Calendários oficiais e mapas de troços na palma da mão. 
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 25 }}
                onClick={() => onOpenPortal('register')}
                className="relative group overflow-hidden flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold rounded-xl text-sm sm:text-base cursor-pointer shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all"
              >
                {/* Subtle shine sweep on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <UserPlus className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                <span>Registo de Organização</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 25 }}
                onClick={() => onScrollToSection('events')}
                className="group flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 bg-slate-900/60 hover:bg-[#262B37] text-white border border-[#262B37] hover:border-slate-500 font-semibold rounded-xl text-sm sm:text-base cursor-pointer transition-all shadow-md"
              >
                <span>Explorar Provas</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </motion.button>
            </motion.div>

            {/* Mini Trust Badges - Balanced for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 sm:pt-6 border-t border-[#262B37] w-full"
            >
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
            </motion.div>

          </motion.div>

          {/* Right Column - Interactive 3D Stack / Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center"
          >
                  {/* Main Composition Container - Expanded width and clear spacing */}
            <div className="relative w-full max-w-[520px] sm:max-w-[580px] h-[520px] sm:h-[550px] select-none">
              
              {/* Top-Right: Organizer Dashboard Preview Window */}
              <div className="absolute top-0 right-0 sm:right-1 w-[280px] sm:w-[320px] bg-[#1D212B] rounded-2xl border border-[#262B37] shadow-2xl overflow-hidden transition-all duration-300 z-10 hidden sm:block hover:scale-[1.02]">
                {/* Window header */}
                <div className="bg-[#0F1115] px-3.5 py-2.5 flex items-center justify-between border-b border-[#262B37]">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">vroomapp.pt/painel/organizador</span>
                  <Award className="w-3.5 h-3.5 text-brand-blue" />
                </div>
                {/* Window interior */}
                <div className="p-3.5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">Clube Automóvel do Minho</span>
                    <span className="text-[9.5px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold flex-shrink-0">VERIFICADO ✓</span>
                  </div>
                  {/* Grid of stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#171A21] p-2 rounded-xl border border-[#262B37]">
                      <span className="text-[9.5px] text-slate-400 block uppercase font-mono">Próximo Evento</span>
                      <span className="text-xs font-bold text-white font-mono truncate block">Rali de Mortágua</span>
                    </div>
                    <div className="bg-[#171A21] p-2 rounded-xl border border-[#262B37]">
                      <span className="text-[9.5px] text-slate-400 block uppercase font-mono">Equipas Inscritas</span>
                      <span className="text-xs font-bold text-brand-blue font-mono">48 Confirmadas</span>
                    </div>
                  </div>
                  {/* Live alert / Activity feed */}
                  <div className="bg-brand-blue/10 border border-brand-blue/30 p-2.5 rounded-xl flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-blue flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-brand-blue rounded-full animate-pulse" /> Sincronização GPS
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Ao Vivo</span>
                    </div>
                    <p className="text-[10.5px] text-slate-300 leading-tight">
                      Troços em tempo real, horários oficiais e notificações diretas para os fãs na app.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom-Right: Driver Profile Card */}
              <div className="absolute bottom-2 right-0 sm:right-1 w-[260px] sm:w-[290px] bg-[#1D212B] rounded-2xl shadow-2xl border border-[#262B37] p-3.5 transition-all duration-300 z-20 hidden sm:block hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/2024-05-12_Motorsport%2C_ABB_FIA_Formula_E_World_Championship%2C_Berlin_E-Prix_2024_STP_3297_by_Stepro_%28cropped%29.jpg"
                      alt="António Félix da Costa"
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-blue"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-brand-blue text-white w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center font-mono">
                      ✓
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-white block truncate">António Félix da Costa</span>
                    <span className="text-[11px] text-slate-400 block truncate">Piloto Oficial • Motorsport</span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-[#262B37] grid grid-cols-2 gap-1.5 text-center">
                  <div className="bg-[#171A21] p-1.5 rounded-xl border border-[#262B37]">
                    <span className="text-[10px] text-slate-400 block font-mono">PERFIL</span>
                    <span className="text-xs font-bold text-emerald-400">Verificado</span>
                  </div>
                  <div className="bg-[#171A21] p-1.5 rounded-xl border border-[#262B37]">
                    <span className="text-[10px] text-slate-400 block font-mono">NÚMERO</span>
                    <span className="text-xs font-bold text-brand-blue font-mono">#13</span>
                  </div>
                </div>
              </div>

              {/* Left Side: iPhone Mobile App Showcase */}
              <div 
                onClick={() => onScrollToSection('app')}
                className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 bottom-2 w-[260px] h-[450px] sm:w-[275px] sm:h-[480px] bg-slate-950 rounded-[38px] sm:rounded-[42px] p-2 sm:p-2.5 shadow-2xl border-[5px] sm:border-[6px] border-[#262B37] transition-all duration-300 z-30 overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-brand-blue/50 group"
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
                   
                   <div className="relative z-10 flex flex-col h-full pt-8 px-3 sm:pt-10 sm:px-3.5">
                     <span className="text-white text-3xl sm:text-4xl font-light text-center mt-1 sm:mt-2 mb-0.5 tracking-tight">09:41</span>
                     <span className="text-slate-400 text-[10px] sm:text-[11px] text-center mb-3 sm:mb-4 font-medium">Domingo, 19 de Julho</span>
                     
                     <div className="flex flex-col gap-2 w-full">
                       {/* Main Event Notification */}
                       <div className="bg-[#171A21]/95 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 shadow-xl border border-white/10 flex gap-2.5 items-start">
                         <img 
                           src="https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg" 
                           alt="Autódromo do Algarve" 
                           className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-md flex-shrink-0 mt-0.5"
                         />
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-center mb-0.5">
                              <div className="flex items-center gap-1 min-w-0">
                                 <div className="bg-brand-blue/20 p-0.5 rounded flex-shrink-0">
                                   <Bell className="w-2.5 h-2.5 text-brand-blue" />
                                 </div>
                                 <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase font-mono truncate">Vroom.pt</span>
                              </div>
                              <span className="text-white/40 text-[9px] font-mono flex-shrink-0 ml-1">agora</span>
                           </div>
                           <h5 className="text-white font-bold text-[11px] sm:text-xs mb-0.5 leading-tight">O evento está a começar!</h5>
                           <p className="text-slate-300 text-[10px] sm:text-[10.5px] leading-snug line-clamp-2">O circuito do Algarve aguarda por si. Prepare-se para a adrenalina.</p>
                         </div>
                       </div>

                       {/* Secondary Real-time Stage Notification */}
                       <div className="bg-[#171A21]/80 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-white/10 flex gap-2.5 items-center">
                         <div className="w-8 h-8 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                           <MapPin className="w-4 h-4 text-brand-blue" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-center mb-0.5">
                             <span className="text-brand-blue text-[10px] font-bold font-mono uppercase tracking-wider">Rali ao Vivo</span>
                             <span className="text-white/40 text-[9px] font-mono">há 12m</span>
                           </div>
                           <p className="text-white text-[10.5px] font-semibold leading-tight truncate">Rali de Mortágua • SS3 Ativo</p>
                           <p className="text-slate-400 text-[9.5px] leading-none mt-0.5 truncate">Acompanhe tempos e troços no mapa</p>
                         </div>
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

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
