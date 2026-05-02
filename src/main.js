import { getSupabase } from './supabase.js';
import { loadHeader, loadFooter } from './layout.js';
import { inject } from '@vercel/analytics';
import { initProtection } from './protection.js';
import { getEventImage } from './utils.js';

// Injetar Vercel Analytics
inject();

// VROOM VERSION: 1.1.7
console.log('VROOM: src/main.js carregado v1.1.7');

// Funções globais para garantir que o script não falha
const body = document.body;
let allEvents = [];
let filteredEvents = [];
let visibleCount = 3;
const itemsPerPage = 3;
let loadMoreClickCount = 0;
let isListExpanded = false;
let isEventosInView = false;
let eventosObserver = null;

// Filtros
let selectedMes = '';
let selectedNatureza = '';
let selectedModalidades = [];

// Page Fade-in imediato
setTimeout(() => {
  body.classList.add('fade-in');
}, 10);

function initializeFilters() {
  const filtersContainer = document.getElementById('events-filters');
  const naturezaSelect = document.getElementById('filter-natureza');
  const mesSelect = document.getElementById('filter-mes');
  
  if (!filtersContainer || !naturezaSelect || !mesSelect) return;
  
  filtersContainer.style.display = 'flex';
  
  const filtersActions = document.getElementById('filters-actions');
  const btnClearFilters = document.getElementById('btn-clear-filters');
  if (filtersActions) filtersActions.style.display = 'flex';
  
  // --- Setup Mês ---
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  mesSelect.innerHTML = '';
  let defaultMes = '';
  for(let i=0; i<3; i++) {
    let m = (currentMonth + i) % 12;
    let y = currentYear + Math.floor((currentMonth + i) / 12);
    let value = `${y}-${String(m+1).padStart(2, '0')}`;
    let label = `${monthNames[m]} ${y}`;
    
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    mesSelect.appendChild(option);
    
    if (i === 0) {
      defaultMes = value;
      selectedMes = value; // Default to current month
    }
  }
  mesSelect.value = selectedMes;

  if (btnClearFilters) {
    btnClearFilters.addEventListener('click', () => {
      // Reset variables
      selectedMes = defaultMes;
      selectedNatureza = '';
      selectedModalidades = [];
      
      // Reset UI
      mesSelect.value = defaultMes;
      naturezaSelect.value = '';
      
      // Update chips and apply filters
      updateModalidadeChips();
      applyFilters();
    });
  }

  mesSelect.addEventListener('change', (e) => {
    selectedMes = e.target.value;
    applyFilters();
  });
  // -----------------
  
  naturezaSelect.addEventListener('change', (e) => {
    selectedNatureza = e.target.value;
    selectedModalidades = []; // Reset modalities when nature changes
    updateModalidadeChips();
    applyFilters();
  });
  
  const btnToggleModalidades = document.getElementById('btn-toggle-modalidades');
  const chipsContainer = document.getElementById('filter-modalidade-chips');
  
  if (btnToggleModalidades && chipsContainer) {
    btnToggleModalidades.addEventListener('click', () => {
      const isExpanded = btnToggleModalidades.getAttribute('aria-expanded') === 'true';
      btnToggleModalidades.setAttribute('aria-expanded', !isExpanded);
      chipsContainer.classList.toggle('expanded');
    });
  }
  
  updateModalidadeChips();
}

function updateModalidadeChips() {
  const chipsContainer = document.getElementById('filter-modalidade-chips');
  if (!chipsContainer) return;
  
  chipsContainer.innerHTML = '';
  
  // Get unique modalities based on selected nature
  const modalities = new Set();
  allEvents.forEach(event => {
    if (!event.modalidade) return;
    
    if (selectedNatureza === '' || (event.natureza && event.natureza.toLowerCase() === selectedNatureza.toLowerCase())) {
      modalities.add(event.modalidade);
    }
  });
  
  const sortedModalities = Array.from(modalities).sort();
  
  sortedModalities.forEach(mod => {
    const chip = document.createElement('div');
    chip.className = 'choice-chip';
    chip.textContent = mod;
    
    if (selectedModalidades.includes(mod.toLowerCase())) {
      chip.classList.add('active');
    }
    
    chip.addEventListener('click', () => {
      const modLower = mod.toLowerCase();
      if (selectedModalidades.includes(modLower)) {
        selectedModalidades = selectedModalidades.filter(m => m !== modLower);
        chip.classList.remove('active');
      } else {
        selectedModalidades.push(modLower);
        chip.classList.add('active');
      }
      applyFilters();
    });
    
    chipsContainer.appendChild(chip);
  });
}

