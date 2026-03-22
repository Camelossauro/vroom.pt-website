import { getSupabase } from './supabase.js';
import { loadHeader, loadFooter } from './layout.js';
import { inject } from '@vercel/analytics';

// Injetar Vercel Analytics
inject();

console.log('VROOM: src/evento.js is executing');

// VROOM VERSION: 1.0.2
console.log('VROOM: src/evento.js carregado v1.0.2');

// Global error handler for debugging
window.onerror = function(message, source, lineno, colno, error) {
  console.error('VROOM: Erro Global:', message, 'em', source, 'linha', lineno);
  const container = document.getElementById('event-detail-content');
  if (container) {
    container.innerHTML = `
      <div class="container section-padding" style="padding-top: 140px;">
        <div class="placeholder-card">
          <p>⚠️ Erro Crítico de Execução</p>
          <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">${message}</p>
          <a href="/" class="btn btn-primary" style="margin-top: 20px;">Voltar à Home</a>
        </div>
      </div>`;
  }
};

const body = document.body;
const LOGO_DARK = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo_branco.png";
const LOGO_LIGHT = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo.png";

function getBackButtonHtml() {
  return `
    <div class="container" style="padding-top: 140px; padding-bottom: 0;">
      <div style="text-align: left; margin-bottom: 24px;">
        <button onclick="window.history.back()" class="btn btn-outline btn-back" style="cursor: pointer; padding: 10px 20px; font-size: 13px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; background: transparent; color: inherit; border: 1px solid currentColor;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Voltar
        </button>
      </div>
    </div>
  `;
}

// Page Fade-in
setTimeout(() => {
  body.classList.add('fade-in');
}, 10);

async function loadEventDetail() {
  console.log('VROOM: Iniciando loadEventDetail...');
  const container = document.getElementById('event-detail-content');
  if (!container) {
    console.error('VROOM: Content container not found!');
    return;
  }

  // Mostrar o botão de voltar imediatamente para melhorar UX
  container.innerHTML = getBackButtonHtml() + `
    <div class="container section-padding" style="padding-top: 20px;">
      <div class="placeholder-card">A carregar detalhes do evento...</div>
    </div>`;

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  console.log('VROOM: Event ID:', eventId);

  if (!eventId) {
    container.innerHTML = `
      ${getBackButtonHtml()}
      <div class="container section-padding" style="padding-top: 20px;">
        <div class="placeholder-card">ID do evento não fornecido na URL.</div>
      </div>`;
    return;
  }

  try {
    // Tentar carregar da cache primeiro para evitar problemas de rede no iframe
    const cachedEvents = sessionStorage.getItem('vroom_events');
    if (cachedEvents) {
      console.log('VROOM: Verificando cache local...');
      const allEvents = JSON.parse(cachedEvents);
      const eventFromCache = allEvents.find(e => String(e.id) === String(eventId));
      if (eventFromCache) {
        console.log('VROOM: Evento encontrado na cache! Renderizando...');
        renderEventDetail(eventFromCache);
        return;
      }
    }

    const supabase = getSupabase();
    if (!supabase) {
      container.innerHTML = `
        ${getBackButtonHtml()}
        <div class="container section-padding" style="padding-top: 20px;">
          <div class="placeholder-card">
            <p>⚠️ Supabase não configurado</p>
            <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">Verifique as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.</p>
          </div>
        </div>`;
      return;
    }

    console.log('VROOM: Procurando evento no Supabase com ID:', eventId);
    
    // Tentar converter para número se possível, mas manter string como fallback
    const numericId = !isNaN(eventId) ? parseInt(eventId) : eventId;
    
    console.log('VROOM: Executando query na tabela eventos_now...');
    
    const { data: events, error } = await supabase
      .from('eventos_now')
      .select('*')
      .or(`id.eq.${eventId},id.eq.${numericId}`); // Tenta os dois formatos para garantir

    if (error) {
      console.error('VROOM: Erro na query Supabase:', error);
      container.innerHTML = `
        ${getBackButtonHtml()}
        <div class="container section-padding" style="padding-top: 20px;">
          <div class="placeholder-card">
            <p>⚠️ Erro na Base de Dados</p>
            <p style="font-size: 14px; color: #ff4444; margin-top: 10px;">Código: ${error.code}</p>
            <p style="font-size: 12px; opacity: 0.8;">Mensagem: ${error.message}</p>
          </div>
        </div>`;
      return;
    }
    
    const event = events && events.length > 0 ? events[0] : null;
    
    if (!event) {
      console.warn('VROOM: Nenhum evento encontrado para o ID:', eventId);
      container.innerHTML = `
        ${getBackButtonHtml()}
        <div class="container section-padding" style="padding-top: 20px;">
          <div class="placeholder-card">
            <p>Evento não encontrado</p>
            <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">Não foi encontrado nenhum evento com o ID ${eventId} na tabela 'eventos_now'.</p>
          </div>
        </div>`;
      return;
    }

    console.log('VROOM: Evento carregado com sucesso:', event.nome);
    
    // --- INÍCIO: INJEÇÃO DE SEO DINÂMICO ---
    injectDynamicSEO(event);
    // --- FIM: INJEÇÃO DE SEO DINÂMICO ---

    // Redirecionar se for Competição + Default (não deve ter página dedicada)
    const isDirectLink = event.natureza?.toLowerCase() === 'competição' && event.plano_destaque?.toLowerCase() === 'default';
    if (isDirectLink && event.site_evento) {
      console.log('VROOM: Redirecionando para site oficial...');
      window.location.href = event.site_evento;
      return;
    }

    renderEventDetail(event);
  } catch (err) {
    console.error('VROOM: Erro fatal:', err);
    container.innerHTML = `
      ${getBackButtonHtml()}
      <div class="container section-padding" style="padding-top: 20px;">
        <div class="placeholder-card">
          <p>Erro ao carregar detalhes</p>
          <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">${err.message}</p>
        </div>
      </div>`;
  }
}

