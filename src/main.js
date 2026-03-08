import { getSupabase } from './supabase.js';
import { loadHeader, loadFooter } from './layout.js';

// Funções globais para garantir que o script não falha
const body = document.body;
let allEvents = [];
let visibleCount = 3;
const itemsPerPage = 3;
let loadMoreClickCount = 0;

// Page Fade-in imediato
setTimeout(() => {
  body.classList.add('fade-in');
}, 10);

async function loadEvents() {
  const container = document.getElementById('eventos-container');
  const paginationContainer = document.getElementById('pagination-container');
  const btnLoadMore = document.getElementById('btn-load-more');
  const btnShowLess = document.getElementById('btn-show-less');

  if (!container) return;

  // Tentar carregar da cache primeiro
  const cachedEvents = sessionStorage.getItem('vroom_events');
  const cachedCount = sessionStorage.getItem('vroom_visible_count');

  if (cachedEvents) {
    console.log('VROOM: Carregando eventos da cache...');
    allEvents = JSON.parse(cachedEvents);
    visibleCount = cachedCount ? parseInt(cachedCount) : itemsPerPage;
    renderEvents();
    setupPagination();
    return;
  }

  console.log('VROOM: Iniciando loadEvents...');
  
  try {
    const supabase = getSupabase();
    if (!supabase) {
      console.error('VROOM: Supabase não inicializado (chaves em falta)');
      container.innerHTML = `
        <div class="placeholder-card">
          <p>⚠️ Configuração Incompleta</p>
          <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">As chaves VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não foram encontradas.</p>
        </div>`;
      return;
    }

    const { data: events, error } = await supabase
      .from('eventos_now')
      .select('*')
      .order('data_inicio', { ascending: true });

    if (error) {
      console.error('VROOM: Erro na query Supabase:', error);
      container.innerHTML = `<div class="placeholder-card">Erro na Base de Dados: ${error.message}</div>`;
      return;
    }

    if (!events || events.length === 0) {
      console.log('VROOM: Tabela vazia ou RLS bloqueando');
      container.innerHTML = `
        <div class="placeholder-card">
          <p>Nenhum evento encontrado.</p>
          <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">Verifica se a tabela "eventos_now" tem dados e se o RLS está desativado para leitura pública.</p>
        </div>`;
      return;
    }

    allEvents = events;
    sessionStorage.setItem('vroom_events', JSON.stringify(allEvents));
    renderEvents();
    setupPagination();
    injectStructuredData(allEvents); // <--- NOVA CHAMADA AQUI

    console.log('VROOM: Eventos carregados com sucesso!');

  } catch (err) {
    console.error('VROOM: Erro fatal:', err);
    container.innerHTML = `<div class="placeholder-card">Erro Crítico: ${err.message}</div>`;
  }
}

// --- NOVA FUNÇÃO PARA SEO (DADOS ESTRUTURADOS) ---
function injectStructuredData(events) {
  // 1. Verificar se já existe um script de schema e removê-lo (para não duplicar)
  const existingScript = document.getElementById('schema-eventos');
  if (existingScript) {
    existingScript.remove();
  }

  // 2. Mapear os eventos do Supabase para o formato Schema.org
  const schemaEvents = events.map(event => {
    return {
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
          "addressCountry": "PT" // Assumindo Portugal, ajusta se necessário
        }
      },
      "image": [
        event.imagem_evento || "https://vroom-images.b-cdn.net/Design%20sem%20nome%20(17).png"
      ],
      "description": event.descricao || event.description || "Evento automóvel em Portugal.",
      "organizer": {
        "@type": "Organization",
        "name": event.organizadora || "Vroom.pt",
        "url": "https://vroomapp.pt"
      }
    };
  });

  // 3. Criar a tag <script> com o JSON-LD
  const script = document.createElement('script');
  script.id = 'schema-eventos';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaEvents);

  // 4. Injetar no <head> da página
  document.head.appendChild(script);
  console.log('VROOM: Dados Estruturados (SEO) injetados com sucesso!');
}
// -------------------------------------------------