function normalizeString(str) {
  if (!str) return '';
  // Remove accents and convert to lowercase
  return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function applyFilters(preserveCount = false) {
  filteredEvents = allEvents.filter(event => {
    // Check Mês
    let matchMes = false;
    if (selectedMes !== '') {
      const [selYear, selMonth] = selectedMes.split('-');
      const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      const selectedMonthName = normalizeString(monthNames[parseInt(selMonth) - 1]);
      
      if (event.meses) {
        if (Array.isArray(event.meses)) {
          matchMes = event.meses.some(m => normalizeString(m).includes(selectedMonthName));
        } else if (typeof event.meses === 'string') {
          matchMes = normalizeString(event.meses).includes(selectedMonthName);
        }
      }
    } else {
      matchMes = true;
    }

    const matchNatureza = selectedNatureza === '' || (event.natureza && normalizeString(event.natureza) === normalizeString(selectedNatureza));
    
    let matchModalidade = true;
    if (selectedModalidades.length > 0) {
      if (event.modalidade) {
        const eventMod = normalizeString(event.modalidade);
        matchModalidade = selectedModalidades.some(m => eventMod === normalizeString(m));
      } else {
        matchModalidade = false;
      }
    }
    
    return matchMes && matchNatureza && matchModalidade;
  });
  
  if (!preserveCount) {
    visibleCount = itemsPerPage;
    isListExpanded = false;
    sessionStorage.setItem('vroom_visible_count', visibleCount);
  }
  
  renderEvents();
  setupPagination();
}

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
    if (visibleCount > itemsPerPage) {
      isListExpanded = true;
    }
    initializeFilters();
    applyFilters(true);
    setTimeout(() => renderPremiumCarousel(allEvents), 0);
    return;
  }

  console.log('VROOM: Iniciando loadEvents...');
  
  container.innerHTML = `
    <div class="loading-state" style="text-align: center; padding: 40px; grid-column: 1 / -1;">
      <div class="spinner" style="width: 40px; height: 40px; border: 4px solid var(--border-color); border-top-color: var(--accent-blue); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
      <p style="color: var(--text-secondary);">A carregar eventos...</p>
    </div>
    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
  `;

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
    initializeFilters();
    applyFilters();
    setTimeout(() => renderPremiumCarousel(allEvents), 0);
    injectStructuredData(allEvents); 

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
        getEventImage(event.id, event.modalidade || event.natureza, event.local, event.imagem_evento, event.veiculo_alvo)
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

function updateButtonVisibility() {
  const paginationContainer = document.getElementById('pagination-container');
  const btnLoadMore = document.getElementById('btn-load-more');
  const btnFloatingClose = document.getElementById('btn-floating-close');

  // 1. Botão "Ver Todos os Eventos"
  // Só aparece se houver mais de 3 eventos e a lista não estiver expandida
  if (filteredEvents.length > itemsPerPage && !isListExpanded) {
    if (paginationContainer) paginationContainer.style.display = 'flex';
    if (btnLoadMore) btnLoadMore.style.display = 'block';
  } else {
    if (btnLoadMore) btnLoadMore.style.display = 'none';
    if (paginationContainer) paginationContainer.style.display = 'none';
  }

  // 2. Botão Flutuante "Fechar Lista"
  // Só aparece se houver mais de 6 eventos E a lista estiver expandida E a secção estiver visível
  if (btnFloatingClose) {
    if (filteredEvents.length > 6 && isListExpanded && isEventosInView) {
      btnFloatingClose.classList.add('show');
    } else {
      btnFloatingClose.classList.remove('show');
    }
  }
}

