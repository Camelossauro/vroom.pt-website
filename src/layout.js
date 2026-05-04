// VROOM VERSION: 2.1.0
console.log('VROOM: src/layout.js carregado v2.1.0');

export function loadHeader() {
  console.log('VROOM: loadHeader() called');
  const headerHtml = `
      <div class="container nav-container">
        <a href="/" class="logo">
          <img src="https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo_branco.png" alt="Vroom.pt Logo" referrerPolicy="no-referrer" width="40">
          <span>Vroom.pt</span>
        </a>
        <div class="nav-links">
          <a href="/#como-funciona">Como funciona</a>
          <a href="/#eventos">Eventos</a>
          <a href="/#apoio">Apoiar</a>
          <a href="/#precos" class="btn btn-nav-publish">PUBLICAR</a>
        </div>
        <button id="theme-toggle" class="theme-toggle" aria-label="Alternar Tema Claro/Escuro">
        </button>
      </div>
  `;
  
  const nav = document.querySelector('nav');
  console.log('VROOM: nav found:', nav);
  if (nav) {
    nav.innerHTML = headerHtml;
    console.log('VROOM: Header injected');
    if (window.globalScrollObserver) {
      nav.querySelectorAll('.animate-on-scroll').forEach(el => window.globalScrollObserver.observe(el));
    }
  } else {
    console.log('VROOM: nav not found, retrying...');
    // Fallback: wait a bit and try again if nav not found
    setTimeout(loadHeader, 100);
  }
}

export function loadFooter() {
  console.log('VROOM: loadFooter() called');
  const footerHtml = `
      <div class="container">
        <div class="footer-logo">
          <a href="/" class="logo" style="justify-content: center;">
            <img src="https://joxalzicitgkaqpouvlb.supabase.co/storage/v1/object/public/eventimages/default/vroom.pt_logo_branco.png" alt="Vroom.pt Logo" referrerPolicy="no-referrer" loading="lazy" width="40">
            Vroom.pt
          </a>
        </div>
        <div class="footer-social">
          <a href="https://www.instagram.com/vroom.pt/" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61577592274881" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="mailto:contacto@vroomapp.pt" class="social-btn" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
        <p class="copyright">© 2026 Vroom.pt. Todos os direitos reservados. Feito com paixão em Portugal.</p>
      </div>
  `;
  const footer = document.querySelector('footer');
  console.log('VROOM: footer found:', footer);
  if (footer) {
    console.log('VROOM: Injecting footer HTML:', footerHtml);
    footer.innerHTML = footerHtml;
    console.log('VROOM: Footer HTML injected, innerHTML length:', footer.innerHTML.length);
    if (window.globalScrollObserver) {
      footer.querySelectorAll('.animate-on-scroll').forEach(el => window.globalScrollObserver.observe(el));
    }
    console.log('VROOM: Footer injected with updated content');
  } else {
    console.log('VROOM: footer not found, retrying...');
    setTimeout(loadFooter, 100);
  }
}
