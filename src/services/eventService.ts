import { supabase } from '../lib/supabase';
import { DatabaseEvent } from '../types';

export const fallbackDatabaseEvents: DatabaseEvent[] = [
  {
    id: 'ev-1',
    nome: 'Rali de Portugal - WRC 2026',
    natureza: 'Competição',
    modalidade: 'Rally',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'premium',
    ambito: 'Internacional',
    data_inicio: '2026-05-14T08:00:00Z',
    data_fim: '2026-05-17T18:00:00Z',
    meses: ['Maio'],
    local: 'Fafe & Região Norte',
    organizadora_default: 'ACP - Automóvel Club de Portugal',
    logo_organizadora_default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop',
    imagem_evento: 'https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg',
    latitude: 41.4518,
    longitude: -8.1706,
    descricao: 'A mítica etapa portuguesa do Campeonato do Mundo de Ralis (WRC). Milhares de adeptos reúnem-se na emblemática classificativa de Fafe e no troço de Lousada para ver os melhores pilotos do mundo sobre terra.',
    site_evento: 'https://www.ralideportugal.pt',
    is_mensal: false,
    imagens_extra: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop'
    ],
    views_count: 14250,
    likes_count: 2450,
    organizer_id: 'org-acp',
    status: 'published'
  },
  {
    id: 'ev-2',
    nome: 'Estoril Classics 2026',
    natureza: 'Competição',
    modalidade: 'Velocidade',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'premium',
    ambito: 'Internacional',
    data_inicio: '2026-10-12T09:00:00Z',
    data_fim: '2026-10-14T18:00:00Z',
    meses: ['Outubro'],
    local: 'Autódromo do Estoril',
    organizadora_default: 'Race Ready',
    logo_organizadora_default: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=100&auto=format&fit=crop',
    imagem_evento: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    latitude: 38.7506,
    longitude: -9.3942,
    descricao: 'O maior evento de viaturas clássicas do sul da Europa. Veja de perto bólides históricos da Fórmula 1, Classic Endurance, Group C, e o troféu ibérico de Turismos no traçado histórico do Estoril.',
    site_evento: 'https://www.estorilclassics.pt',
    is_mensal: false,
    imagens_extra: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop'
    ],
    views_count: 8900,
    likes_count: 1890,
    organizer_id: 'org-raceready',
    status: 'published'
  },
  {
    id: 'ev-3',
    nome: 'Circuito Internacional de Vila Real - WTCR',
    natureza: 'Competição',
    modalidade: 'Velocidade',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'premium',
    ambito: 'Internacional',
    data_inicio: '2026-07-03T09:00:00Z',
    data_fim: '2026-07-05T19:00:00Z',
    meses: ['Julho'],
    local: 'Circuito de Vila Real',
    organizadora_default: 'Associação Automóvel de Vila Real',
    logo_organizadora_default: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=100&auto=format&fit=crop',
    imagem_evento: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
    latitude: 41.2959,
    longitude: -7.7464,
    descricao: 'A mítica pista citadina de Vila Real acolhe as emoções do Campeonato Nacional e Internacional de Turismos.',
    site_evento: 'https://www.circuitovilareal.pt',
    is_mensal: false,
    views_count: 12100,
    likes_count: 3120,
    organizer_id: 'org-apcvr',
    status: 'published'
  },
  {
    id: 'ev-4',
    nome: 'Campeonato de Portugal de Ralicross - Lousada',
    natureza: 'Competição',
    modalidade: 'Ralicross',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'default',
    ambito: 'Nacional',
    data_inicio: '2026-06-20T09:00:00Z',
    data_fim: '2026-06-21T18:00:00Z',
    meses: ['Junho'],
    local: 'Eurocircuito de Lousada',
    organizadora_default: 'Clube Automóvel de Lousada',
    imagem_evento: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop',
    latitude: 41.2778,
    longitude: -8.2831,
    descricao: 'Muita terra, asfalto, e lutas porta-com-porta no traçado do Eurocircuito de Lousada.',
    is_mensal: false,
    views_count: 4200,
    likes_count: 920,
    organizer_id: 'org-cal',
    status: 'published'
  },
  {
    id: 'ev-5',
    nome: 'Encontro Mensal de Clássicos Desportivos - Sintra',
    natureza: 'Lazer',
    modalidade: 'Circuito',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'default',
    ambito: 'Regional',
    data_inicio: '2026-06-28T09:00:00Z',
    data_fim: '2026-06-28T13:00:00Z',
    meses: ['Junho'],
    local: 'Sintra / Estoril',
    organizadora_default: 'Vroom.pt Club Portugal',
    imagem_evento: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop',
    descricao: 'Um encontro descontraído para proprietários e apaixonados por viaturas desportivas clássicas.',
    is_mensal: true,
    views_count: 2800,
    likes_count: 670,
    organizer_id: 'org-vroom',
    status: 'published'
  },
  {
    id: 'ev-6',
    nome: 'Troféu Nacional Enduro / Hard Enduro - Valongo',
    natureza: 'Competição',
    modalidade: 'Enduro',
    veiculo_alvo: 'Motas',
    plano_destaque: 'premium',
    ambito: 'Nacional',
    data_inicio: '2026-09-05T08:00:00Z',
    data_fim: '2026-09-06T17:00:00Z',
    meses: ['Setembro'],
    local: 'Serra de Valongo',
    organizadora_default: 'FMP - Federação de Motociclismo de Portugal',
    imagem_evento: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
    latitude: 41.1894,
    longitude: -8.4983,
    descricao: 'Os melhores pilotos de Hard Enduro superam trilhos extremos na serra de Valongo.',
    site_evento: 'https://www.fmp.pt',
    is_mensal: false,
    views_count: 5100,
    likes_count: 1430,
    organizer_id: 'org-fmp',
    status: 'published'
  },
  {
    id: 'ev-7',
    nome: '4 Horas do Portimão - European Le Mans Series',
    natureza: 'Competição',
    modalidade: 'Velocidade',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'premium',
    ambito: 'Internacional',
    data_inicio: '2026-10-16T09:00:00Z',
    data_fim: '2026-10-18T18:00:00Z',
    meses: ['Outubro'],
    local: 'Autódromo Internacional do Algarve',
    organizadora_default: 'Parkalgar / ELMS',
    logo_organizadora_default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop',
    imagem_evento: 'https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg',
    latitude: 37.2317,
    longitude: -8.6283,
    descricao: 'A mítica grande final da época da European Le Mans Series no Autódromo do Algarve, reunindo protótipos LMP2, LMP3 e GT3.',
    site_evento: 'https://www.autodromodoalgarve.com',
    is_mensal: false,
    views_count: 9800,
    likes_count: 2100,
    organizer_id: 'org-elms',
    status: 'published'
  },
  {
    id: 'ev-8',
    nome: 'Rali Vinho da Madeira - CPR',
    natureza: 'Competição',
    modalidade: 'Rally',
    veiculo_alvo: 'Automóveis',
    plano_destaque: 'premium',
    ambito: 'Nacional',
    data_inicio: '2026-07-30T09:00:00Z',
    data_fim: '2026-08-01T19:00:00Z',
    meses: ['Julho', 'Agosto'],
    local: 'Funchal & Estradas da Madeira',
    organizadora_default: 'Club Automóvel da Madeira',
    imagem_evento: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
    latitude: 32.6500,
    longitude: -16.9080,
    descricao: 'Uma das mais prestigiadas provas em asfalto da Europa, percorrendo as paisagens fabulosas da Ilha da Madeira.',
    site_evento: 'https://www.ralivinhomadeira.org',
    is_mensal: false,
    views_count: 11200,
    likes_count: 2900,
    organizer_id: 'org-cam',
    status: 'published'
  }
];

