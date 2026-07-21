import { supabase } from '../lib/supabase';
import { DatabaseEvent } from '../types';

export async function fetchEvents(): Promise<DatabaseEvent[]> {
  const { data, error } = await supabase
    .from('eventos_now_v2') // Adjust the table name here if it's different in Supabase
    .select(`
      id,
      nome,
      natureza,
      modalidade,
      veiculo_alvo,
      plano_destaque,
      ambito,
      data_inicio,
      data_fim,
      meses,
      local,
      organizadora_default,
      cor,
      descricao,
      site_evento,
      logo_organizadora_default,
      imagem_evento,
      latitude,
      longitude,
      is_mensal,
      imagens_extra,
      notificacao_48h_enviada,
      notificacao_premium_enviada,
      views_count,
      organizer_id,
      status,
      likes_count
    `)
    .eq('status', 'published')
    .order('data_inicio', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return data as DatabaseEvent[];
}
