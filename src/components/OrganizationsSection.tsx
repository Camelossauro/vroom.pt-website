import React, { cloneElement, ReactElement } from 'react';
import { 
  Bell, FileText, BarChart3, Users, Shield, PlusCircle, Smartphone, ArrowUpRight, CheckCircle, Mail, UserPlus
} from 'lucide-react';

interface OrganizationsSectionProps {
  onOpenPortal: (mode: 'login' | 'register' | 'dashboard') => void;
}

export default function OrganizationsSection({ onOpenPortal }: OrganizationsSectionProps) {
  const steps = [
    {
      num: '01',
      title: 'Criar a sua Organização',
      description: 'Preencha o formulário de candidatura simples com os dados da sua associação ou clube.',
      icon: <UserPlus className="w-5 h-5 text-brand-blue" />
    },
    {
      num: '02',
      title: 'Verificação e Aprovação Manual',
      description: 'A nossa equipa valida individualmente cada registo. Esta verificação rigorosa serve para proteger a plataforma contra spam, perfis falsos e assegurar conteúdos oficiais de alta qualidade.',
      icon: <Shield className="w-5 h-5 text-brand-blue" />
    },
    {
      num: '03',
      title: 'E-mail de Confirmação',
      description: 'Após validação, receberá um e-mail com as credenciais aprovadas e um link direto de ativação para abrir a aplicação.',
      icon: <Mail className="w-5 h-5 text-emerald-400" />
    },
    {
      num: '04',
      title: 'Gestão Total na Vroom.pt App',
      description: 'Abra a aplicação móvel, inicie sessão e comece a publicar provas, enviar alertas e gerir os seus fãs diretamente no telemóvel.',
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />
    }
  ];

  const features = [
    {
      title: 'Publicação de Eventos na App',
      description: 'Configure ralis, rampas, trackdays, drift ou encontros. Insira datas, localizações e mapas que os fãs acedem na app.',
      icon: <PlusCircle className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Alertas Push Oficiais',
      description: 'Envie atualizações vitais como mudanças de horários ou avisos de segurança diretamente para o telemóvel dos seguidores.',
      icon: <Bell className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Centralização de Regulamentos',
      description: 'Carregue regulamentos particulares de ralis, tabelas de tempos e tabelas de pontuações de forma simples para acesso móvel.',
      icon: <FileText className="w-5 h-5 text-slate-300" />
    },
    {
      title: 'Acompanhamento de Alcance',
      description: 'Saiba exatamente quantas visualizações cada prova obteve, downloads de regulamentos e pedidos de rota GPS.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Comunidade Altamente Focada',
      description: 'Esqueça grupos dispersos de WhatsApp ou publicações sem alcance no Facebook. Fale com quem realmente ama desporto motorizado.',
      icon: <Users className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Selo Oficial Azul Vroom.pt',
      description: 'Clubes autênticos e homologados recebem o selo oficial de qualidade e autenticidade da comunidade Vroom.pt.',
      icon: <Shield className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <section id="organizations-section" className="py-10 sm:py-30 bg-[#171A21] relative border-b border-[#262B37]">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-20">
          <span className="box-decoration-clone leading-loose text-xs font-montserrat font-bold text-brand-red tracking-widest uppercase bg-brand-red/10 px-2 py-0.5 rounded-lg sm:rounded-xl">
            Para Clubes, Organizadores e Promotores
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            Simplifique a sua comunicação oficial
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg font-light leading-relaxed">
            O Vroom.pt centraliza a informação das maiores provas e eventos de automobilismo em Portugal numa app móvel intuitiva.
          </p>
        </div>

        {/* NEW ORGANIZATION JOURNEY: "How it works" timeline cards */}
        <div className="mb-10 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
            <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">Como Funciona</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-light">
              Desenhamos um fluxo focado na fidedignidade.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {steps.map((step, idx) => (
              <div 
                key={idx}
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
              </div>
            ))}
          </div>
        </div>

        {/* Feature grid explaining what organizations can do inside the app */}
        <div className="mb-10 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
            <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">Recursos para o seu Clube</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-light">
              Autonomia total diretamente no telemóvel.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-[#1D212B] rounded-xl border border-[#262B37] p-4 sm:p-6 shadow-xs hover:border-slate-700 transition-all duration-300 "
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0F1115] flex items-center justify-center mb-4 border border-[#262B37]">
                  {cloneElement(feat.icon as ReactElement, { className: 'w-4 h-4 sm:w-5 h-5 text-brand-blue' })}
                </div>
                <h3 className="font-display font-bold text-white text-[14px] sm:text-base mb-1.5 text-left">{feat.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed text-left">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION PANEL (Encouraging mobile installation/access) */}
        <div className="bg-[#1D212B] rounded-xl border border-[#262B37] p-5 sm:p-8 md:p-12 shadow-xl relative overflow-hidden">
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
                className="w-full py-3.5 bg-brand-blue text-white font-bold rounded-xl text-sm sm:text-sm hover:bg-brand-blue-hover transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95"
              >
                Tornar-se Organização Verificada
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-slate-500 font-light text-center">
                Disponível na Vroom.pt mobile app após aprovação manual de verificação.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