// --- NOVA FUNÇÃO PARA SEO DINÂMICO NA PÁGINA DE DETALHE ---
function injectDynamicSEO(event) {
  const mainImage = event.imagem_evento || 'https://vroom-images.b-cdn.net/Design%20sem%20nome%20(17).png';
  const description = event.descricao || event.description || `Detalhes do evento ${event.nome} no Vroom.pt`;

  // 1. Atualizar o Título da Página (Aba do Navegador)
  document.title = `${event.nome} | Vroom.pt`;

  // 2. Atualizar Meta Tags (Open Graph para Redes Sociais)
  const updateMetaTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      if (property.startsWith('og:')) {
        tag.setAttribute('property', property);
      } else {
        tag.setAttribute('name', property);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  updateMetaTag('description', description);
  updateMetaTag('og:title', `${event.nome} | Vroom.pt`);
  updateMetaTag('og:description', description);
  updateMetaTag('og:image', mainImage);
  updateMetaTag('og:url', window.location.href);

  // 3. Injetar Dados Estruturados (Schema.org) específicos para este evento
  const existingScript = document.getElementById('schema-evento-detalhe');
  if (existingScript) {
    existingScript.remove();
  }

  const schemaEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.nome,
    "startDate": event.data_inicio,
    "endDate": event.data_fim,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.local,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PT"
      }
    },
    "image": [mainImage],
    "description": description,
    "organizer": {
      "@type": "Organization",
      "name": event.organizadora || "Vroom.pt",
      "url": "https://vroomapp.pt"
    }
  };

  const script = document.createElement('script');
  script.id = 'schema-evento-detalhe';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaEvent);
  document.head.appendChild(script);

  console.log('VROOM: SEO Dinâmico (Meta Tags + Schema) injetado com sucesso!');
}
// ---------------------------------------------------------

function getInstallCtaHtml() {
  console.log('VROOM: getInstallCtaHtml() called');
  const html = `
    <div class="container section-padding" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="install-cta-card" style="display: block !important; visibility: visible !important;">
        <h3>Queres ver mais eventos e novidades?</h3>
        <p>Instala a nossa app para teres acesso a tudo em primeira mão.</p>
        <div class="cta-buttons" style="display: flex !important; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="https://apps.apple.com/pt/app/vroom-pt/id6751053867" class="btn-store" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 12px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span>App Store</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT" class="btn-store" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 12px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span>Google Play</span>
          </a>
        </div>
      </div>
    </div>
  `;
  console.log('VROOM: getInstallCtaHtml() returning:', html);
  return html;
}