function setupPagination() {
  const btnLoadMore = document.getElementById('btn-load-more');
  const btnFloatingClose = document.getElementById('btn-floating-close');
  const eventosSection = document.getElementById('eventos');

  // Configurar o botão "Ver Todos os Eventos"
  if (btnLoadMore) {
    btnLoadMore.onclick = () => {
      if (window.innerWidth <= 768) {
        loadMoreClickCount++;
        if (loadMoreClickCount % 2 === 0) {
          const popup = document.getElementById('mobile-install-popup');
          if (popup) popup.classList.add('active');
        }
      }
      
      visibleCount = filteredEvents.length;
      isListExpanded = true;
      sessionStorage.setItem('vroom_visible_count', visibleCount);
      renderEvents();
    };
  }

  // Configurar o botão flutuante "Fechar Lista"
  if (btnFloatingClose) {
    btnFloatingClose.onclick = () => {
      visibleCount = itemsPerPage;
      isListExpanded = false;
      loadMoreClickCount = 0; // Reset click count
      sessionStorage.setItem('vroom_visible_count', visibleCount);
      renderEvents();
      
      if (eventosSection) {
        eventosSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

  // Configurar o Intersection Observer APENAS UMA VEZ
  if (eventosSection && !eventosObserver) {
    eventosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isEventosInView = entry.isIntersecting;
        updateButtonVisibility();
      });
    }, {
      root: null,
      threshold: 0 // Dispara assim que qualquer parte da secção estiver visível
    });
    eventosObserver.observe(eventosSection);
  }

  // Atualizar a visibilidade inicial
  updateButtonVisibility();
}

function renderEvents() {
  const container = document.getElementById('eventos-container');
  
  container.innerHTML = ''; // Limpar
  
  if (filteredEvents.length === 0) {
    container.innerHTML = `
      <div class="placeholder-card" style="grid-column: 1 / -1; text-align: center;">
        <p>Nenhum evento encontrado para este mês com os filtros selecionados.</p>
      </div>`;
    updateButtonVisibility();
    return;
  }
  
  const toShow = filteredEvents.slice(0, visibleCount);
  toShow.forEach((event, index) => {
    const card = createEventCard(event);
    card.classList.add('animate-on-scroll');
    // Add staggered delay based on index (max 400ms)
    const delay = (index % 4) * 100 + 100;
    card.classList.add(`delay-${delay}`);
    container.appendChild(card);
    
    // Observe the new card if the global observer exists
    if (window.globalScrollObserver) {
      window.globalScrollObserver.observe(card);
    }
  });

  updateButtonVisibility();
}

function createEventCard(event) {
  const isPremium = event.plano_destaque?.toLowerCase() === 'premium';
  const isBasico = event.plano_destaque?.toLowerCase() === 'basico';
  
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
  let highlightClass = '';
  if (isPremium) highlightClass = 'premium premium-highlight';
  else if (isBasico) highlightClass = 'basico basico-highlight';
  else highlightClass = 'basic';
  
  card.className = `event-card ${highlightClass}`;
  
  const startDate = new Date(event.data_inicio).toLocaleDateString('pt-PT');
  const endDate = new Date(event.data_fim).toLocaleDateString('pt-PT');
  const dateDisplay = startDate === endDate ? startDate : `${startDate} - ${endDate}`;
  
  // Imagem dinâmica baseada na lógica Dart
  const mainImage = getEventImage(event.id, event.modalidade || event.natureza, event.local, event.imagem_evento, event.veiculo_alvo);
  
  const detailUrl = `/evento.html?id=${event.id}`;
  const targetAttr = '';

  card.innerHTML = `
    <div class="event-image-container">
      <img src="${mainImage}" alt="${event.nome}" class="event-image" referrerPolicy="no-referrer" loading="lazy">
      ${isPremium ? `<div class="premium-badge">PREMIUM</div>` : ''}
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
          ${event.logo_organizadora ? `<img src="${event.logo_organizadora}" alt="${event.organizadora}" class="org-logo" referrerPolicy="no-referrer" loading="lazy">` : ''}
          <span>${event.organizadora || ''}</span>
        </div>
        <a href="${detailUrl}" ${targetAttr} class="btn btn-primary btn-sm">Saber +</a>
      </div>
    </div>
  `;
  return card;
}

