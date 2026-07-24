import { useEffect, useState, TouchEvent } from 'react';
import { Trophy, Flag, BadgeCheck, Smartphone, BellRing, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SocialProof() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const stats = [
    { 
      target: 15, 
      label: 'Clubes & Organizadores', 
      sub: 'Em todo o país', 
      icon: Trophy, 
      color: 'from-blue-500/20 to-cyan-500/5', 
      iconBg: 'bg-brand-blue/20 text-brand-blue border-brand-blue/30' 
    },
    { 
      target: 1000, 
      label: 'Eventos Publicados', 
      sub: 'Ralis, pistas e karting', 
      icon: Flag, 
      color: 'from-red-500/20 to-orange-500/5', 
      iconBg: 'bg-brand-red/20 text-brand-red border-brand-red/30' 
    },
    { 
      target: 5, 
      label: 'Pilotos Verificados', 
      sub: 'Campeonatos nacionais', 
      icon: BadgeCheck, 
      color: 'from-emerald-500/20 to-teal-500/5', 
      iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
    },
    { 
      target: 670, 
      label: 'Downloads da App', 
      sub: 'Adeptos apaixonados', 
      icon: Smartphone, 
      color: 'from-purple-500/20 to-indigo-500/5', 
      iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
    },
    { 
      target: 2000, 
      label: 'Notificações Push', 
      sub: 'Alertas urgentes e horários', 
      icon: BellRing, 
      color: 'from-amber-500/20 to-yellow-500/5', 
      iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
    }
  ];

  useEffect(() => {
    const statsCounters = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = +counter.getAttribute('data-target')!;
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = '+' + Math.ceil(current).toLocaleString('pt-PT');
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = '+' + target.toLocaleString('pt-PT');
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.3 });

    statsCounters.forEach(counter => {
      statsObserver.observe(counter);
    });

    return () => {
      statsCounters.forEach(counter => {
        statsObserver.unobserve(counter);
      });
    };
  }, [currentSlide]);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      // Swipe left -> next
      setCurrentSlide(prev => (prev === stats.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Swipe right -> prev
      setCurrentSlide(prev => (prev === 0 ? stats.length - 1 : prev - 1));
    }
  };

  return (
    <section id="social-proof" className="py-10 sm:py-16 bg-[#0F1115] text-white relative overflow-hidden border-b border-[#262B37]">
      {/* Visual background decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-44 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-44 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* DESKTOP VIEW (md:grid) */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="hidden md:grid md:grid-cols-5 gap-6 items-stretch"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="relative group rounded-2xl bg-[#171A21] border border-[#262B37] p-5 flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:scale-[1.02] shadow-lg overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Activity className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                  <span className="text-3xl lg:text-4xl font-bold font-mono text-white tracking-tight leading-none stat-number block" data-target={stat.target}>
                    +{stat.target}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-[#262B37]/60">
                  <span className="text-xs font-bold text-slate-200 block truncate">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light block truncate mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* MOBILE VIEW CAROUSEL CARD (< md) */}
        <div className="md:hidden max-w-sm mx-auto">
          {/* Header pill */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 bg-brand-blue rounded-full animate-pulse" />
              Impacto no Desporto Automóvel
            </span>
            <span className="text-[10px] font-mono text-slate-500 bg-[#171A21] px-2 py-0.5 rounded-full border border-[#262B37]">
              0{currentSlide + 1} / 0{stats.length}
            </span>
          </div>

          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden rounded-2xl border border-[#262B37] bg-[#171A21] p-5 shadow-2xl min-h-[175px] flex flex-col justify-between"
          >
            {/* Background Glow */}
            <div className={`absolute -top-10 -right-10 w-44 h-44 bg-gradient-to-br ${stats[currentSlide].color} rounded-full blur-3xl pointer-events-none opacity-80`} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="relative z-10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-md ${stats[currentSlide].iconBg}`}>
                    {(() => {
                      const IconComponent = stats[currentSlide].icon;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 bg-[#0F1115] px-2.5 py-1 rounded-full border border-[#262B37]">
                    Vroom.pt
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono text-white tracking-tight stat-number" data-target={stats[currentSlide].target}>
                    +{stats[currentSlide].target}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm mt-1">
                  {stats[currentSlide].label}
                </h4>
                <p className="text-slate-400 text-xs font-light mt-0.5">
                  {stats[currentSlide].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#262B37] z-20">
              <button
                onClick={() => setCurrentSlide(prev => (prev === 0 ? stats.length - 1 : prev - 1))}
                className="w-7 h-7 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-blue transition-colors cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                {stats.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? 'w-5 bg-brand-blue' : 'w-1.5 bg-slate-700'
                    }`}
                    aria-label={`Estatística ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide(prev => (prev === stats.length - 1 ? 0 : prev + 1))}
                className="w-7 h-7 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-blue transition-colors cursor-pointer"
                aria-label="Seguinte"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


