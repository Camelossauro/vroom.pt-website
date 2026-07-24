import React, { cloneElement, ReactElement, useState, TouchEvent } from 'react';
import { 
  Bell, FileText, BarChart3, Users, Shield, PlusCircle, Smartphone, ArrowUpRight, CheckCircle, Mail, UserPlus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrganizationsSectionProps {
  onOpenPortal: (mode: 'login' | 'register' | 'dashboard') => void;
}

export default function OrganizationsSection({ onOpenPortal }: OrganizationsSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Swipe support for Steps
  const [stepTouchStart, setStepTouchStart] = useState<number | null>(null);
  const [stepTouchEnd, setStepTouchEnd] = useState<number | null>(null);

  // Swipe support for Features
  const [featureTouchStart, setFeatureTouchStart] = useState<number | null>(null);
  const [featureTouchEnd, setFeatureTouchEnd] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Criar a sua Organização',
      shortTitle: '01. Candidatura',
      description: 'Preencha o formulário de candidatura simples com os dados da sua associação ou clube.',
      icon: <UserPlus className="w-5 h-5 text-brand-blue" />
    },
    {
      num: '02',
      title: 'Verificação e Aprovação Manual',
      shortTitle: '02. Verificação',
      description: 'A nossa equipa valida individualmente cada registo. Esta verificação rigorosa serve para proteger a plataforma contra spam, perfis falsos e assegurar conteúdos oficiais de alta qualidade.',
      icon: <Shield className="w-5 h-5 text-brand-blue" />
    },
    {
      num: '03',
      title: 'E-mail de Confirmação',
      shortTitle: '03. Ativação',
      description: 'Após validação, receberá um e-mail com as credenciais aprovadas e um link direto de ativação para abrir a aplicação.',
      icon: <Mail className="w-5 h-5 text-emerald-400" />
    },
    {
      num: '04',
      title: 'Gestão Total na Vroom.pt App',
      shortTitle: '04. Gestão App',
      description: 'Abra a aplicação móvel, inicie sessão e comece a publicar provas, enviar alertas e gerir os seus fãs diretamente no telemóvel.',
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />
    }
  ];

  const features = [
    {
      title: 'Publicação de Eventos na App',
      shortTitle: 'Publicação',
      description: 'Configure ralis, rampas, trackdays, drift ou encontros. Insira datas, localizações e mapas que os fãs acedem na app.',
      icon: <PlusCircle className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Alertas Push Oficiais',
      shortTitle: 'Alertas Push',
      description: 'Envie atualizações vitais como mudanças de horários ou avisos de segurança diretamente para o telemóvel dos seguidores.',
      icon: <Bell className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Centralização de Regulamentos',
      shortTitle: 'Regulamentos',
      description: 'Carregue regulamentos particulares de ralis, tabelas de tempos e tabelas de pontuações de forma simples para acesso móvel.',
      icon: <FileText className="w-5 h-5 text-slate-300" />
    },
    {
      title: 'Acompanhamento de Alcance',
      shortTitle: 'Estatísticas',
      description: 'Saiba exatamente quantas visualizações cada prova obteve, downloads de regulamentos e pedidos de rota GPS.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Comunidade Altamente Focada',
      shortTitle: 'Comunidade',
      description: 'Esqueça grupos dispersos de WhatsApp ou publicações sem alcance no Facebook. Fale com quem realmente ama desporto motorizado.',
      icon: <Users className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Selo Oficial Azul Vroom.pt',
      shortTitle: 'Selo Oficial',
      description: 'Clubes autênticos e homologados recebem o selo oficial de qualidade e autenticidade da comunidade Vroom.pt.',
      icon: <Shield className="w-5 h-5 text-amber-500" />
    }
  ];

  const minSwipeDistance = 40;

  const handleStepTouchStart = (e: TouchEvent) => {
    setStepTouchEnd(null);
    setStepTouchStart(e.targetTouches[0].clientX);
  };

  const handleStepTouchMove = (e: TouchEvent) => {
    setStepTouchEnd(e.targetTouches[0].clientX);
  };

  const handleStepTouchEnd = () => {
    if (!stepTouchStart || !stepTouchEnd) return;
    const distance = stepTouchStart - stepTouchEnd;
    if (distance > minSwipeDistance) {
      // Swipe left -> next
      setCurrentStep(prev => (prev === steps.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Swipe right -> prev
      setCurrentStep(prev => (prev === 0 ? steps.length - 1 : prev - 1));
    }
  };

  const handleFeatureTouchStart = (e: TouchEvent) => {
    setFeatureTouchEnd(null);
    setFeatureTouchStart(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchMove = (e: TouchEvent) => {
    setFeatureTouchEnd(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchEnd = () => {
    if (!featureTouchStart || !featureTouchEnd) return;
    const distance = featureTouchStart - featureTouchEnd;
    if (distance > minSwipeDistance) {
      // Swipe left -> next
      setCurrentFeature(prev => (prev === features.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Swipe right -> prev
      setCurrentFeature(prev => (prev === 0 ? features.length - 1 : prev - 1));
    }
  };

  return (
    <section id="organizations-section" className="py-10 sm:py-30 bg-[#171A21] relative border-b border-[#262B37] overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-20"
        >
          <span className="box-decoration-clone leading-loose text-xs font-montserrat font-bold text-brand-red tracking-widest uppercase bg-brand-red/10 px-2.5 py-1 rounded-full">
            Para Clubes, Organizadores e Promotores
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            Simplifique a sua comunicação oficial
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg font-light leading-relaxed">
            O Vroom.pt centraliza a informação das maiores provas e eventos de automobilismo em Portugal numa app móvel intuitiva.
          </p>
        </motion.div>

        {/* NEW ORGANIZATION JOURNEY: "How it works" timeline cards */}
        <div className="mb-10 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-12">
            <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">Como Funciona</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
              Desenhamos um fluxo focado na fidedignidade.
            </p>
          </div>

          {/* MOBILE STEPS CAROUSEL (< md) */}
          <div className="md:hidden relative max-w-md mx-auto">
            <div 
              onTouchStart={handleStepTouchStart}
              onTouchMove={handleStepTouchMove}
              onTouchEnd={handleStepTouchEnd}
              className="relative overflow-hidden rounded-2xl border border-[#262B37] bg-[#1D212B] p-5 shadow-2xl min-h-[190px] flex flex-col justify-between"
            >
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-brand-blue/20 via-blue-500/5 to-transparent blur-3xl pointer-events-none opacity-60" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-[#0F1115] rounded-xl border border-[#262B37] shadow-sm">
                      {cloneElement(steps[currentStep].icon as ReactElement, { className: 'w-5 h-5 text-brand-blue' })}
                    </div>
                    <span className="text-2xl font-bold font-mono text-slate-600">{steps[currentStep].num}</span>
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1 text-left">{steps[currentStep].title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-light text-left">{steps[currentStep].description}</p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#262B37] z-20">
                <button
                  onClick={() => setCurrentStep(prev => (prev === 0 ? steps.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-blue transition-colors cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentStep === idx ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-700'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep(prev => (prev === steps.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-blue transition-colors cursor-pointer"
                  aria-label="Seguinte"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP STEPS GRID (>= md) */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-[#1D212B] rounded-xl border border-[#262B37] p-4 sm:p-6 relative flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 sm:p-3 bg-[#0F1115] rounded-xl border border-[#262B37]">
                      {cloneElement(step.icon as ReactElement, { className: 'w-4 h-4 sm:w-5 h-5 text-brand-blue' })}
                    </div>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-slate-700/50">{step.num}</span>
                  </div>
                  <h4 className="font-display font-bold text-white text-[14px] sm:text-base mb-1.5 text-left">{step.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light text-left">{step.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3.5 transform -translate-y-1/2 z-20">
                    <span className="text-brand-red font-bold text-lg">→</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature grid explaining what organizations can do inside the app */}
        <div className="mb-10 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-12">
            <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">Recursos para o seu Clube</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
              Autonomia total diretamente no telemóvel.
            </p>
          </div>

          {/* MOBILE FEATURES CAROUSEL (< md) */}
          <div className="md:hidden relative max-w-md mx-auto">
            <div 
              onTouchStart={handleFeatureTouchStart}
              onTouchMove={handleFeatureTouchMove}
              onTouchEnd={handleFeatureTouchEnd}
              className="relative overflow-hidden rounded-2xl border border-[#262B37] bg-[#1D212B] p-5 shadow-2xl min-h-[190px] flex flex-col justify-between"
            >
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-brand-red/20 via-red-500/5 to-transparent blur-3xl pointer-events-none opacity-60" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F1115] flex items-center justify-center border border-[#262B37] shadow-sm">
                      {cloneElement(features[currentFeature].icon as ReactElement, { className: 'w-5 h-5 text-brand-red' })}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 bg-[#0F1115] px-2 py-1 rounded-md border border-[#262B37]">
                      0{currentFeature + 1} / 0{features.length}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-1 text-left">{features[currentFeature].title}</h3>
                  <p className="text-slate-300 text-xs font-light leading-relaxed text-left">{features[currentFeature].description}</p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#262B37] z-20">
                <button
                  onClick={() => setCurrentFeature(prev => (prev === 0 ? features.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-red transition-colors cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {features.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentFeature(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentFeature === idx ? 'w-6 bg-brand-red' : 'w-2 bg-slate-700'
                      }`}
                      aria-label={`Recurso ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentFeature(prev => (prev === features.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 rounded-full bg-[#0F1115] border border-[#262B37] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-red transition-colors cursor-pointer"
                  aria-label="Seguinte"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP FEATURES GRID (>= md) */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-[#1D212B] rounded-xl border border-[#262B37] p-4 sm:p-6 shadow-xs hover:border-slate-700 transition-all duration-300 "
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0F1115] flex items-center justify-center mb-4 border border-[#262B37]">
                  {cloneElement(feat.icon as ReactElement, { className: 'w-4 h-4 sm:w-5 h-5 text-brand-blue' })}
                </div>
                <h3 className="font-display font-bold text-white text-[14px] sm:text-base mb-1.5 text-left">{feat.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed text-left">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION PANEL (Encouraging mobile installation/access) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="bg-[#1D212B] rounded-xl border border-[#262B37] p-5 sm:p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className=" absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">PRESENÇA TOTALMENTE GRATUITA</span>
              </div>
              
              <h3 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight leading-tight">
                Inicie a sua Jornada no Vroom.pt
              </h3>
              
              <p className="text-slate-400 text-sm sm:text-sm font-light leading-relaxed max-w-xl">
                O acesso e criação de conta no Vroom.pt é totalmente gratuito para organizadores oficiais de provas de desporto motorizado nacional. 
                A publicação de eventos é 100% gratuita. Os clubes validados podem gerir conteúdos, carregar horários, interagir com fãs e enviar notificações cruciais sem qualquer custo.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Obtenha o Selo Azul de Organização Verificada</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Proteção ativa contra spam e perfis clonados</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Gestão completa e publicação de provas efetuada na Mobile App</span>
                </div>
              </div>
            </div>

            {/* Right button action wrapper */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-4 bg-[#171A21] border border-[#262B37] p-4 sm:p-6 rounded-xl">
              <span className="text-xs font-mono font-bold text-slate-400 text-center uppercase tracking-widest block mb-1">
                INICIAR VERIFICAÇÃO OFICIAL
              </span>
              
              <button 
                onClick={() => onOpenPortal('register')}
                className="group w-full py-3.5 px-4 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.01] active:scale-[0.98] border border-blue-400/30"
              >
                <Shield className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold tracking-tight">Tornar-se Organização Verificada</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </button>

              <p className="text-xs text-slate-500 font-light text-center">
                Disponível na Vroom.pt mobile app após aprovação manual de verificação.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
