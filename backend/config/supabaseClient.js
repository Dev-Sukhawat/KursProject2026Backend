import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Hantera paths för ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ladda .env-filen (ligger en mapp upp från config/)
dotenv.config({ path: path.join(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Kontrollera att variablerna faktiskt finns
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: SUPABASE_URL or SUPABASE_ANON_KEY is missing in .env");
}

// Skapa och exportera klienten
export const supabase = createClient(supabaseUrl, supabaseKey);