export async function fetchEvents(): Promise<DatabaseEvent[]> {
  try {
    // Attempt fetching from the server API endpoint (/api/events)
    const apiRes = await fetch('/api/events');
    if (apiRes.ok) {
      const json = await apiRes.json();
      if (json && Array.isArray(json.events) && json.events.length > 0) {
        return json.events as DatabaseEvent[];
      }
    }
  } catch (apiErr) {
    console.warn('[eventService] API fetch failed, trying direct Supabase client...', apiErr);
  }

  try {
    const { data, error } = await supabase
      .from('eventos_now_v2')
      .select('*');

    if (!error && data && data.length > 0) {
      return data as DatabaseEvent[];
    }
  } catch (err) {
    console.warn('[eventService] Supabase client exception, using fallback:', err);
  }

  return fallbackDatabaseEvents;
}

/**
 * Consulta de perfil da organizadora com seleção EXPLÍCITA de colunas públicas.
 * Previne a fuga de colunas privadas.
 */
export async function fetchOrganizerPublicProfile(organizerId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id,full_name,logo_url,siteOficial,email_contacto,telefone,instagram_url,facebook_url,biografia,sede_localizacao')
      .eq('id', organizerId)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn('[eventService] Erro ao carregar perfil público:', err);
  }
  return null;
}




