import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const tables = ['organizadora', 'organizador', 'clubes', 'clube', 'users', 'profiles', 'organizers', 'organizadoras'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (!error) {
      console.log('Found table:', table, Object.keys(data[0] || {}));
    }
  }
}
test();
