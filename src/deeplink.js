import { loadHeader, loadFooter } from './layout.js';
import { inject } from '@vercel/analytics';

// Injetar Vercel Analytics
inject();

// VROOM VERSION: 2.0.0
console.log("VROOM: deeplink.js carregado v2.0.0");

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
          Já tens a app instalada? Clica no botão abaixo. <br>Senão, instala gratuitamente ou vê no website.
        </p>

        <!-- BOTÕES PRINCIPAIS -->
        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px; align-items: center;">
          <a id="deepLinkBtn" href="#" class="btn btn-primary" style="padding: 16px; font-size: 18px; text-decoration: none; width: 100%; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;">
            🚀 Abrir na App
          </a>
          
          <a href="/evento.html?id=${eventoID}" style="padding: 8px 16px; font-size: 14px; text-decoration: none; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 8px; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;">
            🌐 Continuar no Website
          </a>
        </div>

        <div style="width: 100%; border-top: 1px solid var(--border-color); max-width: 400px; margin: 16px 0;"></div>

        <p style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; text-align: center; font-weight: 600;">Download da App Gratuita</p>

        <!-- BOTÕES DAS LOJAS (Design do Index) -->
        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; width: 100%; max-width: 450px;">
          <a href="${linkIOS}" target="_blank" class="premium-btn-store" style="flex: 1; min-width: 160px; max-width: 200px;">
            <svg viewBox="0 0 384 512" fill="currentColor" style="width: 20px; height: 20px;"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.1-42.9.6-82.7 25-104.7 63.3-44 76.3-11.3 189.4 31.1 250.7 20.6 29.7 45.6 63.3 77.3 62.1 29.9-1.2 41.3-19.4 77.6-19.4 36.3 0 46.5 19.4 78.2 18.8 32.5-.6 54.2-30.3 74.6-59.9 23.6-34.4 33.2-67.7 33.5-69.4-.7-.3-64.1-24.7-64.4-98.2zM285.3 57.6c16.2-19.5 27.3-46.7 24.3-73.9-23.3 1-51.5 15.5-68.2 35.1-14.9 17.1-28.1 44.7-24.8 71.3 26 2.1 52.7-13 68.7-32.5z"/></svg>
            <div class="store-text">
              <span style="font-size: 8px; opacity: 0.8; letter-spacing: 0.5px;">DESCARREGAR NA</span>
              <span style="font-size: 14px; font-weight: 600;">App Store</span>
            </div>
          </a>
          <a href="${linkAndroid}" target="_blank" class="premium-btn-store" style="flex: 1; min-width: 160px; max-width: 200px;">
            <svg viewBox="0 0 512 512" fill="currentColor" style="width: 20px; height: 20px;"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
            <div class="store-text">
              <span style="font-size: 8px; opacity: 0.8; letter-spacing: 0.5px;">DISPONÍVEL NO</span>
              <span style="font-size: 14px; font-weight: 600;">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    `;

    // 3. Lógica do Deep Link
    const deepLink = `vroomapp://vroomapp.pt/Check?eventoID=${eventoID}&rota=Encontros_Corridas_Geral`;
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
