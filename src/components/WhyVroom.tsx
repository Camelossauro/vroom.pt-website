import React, { cloneElement, ReactElement } from 'react';
import { 
  Combine, Globe, Cpu, ShieldAlert, Zap, Layers 
} from 'lucide-react';

export default function WhyVroom() {
  const benefits = [
    {
      title: 'Tudo num único lugar',
      desc: 'Centralize eventos, regulamentos, horários, localizações, notificações e documentos numa única plataforma. Menos tempo perdido a procurar informação, mais tempo dedicado ao desporto motorizado.',
      icon: <Combine className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Cobertura Nacional',
      desc: 'Da velocidade ao rali, do karting ao todo-o-terreno, a Vroom.pt reúne eventos de norte a sul do país, oferecendo uma plataforma comum para toda a comunidade do desporto motorizado.',
      icon: <Globe className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Criado para o Desporto Motorizado',
      desc: 'Ao contrário das plataformas generalistas, a Vroom.pt foi desenvolvida especificamente para clubes, promotores e fãs do desporto motorizado, com funcionalidades adaptadas às necessidades reais de cada evento.',
      icon: <Layers className="w-5 h-5 text-slate-300" />
    },
    {
      title: 'Comunicação Instantânea',
      desc: 'Envie notificações, alertas e atualizações diretamente para quem acompanha os seus eventos. Informação importante entregue no momento certo, sem depender das redes sociais.',
      icon: <Zap className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Segurança e Credibilidade',
      desc: 'Todas as organizações são verificadas antes de poderem publicar eventos, garantindo uma plataforma fiável, livre de spam e com informação proveniente de fontes oficiais.',
      icon: <ShieldAlert className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Rápido em Qualquer Lugar',
      desc: 'Desenvolvido para oferecer uma experiência rápida e fluida, mesmo em zonas com cobertura móvel limitada, como circuitos, troços de rali ou parques de assistência.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />
    }
  ];

  return (
    <section id="why-vroom" className="py-10 sm:py-24 bg-[#171A21] relative border-b border-[#262B37]">
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20">
          <span className="text-[10px] font-montserrat font-bold text-slate-400 tracking-widest uppercase">
            A Diferença Vroom.pt
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            A plataforma para o Motorsport português
          </h2>
          <p className="text-slate-400 text-xs sm:text-lg font-light leading-relaxed">
            Unimos velocidade, gestão e paixão.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="border border-[#262B37] bg-[#1D212B] p-4 sm:p-6 rounded-xl hover:border-slate-700 transition-all duration-300 flex flex-col items-start gap-3 sm:gap-4 text-left"
            >
              <div className="p-2 sm:p-3 bg-[#0F1115] rounded-lg sm:rounded-xl border border-[#262B37]">
                {cloneElement(benefit.icon as ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5 text-brand-blue' })}
              </div>
              <div>
                <h4 className="font-semibold text-white text-[14px] sm:text-base mb-1.5 leading-tight">
                  {benefit.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-tight sm:leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
