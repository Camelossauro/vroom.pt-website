import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Search, Calendar, MapPin, ChevronRight, Heart, FileText, 
  Clock, Compass, ShieldCheck, X, Smartphone, ChevronDown, Loader2, Radio, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchEvents } from '../services/eventService';
import { DatabaseEvent } from '../types';
import { getEventImage } from '../lib/utils';

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white tracking-tight">
                Eventos em Destaque
              </h3>
              <span className="text-xs text-amber-400 font-mono font-medium hidden sm:inline-block bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                ⭐ Promoção Oficial de Organização
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {showcaseEvents.slice(0, 3).map((ev) => {
                const dynamicImage = getEventImage(ev.id, ev.modalidade || ev.natureza, ev.local, ev.imagem_evento, ev.veiculo_alvo);
                const { isHappening } = getEventTimeStatus(ev.data_inicio, ev.data_fim);

                return (
                  <div
                    key={`featured-${ev.id}`}
                    onClick={() => onEventSelect(ev)}
                    className="group relative bg-gradient-to-b from-[#1C202B] to-[#14171F] rounded-2xl border border-amber-500/30 hover:border-amber-400/80 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    {/* Top Accent line */}
                    <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

                    <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#12151C]">
                      <img 
                        src={dynamicImage} 
                        alt={ev.nome} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14171F] via-transparent to-black/50" />

                      <div className="absolute top-3 left-3 flex gap-2 items-center flex-wrap">
                        <span className="bg-amber-500/90 text-black px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-wider uppercase shadow-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-black" /> DESTAQUE
                        </span>
                        {ev.modalidade && (
                          <span className="bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase">
                            {ev.modalidade}
                          </span>
                        )}
                      </div>

                      {isHappening && (
                        <span className="absolute bottom-3 left-3 text-xs font-bold uppercase px-2 py-0.5 rounded bg-red-600 text-white flex items-center gap-1">
                          <Radio className="w-3 h-3" /> LIVE
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                          {ev.organizadora_default || 'Organizador Oficial'}
                        </span>
                        <h4 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                          {ev.nome}
                        </h4>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-2 font-light">
                          {ev.descricao || ev.local || 'Sem descrição.'}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <Calendar className="w-4 h-4 text-amber-400" />
                          <span>{ev.data_inicio ? new Date(ev.data_inicio).toLocaleDateString('pt-PT', {day:'numeric', month:'short', year:'numeric'}) : 'TBD'}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Ver Detalhes <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Filters and Search Bar - Clean & Intuitive */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-[#171A21] border border-[#262B37] rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between mb-3">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Pesquisar por nome ou cidade..."
                className="w-full bg-[#1D212B] border border-[#262B37] rounded-xl py-3 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Natureza Category Dropdown */}
              <div className="relative flex-1 md:w-48">
                <button
                  onClick={() => setNaturezaDropdownOpen(!naturezaDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#1D212B] border border-[#262B37] rounded-xl text-xs sm:text-sm text-white hover:border-slate-500 transition-colors"
                >
                  <span className="font-semibold truncate">{naturezaCategory === 'Todos' ? 'Tipo: Todos' : naturezaCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                
                {naturezaDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D212B] border border-[#262B37] rounded-xl shadow-2xl overflow-hidden z-20">
                    {NATUREZA_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleNaturezaSelect(cat)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-blue/10 transition-colors ${
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
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#1D212B] border border-[#262B37] rounded-xl text-xs sm:text-sm text-white hover:border-slate-500 transition-colors"
                >
                  <span className="font-semibold truncate">{mainCategory === 'Todos' ? 'Veículo: Todos' : mainCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                
                {mainDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D212B] border border-[#262B37] rounded-xl shadow-2xl overflow-hidden z-20">
                    {MAIN_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleMainCategorySelect(cat)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-blue/10 transition-colors ${
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
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#262B37]">
              <button
                onClick={() => setSubCategory('Todos')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  subCategory === 'Todos'
                    ? 'bg-brand-blue text-white' 
                    : 'bg-[#1D212B] border border-[#262B37] text-slate-400 hover:text-white'
                }`}
              >
                Todas as Modalidades
              </button>
              {SUB_CATEGORIES[mainCategory].map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => setSubCategory(subCat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    subCategory === subCat 
                      ? 'bg-brand-blue text-white' 
                      : 'bg-[#1D212B] border border-[#262B37] text-slate-400 hover:text-white'
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filteredEvents.slice(0, visibleCount).map((ev) => {
                const { isHappening } = getEventTimeStatus(ev.data_inicio, ev.data_fim);
                const dynamicImage = getEventImage(ev.id, ev.modalidade || ev.natureza, ev.local, ev.imagem_evento, ev.veiculo_alvo);
                const isPremium = ev.plano_destaque === 'premium';

                return (
                  <div 
                    key={ev.id}
                    onClick={() => onEventSelect(ev)}
                    className={`group rounded-xl border shadow-sm transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full ${
                      isPremium 
                        ? 'bg-[#1C202B] border-amber-500/40 hover:border-amber-400/80 shadow-amber-900/10' 
                        : 'bg-[#1D212B] border-[#262B37] hover:border-slate-600'
                    }`}
                    id={`event-card-${ev.id}`}
                  >
                    {/* Event Image */}
                    <div className="h-44 sm:h-48 w-full relative overflow-hidden bg-[#171A21]">
                      <img 
                        src={dynamicImage} 
                        alt={ev.nome} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D212B] via-transparent to-black/40" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2 items-center flex-wrap">
                        {isPremium && (
                          <span className="bg-amber-500/90 text-black px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                            <Sparkles className="w-3 h-3 fill-black" /> DESTAQUE
                          </span>
                        )}
                        {ev.modalidade && (
                          <span className="bg-brand-blue/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-wider uppercase shadow-md">
                            {ev.modalidade}
                          </span>
                        )}
                      </div>

                      {/* Status Badges */}
                      <div className="absolute bottom-3 left-3">
                        {isHappening && (
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white border border-red-400 flex items-center gap-1 shadow-xl">
                            <Radio className="w-3 h-3 animate-pulse" /> LIVE NOW
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs text-slate-400 font-mono block">
                          {ev.organizadora_default || 'Organizador Registado'}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-brand-blue transition-colors leading-tight line-clamp-2">
                          {ev.nome}
                        </h3>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                          {ev.local || 'Localização a definir'}
                        </p>
                      </div>

                      {/* Metadata Row */}
                      <div className="mt-5 pt-3 border-t border-[#262B37] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                          <span>{ev.data_inicio ? new Date(ev.data_inicio).toLocaleDateString('pt-PT', {day:'numeric', month:'short'}) : 'TBD'}</span>
                        </div>
                        <span className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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

