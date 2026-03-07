import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export const getSupabase = () => {
  console.log('VROOM: getSupabase() chamado');
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log('VROOM: Supabase URL:', supabaseUrl ? 'Configurada' : 'EM FALTA');
  console.log('VROOM: Supabase Key:', supabaseAnonKey ? 'Configurada' : 'EM FALTA');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('VROOM: Supabase URL or Anon Key missing. Please configure them in the Secrets panel.');
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
};