function setupPagination() {
  const paginationContainer = document.getElementById('pagination-container');
  const btnLoadMore = document.getElementById('btn-load-more');
  const btnShowLess = document.getElementById('btn-show-less');

  if (!paginationContainer || !btnLoadMore || !btnShowLess) return;

  if (allEvents.length > itemsPerPage) {
    paginationContainer.style.display = 'flex';
    
    // Remover listeners antigos para evitar duplicação
    const newBtnLoadMore = btnLoadMore.cloneNode(true);
    const newBtnShowLess = btnShowLess.cloneNode(true);
    btnLoadMore.parentNode.replaceChild(newBtnLoadMore, btnLoadMore);
    btnShowLess.parentNode.replaceChild(newBtnShowLess, btnShowLess);

    newBtnLoadMore.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        loadMoreClickCount++;
        if (loadMoreClickCount % 2 === 0) {
          const popup = document.getElementById('mobile-install-popup');
          if (popup) {
            popup.classList.add('active');
          }
        }
      }
      
      visibleCount += itemsPerPage;
      sessionStorage.setItem('vroom_visible_count', visibleCount);
      renderEvents();
    });
    newBtnShowLess.addEventListener('click', () => {
      visibleCount = itemsPerPage;
      loadMoreClickCount = 0; // Reset click count when showing less
      sessionStorage.setItem('vroom_visible_count', visibleCount);
      renderEvents();
      const eventosSection = document.getElementById('eventos');
      if (eventosSection) {
        eventosSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  } else {
    paginationContainer.style.display = 'none';
  }
}

function renderEvents() {
  const container = document.getElementById('eventos-container');
  const btnLoadMore = document.getElementById('btn-load-more');
  const btnShowLess = document.getElementById('btn-show-less');
  
  container.innerHTML = ''; // Limpar
  
  const toShow = allEvents.slice(0, visibleCount);
  toShow.forEach(event => {
    container.appendChild(createEventCard(event));
  });

  // Update buttons visibility
  if (visibleCount >= allEvents.length) {
    btnLoadMore.style.display = 'none';
  } else {
    btnLoadMore.style.display = 'block';
  }

  if (visibleCount > itemsPerPage) {
    btnShowLess.style.display = 'block';
  } else {
    btnShowLess.style.display = 'none';
  }
}

function createEventCard(event) {
  const isPremium = event.plano_destaque?.toLowerCase() === 'premium';
  
  // Lógica de Status
  const now = new Date();
  const start = new Date(event.data_inicio);
  const end = new Date(event.data_fim);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const eventEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  let statusBadge = '';
  if (today >= eventStart && today <= eventEnd) {
    statusBadge = `<div class="status-badge live">Está A Acontecer</div>`;
  } else {
    const currentDay = now.getDay();
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    if (eventStart >= monday && eventStart <= sunday && eventStart > today) {
      statusBadge = `<div class="status-badge weekend">Este Fim de Semana</div>`;
    }
  }

  const card = document.createElement('div');
  card.className = `event-card ${isPremium ? 'premium premium-highlight' : 'basic'}`;
  
  const startDate = new Date(event.data_inicio).toLocaleDateString('pt-PT');
  const endDate = new Date(event.data_fim).toLocaleDateString('pt-PT');
  const dateDisplay = startDate === endDate ? startDate : `${startDate} - ${endDate}`;
  
  // Imagem default se estiver vazio
  const mainImage = event.imagem_evento || 'https://vroom-images.b-cdn.net/Design%20sem%20nome%20(17).png';
  
  const isDirectLink = event.natureza?.toLowerCase() === 'competição' && event.plano_destaque?.toLowerCase() === 'default';
  const detailUrl = isDirectLink ? (event.site_evento || '#') : `/evento.html?id=${event.id}`;
  const targetAttr = isDirectLink ? 'target="_blank"' : '';

  card.innerHTML = `
    <div class="event-image-container">
      <img src="${mainImage}" alt="${event.nome}" class="event-image" referrerPolicy="no-referrer">
      ${isPremium ? `<div class="premium-badge">${event.plano_destaque.toUpperCase()}</div>` : ''}
      ${statusBadge}
    </div>
    <div class="event-content">
      <div class="event-meta">
        <span class="event-category" style="color: ${event.cor || 'var(--accent-blue)'}">${event.modalidade || event.natureza}</span>
        <span class="event-date">${dateDisplay}</span>
      </div>
      <h3 class="event-title">${event.nome}</h3>
      <p class="event-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        ${event.local}
      </p>
      <p class="event-description">${event.description || event.descricao || ''}</p>
      <div class="event-footer">
        <div class="organizer">
          ${!isDirectLink && event.logo_organizadora ? `<img src="${event.logo_organizadora}" alt="${event.organizadora}" class="org-logo" referrerPolicy="no-referrer">` : ''}
          <span>${event.organizadora || ''}</span>
        </div>
        <a href="${detailUrl}" ${targetAttr} class="btn btn-primary btn-sm">Ver Detalhes</a>
      </div>
    </div>
  `;
  return card;
}

// Inicialização
function init() {
  if (document.getElementById('eventos-container')) {
    loadEvents();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Resto da lógica (Theme, Scroll, etc)
const LOGO_DARK = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo_branco.png";
const LOGO_LIGHT = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo.png";

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
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

  function updateLogos(isLight) {
    // Header and Footer logos
    const navLogo = document.querySelector('nav .logo img');
    const footerLogo = document.querySelector('footer .logo img');
    const logoUrl = isLight ? LOGO_LIGHT : LOGO_DARK;
    
    if (navLogo) navLogo.src = logoUrl;
    if (footerLogo) footerLogo.src = logoUrl;
    
    // Hero logo should always be white (LOGO_DARK)
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) heroLogo.src = LOGO_DARK;
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

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateThemeIcon(true);
    updateLogos(true);
  } else {
    updateThemeIcon(false);
    updateLogos(false);
  }

  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.padding = window.scrollY > 50 ? '10px 0' : '20px 0';
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for Animations (Funcionalidades Exclusivas)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
  });

  // Proteção de Imagens: Desativar clique direito
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Mobile Install Popup Logic
  const popup = document.getElementById('mobile-install-popup');
  const closeBtn = document.getElementById('close-install-popup');
  if (popup && closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });
  }
});