function renderPremiumCarousel(events) {
  const premiumEvents = events.filter(e => e.plano_destaque?.toLowerCase() === 'premium');
  const section = document.getElementById('premium-carousel-section');
  const track = document.getElementById('premium-carousel-track');
  
  if (!section || !track) return;
  
  if (premiumEvents.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  track.innerHTML = '';
  
  premiumEvents.forEach(event => {
    const startDate = new Date(event.data_inicio).toLocaleDateString('pt-PT');
    const endDate = new Date(event.data_fim).toLocaleDateString('pt-PT');
    const dateDisplay = startDate === endDate ? startDate : `${startDate} - ${endDate}`;
    const mainImage = getEventImage(event.id, event.modalidade || event.natureza, event.local, event.imagem_evento, event.veiculo_alvo);
    const detailUrl = `/evento.html?id=${event.id}`;

    const carouselCard = document.createElement('a');
    carouselCard.href = detailUrl;
    carouselCard.className = 'premium-carousel-card animate-on-scroll';
    carouselCard.innerHTML = `
      <div class="premium-carousel-image">
        <img src="${mainImage}" alt="${event.nome}" referrerPolicy="no-referrer" loading="lazy">
      </div>
      <div class="premium-carousel-content">
        <div class="premium-carousel-badge">PREMIUM</div>
        <h3 class="premium-carousel-title">${event.nome}</h3>
        <div class="premium-carousel-meta">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${dateDisplay}</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${event.local}</span>
          </div>
        </div>
        <div class="premium-carousel-btn">Explorar Evento</div>
      </div>
    `;
    track.appendChild(carouselCard);
    
    if (window.globalScrollObserver) {
      window.globalScrollObserver.observe(carouselCard);
    }
  });
}

// Inicialização
function setupScrollObserver() {
  if (window.globalScrollObserver) return;
  
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  window.globalScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        window.globalScrollObserver.unobserve(entry.target);
        
        setTimeout(() => {
          entry.target.classList.remove('animate-on-scroll', 'is-visible', 'delay-0', 'delay-100', 'delay-200', 'delay-300', 'delay-400');
        }, 1200);
      }
    });
  }, observerOptions);
}

// Inicialização Consolidada
function init() {
  console.log('VROOM: init() starting...');
  setupScrollObserver();
  
  loadHeader();
  loadFooter();

  if (document.getElementById('eventos-container')) {
    loadEvents();
  }

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
    const navLogo = document.querySelector('nav .logo img');
    const footerLogo = document.querySelector('footer .logo img');
    const logoUrl = isLight ? LOGO_LIGHT : LOGO_DARK;
    
    if (navLogo) navLogo.src = logoUrl;
    if (footerLogo) footerLogo.src = logoUrl;
    
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

  // Auto-add animate-on-scroll to key elements
  const elementsToAnimate = document.querySelectorAll('.step-card, .feature-card, .stat-card, .price-card, .donation, .ad-free-banner, .section-padding h2');
  elementsToAnimate.forEach((el, index) => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
      const delay = (index % 4) * 100 + 100;
      el.classList.add(`delay-${delay}`);
    }
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    window.globalScrollObserver.observe(el);
  });

  initProtection();

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

  // Stats Counter Animation
  const statsCounters = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
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

  // Back to Top Button Logic
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Global Consts
const LOGO_DARK = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo_branco.png";
const LOGO_LIGHT = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo.png";

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
