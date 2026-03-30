import { loadHeader, loadFooter } from './layout.js';

console.log('VROOM: src/sucesso.js is executing');

const body = document.body;
const LOGO_DARK = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo_branco.png";
const LOGO_LIGHT = "https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo.png";

// Page Fade-in
setTimeout(() => {
  body.classList.add('fade-in');
}, 10);

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

function init() {
  console.log('VROOM: init() sucesso chamado');

  // Intersection Observer for Animations
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  window.globalScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        window.globalScrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Load header and footer
  loadHeader();
  loadFooter();
  
  // Setup theme
  setupTheme();

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    window.globalScrollObserver.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
