import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export const getSupabase = () => {
  console.log('VROOM: getSupabase() chamado');
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || window.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || window.VITE_SUPABASE_ANON_KEY;

  console.log('VROOM: Supabase URL:', supabaseUrl ? 'Configurada' : 'EM FALTA');
  console.log('VROOM: Supabase Key:', supabaseAnonKey ? 'Configurada' : 'EM FALTA');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('VROOM: Supabase URL or Anon Key missing. Checking window.SUPABASE_KEY as last resort...');
    const fallbackKey = window.SUPABASE_KEY;
    const fallbackUrl = 'https://joxalzicitgkaqpouvlb.supabase.co';
    
    if (fallbackKey && fallbackKey !== 'YOUR_SUPABASE_ANON_KEY') {
      console.log('VROOM: Using window.SUPABASE_KEY fallback');
      supabaseClient = createClient(fallbackUrl, fallbackKey);
      return supabaseClient;
    }

    console.error('VROOM: All Supabase config attempts failed.');
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
};
