// Configuração de URIs e Lojas de Apps
export const LINK_ANDROID = "https://play.google.com/store/apps/details?id=com.baseguy.shedulebase";
export const LINK_IOS = "https://apps.apple.com/pt/app/vroom-pt/id6751053867?l=en-GB";

export function getNativeDeepLink(eventoID: string | number, rota?: string): string {
  const rotaFinal = rota || 'Encontros_Corridas_Geral';
  return `vroomapp://vroomapp.pt/Check?eventoID=${eventoID}&rota=${rotaFinal}`;
}

export function renderDeeplinkUI() {
  // 1. Extração de parâmetros da Query String
  const urlParams = new URLSearchParams(window.location.search);
  const eventoID = urlParams.get('eventoID') || urlParams.get('id');
  const rotaRecebida = urlParams.get('rota') || 'Encontros_Corridas_Geral';

  const container = document.getElementById('deeplink-ui');
  if (!container) return;

  // 2. Validação da presença do eventoID
  if (eventoID) {
    // 3. Construção do Custom URI Scheme Nativo
    const deepLink = getNativeDeepLink(eventoID, rotaRecebida);
    const webEventLink = `/evento.html?id=${eventoID}`;

    // Injeção do layout e botões de ação com estilização do Vroom.pt
    container.innerHTML = `
      <div class="deeplink-card max-w-lg w-full mx-auto bg-[#171A21] border border-[#262B37] rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <!-- Glow Orbs -->
        <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-4">
          <!-- Logo & Brand Header -->
          <div class="flex items-center justify-center gap-3">
            <img src="/vroom-logo.jpg" alt="Vroom.pt Logo" class="w-12 h-12 rounded-xl border border-[#262B37] object-cover shadow-md" />
            <div class="text-left">
              <span class="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-widest block">Vroom.pt</span>
              <h1 class="text-lg font-bold text-white leading-none">Motorsport Hub Portugal</h1>
            </div>
          </div>

          <div class="pt-2">
            <h2 class="text-xl font-bold text-white">Abrir Evento no Vroom.pt</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Já tens a app instalada? Clica no botão abaixo.<br class="hidden sm:inline">Senão, instala gratuitamente ou vê no website.
            </p>
          </div>

          <!-- Ação Principal e Fallback Web -->
          <div class="actions flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a id="deepLinkBtn" href="${deepLink}" class="btn btn-primary w-full sm:w-auto px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/25 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              Abrir na App
            </a>
            <a href="${webEventLink}" class="btn-secondary w-full sm:w-auto px-6 py-3.5 bg-[#12151D] hover:bg-[#1D212B] text-slate-200 border border-[#262B37] font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
              🌐 Continuar no Website
            </a>
          </div>

          <!-- Divider -->
          <div class="relative py-2">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-[#262B37]"></div></div>
            <div class="relative flex justify-center text-[10px] uppercase font-mono"><span class="bg-[#171A21] px-3 text-slate-400">Ou descarrega a App nas lojas</span></div>
          </div>

          <!-- Links para as Lojas Oficiais -->
          <div class="store-links flex items-center justify-center gap-3 pt-1">
            <a href="${LINK_IOS}" target="_blank" rel="noopener noreferrer" class="transition-transform hover:scale-105 inline-flex items-center justify-center h-[40px] w-[135px] rounded-lg bg-black border border-[#262B37] overflow-hidden relative shadow-md">
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" alt="App Store" class="absolute h-[118%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </a>
            <a href="${LINK_ANDROID}" target="_blank" rel="noopener noreferrer" class="transition-transform hover:scale-105 inline-flex items-center justify-center h-[40px] w-[135px] rounded-lg bg-black border border-[#262B37] overflow-hidden relative shadow-md">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" alt="Google Play" class="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </a>
          </div>
        </div>
      </div>
    `;

    // Attempt automatic OS deep-link redirection on mobile devices after 300ms
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      setTimeout(() => {
        window.location.href = deepLink;
      }, 400);
    }
  } else {
    container.innerHTML = `
      <div class="max-w-md w-full mx-auto bg-[#171A21] border border-[#262B37] rounded-2xl p-6 text-center space-y-4">
        <img src="/vroom-logo.jpg" alt="Vroom.pt Logo" class="w-12 h-12 rounded-xl border border-[#262B37] mx-auto object-cover" />
        <p class="text-sm font-semibold text-slate-300">ID do evento não encontrado.</p>
        <a href="/" class="inline-block px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold">Voltar ao Website</a>
      </div>
    `;
  }
}

// Inicialização e montagem no DOM
export function initDeeplink() {
  renderDeeplinkUI();
  document.body.classList.add('fade-in');
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeeplink);
  } else {
    initDeeplink();
  }
}
