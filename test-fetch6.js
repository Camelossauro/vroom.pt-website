import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('eventos_now_v2').select('id, nome, logo_organizadora_default').not('logo_organizadora_default', 'is', null).limit(5);
  console.log('with logo', data, error);
}
test();
