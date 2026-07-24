import React, { cloneElement, ReactElement, useState, TouchEvent } from 'react';
import { Smartphone, Building2, UserCheck, Check, ArrowRight, ShieldCheck, Radio, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlatformOverviewProps {
  onOpenPortal: (mode: 'login' | 'register' | 'dashboard') => void;
  onScrollToSection: (id: string) => void;
}

export default function PlatformOverview({ onOpenPortal, onScrollToSection }: PlatformOverviewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && activeSlide < pillars.length - 1) {
      setActiveSlide(prev => prev + 1);
    }
    if (isRightSwipe && activeSlide > 0) {
      setActiveSlide(prev => prev - 1);
    }
  };

  const pillars = [
    {
      id: 'fans',
      badge: 'Fãs & Entusiastas',
      badgeBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      title: 'A App Móvel',
      description: 'Descobre eventos, acompanha os teus organizadores favoritos e recebe todas as novidades em tempo real. O Vroom.pt reúne tudo o que precisas para nunca perder uma prova, concentração ou encontro.',
      icon: <Smartphone className="w-6 h-6 text-brand-blue" />,
      features: [
        'Descobre eventos e circuitos em todo o país',
        'Recebe notificações e alertas em tempo real',
        'Consulta regulamentos, horários e documentos',
        'Navega diretamente para o local do evento por GPS',
        'Guarda os teus eventos favoritos e acompanha as novidades',
        'Explora tudo através de uma aplicação rápida e intuitiva'
      ],
      ctaText: 'Ver Recursos da App',
      ctaAction: () => onScrollToSection('app'),
      colorTheme: 'hover:border-brand-blue/30 hover:shadow-brand-blue/5',
      glowColor: 'from-brand-blue/20 via-brand-blue/5 to-transparent',
      accentColor: 'bg-brand-blue'
    },
    {
      id: 'organizations',
      badge: 'Clubes & Promotores',
      badgeBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      title: 'Vroom.pt para Organizações',
      description: 'Crie a sua conta, publique e faça a gestão dos seus eventos com facilidade. Comunique diretamente com os participantes através de notificações, disponibilize documentos importantes e acompanhe o desempenho de cada evento, tudo numa única plataforma.',
      icon: <Building2 className="w-6 h-6 text-brand-blue" />,
      features: [
        'Crie e publique os seus eventos em poucos minutos',
        'Envie notificações e alertas aos participantes',
        'Disponibilize regulamentos, horários e outros documentos',
        'Edite e faça a gestão dos seus eventos em qualquer altura',
        'Consulte estatísticas de visualizações e interações'
      ],
      ctaText: 'Ver Como Funciona',
      ctaAction: () => onScrollToSection('organizations-section'),
      colorTheme: 'hover:border-brand-blue/30 hover:shadow-brand-blue/5',
      glowColor: 'from-brand-blue/20 via-blue-500/5 to-transparent',
      accentColor: 'bg-brand-blue'
    },
    {
      id: 'drivers',
      badge: 'Pilotos Oficiais',
      badgeBg: 'bg-brand-red/10 text-brand-red border-brand-red/20',
      title: 'Perfis de Piloto Oficiais',
      description: 'O Vroom.pt inclui perfis oficiais de pilotos certificados pela nossa equipa de forma manual para assegurar autenticidade total.',
      icon: <Award className="w-6 h-6 text-brand-red" />,
      features: [
        'Verificação e inserção manual realizada pela equipa Vroom.pt',
        'Selo oficial de verificação de piloto Vroom.pt',
        'Destaque para patrocinadores e equipa técnica',
        'Histórico de palmarés, conquistas e biografias',
        'Roteiro (Roadmap): Opção para os fãs seguirem pilotos',
        'Roteiro (Roadmap): Abertura de contas autónomas no futuro'
      ],
      ctaText: 'Em Breve',
      ctaAction: () => {},
      colorTheme: 'hover:border-brand-red/30 hover:shadow-brand-red/5',
      glowColor: 'from-brand-red/20 via-red-500/5 to-transparent',
      accentColor: 'bg-brand-red'
    }
  ];

  const currentPillar = pillars[activeSlide];

  return (
    <section id="overview" className="py-10 sm:py-30 bg-[#171A21] border-t border-[#262B37] relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-20"
        >
          <span className="box-decoration-clone leading-loose text-xs font-montserrat font-bold text-brand-blue tracking-widest uppercase bg-brand-blue/10 px-3 py-1 rounded-full">
            Um Único Ecossistema
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-2 sm:mb-6 leading-tight">
            A infraestrutura digital do Motorsport português
          </h2>
          <p className="text-slate-400 text-xs sm:text-lg font-light leading-relaxed">
            Ligamos todas as pontas do Motorsport nacional.
          </p>
        </motion.div>

        {/* MOBILE CAROUSEL VIEW (< md) */}
        <div className="md:hidden space-y-4 relative">
          
          {/* Top Pill Tab Switcher */}
          <div className="flex items-center justify-between bg-[#12151D] p-1.5 rounded-2xl border border-[#262B37] gap-1 shadow-inner">
            {pillars.map((p, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`flex-1 py-2 px-1 text-center rounded-xl text-[11px] font-bold transition-all cursor-pointer relative ${
                    isActive 
                      ? 'text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="overviewTabGlow"
                      className={`absolute inset-0 rounded-xl ${idx === 2 ? 'bg-brand-red/80' : 'bg-brand-blue'}`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5 truncate">
                    {p.badge.split('&')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carousel Slide Card Container with Color Fades and Touch Swipe */}
          <div 
            className="relative overflow-hidden rounded-2xl border border-[#262B37] bg-[#1D212B] p-5 shadow-2xl min-h-[420px] flex flex-col justify-between"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Top Color Glow Fade Background */}
            <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b ${currentPillar.glowColor} blur-3xl pointer-events-none transition-all duration-700 opacity-60`} />

            {/* Left and Right Edge Color Fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#1D212B] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#1D212B] to-transparent z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative z-10 flex flex-col justify-between h-full flex-1"
              >
                <div>
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 border rounded-full ${currentPillar.badgeBg}`}>
                      {currentPillar.badge}
                    </span>
                    <div className="p-2 bg-[#0F1115] rounded-xl border border-[#262B37] shadow-sm">
                      {cloneElement(currentPillar.icon as ReactElement, { className: 'w-5 h-5' })}
                    </div>
                  </div>

                  {/* Card Title & Desc */}
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {currentPillar.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-5 font-light">
                    {currentPillar.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {currentPillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#12151D] flex items-center justify-center border border-[#262B37]">
                          <Check className={`w-2.5 h-2.5 ${currentPillar.id === 'drivers' ? 'text-brand-red' : 'text-brand-blue'}`} />
                        </div>
                        <span className="text-xs text-slate-200 leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={currentPillar.ctaAction}
                  className={`w-full flex items-center justify-center gap-2 py-3 border border-[#262B37] font-bold text-xs rounded-xl transition-all shadow-md active:scale-98 ${
                    currentPillar.id === 'drivers'
                      ? 'text-brand-red bg-[#0F1115] hover:bg-brand-red hover:text-white hover:border-brand-red'
                      : 'text-white bg-brand-blue hover:bg-blue-600 border-brand-blue'
                  }`}
                >
                  <span>{currentPillar.ctaText}</span>
                  {currentPillar.id !== 'drivers' && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Controls: Centered Indicators */}
            <div className="flex items-center justify-center pt-4 mt-2 border-t border-[#262B37]/60 relative z-20">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {pillars.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx 
                        ? `w-6 ${idx === 2 ? 'bg-brand-red' : 'bg-brand-blue'}` 
                        : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* DESKTOP GRID VIEW (>= md) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, pIdx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: pIdx * 0.12 }}
              className={`bg-[#1D212B] rounded-2xl border border-[#262B37] p-6 lg:p-8 shadow-sm transition-all duration-300 flex flex-col justify-between ${pillar.colorTheme}`}
              id={`overview-pillar-${pillar.id}`}
            >
              <div>
                {/* Badge & Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-bold px-4 py-1.5 border rounded-full ${pillar.badgeBg}`}>
                    {pillar.badge}
                  </span>
                  <div className="p-3 bg-[#0F1115] rounded-xl border border-[#262B37]">
                    {cloneElement(pillar.icon as ReactElement, { className: 'w-6 h-6' })}
                  </div>
                </div>

                {/* Card Title & Desc */}
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                  {pillar.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pillar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#171A21] flex items-center justify-center border border-[#262B37]">
                        <Check className="w-2.5 h-2.5 text-brand-blue" />
                      </div>
                      <span className="text-sm text-slate-300 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={pillar.ctaAction}
                className={`w-full flex items-center justify-center gap-1.5 py-3.5 border border-[#262B37] font-semibold text-sm rounded-xl transition-all ${
                  pillar.id === 'drivers'
                    ? 'text-brand-red hover:text-white hover:bg-brand-red hover:border-brand-red bg-[#0F1115] cursor-pointer'
                    : 'text-white hover:text-white hover:bg-[#025bc5] hover:border-[#025bc5] bg-[#0F1115] cursor-pointer'
                }`}
              >
                {pillar.ctaText}
                {pillar.id !== 'drivers' && <ArrowRight className="w-3.5 h-3.5" />}
              </button>

            </motion.div>
          ))}
        </div>

        {/* Short inline summary banner */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-16 bg-[#1D212B] border border-[#262B37] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-2.5 bg-[#0F1115] rounded-xl shadow-sm text-brand-blue flex-shrink-0 border border-[#262B37]">
              <Radio className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-semibold text-white text-sm sm:text-base">
                Quer registar a sua organização desportiva?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5 leading-relaxed">
                Crie a sua conta no website, aguarde aprovação da nossa equipa e tenha acesso à gestão completa na mobile app de forma rápida.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenPortal('register')}
            className="w-full md:w-auto px-5 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-sm rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-md text-center hover:scale-[1.01] active:scale-95"
          >
            Iniciar Registo de Organizador
          </button>
        </motion.div>

      </div>
    </section>
  );
}

