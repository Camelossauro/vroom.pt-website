import { loadHeader, loadFooter } from './layout.js';

console.log("VROOM: deeplink.js carregado com sucesso!");

// --- CONFIGURAÇÃO ---
const linkAndroid = "https://play.google.com/store/apps/details?id=com.baseguy.shedulebase";
const linkIOS = "https://apps.apple.com/pt/app/vroom-pt/id6751053867?l=en-GB";
// --------------------

function renderDeeplinkUI() {
  console.log("VROOM: renderDeeplinkUI called");
  
  // 1. Captura os parâmetros do URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventoID = urlParams.get('eventoID');
  const rotaRecebida = urlParams.get('rota') || 'encontrosDefault';
  
  console.log("VROOM: eventoID capturado:", eventoID);

  const container = document.getElementById('deeplink-ui');
  
  // Ajustes de estilo para o container
  container.style.backgroundColor = "transparent"; 
  container.style.display = "block";
  container.style.padding = "0 20px"; // Padding lateral para telemóvel
  
  console.log("VROOM: container encontrado:", container);
  
  if (!container) {
    console.error("VROOM: container 'deeplink-ui' não encontrado!");
    return;
  }

  // 2. Só mostra o ecrã se houver um ID de evento
  if (eventoID) {
    console.log("VROOM: eventoID existe, a injetar HTML...");
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px); color: var(--text-primary); gap: clamp(24px, 5vw, 32px); max-width: 800px; margin: 0 auto 40px auto;">
        <h2 style="font-size: clamp(28px, 6vw, 40px); font-weight: 800; margin-bottom: 8px; text-align: center;">Abrir Evento no Vroom.pt</h2>
        <p style="color: var(--text-secondary); font-size: clamp(16px, 4vw, 18px); max-width: 500px; text-align: center; margin-bottom: 16px; line-height: 1.6;">
          Já tens a app instalada? Clica no botão abaixo. <br>Senão, instala gratuitamente.
        </p>

        <!-- BOTÃO PRINCIPAL (Abrir App) -->
        <a id="deepLinkBtn" href="#" class="btn btn-primary" style="padding: clamp(16px, 4vw, 20px) clamp(24px, 6vw, 40px); font-size: clamp(16px, 4vw, 20px); text-decoration: none; margin-bottom: clamp(16px, 4vw, 32px); width: 100%; max-width: 320px; text-align: center;">
          🚀 Abrir na App
        </a>

        <div style="width: 100%; border-top: 1px solid var(--border-color); max-width: 400px; margin: 16px 0;"></div>

        <p style="color: var(--text-secondary); font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; text-align: center;">Download da App</p>

        <!-- BOTÕES DAS LOJAS -->
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%;">
          <a href="${linkAndroid}" target="_blank" class="btn btn-outline" style="text-decoration: none; padding: clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px); font-size: clamp(14px, 3vw, 16px); flex: 1; min-width: 140px; max-width: 200px; text-align: center;">🤖 Android</a>
          <a href="${linkIOS}" target="_blank" class="btn btn-outline" style="text-decoration: none; padding: clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px); font-size: clamp(14px, 3vw, 16px); flex: 1; min-width: 140px; max-width: 200px; text-align: center;">🍎 iPhone</a>
        </div>
      </div>
    `;

    // 3. Lógica do Deep Link
    const deepLink = `vroomapp://vroomapp.pt/check?eventoID=${eventoID}&rota=${rotaRecebida}`;
    const btn = document.getElementById('deepLinkBtn');
    if (btn) {
        btn.href = deepLink;
        console.log("VROOM: Botão atualizado com link:", deepLink);
    } else {
        console.error("VROOM: Botão 'deepLinkBtn' não encontrado após injeção!");
    }
  } else {
    console.log("VROOM: eventoID não encontrado no URL.");
    container.innerHTML = `<p style="color: var(--text-primary); text-align: center;">ID do evento não encontrado.</p>`;
  }
}

// Inicialização
function init() {
  console.log("VROOM: init() called");
  loadHeader();
  loadFooter();
  renderDeeplinkUI();
  
  // Torna a página visível
  document.body.classList.add('fade-in');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
