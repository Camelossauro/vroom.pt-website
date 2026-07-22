import React, { cloneElement, ReactElement } from 'react';
import { Smartphone, Building2, UserCheck, Check, ArrowRight, ShieldCheck, Radio, Award } from 'lucide-react';

interface PlatformOverviewProps {
  onOpenPortal: (mode: 'login' | 'register' | 'dashboard') => void;
  onScrollToSection: (id: string) => void;
}

export default function PlatformOverview({ onOpenPortal, onScrollToSection }: PlatformOverviewProps) {
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
      accentColor: 'bg-brand-red'
    }
  ];

  return (
    <section id="overview" className="py-10 sm:py-30 bg-[#171A21] border-t border-[#262B37] relative">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-20">
          <span className="box-decoration-clone leading-loose text-xs font-montserrat font-bold text-brand-blue tracking-widest uppercase bg-brand-blue/10 px-2 py-0.5 rounded-lg sm:rounded-xl">
            Um Único Ecossistema
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            A infraestrutura digital do Motorsport português
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg font-light leading-relaxed">
            Ligamos todas as pontas do Motorsport nacional.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`bg-[#1D212B] rounded-xl border border-[#262B37] p-4 sm:p-8 shadow-sm transition-all duration-300 flex flex-col justify-between ${pillar.colorTheme}`}
              id={`overview-pillar-${pillar.id}`}
            >
              <div>
                {/* Badge & Icon Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className={`text-xs sm:text-sm font-bold px-2 sm:px-4 py-1 sm:py-1.5 border rounded-full ${pillar.badgeBg}`}>
                    {pillar.badge}
                  </span>
                  <div className="p-2 sm:p-3 bg-[#0F1115] rounded-xl border border-[#262B37]">
                    {cloneElement(pillar.icon as ReactElement, { className: 'w-5 h-5 sm:w-6 h-6' })}
                  </div>
                </div>

                {/* Card Title & Desc */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 sm:mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-light">
                  {pillar.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {pillar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#171A21] flex items-center justify-center border border-[#262B37]">
                        <Check className="w-2.5 h-2.5 text-brand-blue" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={pillar.ctaAction}
                className={`w-full flex items-center justify-center gap-1.5 py-3.5 sm:py-3 border border-[#262B37] font-semibold text-xs sm:text-sm rounded-xl transition-all ${
                  pillar.id === 'drivers'
                    ? 'text-brand-red hover:text-white hover:bg-brand-red hover:border-brand-red bg-[#0F1115] cursor-pointer'
                    : 'text-white hover:text-white hover:bg-[#025bc5] hover:border-[#025bc5] bg-[#0F1115] cursor-pointer'
                }`}
              >
                {pillar.ctaText}
                {pillar.id !== 'drivers' && <ArrowRight className="w-3.5 h-3.5" />}
              </button>

            </div>
          ))}
        </div>

        {/* Short inline summary banner */}
        <div className="mt-10 sm:mt-16 bg-[#1D212B] border border-[#262B37] rounded-xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
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
        </div>

      </div>
    </section>
  );
}
