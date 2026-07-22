import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Search, Calendar, MapPin, ChevronRight, Heart, FileText, 
  Clock, Compass, ShieldCheck, X, Smartphone, ChevronDown, Loader2, Radio
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

  const handleToggleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (likedEvents.includes(id)) {
      setLikedEvents(likedEvents.filter(x => x !== id));
    } else {
      setLikedEvents([...likedEvents, id]);
    }
  };

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
    <section id="events" className="py-12 sm:py-30 bg-[#0F1115] relative border-b border-[#262B37]">
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header - Shorter on mobile */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
          <span className="box-decoration-clone leading-loose text-xs sm:text-sm font-montserrat font-bold text-brand-blue tracking-widest uppercase bg-brand-blue/10 px-2 py-0.5 sm:px-4 sm:py-1 rounded-lg sm:rounded-xl">
            Descoberta
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-2 sm:mt-4 mb-2 sm:mb-6 leading-tight">
            Provas em Portugal
          </h2>
          <p className="text-slate-400 text-xs sm:text-lg font-light leading-relaxed px-4">
            Acompanhe o calendário nacional. Use a app para navegar até às pistas.
          </p>
        </div>

        {/* Filters and Search Bar - More compact */}
        <div className="bg-[#171A21] border border-[#262B37] rounded-xl p-3 sm:p-6 mb-6 sm:mb-12 shadow-xs">
          <div className="flex flex-col md:flex-row gap-2 sm:gap-4 items-center justify-between mb-3 sm:mb-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Pesquisar prova..."
                className="w-full bg-[#1D212B] border border-[#262B37] rounded-lg py-4 sm:py-3 pl-10 pr-3 text-sm sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Natureza Category Dropdown */}
              <div className="relative flex-1 md:w-48">
                <button
                  onClick={() => setNaturezaDropdownOpen(!naturezaDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#1D212B] border border-[#262B37] rounded-lg text-xs sm:text-sm text-white hover:border-slate-500 transition-colors"
                >
                  <span className="font-bold truncate">{naturezaCategory === 'Todos' ? 'Tipo' : naturezaCategory}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {naturezaDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D212B] border border-[#262B37] rounded-lg shadow-xl overflow-hidden z-20">
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
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#1D212B] border border-[#262B37] rounded-lg text-xs sm:text-sm text-white hover:border-slate-500 transition-colors"
                >
                  <span className="font-bold truncate">{mainCategory === 'Todos' ? 'Veículo' : mainCategory}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {mainDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D212B] border border-[#262B37] rounded-lg shadow-xl overflow-hidden z-20">
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

          {/* Sub Categories Chips - Smaller */}
          {mainCategory !== 'Todos' && SUB_CATEGORIES[mainCategory] && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#262B37]">
              <button
                onClick={() => setSubCategory('Todos')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  subCategory === 'Todos'
                    ? 'bg-brand-blue text-white' 
                    : 'bg-[#1D212B] border border-[#262B37] text-slate-400'
                }`}
              >
                Todos
              </button>
              {SUB_CATEGORIES[mainCategory].map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => setSubCategory(subCat)}
                  className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    subCategory === subCat 
                      ? 'bg-brand-blue text-white' 
                      : 'bg-[#1D212B] border border-[#262B37] text-slate-400'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-brand-blue animate-spin mb-2" />
            <span className="text-slate-400 text-sm">A carregar...</span>
          </div>
        )}

        {/* Event Cards Grid - 2 columns on mobile with better gaps */}
        {!loading && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredEvents.slice(0, visibleCount).map((ev) => {
                const isLiked = likedEvents.includes(ev.id);
                const { isHappening, daysToStart } = getEventTimeStatus(ev.data_inicio, ev.data_fim);
                const dynamicImage = getEventImage(ev.id, ev.modalidade || ev.natureza, ev.local, ev.imagem_evento, ev.veiculo_alvo);

                return (
                  <div 
                    key={ev.id}
                    onClick={() => onEventSelect(ev)}
                    className="group bg-[#1D212B] rounded-lg sm:rounded-xl border border-[#262B37] shadow-xs hover:border-slate-700 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
                    id={`event-card-${ev.id}`}
                  >
                    {/* Event Image - Balanced height for mobile density */}
                    <div className="h-28 sm:h-48 w-full relative overflow-hidden bg-[#171A21]">
                      <img 
                        src={dynamicImage} 
                        alt={ev.nome} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                      
                      {/* Category Pill - Readable micro scale */}
                      {ev.modalidade && (
                        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-brand-blue/90 backdrop-blur-md text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-xl text-xs sm:text-xs font-mono font-bold tracking-wider uppercase shadow-lg">
                          {ev.modalidade}
                        </span>
                      )}
                      
                      {/* Status Badges - Clean positioning */}
                      <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                        {isHappening && (
                          <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 border rounded bg-red-600 text-white border-red-400 flex items-center gap-0.5 shadow-xl">
                            <Radio className="w-2 h-2" /> LIVE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Event Info - Balanced padding and text */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-brand-blue transition-colors leading-tight line-clamp-2">
                          {ev.nome}
                        </h3>

                        <p className="text-slate-400 text-sm sm:text-sm leading-relaxed font-light line-clamp-1 sm:line-clamp-2">
                          {ev.local || 'Localização a definir'}
                        </p>
                      </div>

                      {/* Metadata Row - Mini icons with breathing room */}
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#262B37] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 h-4 text-brand-blue" />
                          <span className="font-medium truncate max-w-[50px] sm:max-w-none">{ev.data_inicio ? new Date(ev.data_inicio).toLocaleDateString('pt-PT', {day:'numeric', month:'short'}) : 'TBD'}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {filteredEvents.length > visibleCount && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="px-6 py-3 bg-[#171A21] hover:bg-[#1D212B] border border-brand-blue text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group-hover:scale-102"
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
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-[#171A21] rounded-xl border border-[#262B37] max-w-xl mx-auto">
            <span className="text-slate-400 block text-sm font-light mb-4">Nenhuma prova encontrada para os critérios selecionados.</span>
            <button 
              onClick={() => { setSearchQuery(''); setMainCategory('Todos'); setSubCategory('Todos'); }}
              className="px-4 py-3 bg-brand-blue text-white rounded-xl text-sm font-bold hover:bg-brand-blue-hover transition-all cursor-pointer"
            >
              Repor Filtros
            </button>
          </div>
        )}

      </div>

      {/* Sleek Custom Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 sm:bottom-10 left-1/2 z-50 bg-[#1D212B]/95 backdrop-blur-md border border-brand-blue rounded-xl p-4 shadow-2xl flex items-center gap-3 max-w-sm w-[90vw]"
          >
            <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue flex-shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-white">Disponibilidade da App</p>
              <p className="text-xs text-slate-400 font-light mt-0.5">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="flex items-center gap-2.5 px-5 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold rounded-full shadow-2xl border border-brand-red/15 hover:border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
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

