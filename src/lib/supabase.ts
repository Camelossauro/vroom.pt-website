/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL || (window as any).VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (window as any).VITE_SUPABASE_ANON_KEY;

export const supabaseUrl = envUrl && envUrl !== 'undefined' ? envUrl : 'https://vvdqsvyqjnjrnvvjbxqk.supabase.co';
export const supabaseAnonKey = envKey && envKey !== 'undefined' ? envKey : 'placeholder';

if (!supabaseUrl || supabaseAnonKey === 'placeholder') {
  console.warn('Supabase URL or Anon Key is missing. Please add them to your .env file.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