function renderEventDetail(event) {
  console.log('VROOM: renderEventDetail() called for:', event.nome);
  const container = document.getElementById('event-detail-content');
  const isPremium = event.plano_destaque?.toLowerCase() === 'premium';
  const isCompeticao = event.natureza?.toLowerCase().includes('competição');
  const isLazer = event.natureza?.toLowerCase().includes('lazer') || 
                  event.natureza?.toLowerCase().includes('encontro') ||
                  event.natureza?.toLowerCase().includes('passeio') ||
                  event.modalidade?.toLowerCase().includes('passeio') ||
                  event.modalidade?.toLowerCase().includes('encontro');
  
  const showAmbito = !isLazer && event.ambito && event.ambito.trim() !== '.' && event.ambito.trim() !== '';
  const mainImage = event.imagem_evento || 'https://vroom-images.b-cdn.net/Design%20sem%20nome%20(17).png';
  
  const startDate = new Date(event.data_inicio).toLocaleDateString('pt-PT');
  const endDate = new Date(event.data_fim).toLocaleDateString('pt-PT');
  const dateDisplay = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

  // Layout logic
  let extraImagesHtml = '';
  if (isPremium) {
    const images = [event.imagem_1, event.imagem_2, event.imagem_3, event.imagem_4, event.imagem_5].filter(img => img);
    if (images.length > 0) {
      extraImagesHtml = `
        <div class="event-gallery">
          <h3>Galeria de Imagens</h3>
          <div class="gallery-grid">
            ${images.map(img => `<img src="${img}" alt="Galeria" class="gallery-img" referrerPolicy="no-referrer">`).join('')}
          </div>
        </div>
      `;
    }
  }

  const html = `
    ${getBackButtonHtml()}
    <div class="event-hero" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${mainImage}')">
      <div class="container">
        <div class="event-hero-content">
          <div class="event-badges">
            ${isPremium ? '<span class="badge badge-premium">PREMIUM</span>' : ''}
          </div>
          <h1 class="event-title-large">${event.nome}</h1>
          <div class="event-meta-large">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>${dateDisplay}</span>
            </div>
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${event.local}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container section-padding">
      <div class="event-detail-grid">
        <div class="event-main-info">
          <section class="event-description-section">
            <h3>Sobre o Evento</h3>
            <p>${event.description || event.descricao || 'Sem descrição disponível.'}</p>
          </section>
          ${extraImagesHtml}
        </div>
        
        <aside class="event-sidebar">
          <div class="sidebar-card">
            <h3>Informações Técnicas</h3>
            <div class="tech-info-list">
              <div class="tech-item">
                <span class="tech-label">Modalidade</span>
                <span class="tech-value">${event.modalidade || 'N/A'}</span>
              </div>
              <div class="tech-item">
                <span class="tech-label">Veículo Alvo</span>
                <span class="tech-value">${event.veiculo_alvo || 'N/A'}</span>
              </div>
              ${showAmbito ? `
              <div class="tech-item">
                <span class="tech-label">Âmbito</span>
                <span class="tech-value">${event.ambito}</span>
              </div>
              ` : ''}
              ${isLazer ? `
              <div class="tech-item" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; padding: 20px 0; border-bottom: 1px solid var(--border-color);">
                <span class="tech-label" style="margin-bottom: 0;">Organizadora</span>
                ${event.logo_organizadora ? `<img src="${event.logo_organizadora}" alt="${event.organizadora}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 12px; background: white; padding: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" referrerPolicy="no-referrer">` : ''}
                <span class="tech-value" style="font-size: 14px; font-weight: 700;">${event.organizadora}</span>
              </div>
              ` : `
              <div class="tech-item">
                <span class="tech-label">Organizadora</span>
                <span class="tech-value">${event.organizadora}</span>
              </div>
              `}
            </div>
            <a href="${event.site_evento || '#'}" class="btn btn-primary w-full" target="_blank">Site Oficial</a>
          </div>
        </aside>
      </div>
    </div>
    ${getInstallCtaHtml()}
  `;
  console.log('VROOM: renderEventDetail() setting container.innerHTML');
  container.innerHTML = html;
}

// Theme logic
function setupTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const isLight = body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
      updateLogos(isLight);
    });
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateThemeIcon(true);
    updateLogos(true);
  } else {
    updateThemeIcon(false);
    updateLogos(false);
  }
}

function updateLogos(isLight) {
  const logos = document.querySelectorAll('.logo img, .hero-logo');
  const logoUrl = isLight ? LOGO_LIGHT : LOGO_DARK;
  logos.forEach(img => {
    img.src = logoUrl;
  });
}

function updateThemeIcon(isLight) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  if (isLight) {
    themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  } else {
    themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
  }
}

function setupNavScroll() {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.padding = window.scrollY > 50 ? '10px 0' : '20px 0';
    });
  }
}

function init() {
  console.log('VROOM: init() chamado');

  // Intersection Observer for Animations
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  window.globalScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        window.globalScrollObserver.unobserve(entry.target);
        
        // Remove animation classes after it finishes
        setTimeout(() => {
          entry.target.classList.remove('animate-on-scroll', 'is-visible', 'delay-0', 'delay-100', 'delay-200', 'delay-300', 'delay-400');
        }, 1200);
      }
    });
  }, observerOptions);
  
  // Ensure header and footer are loaded first
  console.log('VROOM: Tentando carregar header e footer...');
  if (typeof loadHeader === 'function') {
    loadHeader();
  } else {
    console.error('VROOM: loadHeader não é uma função');
  }
  
  if (typeof loadFooter === 'function') {
    loadFooter();
  } else {
    console.error('VROOM: loadFooter não é uma função');
  }
  
  // Then setup other things
  try {
    loadEventDetail();
  } catch (e) {
    console.error('VROOM: Erro ao iniciar loadEventDetail:', e);
  }
  
  try {
    setupTheme();
  } catch (e) {
    console.error('VROOM: Erro ao iniciar setupTheme:', e);
  }
  
  try {
    setupNavScroll();
  } catch (e) {
    console.error('VROOM: Erro ao iniciar setupNavScroll:', e);
  }

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    window.globalScrollObserver.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
