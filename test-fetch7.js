import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('eventos_now_v2').select('*').limit(1);
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]).filter(k => k.includes('logo') || k.includes('url') || k.includes('imagem')));
  }
}
test();
