import { ArrowLeft, Calendar, MapPin, Compass, ShieldCheck, ChevronRight, Smartphone } from 'lucide-react';
import { DatabaseEvent } from '../types';
import { getEventImage } from '../lib/utils';

interface EventDetailPageProps {
  event: DatabaseEvent;
  onClose: () => void;
}

export default function EventDetailPage({ event, onClose }: EventDetailPageProps) {
  const dynamicImage = getEventImage(event.id, event.modalidade || event.natureza, event.local, event.imagem_evento, event.veiculo_alvo);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      {/* Header image cover - Minimized height on mobile */}
      <div className="h-40 sm:h-96 w-full relative overflow-hidden">
        <img 
          src={dynamicImage} 
          alt={event.nome}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-black/60" />
        
        <div className="absolute top-2 left-2 sm:top-6 sm:left-6">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-white bg-black/40 hover:bg-black px-1.5 py-0.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg transition-all cursor-pointer backdrop-blur-md border border-white/10 group"
          >
            <ArrowLeft className="w-3 h-3 sm:w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-[9px] sm:text-base font-medium">Voltar</span>
          </button>
        </div>

        <div className="absolute bottom-2 left-3 right-3 sm:bottom-8 sm:left-8 sm:right-8">
          {event.modalidade && (
            <span className="bg-brand-blue text-white px-1 py-0.5 sm:px-3 sm:py-1 rounded-sm sm:rounded-md text-[7px] sm:text-xs font-mono font-bold uppercase mb-0.5 sm:mb-3 inline-block shadow-lg">
              {event.modalidade}
            </span>
          )}
          <h1 className="font-display font-bold text-base sm:text-5xl text-white tracking-tight leading-tight drop-shadow-lg">
            {event.nome}
          </h1>
        </div>
      </div>

      {/* Main content - Balanced paddings */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-12 sm:py-12">
        {/* Meta Grid info - Forced 2 columns on mobile with better gaps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 bg-[#171A21] p-3 sm:p-6 rounded-xl border border-[#262B37] mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="p-1.5 sm:p-3 bg-[#1D212B] rounded-lg text-brand-blue border border-[#262B37]">
              <Calendar className="w-3.5 h-3.5 sm:w-6 h-6" />
            </div>
            <div>
              <span className="text-[7px] sm:text-xs text-slate-400 block font-mono mb-0.5">DATA</span>
              <span className="text-[10px] sm:text-sm font-bold text-white leading-none">{event.data_inicio ? new Date(event.data_inicio).toLocaleDateString('pt-PT') : 'Por anunciar'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="p-1.5 sm:p-3 bg-[#1D212B] rounded-lg text-brand-blue border border-[#262B37]">
              <MapPin className="w-3.5 h-3.5 sm:w-6 h-6" />
            </div>
            <div>
              <span className="text-[7px] sm:text-xs text-slate-400 block font-mono mb-0.5">LOCAL</span>
              <span className="text-[10px] sm:text-sm font-bold text-white leading-none truncate max-w-[80px] sm:max-w-none block">{event.local || 'Definir'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 col-span-2 sm:col-span-1 pt-2 sm:pt-0 border-t border-[#262B37] sm:border-0">
            <div className="p-1.5 sm:p-3 bg-[#1D212B] rounded-lg text-slate-300 border border-[#262B37]">
              <Compass className="w-3.5 h-3.5 sm:w-6 h-6" />
            </div>
            <div>
              <span className="text-[7px] sm:text-xs text-slate-400 block font-mono mb-0.5">ÂMBITO</span>
              <span className="text-[10px] sm:text-sm font-bold text-white leading-none">{event.ambito || 'Nacional'}</span>
            </div>
          </div>
        </div>

        {/* Organizer and Description */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-8 items-start mb-12 sm:mb-12">
          
          <div className="lg:col-span-8 space-y-4 w-full order-2 lg:order-1">
            <h2 className="font-display font-bold text-white text-lg sm:text-2xl">Sobre a Prova</h2>
            <p className="text-slate-300 text-xs sm:text-base font-light leading-relaxed">
              {event.descricao || 'Detalhes da prova não disponíveis no momento.'}
            </p>
          </div>
          
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 w-full order-1 lg:order-2">
            {/* Organizer Block - Optimized for density but with breathing room */}
            <div className="bg-[#171A21] border border-[#262B37] rounded-xl p-4 sm:p-6 flex lg:flex-col items-center gap-4 lg:text-center">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#0F1115] border border-[#262B37] shrink-0">
                {event.logo_organizadora_default ? (
                  <img src={event.logo_organizadora_default} alt={event.organizadora_default || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                    <ShieldCheck className="w-5 h-5 sm:w-10 sm:h-10" />
                  </div>
                )}
              </div>
              <div className="flex-1 lg:w-full">
                <span className="text-[8px] text-slate-400 uppercase font-mono block mb-1 lg:mb-4">ORGANIZADOR</span>
                <span className="text-xs sm:text-base font-bold text-white block truncate">{event.organizadora_default || 'Independente'}</span>
                {event.organizer_id && (
                  <span className="text-[8px] sm:text-[10px] bg-brand-blue/15 text-brand-blue border border-brand-blue/30 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold inline-flex items-center gap-1 mt-1.5">
                    <ShieldCheck className="w-3 h-3 sm:w-4 h-4 text-brand-blue" /> Verificado
                  </span>
                )}
              </div>
            </div>
            
            {event.site_evento && (
              <a 
                href={event.site_evento} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 sm:py-4 bg-[#1D212B] border border-[#262B37] rounded-lg text-[10px] sm:text-sm font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Website Oficial
                <ChevronRight className="w-3.5 h-3.5 sm:w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* HIGH-IMPACT MOBILE APP CTA CARD */}
        <div className="bg-gradient-to-br from-[#171A21] to-[#0F1115] text-white rounded-2xl p-6 sm:p-10 border border-[#262B37] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl -mr-16 -mt-16 rounded-full" />
          
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center relative z-10">
            
            <div className="flex-1 space-y-3 sm:space-y-5">
              <span className="text-[10px] bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-3 py-0.5 rounded-lg font-mono font-bold tracking-wider uppercase inline-block">
                Exclusivo App
              </span>
              <h4 className="font-display font-bold text-xl sm:text-3xl tracking-tight text-white leading-tight">
                Vroom.pt na palma da sua mão
              </h4>
              <p className="text-slate-400 text-xs sm:text-base leading-relaxed font-light">
                O site é apenas o ponto de partida. Instale a app oficial para viver a adrenalina ao máximo com ferramentas em tempo real:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
                {[
                  'Alertas de resultados em tempo real',
                  'Notificações push da organização',
                  'Acesso offline a regulamentos',
                  'Perfis detalhados de pilotos',
                  'GPS exato até às zonas de espetáculo',
                  'Gestão de favoritos e subscrições'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-blue font-bold text-[10px]">✓</span>
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-slate-300 leading-tight font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3.5 justify-center items-center w-full md:w-64 flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 text-center">
              <Smartphone className="w-8 h-8 text-brand-blue mb-1" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Download Gratuito</span>
              
              <a 
                href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[44px] w-[148px] rounded-lg bg-black overflow-hidden relative"
              >
                <img 
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" 
                  alt="Descarregar na App Store" 
                  className="absolute h-[118%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  referrerPolicy="no-referrer"
                />
              </a>
              
              <a 
                href="https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[44px] w-[148px] rounded-lg bg-black overflow-hidden relative"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                  alt="Disponível no Google Play" 
                  className="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  referrerPolicy="no-referrer"
                />
              </a>
              
              <span className="text-[10px] text-slate-500 font-light block mt-2">100% Gratuito para Adeptos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
