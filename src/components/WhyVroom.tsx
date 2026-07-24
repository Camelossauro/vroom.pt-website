import React, { cloneElement, ReactElement, useState, TouchEvent } from 'react';
import { 
  Combine, Globe, Cpu, ShieldAlert, Zap, Layers, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhyVroom() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const benefits = [
    {
      title: 'Tudo num único lugar',
      shortTitle: 'Único Lugar',
      desc: 'Centralize eventos, regulamentos, horários, localizações, notificações e documentos numa única plataforma. Menos tempo perdido a procurar informação, mais tempo dedicado ao desporto motorizado.',
      icon: <Combine className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Cobertura Nacional',
      shortTitle: 'Nacional',
      desc: 'Da velocidade ao rali, do karting ao todo-o-terreno, a Vroom.pt reúne eventos de norte a sul do país, oferecendo uma plataforma comum para toda a comunidade do desporto motorizado.',
      icon: <Globe className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Criado para o Desporto Motorizado',
      shortTitle: 'Especializado',
      desc: 'Ao contrário das plataformas generalistas, a Vroom.pt foi desenvolvida especificamente para clubes, promotores e fãs do desporto motorizado, com funcionalidades adaptadas às necessidades reais de cada evento.',
      icon: <Layers className="w-5 h-5 text-slate-300" />
    },
    {
      title: 'Comunicação Instantânea',
      shortTitle: 'Instantânea',
      desc: 'Envie notificações, alertas e atualizações diretamente para quem acompanha os seus eventos. Informação importante entregue no momento certo, sem depender das redes sociais.',
      icon: <Zap className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Segurança e Credibilidade',
      shortTitle: 'Segurança',
      desc: 'Todas as organizações são verificadas antes de poderem publicar eventos, garantindo uma plataforma fiável, livre de spam e com informação proveniente de fontes oficiais.',
      icon: <ShieldAlert className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Rápido em Qualquer Lugar',
      shortTitle: 'Alta Performance',
      desc: 'Desenvolvido para oferecer uma experiência rápida e fluida, mesmo em zonas com cobertura móvel limitada, como circuitos, troços de rali ou parques de assistência.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />
    }
  ];

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
      setCurrentSlide(prev => (prev === benefits.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Swipe right -> prev
      setCurrentSlide(prev => (prev === 0 ? benefits.length - 1 : prev - 1));
    }
  };

  return (
    <section id="why-vroom" className="py-10 sm:py-24 bg-[#171A21] relative border-b border-[#262B37] overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-20"
        >
          <span className="text-[10px] font-montserrat font-bold text-slate-400 tracking-widest uppercase">
            A Diferença Vroom.pt
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-2 mb-2 sm:mb-6 leading-tight">
            A plataforma para o Motorsport português
          </h2>
          <p className="text-slate-400 text-xs sm:text-lg font-light leading-relaxed">
            Unimos velocidade, gestão e paixão.
          </p>
        </motion.div>

        {/* MOBILE CAROUSEL (< md) */}
        <div className="md:hidden relative max-w-md mx-auto">
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden rounded-2xl border border-[#262B37] bg-[#1D212B] p-5 shadow-2xl min-h-[200px] flex flex-col justify-between"
          >
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-brand-blue/20 via-blue-500/5 to-transparent blur-3xl pointer-events-none opacity-60" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-[#0F1115] rounded-xl border border-[#262B37] shadow-sm flex-shrink-0">
                    {cloneElement(benefits[currentSlide].icon as ReactElement, { className: 'w-5 h-5 text-brand-blue' })}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-wider block">
                      Vantagem 0{currentSlide + 1} de 0{benefits.length}
                    </span>
                    <h4 className="font-semibold text-white text-base leading-tight">
                      {benefits[currentSlide].title}
                    </h4>
                  </div>
                </div>

                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  {benefits[currentSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#262B37] z-20">
              <button
                onClick={() => setCurrentSlide(prev => (prev === 0 ? benefits.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-blue transition-colors cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {benefits.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-700'
                    }`}
                    aria-label={`Vantagem ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide(prev => (prev === benefits.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-blue transition-colors cursor-pointer"
                aria-label="Seguinte"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP GRID VIEW (>= md) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="border border-[#262B37] bg-[#1D212B] p-4 sm:p-6 rounded-xl hover:border-slate-700 transition-all duration-300 flex flex-col items-start gap-3 sm:gap-4 text-left"
            >
              <div className="p-2 sm:p-3 bg-[#0F1115] rounded-lg sm:rounded-xl border border-[#262B37]">
                {cloneElement(benefit.icon as ReactElement, { className: 'w-4 h-4 sm:w-5 h-5 text-brand-blue' })}
              </div>
              <div>
                <h4 className="font-semibold text-white text-[14px] sm:text-base mb-1.5 leading-tight">
                  {benefit.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-tight sm:leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
