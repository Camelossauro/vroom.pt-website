import { useEffect, useRef } from 'react';

export default function SocialProof() {
  const stats = [
    { target: 15, label: 'Clubes & Organizadores', sub: 'Em todo o país' },
    { target: 1000, label: 'Eventos Publicados', sub: 'Ralis, pistas e karting' },
    { target: 5, label: 'Pilotos Verificados', sub: 'Campeonatos nacionais' },
    { target: 670, label: 'Downloads da App', sub: 'Adeptos apaixonados' },
    { target: 2000, label: 'Notificações Push', sub: 'Alertas urgentes e horários' }
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
    }, { threshold: 0.5 });

    statsCounters.forEach(counter => {
      statsObserver.observe(counter);
    });

    return () => {
        statsCounters.forEach(counter => {
            statsObserver.unobserve(counter);
        });
    }
  }, []);

  return (
    <section id="social-proof" className="py-10 sm:py-16 bg-[#0F1115] text-white relative overflow-hidden border-b border-[#262B37]">
      {/* Visual background decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-44 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-44 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Statistics Banner */}
        <div className="text-center lg:text-left">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8 items-start">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono text-white tracking-tight leading-none stat-number" data-target={stat.target}>
                  +0
                </span>
                <span className="text-xs sm:text-xs font-semibold text-slate-200 mt-1.5 sm:mt-2 block">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-xs text-slate-500 font-light mt-0.5 block">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

