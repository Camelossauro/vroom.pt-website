import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CalendarDays, MapPin, ShieldCheck, 
  Eye, Heart, Navigation, ExternalLink, Sparkles, Image as ImageIcon,
  Flag, Gauge, Share2, Phone, Mail, Instagram, Facebook, Globe, Globe2, Check, Smartphone, X
} from 'lucide-react';
import { DatabaseEvent } from '../types';
import { getEventImage } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { getNativeDeepLink } from '../deeplink';

interface EventDetailPageProps {
  event?: DatabaseEvent;
  eventId?: string | number;
  onClose: () => void;
}

export default function EventDetailPage({ event: initialEvent, eventId: initialEventId, onClose }: EventDetailPageProps) {
  const [eventData, setEventData] = useState<DatabaseEvent | null>(initialEvent || null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(!initialEvent);

  const targetEventId = initialEventId || initialEvent?.id;

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!targetEventId) return;

      try {
        const { data, error } = await supabase
          .from('eventos_v2')
          .select('*, profiles(id,full_name,logo_url,siteOficial,email_contacto,telefone,instagram_url,facebook_url,biografia,sede_localizacao)')
          .eq('id', targetEventId)
          .single();

        if (!error && data && isMounted) {
          setEventData(data as any);
        }
      } catch (err) {
        console.warn('[EventDetailPage] Erro ao carregar detalhes do evento do Supabase:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [targetEventId]);

  // Bloqueio de scroll na página enquanto os detalhes do evento estão abertos
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
    };
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  const handleOpenInApp = () => {
    if (!currentEvent) return;
    const deepLinkUrl = getNativeDeepLink(currentEvent.id, currentEvent.natureza || 'Encontros_Corridas_Geral');
    window.location.href = deepLinkUrl;
  };

  const formatDateRange = (startStr?: string | null, endStr?: string | null) => {
    if (!startStr) return 'Data a anunciar';
    const startDate = new Date(startStr);
    const startFormatted = startDate.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
    
    if (!endStr) return startFormatted;
    const endDate = new Date(endStr);
    
    if (startDate.toDateString() === endDate.toDateString()) {
      return startFormatted;
    }
    
    const endFormatted = endDate.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${startFormatted} — ${endFormatted}`;
  };

  const currentEvent = eventData || initialEvent;

  if (loading && !currentEvent) {
    return (
      <div className="min-h-screen bg-[#0D0D0F] text-[#E2E2E6] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">A carregar detalhes do evento...</span>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-[#0D0D0F] text-[#E2E2E6] p-6 flex flex-col items-center justify-center font-sans">
        <p className="text-slate-400 mb-4">Evento não encontrado.</p>
        <button onClick={onClose} className="px-4 py-2 bg-[#141418] border border-[#262B37] rounded-xl text-xs font-bold text-white cursor-pointer">
          Voltar ao Calendário
        </button>
      </div>
    );
  }

  const dynamicImage = getEventImage(
    currentEvent.id, 
    currentEvent.modalidade || currentEvent.natureza, 
    currentEvent.local, 
    currentEvent.imagem_evento, 
    currentEvent.veiculo_alvo
  );

  const isPremium = currentEvent.plano_destaque === 'premium';
  const hasCoordinates = typeof currentEvent.latitude === 'number' && typeof currentEvent.longitude === 'number' && currentEvent.latitude !== 0;

  // Joined public profile if available
  const profile = (currentEvent as any).profiles || null;

  const organizerName = profile?.full_name || currentEvent.organizadora_default || 'Organização do Evento';
  const organizerLogo = profile?.logo_url || currentEvent.logo_url || currentEvent.logo_organizadora_default;
  const organizerLocation = profile?.sede_localizacao || currentEvent.local;
  const organizerBio = profile?.biografia;
  const organizerEmail = profile?.email_contacto;
  const organizerPhone = profile?.telefone;
  const organizerSite = profile?.siteOficial || currentEvent.site_evento;
  const organizerInstagram = profile?.instagram_url;
  const organizerFacebook = profile?.facebook_url;

  const viewsCount = currentEvent.views_count ?? 1;
  const likesCount = currentEvent.likes_count ?? 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0D0F] text-[#E2E2E6] font-sans antialiased selection:bg-brand-blue selection:text-white">
      {/* Top Bar Header */}
      <div className="sticky top-0 z-30 bg-[#0D0D0F]/90 backdrop-blur-md border-b border-[#262B37] px-4 py-3.5 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-300 hover:text-white bg-[#141418] hover:bg-[#202028] px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all border border-[#262B37] text-sm font-semibold cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform text-brand-blue" />
            <span className="hidden sm:inline">Voltar ao Calendário</span>
            <span className="sm:hidden">Voltar</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={handleOpenInApp}
              className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all text-sm font-bold cursor-pointer shadow-md shadow-brand-blue/20 active:scale-95"
            >
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span>Abrir na App</span>
            </button>

            <div className="relative">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-slate-300 hover:text-white bg-[#141418] hover:bg-[#202028] px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all border border-[#262B37] text-sm font-semibold cursor-pointer"
              >
                {copiedShare ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />}
                <span className="hidden sm:inline">{copiedShare ? 'Copiado!' : 'Partilhar'}</span>
              </button>
              {copiedShare && (
                <div className="absolute right-0 top-full mt-2 bg-emerald-500 text-black font-bold text-[10px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap z-50">
                  Link do evento copiado!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-[#141418]">
        <img 
          src={activeImage || dynamicImage} 
          alt={currentEvent.nome}
          className="w-full h-full object-cover transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-[#0D0D0F]/40 to-black/60" />

        <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 max-w-5xl mx-auto z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
            {isPremium && (
              <span className="bg-amber-500 text-black px-3 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-black" /> DESTAQUE PREMIO
              </span>
            )}
            {currentEvent.modalidade && (
              <span className="bg-brand-blue text-white px-3 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase shadow-md">
                {currentEvent.modalidade}
              </span>
            )}
            {currentEvent.veiculo_alvo && (
              <span className="bg-[#141418]/90 backdrop-blur-md border border-[#262B37] text-slate-300 px-3 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase">
                {currentEvent.veiculo_alvo}
              </span>
            )}
            {currentEvent.is_mensal && (
              <span className="bg-purple-600/90 text-white px-3 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase shadow-md">
                Recorrente Mensal
              </span>
            )}
          </div>

          <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight drop-shadow-lg max-w-4xl">
            {currentEvent.nome}
          </h1>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-8 sm:py-10 space-y-8">

        {/* Views & Like Widget (Triggers Install App Modal) */}
        <div className="bg-[#141418] border border-[#262B37] p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-6 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-blue" />
              <span>{viewsCount.toLocaleString('pt-PT')} Visualizações</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-slate-400" />
              <span>{likesCount.toLocaleString('pt-PT')} Gostos</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleOpenInApp}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shadow-md shadow-brand-blue/20 active:scale-95"
            >
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span>Abrir na App Vroom</span>
            </button>

            <button
              onClick={() => setShowInstallModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#1C1C22] text-slate-300 border border-[#262B37] hover:bg-[#262B37] hover:text-white rounded-xl text-sm font-bold font-mono transition-all duration-200 cursor-pointer group"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
              <span>Gostar do Evento</span>
            </button>
          </div>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#141418] p-5 sm:p-6 rounded-2xl border border-[#262B37]">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl shrink-0 shadow-sm">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-mono uppercase mb-0.5">Data do Evento</span>
              <span className="text-sm sm:text-base font-bold text-white leading-snug">
                {formatDateRange(currentEvent.data_inicio, currentEvent.data_fim)}
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl shrink-0 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-mono uppercase mb-0.5">Localização</span>
              <span className="text-sm sm:text-base font-bold text-white leading-snug block">
                {currentEvent.local || 'A definir pela organização'}
              </span>
            </div>
          </div>

          {currentEvent.natureza && (
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl shrink-0 shadow-sm">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-mono uppercase mb-0.5">Natureza</span>
                <span className="text-sm sm:text-base font-bold text-white leading-snug">
                  {currentEvent.natureza}
                </span>
              </div>
            </div>
          )}

          {currentEvent.veiculo_alvo && (
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl shrink-0 shadow-sm">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-mono uppercase mb-0.5">Veículo</span>
                <span className="text-sm sm:text-base font-bold text-white leading-snug">
                  {currentEvent.veiculo_alvo}
                </span>
              </div>
            </div>
          )}

          {currentEvent.ambito && (
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl shrink-0 shadow-sm">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-mono uppercase mb-0.5">Âmbito</span>
                <span className="text-sm sm:text-base font-bold text-white leading-snug">
                  {currentEvent.ambito}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* GPS Coordinates Bar */}
        {hasCoordinates && (
          <div className="p-5 bg-[#141418] border border-brand-blue/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-xl border border-brand-blue/20">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Coordenadas GPS Disponíveis</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Lat: {currentEvent.latitude?.toFixed(4)}, Long: {currentEvent.longitude?.toFixed(4)}
                </p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${currentEvent.latitude},${currentEvent.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Navegar no Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Description */}
        <div className="bg-[#141418] border border-[#262B37] rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2">
            Sobre o Evento
          </h3>
          <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed whitespace-pre-wrap">
            {currentEvent.descricao || 'Informações detalhadas e regulamento do evento disponíveis brevemente.'}
          </p>
        </div>

        {/* ORGANIZER PROFILE CARD (Safe Joined Profile Data) */}
        <div className="bg-[#141418] border border-[#262B37] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#262B37]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#0D0D0F] border border-[#262B37] shrink-0 p-2 flex items-center justify-center shadow-md">
                {organizerLogo ? (
                  <img 
                    src={organizerLogo} 
                    alt={organizerName} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <ShieldCheck className="w-8 h-8 text-brand-blue" />
                )}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block mb-1">
                  Organização Oficial
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white">{organizerName}</h3>
                {organizerLocation && (
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{organizerLocation}</span>
                  </p>
                )}
              </div>
            </div>

            {organizerSite && (
              <a 
                href={organizerSite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1C1C22] hover:bg-[#262B37] border border-[#262B37] rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Globe className="w-4 h-4 text-brand-blue" />
                <span>Website Oficial</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
          </div>

          {/* Biography */}
          {organizerBio && (
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-[#0D0D0F]/60 p-4 rounded-xl border border-[#262B37]/60">
              {organizerBio}
            </div>
          )}

          {/* Contact Details & Social Media Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              {organizerEmail && (
                <a 
                  href={`mailto:${organizerEmail}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-brand-blue transition-colors bg-[#1C1C22] px-3.5 py-2 rounded-lg border border-[#262B37]"
                >
                  <Mail className="w-4 h-4 text-brand-blue" />
                  <span>{organizerEmail}</span>
                </a>
              )}

              {organizerPhone && (
                <a 
                  href={`tel:${organizerPhone}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors bg-[#1C1C22] px-3.5 py-2 rounded-lg border border-[#262B37]"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{organizerPhone}</span>
                </a>
              )}
            </div>

            {/* Social Media Sleek Buttons */}
            <div className="flex items-center gap-2.5">
              {organizerInstagram && (
                <a 
                  href={organizerInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#1C1C22] hover:bg-[#262B37] border border-[#262B37] rounded-xl text-pink-400 hover:text-pink-300 transition-all cursor-pointer"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {organizerFacebook && (
                <a 
                  href={organizerFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#1C1C22] hover:bg-[#262B37] border border-[#262B37] rounded-xl text-blue-400 hover:text-blue-300 transition-all cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Extra Gallery */}
        {Array.isArray(currentEvent.imagens_extra) && currentEvent.imagens_extra.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-blue" />
              Galeria da Prova
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentEvent.imagens_extra.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(imgUrl)}
                  className="h-32 sm:h-40 rounded-xl overflow-hidden border border-[#262B37] hover:border-brand-blue cursor-pointer transition-all duration-300 group relative"
                >
                  <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* App Download Call-to-Action */}
        <div className="bg-gradient-to-br from-[#141418] to-[#0D0D0F] text-white rounded-2xl p-6 sm:p-8 border border-[#262B37] shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center relative z-10">
            <div className="flex-1 space-y-3">
              <span className="text-[11px] bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-md font-mono font-bold uppercase inline-block">
                App Oficial Vroom.pt
              </span>
              <h4 className="font-bold text-xl sm:text-2xl text-white">
                Acompanhe corridas e eventos no seu telemóvel
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Descarregue a aplicação gratuita para receber itinerários GPS, notificações em tempo real e avisos da organização.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 justify-center items-center w-full md:w-56 shrink-0 bg-[#141418]/60 p-4 rounded-xl border border-[#262B37]">
              <Smartphone className="w-6 h-6 text-brand-blue" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Download Gratuito</span>
              
              <a 
                href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-102 active:scale-95 inline-flex items-center justify-center h-[38px] w-[130px] rounded-lg bg-black overflow-hidden relative"
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
                className="transition-all hover:scale-102 active:scale-95 inline-flex items-center justify-center h-[38px] w-[130px] rounded-lg bg-black overflow-hidden relative"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                  alt="Disponível no Google Play" 
                  className="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Install App Popup Modal */}
      {showInstallModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowInstallModal(false)}
        >
          <div 
            className="bg-[#141418] border border-[#262B37] rounded-2xl max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl bg-[#1C1C22] border border-[#262B37] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-500 shadow-inner">
              <Heart className="w-8 h-8 fill-red-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Instale a App Vroom.pt</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Para dar gosto nos seus eventos favoritos, criar itinerários e receber notificações em tempo real, instale a aplicação móvel Vroom.pt no seu telemóvel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a 
                href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center h-[44px] w-[150px] rounded-xl bg-black border border-[#262B37] overflow-hidden relative shadow-md"
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
                className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center h-[44px] w-[150px] rounded-xl bg-black border border-[#262B37] overflow-hidden relative shadow-md"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                  alt="Disponível no Google Play" 
                  className="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowInstallModal(false)}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Continuar a navegar no site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
