/**
 * Lógica de atribuição de Imagens aos Eventos
 */
export function getEventImage(
  id: string | number | undefined,
  category: string | null,
  circuit: string | null,
  imagemEvento: string | null,
  veiculoAlvo: string | null
): string {
  // O URL base da CDN onde estão alojadas as imagens
  const baseUrl = "https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS";

  // 1. Se existir uma imagem real associada na BD, usamos essa
  if (imagemEvento && imagemEvento !== "" && imagemEvento !== "null") {
    return imagemEvento;
  }

  // 2. Normalização dos dados para facilitar as comparações
  const cat = (category || "").toUpperCase().trim();
  const circ = (circuit || "").toUpperCase().trim();
  const veiculo = (veiculoAlvo || "").trim();
  
  // Extração numérica do ID para a matemática final
  const rawId = typeof id === 'string' ? parseInt(id) : typeof id === 'number' ? id : 0;
  const eventId = isNaN(rawId) ? 0 : rawId;

  let folderName = "M CIRCUITO";
  let imageFiles: string[] = [];

  // =========================================================
  // MOTAS
  // =========================================================
  if (veiculo === "Motas") {
    if (circ.includes("ESTORIL") ||
        circ.includes("ALGARVE") ||
        circ.includes("PORTIMAO") ||
        circ.includes("VILA REAL")) {
      folderName = "M CIRCUITO";
      imageFiles = [
        'MCircuito_1.jpg',
        'MCircuito_2.jpg',
        'MCircuito_3.jpg',
        'MCircuito_4.jpeg',
        'MCircuito_5.jpeg',
        'MCircuito_6.jpeg',
        'MCircuito_7.jpeg'
      ];
    } else if (cat.includes("MOTOCROSS") || cat.includes("MX")) {
      folderName = "M MOTOCROSS";
      imageFiles = ['MMotocross_1.jpg', 'MMotocross_2.jpg', 'MMotocross_3.jpg'];
    } else if (cat.includes("SUPERCROSS") || cat.includes("SX")) {
      folderName = "M SUPERCROSS";
      imageFiles = [
        'MSuperCross_1.jpg',
        'MSuperCross_2.jpg',
        'MSuperCross_3.jpeg'
      ];
    } else if (cat.includes("SUPERMOTO") || cat.includes("SM")) {
      folderName = "M SUPERMOTO";
      imageFiles = ['MSuperMoto_1.jpg', 'MSuperMoto_2.jpg', 'MSuperMoto_3.jpg'];
    } else if (cat.includes("FLAT")) {
      folderName = "M FLAT TRACK";
      imageFiles = [
        'MFlatTrack_1.jpg',
        'MFlatTrack_2.jpg',
        'MFlatTrack_3.jpeg'
      ];
    } else if (cat.includes("HARD ENDURO")) {
      folderName = "M HARD ENDURO";
      imageFiles = [
        'MHardEnduro_1.jpg',
        'MHardEnduro_2.jpg',
        'MHardEnduro_3.jpg'
      ];
    } else if (cat.includes("SUPER ENDURO")) {
      folderName = "M SUPER ENDURO";
      imageFiles = [
        'MSuperEnduro_1.jpg',
        'MSuperEnduro_2.jpg',
        'MSuperEnduro_3.jpg'
      ];
    } else if (cat.includes("ENDURO SPRINT")) {
      folderName = "M ENDURO SPRINT";
      imageFiles = [
        'MEnduroSprint_1.jpg',
        'MEnduroSprint_2.jpg',
        'MEnduroSprint_3.jpg'
      ];
    } else if (cat.includes("ENDURO")) {
      folderName = "M ENDURO";
      imageFiles = ['MEnduro_1.jpg', 'MEnduro_2.jpg', 'MEnduro_3.jpg'];
    } else if (cat.includes("TRIAL")) {
      folderName = "M TRIAL";
      imageFiles = ['MTrial_1.jpg', 'MTrial_2.jpg', 'MTrial_3.jpeg'];
    } else if (cat.includes("TODO TERRENO") || cat.includes("TT")) {
      folderName = "M TODO TERRENO";
      imageFiles = [
        'MTodoTerreno_1.jpg',
        'MTodoTerreno_2.jpeg',
        'MTodoTerreno_3.jpg'
      ];
    } else {
      // Fallback motas
      folderName = "M CIRCUITO";
      imageFiles = [
        'MCircuito_1.jpg',
        'MCircuito_2.jpg',
        'MCircuito_3.jpg',
        'MCircuito_4.jpeg',
        'MCircuito_5.jpeg',
        'MCircuito_6.jpeg',
        'MCircuito_7.jpeg'
      ];
    }

    // =========================================================
    // AUTOMÓVEIS (e tudo o resto)
    // =========================================================
  } else {
    if (circ.includes("ESTORIL")) {
      folderName = "A ESTORIL";
      imageFiles = [
        'estoril_1.jpg',
        'estoril_2.jpg',
        'estoril_3.png',
        'estoril_4.jpg',
        'estoril_5.jpg',
        'estoril_6.jpeg'
      ];
    } else if (circ.includes("ALGARVE") || circ.includes("PORTIMAO")) {
      folderName = "A ALGARVE";
      imageFiles = [
        'algarve_1.png',
        'algarve_2.jpg',
        'algarve_3.jpg',
        'algarve_4.jpg',
        'algarve_5.jpg',
        'algarve_6.jpg'
      ];
    } else if (circ.includes("VILA REAL")) {
      folderName = "A VILA REAL";
      imageFiles = [
        'vilareal_1.jpg',
        'vilareal_2.jpeg',
        'vilareal_3.jpg',
        'vilareal_4.jpg',
        'vilareal_5.jpg'
      ];
    } else if (cat.includes("RALICROSS") || cat.includes("RX")) {
      folderName = "A RALICROSS";
      imageFiles = [
        'ralicross_1.jpg',
        'ralicross_2.png',
        'ralicross_3.png',
        'ralicross_4.jpg',
        'ralicross_5.jpg',
        'ralicross_6.jpg',
        'ralicross_7.jpg'
      ];
    } else if (cat.includes("RALLY") || cat.includes("RALI")) {
      folderName = "A RALLY";
      imageFiles = [
        'rally_1.jpg',
        'rally_2.jpg',
        'rally_3.png',
        'rally_4.jpg',
        'rally_5.jpeg',
        'rally_6.jpg',
        'rally_7.jpg',
        'rally_8.jpg',
        'rally_9.jpg',
        'rally_10.jpg'
      ];
    } else if (cat.includes("DRIFT")) {
      folderName = "A DRIFT";
      imageFiles = [
        'drift_1.jpg',
        'drift_2.jpg',
        'drift_3.jpg',
        'drift_4.jpg',
        'drift_5.jpg',
        'drift_6.jpg'
      ];
    } else if (cat.includes("DRAG")) {
      folderName = "A DRAG RACING";
      imageFiles = ['drag_1.jpg', 'drag_2.jpeg', 'drag_3.jpg'];
    } else if (cat.includes("KART")) {
      folderName = "A KARTING";
      // Omitimos karting_5.jpg porque contém uma moto por lapso no CDN oficial
      imageFiles = [
        'karting_1.jpg',
        'karting_2.png',
        'karting_3.jpg',
        'karting_4.jpg',
        'karting_6.jpg'
      ];
    } else if (cat.includes("MONTANHA") || cat.includes("RAMPA")) {
      folderName = "A MONTANHA";
      imageFiles = [
        'montanha_1.jpg',
        'montanha_2.jpg',
        'montanha_3.jpg',
        'montanha_4.jpg',
        'montanha_5.jpg',
        'montanha_6.jpeg',
        'montanha_7.jpeg'
      ];
    } else if (cat.includes("TRIAL 4")) {
      folderName = "A TRIAL 4x4";
      imageFiles = [
        'trial4x4_1.jpg',
        'trial4x4_2.jpg',
        'trial4x4_3.jpg',
        'trial4x4_4.jpg',
        'trial4x4_5.jpg'
      ];
    } else if (cat.includes("TODO TERRENO") || cat.includes("TT")) {
      folderName = "A TODO TERRENO";
      imageFiles = [
        'todoterreno_1.jpg',
        'todoterreno_2.jpg',
        'todoterreno_3.jpg',
        'todoterreno_4.jpg',
        'todoterreno_5.jpg',
        'todoterreno_6.jpg'
      ];
    } else {
      // Fallback geral
      folderName = "M CIRCUITO";
      imageFiles = [
        'MCircuito_1.jpg',
        'MCircuito_2.jpg',
        'MCircuito_3.jpg',
        'MCircuito_4.jpeg',
        'MCircuito_5.jpeg',
        'MCircuito_6.jpeg',
        'MCircuito_7.jpeg'
      ];
    }
  }

  // =========================================================
  // MATEMÁTICA FINAL
  // =========================================================
  if (imageFiles.length === 0) return `${baseUrl}/M%20CIRCUITO/MCircuito_1.jpg`;

  const index = eventId % imageFiles.length;
  const selectedFile = imageFiles[index];
  const safeFolder = folderName.replace(/ /g, "%20");

  return `${baseUrl}/${safeFolder}/${selectedFile}`;
}
