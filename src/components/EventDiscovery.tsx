import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Search, Calendar, MapPin, ChevronRight, Heart, FileText, 
  Clock, Compass, ShieldCheck, X, Smartphone, ChevronDown, Loader2, Radio, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchEvents } from '../services/eventService';
import { DatabaseEvent } from '../types';
import { getEventImage, getEventColorTheme } from '../lib/utils';

interface EventDiscoveryProps {
  onEventSelect: (event: DatabaseEvent) => void;
}

export default function EventDiscovery({ onEventSelect }: EventDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [naturezaCategory, setNaturezaCategory] = useState<string>('Todos'); // Competição ou Lazer
  const [mainCategory, setMainCategory] = useState<string>('Todos'); // veiculo_alvo: Automóveis ou Motas
  const [subCategory, setSubCategory] = useState<string>('Todos'); // modalidade
  const [likedEvents, setLikedEvents] = useState<string[]>([]);
  const [naturezaDropdownOpen, setNaturezaDropdownOpen] = useState(false);
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Pagination states & tracking
  const [visibleCount, setVisibleCount] = useState(6);
  const [isInsideAppArea, setIsInsideAppArea] = useState(false);

  // Reset visible events when search, category, or subcategory changes
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, naturezaCategory, mainCategory, subCategory]);

  // Observer to track if the viewport enters or leaves the 'Mobile App' area (#app)
  useEffect(() => {
    const handleSetupObserver = () => {
      const appElement = document.getElementById('app');
      if (!appElement) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInsideAppArea(entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1, // Trigger when at least 10% of #app is visible
        }
      );

      observer.observe(appElement);
      return observer;
    };

    let observerInstance: IntersectionObserver | undefined;
    const timer = setTimeout(() => {
      const obs = handleSetupObserver();
      if (obs) observerInstance = obs;
    }, 150); // Small timeout to ensure DOM has fully painted the #app section

    return () => {
      clearTimeout(timer);
      if (observerInstance) {
        const appElement = document.getElementById('app');
        if (appElement) {
          observerInstance.unobserve(appElement);
        }
      }
    };
  }, []);

  const handleCloseList = () => {
    setVisibleCount(6);
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const NATUREZA_CATEGORIES = ['Todos', 'Competição', 'Lazer'];
  const MAIN_CATEGORIES = ['Todos', 'Automóveis', 'Motas'];
  const SUB_CATEGORIES: Record<string, string[]> = {
    'Automóveis': ['Velocidade', 'Karting', 'Rally', 'Ralicross', 'Drift', 'Montanha', 'Drag Racing', 'Todo Terreno', 'Trial 4x4'],
    'Motas': ['Circuito', 'Enduro', 'Motocross', 'Super-Enduro', 'Hard Enduro', 'Todo-o-Terreno', 'Enduro Sprint', 'Supercross', 'Supermoto', 'Flat Track', 'Trial']
  };

  // Filter featured / premium events for the dedicated Plano Destaque showcase
  const showcaseEvents = events.filter(ev => ev.plano_destaque === 'premium');

  const filteredEvents = events.filter(ev => {
    const matchesSearch = (ev.nome?.toLowerCase().includes(searchQuery.toLowerCase()) || false) || 
                          (ev.local?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    let matchesNatureza = true;
    if (naturezaCategory !== 'Todos') {
      matchesNatureza = ev.natureza === naturezaCategory;
    }

    let matchesMainCategory = true;
    if (mainCategory !== 'Todos') {
      matchesMainCategory = ev.veiculo_alvo === mainCategory;
    }

    let matchesSubCategory = true;
    if (subCategory !== 'Todos') {
      matchesSubCategory = ev.modalidade === subCategory;
    }

    return matchesSearch && matchesNatureza && matchesMainCategory && matchesSubCategory;
  });

  const handleNaturezaSelect = (cat: string) => {
    setNaturezaCategory(cat);
    setNaturezaDropdownOpen(false);
  };

  const handleMainCategorySelect = (cat: string) => {
    setMainCategory(cat);
    setSubCategory('Todos');
    setMainDropdownOpen(false);
  };

  const getEventTimeStatus = (dataInicio: string | null, dataFim: string | null) => {
    if (!dataInicio) return { isHappening: false, daysToStart: null };
    
    const evStart = new Date(dataInicio);
    const evEnd = dataFim ? new Date(dataFim) : new Date(dataInicio);
    const today = new Date();
    
    // Normalize to midnight
    evStart.setHours(0,0,0,0);
    evEnd.setHours(23,59,59,999);
    today.setHours(0,0,0,0);
    
    const isHappening = today.getTime() >= evStart.getTime() && today.getTime() <= evEnd.getTime();
    
    const diffTime = evStart.getTime() - today.getTime();
    const daysToStart = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { isHappening, daysToStart };
  };

  return (
    <section id="events" className="py-12 sm:py-24 bg-[#0F1115] relative border-b border-[#262B37]">
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <span className="box-decoration-clone leading-loose text-xs sm:text-sm font-montserrat font-bold text-brand-blue tracking-widest uppercase bg-brand-blue/10 px-3 py-1 rounded-xl">
            Calendário Oficial
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 leading-tight">
            Provas e Eventos em Portugal
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Explore o calendário oficial de automobilismo e motociclismo nacional. Selecione uma prova para ver todos os detalhes e direções no GPS.
          </p>
        </motion.div>

        {/* DEDICATED PLANO DESTAQUE / PREMIUM SHOWCASE SECTION */}
        {!loading && showcaseEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.3 }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white tracking-tight">
                Eventos em Destaque
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {showcaseEvents.slice(0, 3).map((ev) => {
                const dynamicImage = getEventImage(ev.id, ev.modalidade || ev.natureza, ev.local, ev.imagem_evento, ev.veiculo_alvo);
                const isPremium = ev.plano_destaque === 'premium' || true; // Showcase items are featured
                const theme = getEventColorTheme(ev.cor, ev.modalidade, ev.natureza, isPremium);
                const { isHappening, daysToStart } = getEventTimeStatus(ev.data_inicio, ev.data_fim);
                const startDateObj = ev.data_inicio ? new Date(ev.data_inicio) : null;
                const dayNum = startDateObj ? startDateObj.getDate().toString().padStart(2, '0') : 'TBD';
                const monthStr = startDateObj ? startDateObj.toLocaleDateString('pt-PT', { month: 'short' }).toUpperCase().replace('.', '') : '---';

                return (
                  <div 
                    key={`featured-${ev.id}`}
                    onClick={() => onEventSelect(ev)}
                    className={`group relative rounded-3xl transition-all duration-300 ease-out overflow-hidden cursor-pointer flex flex-col h-full border-0 ${
                      isPremium 
                        ? 'bg-gradient-to-b from-amber-500/10 via-[#131622]/95 to-[#0E1119] shadow-xl' 
                        : 'liquid-glass-card'
                    }`}
                    style={{
                      boxShadow: isPremium
                        ? `0 14px 40px rgba(0, 0, 0, 0.4)`
                        : `0 8px 28px rgba(0, 0, 0, 0.4)`
                    }}
                    id={`featured-card-${ev.id}`}
                  >
                    {/* Image Container with Ambient Overlays */}
                    <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-[#12151C]">
                      <img 
                        src={dynamicImage} 
                        alt={ev.nome} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11141D] via-transparent to-black/40" />
                      
                      {/* Floating Badges (Left) */}
                      <div className="absolute top-3.5 left-3.5 flex flex-col items-start gap-1.5 z-10">
                        <span 
                          className="px-3 py-1 rounded-xl text-[10px] font-mono font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xl backdrop-blur-md border"
                          style={{
                            backgroundColor: `rgba(${theme.rgb}, 0.3)`,
                            color: theme.hex,
                            borderColor: `rgba(${theme.rgb}, 0.5)`
                          }}
                        >
                          PREMIUM
                        </span>
                        {ev.modalidade && (
                          <span 
                            className="bg-black/75 backdrop-blur-xl border text-white px-3 py-1 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase shadow-xl flex items-center gap-1.5"
                            style={{ borderColor: `rgba(${theme.rgb}, 0.45)` }}
                          >
                            <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: theme.hex }} />
                            {ev.modalidade}
                          </span>
                        )}
                      </div>

                      {/* Date Ticket Chip (Top Right) */}
                      <div 
                        className="absolute top-3.5 right-3.5 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl border border-white/20 text-white rounded-2xl px-3 py-1.5 min-w-[54px] shadow-2xl transition-colors"
                      >
                        <span className="text-base font-extrabold font-mono leading-none text-white">{dayNum}</span>
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase leading-tight mt-0.5 text-slate-400">
                          {monthStr}
                        </span>
                      </div>

                      {/* Live or Countdown Status Badge (Bottom Left) */}
                      <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-2">
                        {isHappening ? (
                          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-red-600 text-white border border-red-400 flex items-center gap-1.5 shadow-2xl">
                            <Radio className="w-3.5 h-3.5" /> EM DIRETO
                          </span>
                        ) : daysToStart !== null && daysToStart > 0 && daysToStart <= 14 ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-slate-300 border border-white/15 flex items-center gap-1 shadow-lg">
                            <Clock className="w-3 h-3 text-sky-400/70" /> FALTAM {daysToStart} {daysToStart === 1 ? 'DIA' : 'DIAS'}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Event Content & Info */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                      <div className="space-y-2.5">
                        {/* Organizer Verified Pill */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-sky-400/60" />
                          <span className="truncate font-medium text-slate-300">{ev.organizadora_default || 'Organizador Registado'}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-base sm:text-xl text-white transition-colors duration-300 leading-snug line-clamp-2">
                          {ev.nome}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-light">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{ev.local || 'Localização a definir'}</span>
                        </div>
                      </div>

                      {/* Metadata Row & CTA */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium font-mono">
                          <Calendar className="w-3.5 h-3.5 text-sky-400/60" />
                          <span>{ev.data_inicio ? new Date(ev.data_inicio).toLocaleDateString('pt-PT', {day:'numeric', month:'short', year:'numeric'}) : 'TBD'}</span>
                        </div>
                        <span 
                          className="text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.06] text-slate-300 shadow-md"
                        >
                          Ver Prova <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Filters and Search Bar - Liquid Glass Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.3 }}
          className="liquid-glass rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 relative z-50 overflow-visible"
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between mb-3">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Pesquisar por nome ou cidade..."
                className="w-full liquid-glass-input rounded-xl py-3 pl-10 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Natureza Category Dropdown */}
              <div className="relative flex-1 md:w-48">
                <button
                  onClick={() => setNaturezaDropdownOpen(!naturezaDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-xl text-xs sm:text-sm text-white hover:border-white/30 transition-all shadow-inner cursor-pointer"
                >
                  <span className="font-semibold truncate">{naturezaCategory === 'Todos' ? 'Tipo: Todos' : naturezaCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                </button>
                
                {naturezaDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#12151D]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {NATUREZA_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleNaturezaSelect(cat)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-blue/20 transition-colors cursor-pointer ${
                          naturezaCategory === cat ? 'text-brand-blue font-bold' : 'text-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Category Dropdown (Veículo) */}
              <div className="relative flex-1 md:w-48">
                <button
                  onClick={() => setMainDropdownOpen(!mainDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-xl text-xs sm:text-sm text-white hover:border-white/30 transition-all shadow-inner cursor-pointer"
                >
                  <span className="font-semibold truncate">{mainCategory === 'Todos' ? 'Veículo: Todos' : mainCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                </button>
                
                {mainDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#12151D]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {MAIN_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleMainCategorySelect(cat)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-blue/20 transition-colors cursor-pointer ${
                          mainCategory === cat ? 'text-brand-blue font-bold' : 'text-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub Categories Chips */}
          {mainCategory !== 'Todos' && SUB_CATEGORIES[mainCategory] && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
              <button
                onClick={() => setSubCategory('Todos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subCategory === 'Todos'
                    ? 'liquid-glass-button text-white' 
                    : 'liquid-glass-pill text-slate-300 hover:text-white'
                }`}
              >
                Todas as Modalidades
              </button>
              {SUB_CATEGORIES[mainCategory].map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => setSubCategory(subCat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    subCategory === subCat 
                      ? 'liquid-glass-button text-white' 
                      : 'liquid-glass-pill text-slate-300 hover:text-white'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-7 h-7 text-brand-blue animate-spin mb-3" />
            <span className="text-slate-400 text-sm">A carregar o calendário de eventos...</span>
          </div>
        )}

        {/* Event Cards Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.slice(0, visibleCount).map((ev) => {
                const { isHappening, daysToStart } = getEventTimeStatus(ev.data_inicio, ev.data_fim);
                const dynamicImage = getEventImage(ev.id, ev.modalidade || ev.natureza, ev.local, ev.imagem_evento, ev.veiculo_alvo);
                const isPremium = ev.plano_destaque === 'premium';
                const isCompeticao = ev.natureza?.toLowerCase().includes('competi') || ev.modalidade?.toLowerCase().includes('competi');
                const theme = getEventColorTheme(ev.cor, ev.modalidade, ev.natureza, isPremium);

                // Format date ticket chip
                const startDateObj = ev.data_inicio ? new Date(ev.data_inicio) : null;
                const dayNum = startDateObj ? startDateObj.getDate().toString().padStart(2, '0') : 'TBD';
                const monthStr = startDateObj ? startDateObj.toLocaleDateString('pt-PT', { month: 'short' }).toUpperCase().replace('.', '') : '---';

                return (
                  <div 
                    key={ev.id}
                    onClick={() => onEventSelect(ev)}
                    className={`group relative rounded-3xl transition-all duration-300 ease-out overflow-hidden cursor-pointer flex flex-col h-full border-0 ${
                      isPremium 
                        ? 'bg-gradient-to-b from-amber-500/10 via-[#131622]/95 to-[#0E1119] shadow-xl' 
                        : 'liquid-glass-card'
                    }`}
                    style={{
                      boxShadow: isPremium
                        ? `0 14px 40px rgba(0, 0, 0, 0.4)`
                        : `0 8px 28px rgba(0, 0, 0, 0.4)`
                    }}
                    id={`event-card-${ev.id}`}
                  >

                    {/* Image Container with Ambient Overlays */}
                    <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-[#12151C]">
                      <img 
                        src={dynamicImage} 
                        alt={ev.nome} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11141D] via-transparent to-black/40" />
                      
                      {/* Floating Badges (Left) */}
                      <div className="absolute top-3.5 left-3.5 flex flex-col items-start gap-1.5 z-10">
                        {isPremium && (
                          <span 
                            className="px-3 py-1 rounded-xl text-[10px] font-mono font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xl backdrop-blur-md border"
                            style={{
                              backgroundColor: `rgba(${theme.rgb}, 0.3)`,
                              color: theme.hex,
                              borderColor: `rgba(${theme.rgb}, 0.5)`
                            }}
                          >
                            PREMIUM
                          </span>
                        )}
                        {ev.modalidade && (
                          <span 
                            className="bg-black/75 backdrop-blur-xl border text-white px-3 py-1 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase shadow-xl flex items-center gap-1.5"
                            style={{ borderColor: `rgba(${theme.rgb}, 0.45)` }}
                          >
                            <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: theme.hex }} />
                            {ev.modalidade}
                          </span>
                        )}
                      </div>

                      {/* Date Ticket Chip (Top Right) */}
                      <div 
                        className="absolute top-3.5 right-3.5 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl border border-white/20 text-white rounded-2xl px-3 py-1.5 min-w-[54px] shadow-2xl transition-colors"
                      >
                        <span className="text-base font-extrabold font-mono leading-none text-white">{dayNum}</span>
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase leading-tight mt-0.5 text-slate-400">
                          {monthStr}
                        </span>
                      </div>

                      {/* Live or Countdown Status Badge (Bottom Left) */}
                      <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-2">
                        {isHappening ? (
                          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-red-600 text-white border border-red-400 flex items-center gap-1.5 shadow-2xl">
                            <Radio className="w-3.5 h-3.5" /> EM DIRETO
                          </span>
                        ) : daysToStart !== null && daysToStart > 0 && daysToStart <= 14 ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-slate-300 border border-white/15 flex items-center gap-1 shadow-lg">
                            <Clock className="w-3 h-3 text-sky-400/70" /> FALTAM {daysToStart} {daysToStart === 1 ? 'DIA' : 'DIAS'}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Event Content & Info */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                      <div className="space-y-2.5">
                        {/* Organizer Verified Pill */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-sky-400/60" />
                          <span className="truncate font-medium text-slate-300">{ev.organizadora_default || 'Organizador Registado'}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-base sm:text-xl text-white transition-colors duration-300 leading-snug line-clamp-2">
                          {ev.nome}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-light">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{ev.local || 'Localização a definir'}</span>
                        </div>
                      </div>

                      {/* Metadata Row & CTA */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium font-mono">
                          <Calendar className="w-3.5 h-3.5 text-sky-400/60" />
                          <span>{ev.data_inicio ? new Date(ev.data_inicio).toLocaleDateString('pt-PT', {day:'numeric', month:'short', year:'numeric'}) : 'TBD'}</span>
                        </div>
                        <span 
                          className="text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.06] text-slate-300 shadow-md"
                        >
                          Ver Prova <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {filteredEvents.length > visibleCount && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <button
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="px-6 py-3 bg-[#171A21] hover:bg-[#1D212B] border border-brand-blue text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4 text-brand-blue animate-bounce" />
                  Carregar Mais Eventos
                </button>
                {visibleCount > 6 && (
                  <button
                    onClick={handleCloseList}
                    className="px-6 py-3 bg-transparent hover:bg-[#1D212B] border border-slate-700 text-slate-400 hover:text-white rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                  >
                    Recolher Lista
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-[#171A21] rounded-2xl border border-[#262B37] max-w-xl mx-auto px-6">
            <span className="text-slate-300 block text-base font-medium mb-2">Nenhum evento encontrado</span>
            <p className="text-slate-400 text-sm font-light mb-6">Tente ajustar a sua pesquisa ou limpe os filtros de modalidade e veículo.</p>
            <button 
              onClick={() => { setSearchQuery(''); setNaturezaCategory('Todos'); setMainCategory('Todos'); setSubCategory('Todos'); }}
              className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-bold hover:bg-brand-blue-hover transition-all cursor-pointer"
            >
              Repor Todos os Filtros
            </button>
          </div>
        )}

      </div>

      {/* Floating Close List Button */}
      <AnimatePresence>
        {isInsideAppArea && visibleCount > 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={handleCloseList}
              className="flex items-center gap-2.5 px-5 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold rounded-full shadow-2xl border border-brand-red/15 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
              title="Fechar Lista e voltar ao topo"
            >
              <X className="w-4 h-4" />
              <span>Fechar Lista</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

