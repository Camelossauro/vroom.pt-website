import React, { useEffect, useState } from 'react';
import { Smartphone, ExternalLink, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { getNativeDeepLink, LINK_ANDROID, LINK_IOS } from '../deeplink';
import { supabase } from '../lib/supabase';
import { DatabaseEvent } from '../types';
// @ts-ignore
import vroomLogoImg from '../assets/images/vroom_logo_1784301043513.jpg';

interface DeeplinkPageProps {
  onClose?: () => void;
  onOpenEvent?: (event: DatabaseEvent) => void;
}

export default function DeeplinkPage({ onClose, onOpenEvent }: DeeplinkPageProps) {
  const [eventoID, setEventoID] = useState<string | null>(null);
  const [rota, setRota] = useState<string>('Encontros_Corridas_Geral');
  const [eventData, setEventData] = useState<DatabaseEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('eventoID') || params.get('id');
    const route = params.get('rota') || 'Encontros_Corridas_Geral';

    if (id) {
      setEventoID(id);
      setRota(route);

      // Fetch event info from Supabase if available for rich context preview
      async function fetchEventDetails() {
        try {
          const { data, error } = await supabase
            .from('eventos_v2')
            .select('*')
            .eq('id', id)
            .single();

          if (!error && data) {
            setEventData(data as DatabaseEvent);
          }
        } catch (err) {
          console.warn('[DeeplinkPage] Event fetch error:', err);
        } finally {
          setLoading(false);
        }
      }
      fetchEventDetails();

      // Trigger automatic deep link redirection on mobile devices after short delay
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        const deepLinkUrl = getNativeDeepLink(id, route);
        setTimeout(() => {
          window.location.href = deepLinkUrl;
        }, 500);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const nativeDeepLink = eventoID ? getNativeDeepLink(eventoID, rota) : '#';
  const webEventUrl = eventoID ? `/evento.html?id=${eventoID}` : '/';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-brand-blue selection:text-white relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top App Bar Header */}
      <header className="sticky top-0 z-50 py-3.5 sm:py-4 px-4 sm:px-6 border-b border-[#262B37] bg-[#0D0F14]/95 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="text-white group-hover:text-brand-blue transition-colors flex items-center">
              <img 
                src={vroomLogoImg} 
                alt="Vroom.pt Logo" 
                className="w-7 h-7 sm:w-8 h-8 object-contain transition-transform duration-300 rounded-xl shadow-md group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tighter text-white">
              Vroom<span className="text-white font-bold">.pt</span>
            </span>
          </a>
        </div>
      </header>

      {/* Main Deeplink Engine Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="max-w-lg w-full space-y-3">
          {onClose && (
            <div className="flex items-center justify-start px-1">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#171A21] hover:bg-[#262B37] text-slate-300 hover:text-white rounded-xl border border-[#262B37] text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4 text-brand-blue" />
                <span>Voltar</span>
              </button>
            </div>
          )}

          <div className="bg-[#171A21] border border-[#262B37] rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-brand-blue/30 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-slate-400">A processar deeplink...</span>
            </div>
          ) : !eventoID ? (
            <div className="py-8 space-y-4">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-500">
                <Smartphone className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">ID do evento não encontrado</h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                O link fornecido não contém um identificador válido de evento. Por favor verifique o endereço e tente novamente.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                Explorar Calendário de Eventos
              </a>
            </div>
          ) : (
            <>
              {/* Event Preview Badge if available */}
              {eventData ? (
                <div className="bg-[#1D212B] border border-[#262B37] p-4 rounded-2xl text-left flex items-center gap-4">
                  {eventData.imagem_evento ? (
                    <img src={eventData.imagem_evento} alt={eventData.nome} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#262B37]" />
                  ) : (
                    <div className="w-16 h-16 bg-[#12151D] rounded-xl flex items-center justify-center text-brand-blue shrink-0 border border-[#262B37]">
                      <Smartphone className="w-8 h-8" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono font-bold text-brand-blue uppercase block">Evento #{eventData.id}</span>
                    <h3 className="text-sm font-bold text-white truncate">{eventData.nome}</h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{eventData.local || 'Portugal'}</p>
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#12151D] border border-[#262B37] rounded-full text-xs font-mono text-brand-blue">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Evento ID: {eventoID}</span>
                </div>
              )}

              {/* Action Prompt */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Abrir Evento no Vroom.pt</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Já tens a app instalada? Clica no botão abaixo.<br className="hidden sm:inline" />
                  Senão, instala gratuitamente ou vê no website.
                </p>
              </div>

              {/* Main Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  id="deepLinkBtn"
                  href={nativeDeepLink}
                  className="w-full py-3.5 px-6 bg-brand-blue hover:bg-blue-600 active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-brand-blue/25 cursor-pointer"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Abrir na App</span>
                </a>

                <button
                  onClick={() => {
                    if (eventData && onOpenEvent) {
                      onOpenEvent(eventData);
                    } else {
                      window.location.href = webEventUrl;
                    }
                  }}
                  className="w-full py-3.5 px-6 bg-[#12151D] hover:bg-[#1D212B] active:scale-98 text-slate-200 border border-[#262B37] font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🌐 Continuar no Website</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Store Section Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#262B37]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                  <span className="bg-[#171A21] px-3 text-slate-400">Instalar App Oficial</span>
                </div>
              </div>

              {/* Store Links */}
              <div className="flex items-center justify-center gap-3">
                <a 
                  href={LINK_IOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 inline-flex items-center justify-center h-[42px] w-[140px] rounded-xl bg-black border border-[#262B37] overflow-hidden relative shadow-md"
                >
                  <img 
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" 
                    alt="Descarregar na App Store" 
                    className="absolute h-[118%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                  />
                </a>

                <a 
                  href={LINK_ANDROID}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 inline-flex items-center justify-center h-[42px] w-[140px] rounded-xl bg-black border border-[#262B37] overflow-hidden relative shadow-md"
                >
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                    alt="Disponível no Google Play" 
                    className="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                  />
                </a>
              </div>

              {/* Share link helper */}
              <div className="pt-2">
                <button
                  onClick={handleCopyLink}
                  className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />}
                  <span>{copiedLink ? 'Link do Deeplink Copiado!' : 'Copiar URL do Deeplink'}</span>
                </button>
              </div>
            </>
          )}

        </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="p-4 text-center border-t border-[#262B37] bg-[#12151D]/50 text-xs text-slate-400 font-mono relative z-10">
        &copy; {new Date().getFullYear()} Vroom.pt • Deeplink Engine Architecture
      </footer>
    </div>
  );
}
