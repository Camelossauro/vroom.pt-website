import React, { useState, cloneElement, ReactElement } from 'react';
import { 
  Smartphone, MapPin, Calendar, Heart, Search, Bell, Navigation, 
  Compass, ChevronRight, ChevronLeft, CircleDot, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import vroomLogoImg from '../assets/images/vroom_logo_1784301043513.jpg';
import { mockEvents, PortugueseTracks } from '../data';

const AppleLogo = () => (
  <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current text-white">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-22.9-76.9-22.4-36.6.6-70.3 21.6-89 54-39.7 69-10.2 171.9 28 227 18.6 26.9 40.5 57 69.6 56 28.2-1 38.8-18 71-18 31.9 0 41.6 18 71 17.5 29.4-.5 48.6-27.4 66.8-54 21-30.7 29.5-60.5 30-62-1.1-.5-58-22.2-58.5-86.9zM287.9 90.8c24.9-30.2 41.5-72.2 36.9-114.2-35.9 1.4-79.6 23.9-105.3 54-21.9 25.4-41.1 68-35.1 109.3 40.2 3.1 81.3-20.3 103.5-49.1z" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 flex-shrink-0">
    <path fill="#00E5FF" d="M10.2 24.3C4 30.8 0 41 0 53.4v405.1c0 12.5 4 22.7 10.2 29.1L13.1 490L264.4 256L13.1 22L10.2 24.3z" />
    <path fill="#FFC107" d="M386.1 131.6l-121.7 124.4L386.1 380.4c34.7-19.9 58.7-56.3 58.7-98.8s-24-78.9-58.7-98.8z" />
    <path fill="#FF3D00" d="M264.4 256L13.1 490c23.6 24.4 61.6 22 93 4.1l279.9-113.7L264.4 256z" />
    <path fill="#4CAF50" d="M386.1 131.6L106.1 18C74.7 .1 36.7-2.3 13.1 22L264.4 256l121.7-124.4z" />
  </svg>
);

export default function MobileAppShowcase() {
  const [activeFeature, setActiveFeature] = useState<'map' | 'calendar' | 'notifications' | 'tracks'>('map');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(PortugueseTracks[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [likedEvents, setLikedEvents] = useState<string[]>(['ev-1']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Autoplay rotation for the smartphone preview
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const featureIds: Array<'map' | 'calendar' | 'notifications' | 'tracks'> = ['map', 'calendar', 'notifications', 'tracks'];
    const interval = setInterval(() => {
      setActiveFeature(current => {
        const index = featureIds.indexOf(current);
        const nextIndex = (index + 1) % featureIds.length;
        return featureIds[nextIndex];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedEvents.includes(id)) {
      setLikedEvents(likedEvents.filter(x => x !== id));
    } else {
      setLikedEvents([...likedEvents, id]);
    }
  };

  const filteredEvents = mockEvents.filter(ev => {
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || ev.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const features = [
    {
      id: 'map',
      title: 'Mapa Interativo de Pistas',
      shortTitle: 'Mapa',
      desc: 'Encontre todos os eventos num mapa dinâmico de Portugal. Toque nos autódromos ou classificativas de rali para saber horários e rotas.',
      icon: <MapPin className="w-5 h-5 text-brand-blue" />
    },
    {
      id: 'calendar',
      title: 'Calendário & Pesquisa',
      shortTitle: 'Calendário',
      desc: 'Pesquise, filtre por rali, pista ou karting, e encontre eventos oficiais organizados de norte a sul do país.',
      icon: <Calendar className="w-5 h-5 text-brand-blue" />
    },
    {
      id: 'notifications',
      title: 'Notificações & Favoritos',
      shortTitle: 'Notificações',
      desc: 'Adicione provas aos seus favoritos. Receba alertas push nativos sempre que houver alterações de horários ou novos regulamentos.',
      icon: <Bell className="w-5 h-5 text-brand-blue" />
    },
    {
      id: 'tracks',
      title: 'Fichas de Autódromos',
      shortTitle: 'Autódromos',
      desc: 'Explore fichas detalhadas dos principais traçados em Portugal (AIA, Estoril, Braga, Lousada, Baltar), com extensão e curvas.',
      icon: <Compass className="w-5 h-5 text-brand-blue" />
    }
  ];

  const currentFeatureObj = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="app" className="py-10 sm:py-30 bg-[#0F1115] relative border-b border-[#262B37] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-20"
        >
          <span className="box-decoration-clone leading-loose text-xs font-montserrat font-bold text-brand-blue tracking-widest uppercase bg-brand-blue/10 px-2.5 py-0.5 rounded-lg sm:rounded-xl">
            Para os Adeptos
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            A sua dose de adrenalina organizada
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg font-light leading-relaxed">
            O ecossistema Vroom.pt traz para o seu smartphone a aplicação de motorsport mais avançada do país.
          </p>
        </motion.div>

        {/* Interactive App Showcase Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          
          {/* Left: App Features Selector */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg sm:text-2xl text-white mb-0.5">
                  Explore os recursos
                </h3>
                <p className="text-slate-400 font-light text-xs sm:text-sm mb-2 sm:mb-4 leading-relaxed">
                  Toque nos recursos abaixo para simular a funcionalidade.
                </p>
              </div>
            </div>

            {/* MOBILE COMPACT CAROUSEL VIEW (< lg) */}
            <div className="lg:hidden space-y-3">
              {/* Feature Pill Grid */}
              <div className="grid grid-cols-4 gap-1 bg-[#171A21] p-1 rounded-xl border border-[#262B37]">
                {features.map((feat) => {
                  const isActive = activeFeature === feat.id;
                  return (
                    <motion.button
                      key={feat.id}
                      onClick={() => {
                        setActiveFeature(feat.id as any);
                        setIsAutoPlaying(false);
                      }}
                      whileTap={{ scale: 0.94 }}
                      className={`relative py-1.5 px-1 rounded-lg text-[11px] font-bold text-center transition-colors duration-200 cursor-pointer overflow-hidden ${
                        isActive 
                          ? 'text-white' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveFeaturePill"
                          className="absolute inset-0 bg-brand-blue rounded-lg shadow-md"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{feat.shortTitle}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Compact Active Feature Carousel Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#262B37] bg-[#1D212B] p-4 shadow-xl flex flex-col justify-between min-h-[140px]">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-brand-blue/20 via-blue-500/5 to-transparent blur-2xl pointer-events-none opacity-80" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#0F1115] flex-shrink-0 flex items-center justify-center border border-[#262B37]">
                      {cloneElement(currentFeatureObj.icon as ReactElement, { className: 'w-4 h-4 text-brand-blue' })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                        {currentFeatureObj.title}
                        <span className="h-1.5 w-1.5 bg-brand-blue rounded-full animate-pulse" />
                      </h4>
                      <p className="text-xs text-slate-300 font-light mt-0.5 leading-relaxed">
                        {currentFeatureObj.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls Bar / Indicator Dots */}
                <div className="flex items-center justify-center pt-2.5 mt-2.5 border-t border-[#262B37] z-20">
                  <div className="flex items-center gap-1.5">
                    {features.map((feat, idx) => (
                      <button
                        key={feat.id}
                        onClick={() => {
                          setActiveFeature(feat.id as any);
                          setIsAutoPlaying(false);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeFeature === feat.id ? 'w-5 bg-brand-blue' : 'w-1.5 bg-slate-700'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP VERTICAL BUTTONS LIST (>= lg) */}
            <div className="hidden lg:grid grid-cols-1 gap-2.5 sm:gap-4">
              {features.map((feat) => {
                const isActive = activeFeature === feat.id;
                return (
                  <motion.button
                    key={feat.id}
                    onClick={() => {
                      setActiveFeature(feat.id as any);
                      setIsAutoPlaying(false);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full text-left p-3 sm:p-5 rounded-xl border transition-all duration-300 flex gap-3 sm:gap-4 cursor-pointer overflow-hidden ${
                      isActive 
                        ? 'bg-[#1D212B] border-slate-700 shadow-lg' 
                        : 'bg-[#171A21] border-[#262B37] hover:border-slate-700 hover:bg-[#1D212B]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="desktopActiveFeatureIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      />
                    )}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex-shrink-0 flex items-center justify-center bg-[#0F1115] relative z-10">
                      {cloneElement(feat.icon as ReactElement, { className: 'w-4 h-4 sm:w-5 h-5 text-brand-blue' })}
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-semibold text-white text-[13px] sm:text-base flex items-center gap-2">
                        {feat.title}
                        {isActive && <span className="h-1.5 w-1.5 bg-brand-blue rounded-full animate-pulse" />}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5 leading-tight sm:leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick App Badges CTAs */}
            <div className="pt-4 sm:pt-8 border-t border-[#262B37] flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-start">
                <a 
                  href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[34px] sm:h-[44px] w-[115px] sm:w-[148px] rounded-lg bg-black overflow-hidden relative"
                >
                  <img 
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" 
                    alt="Descarregar na App Store" 
                    className="absolute h-[110%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    referrerPolicy="no-referrer"
                  />
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[34px] sm:h-[44px] w-[115px] sm:w-[148px] rounded-lg bg-black overflow-hidden relative"
                >
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                    alt="Disponível no Google Play" 
                    className="absolute h-[140%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>

              {toastMessage && (
                <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-left text-sm text-slate-300 animate-pulse max-w-md">
                  <span className="font-semibold text-brand-blue block">Disponibilidade Oficial</span>
                  {toastMessage}
                </div>
              )}
            </div>
          </div>

          {/* Right: Immersive smartphone simulator */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            
            {/* Phone Shadow / Glow */}
            <div className="absolute inset-x-12 bottom-0 top-12 bg-brand-blue/5 rounded-[50px] blur-3xl pointer-events-none -z-10" />

            {/* Smartphone body */}
            <div className="w-[260px] h-[510px] sm:w-[310px] sm:h-[610px] bg-slate-950 rounded-[36px] sm:rounded-[44px] p-2 sm:p-3 shadow-2xl border-[6px] sm:border-[8px] border-[#262B37] relative flex flex-col ring-1 ring-white/10">
              
              {/* Phone Speaker & Dynamic Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-4 shadow-sm border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#111] block" />
                <span className="w-3 h-3 rounded-full bg-[#0a0a2a] block border border-white/5" />
              </div>

              {/* iOS Status Bar Overlay */}
              <div className="absolute top-3 left-0 right-0 h-6 flex items-center justify-between px-8 z-30 pointer-events-none">
                <span className="text-xs text-white/90 font-mono font-medium drop-shadow-md">09:41</span>
                <div className="flex gap-1 items-center">
                  <span className="w-2.5 h-1.5 bg-white/90 rounded-sm drop-shadow-md" />
                  <span className="w-3 h-2.5 bg-white/90 rounded-sm drop-shadow-md" />
                </div>
              </div>

              {/* Screen Content Wrapper */}
              <div className="flex-1 rounded-[32px] bg-slate-900 overflow-hidden relative flex flex-col border border-white/10">
                
                {/* Videos for each feature */}
                <video 
                  src="https://vroom-images.b-cdn.net/videosWebsite/WhatsApp%20Video%202026-07-19%20at%2017.24.51.mp4" 
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${activeFeature === 'map' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
                
                <video 
                  src="https://vroom-images.b-cdn.net/videosWebsite/WhatsApp%20Video%202026-07-19%20at%2017.24.56.mp4" 
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${activeFeature === 'calendar' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />

                <video 
                  src="https://vroom-images.b-cdn.net/videosWebsite/WhatsApp%20Video%202026-07-19%20at%2017.24.41.mp4" 
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${activeFeature === 'tracks' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />

                {/* Notifications Screen Mockup */}
                <div className={`absolute inset-0 bg-slate-950 flex flex-col pt-10 sm:pt-14 px-3 sm:px-3.5 transition-opacity duration-500 ${activeFeature === 'notifications' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                   {/* Lock screen style background */}
                   <img 
                     src="https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg" 
                     className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[2px] scale-105" 
                     alt="Background"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
                   
                   <div className="relative z-10 flex flex-col h-full overflow-hidden">
                     {/* Lockscreen Time & Date */}
                     <div className="text-center mt-1 sm:mt-2 mb-3 sm:mb-4 select-none">
                       <span className="text-white text-3xl sm:text-4xl font-extralight tracking-tight block">09:41</span>
                       <span className="text-slate-300 text-[11px] sm:text-xs font-medium mt-0.5 block">Domingo, 19 de Julho</span>
                     </div>

                     {/* Notification Center Label */}
                     <div className="flex items-center justify-between px-1 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                       <span>Notificações</span>
                       <span className="bg-brand-blue/30 text-blue-300 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold">
                         3 novas
                       </span>
                     </div>

                     {/* Stacked Notifications list */}
                     <div className="space-y-2 overflow-y-auto no-scrollbar pb-8">
                       
                       {/* Notification 1 */}
                       <div className="bg-[#141822]/90 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 border border-white/10 shadow-xl text-left transform transition-all duration-300 hover:scale-[1.01]">
                         <div className="flex items-center justify-between mb-1">
                           <div className="flex items-center gap-1.5 min-w-0">
                             <img 
                               src={vroomLogoImg} 
                               alt="Vroom" 
                               className="w-3.5 h-3.5 rounded-md object-contain border border-white/10 shrink-0"
                               referrerPolicy="no-referrer"
                             />
                             <span className="text-white/80 text-[10px] font-bold truncate">Vroom.pt</span>
                             <span className="w-1 h-1 rounded-full bg-brand-blue shrink-0" />
                           </div>
                           <span className="text-slate-400 text-[9px] font-mono shrink-0">agora</span>
                         </div>
                         <h5 className="text-white font-bold text-xs leading-tight mb-0.5">
                           🏁 O evento está a começar!
                         </h5>
                         <p className="text-slate-300 text-[10px] leading-snug line-clamp-2 font-light">
                           Autódromo do Algarve: Warm-up oficial iniciado com acesso livre às bancadas.
                         </p>
                       </div>

                       {/* Notification 2 */}
                       <div className="bg-[#141822]/85 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 border border-white/10 shadow-xl text-left transform transition-all duration-300 hover:scale-[1.01]">
                         <div className="flex items-center justify-between mb-1">
                           <div className="flex items-center gap-1.5 min-w-0">
                             <img 
                               src={vroomLogoImg} 
                               alt="Vroom" 
                               className="w-3.5 h-3.5 rounded-md object-contain border border-white/10 shrink-0"
                               referrerPolicy="no-referrer"
                             />
                             <span className="text-white/80 text-[10px] font-bold truncate">Vroom.pt</span>
                           </div>
                           <span className="text-slate-400 text-[9px] font-mono shrink-0">12m</span>
                         </div>
                         <h5 className="text-white font-bold text-xs leading-tight mb-0.5">
                           ⏱️ Horário Atualizado
                         </h5>
                         <p className="text-slate-300 text-[10px] leading-snug line-clamp-2 font-light">
                           Rali de Portugal: PEC 4 Arganil com arranque antecipado para as 14:30.
                         </p>
                       </div>

                       {/* Notification 3 */}
                       <div className="bg-[#141822]/80 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 border border-white/10 shadow-xl text-left transform transition-all duration-300 hover:scale-[1.01]">
                         <div className="flex items-center justify-between mb-1">
                           <div className="flex items-center gap-1.5 min-w-0">
                             <img 
                               src={vroomLogoImg} 
                               alt="Vroom" 
                               className="w-3.5 h-3.5 rounded-md object-contain border border-white/10 shrink-0"
                               referrerPolicy="no-referrer"
                             />
                             <span className="text-white/80 text-[10px] font-bold truncate">Vroom.pt</span>
                           </div>
                           <span className="text-slate-400 text-[9px] font-mono shrink-0">1h</span>
                         </div>
                         <h5 className="text-white font-bold text-xs leading-tight mb-0.5">
                           ❤️ Prova Guardada nos Favoritos
                         </h5>
                         <p className="text-slate-300 text-[10px] leading-snug line-clamp-2 font-light">
                           500 Km do Estoril guardado. Alertas ativos para os tempos em direto.
                         </p>
                       </div>

                     </div>
                   </div>
                </div>

                {/* Glare effect over the screen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />

                {/* Simulated iOS Home Bar overlay */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/50 rounded-full z-30 pointer-events-none" />
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
