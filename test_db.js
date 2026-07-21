import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase
    .from('eventos_now_v2')
    .select('*')
    .limit(1);
  if (error) console.log("ERROR:", JSON.stringify(error, null, 2));
  else console.log("SUCCESS! Columns:", Object.keys(data[0]));
}
run();
